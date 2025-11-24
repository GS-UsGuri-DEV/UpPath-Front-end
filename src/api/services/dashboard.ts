import type { ApiResponse, UserDashboard } from '../../types/userDashboard'
import { API_PYTHON_URL } from '../client'

/**
 * Service functions for user dashboard endpoints.
 * These functions connect to the Python Analytics API.
 */

async function fetchPythonAPI<T>(path: string, token?: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const url = `${API_PYTHON_URL}${path}`
  console.info('[Dashboard API]', 'GET', url)

  const response = await fetch(url, {
    method: 'GET',
    headers,
  })

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getUserDashboard(
  userId: number | string,
  token?: string,
): Promise<UserDashboard> {
  const res = await fetchPythonAPI<ApiResponse<UserDashboard>>(
    `/api/v1/dashboard/user/${userId}/completo`,
    token,
  )
  return res.data
}

export async function getBemEstarUsuario(userId: number | string, token?: string) {
  const res = await fetchPythonAPI<ApiResponse<unknown>>(
    `/api/v1/dashboard/user/${userId}/bem-estar`,
    token,
  )
  return res.data
}

export async function getTrilhasUsuario(userId: number | string, token?: string) {
  const res = await fetchPythonAPI<ApiResponse<unknown>>(
    `/api/v1/dashboard/user/${userId}/trilhas`,
    token,
  )
  return res.data
}
