import type { ApiResponse, UserDashboard } from '../../types/userDashboard'
import { get } from '../client'

/**
 * Service functions for user dashboard endpoints.
 * These functions return the `data` payload from the API response.
 */

export async function getUserDashboard(
  userId: number | string,
  token?: string,
): Promise<UserDashboard> {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined
  const res = await get<ApiResponse<UserDashboard>>(
    `/api/v1/dashboard/user/${userId}/completo`,
    headers,
  )
  return res.data
}

export async function getBemEstarUsuario(
  userId: number | string,
  token?: string,
) {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined
  const res = await get<ApiResponse<unknown>>(
    `/api/v1/dashboard/user/${userId}/bem-estar`,
    headers,
  )
  return res.data
}

export async function getTrilhasUsuario(
  userId: number | string,
  token?: string,
) {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined
  const res = await get<ApiResponse<unknown>>(
    `/api/v1/dashboard/user/${userId}/trilhas`,
    headers,
  )
  return res.data
}
