export const API_URL = import.meta.env.VITE_API_URL

type RequestOptions = {
  method?: string
  body?: unknown
  headers?: Record<string, string>
}

export async function request<T = unknown>(
  path: string,
  { method = 'GET', body, headers = {} }: RequestOptions = {},
): Promise<T> {
  const url = path.startsWith('http')
    ? path
    : `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`

  const defaultHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...headers,
  }

  const init: RequestInit = { method, headers: defaultHeaders }

  if (body != null) {
    ;(init.headers as Record<string, string>)['Content-Type'] =
      'application/json'
    init.body = JSON.stringify(body)
  }

  const res = await fetch(url, init)
  const text = await res.text()
  const data = text ? JSON.parse(text) : null

  if (!res.ok) {
    const message = data?.error ?? data?.message ?? res.statusText
    throw new Error(String(message ?? `HTTP ${res.status}`))
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
