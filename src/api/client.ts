export const API_URL = import.meta.env.VITE_API_URL ?? 'https://uppath.onrender.com'

import type { RequestOptions } from '../types/request'

export async function request<T = unknown>(
  path: string,
  { method = 'GET', body, headers = {} }: RequestOptions = {},
): Promise<T> {
  const url = path.startsWith('http')
    ? path
    : `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`

  // Debug: log every request URL so we can verify which endpoint the bundle calls
  try {
    // Use console.info to be more visible in DevTools network/console
    console.info('[API]', method, url)
  } catch (e) {
    // ignore
  }

  const defaultHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...headers,
  }

  // Attach Authorization header automatically if auth token is present
  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null
    if (token && !(defaultHeaders as any).Authorization) {
      ;(defaultHeaders as Record<string, string>)['Authorization'] = `Bearer ${token}`
    }
  } catch (e) {
    // ignore if localStorage not available or access denied
  }

  const init: RequestInit = { method, headers: defaultHeaders }

  if (body != null) {
    ;(init.headers as Record<string, string>)['Content-Type'] =
      'application/json'
    init.body = JSON.stringify(body)
  }

  const res = await fetch(url, init)
  const text = await res.text()

  // Try parse JSON only when content looks like JSON — protect from HTML/text responses
  let data: any = null
  const contentType = res.headers.get('content-type') || ''
  if (text) {
    if (contentType.includes('application/json')) {
      try {
        data = JSON.parse(text)
      } catch (e) {
        // If parsing fails, keep raw text in `data` for better error messages
        data = text
        console.warn('[API] Failed to parse JSON response for', url, e)
      }
    } else {
      // Non-JSON response (HTML, plain text, etc.) — keep raw text
      data = text
    }
  }

  if (!res.ok) {
    // Helpful debug output when requests fail so we can inspect server replies
    try {
      console.warn('[API] Request failed', {
        status: res.status,
        statusText: res.statusText,
        url,
      })
      // Print headers as an object for easier reading in DevTools
      try {
        const headersObj: Record<string, string> = {}
        res.headers.forEach((v, k) => (headersObj[k] = v))
        console.debug('[API] Response headers ->', headersObj)
      } catch (e) {
        console.debug('[API] Could not enumerate response headers', e)
      }
      console.debug('[API] Response body (raw) ->', text)
    } catch (e) {
      // ignore any logging errors
    }
    // Prefer structured error fields, then raw text, then statusText/status
    const message =
      (data && typeof data === 'object' && (data.error || data.message)) ||
      (typeof data === 'string' && data) ||
      res.statusText ||
      `HTTP ${res.status}`
    // Include HTTP status code in the thrown message to help callers map errors
    throw new Error(`${res.status} ${String(message)}`)
  }

  return data as T
}

export async function get<T = unknown>(
  path: string,
  headers?: Record<string, string>,
) {
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

export async function del<T = unknown>(
  path: string,
  headers?: Record<string, string>,
) {
  return request<T>(path, { method: 'DELETE', headers })
}
