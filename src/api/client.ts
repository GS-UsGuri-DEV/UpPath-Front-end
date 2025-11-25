// API Java (CRUD - empresas, users, login)
export const API_URL = import.meta.env.VITE_API_URL_JAVA

// API Python (Analytics - dashboards)
export const API_PYTHON_URL = import.meta.env.VITE_API_URL_PYTHON

import type { RequestOptions } from '../types/request'

export async function request<T = unknown>(
  path: string,
  { method = 'GET', body, headers = {} }: RequestOptions = {},
): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`

  // Request is being made (logging removed for production)

  const defaultHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...headers,
  }

  // Attach Authorization header automatically if auth token is present
  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null
    if (token && !defaultHeaders.Authorization) {
      defaultHeaders.Authorization = `Bearer ${token}`
    }
  } catch (error) {
    // Ignore if localStorage not available or access denied (SSR, incognito mode)
    console.warn('Could not access localStorage for auth token:', error)
  }

  const init: RequestInit = { method, headers: defaultHeaders }

  if (body != null) {
    ;(init.headers as Record<string, string>)['Content-Type'] = 'application/json'
    init.body = JSON.stringify(body)
  }

  const res = await fetch(url, init)
  const text = await res.text()

  // Try parse JSON only when content looks like JSON — protect from HTML/text responses
  let data: unknown = null
  const contentType = res.headers.get('content-type') || ''
  if (text) {
    if (contentType.includes('application/json')) {
      try {
        data = JSON.parse(text)
      } catch (error) {
        // If parsing fails, keep raw text in data for better error messages
        console.warn('Failed to parse JSON response:', error)
        data = text
      }
    } else {
      // Non-JSON response (HTML, plain text, etc.) — keep raw text
      data = text
    }
  }

  if (!res.ok) {
    // Request failed - extract error message
    const dataObj = data && typeof data === 'object' ? (data as Record<string, unknown>) : null
    const message =
      (dataObj && (dataObj.error || dataObj.message)) ||
      (typeof data === 'string' && data) ||
      res.statusText ||
      `HTTP ${res.status}`
    // Include HTTP status code in the thrown message to help callers map errors
    throw new Error(`${res.status} ${String(message)}`)
  }

  return data as T
}

export async function get<T = unknown>(path: string, headers?: Record<string, string>) {
  return request<T>(path, { method: 'GET', headers })
}

export async function post<T = unknown>(
  path: string,
  body?: unknown,
  headers?: Record<string, string>,
) {
  return request<T>(path, { method: 'POST', body, headers })
}

export async function put<T = unknown>(
  path: string,
  body?: unknown,
  headers?: Record<string, string>,
) {
  return request<T>(path, { method: 'PUT', body, headers })
}

export async function del<T = unknown>(path: string, headers?: Record<string, string>) {
  return request<T>(path, { method: 'DELETE', headers })
}
