/**
 * Tipos para requisições HTTP genéricas
 * @module types/request
 */

/**
 * Opções de configuração para requisições HTTP
 * Usadas em funções de cliente HTTP (fetch, axios, etc.)
 * @example
 * const options: RequestOptions = {
 *   method: 'POST',
 *   body: { name: 'João' },
 *   headers: { 'Authorization': 'Bearer token123' }
 * }
 */
export type RequestOptions = {
  /** Método HTTP (GET, POST, PUT, DELETE, PATCH, etc.) */
  method?: string
  /** Corpo da requisição (será serializado para JSON) */
  body?: unknown
  /** Headers HTTP customizados */
  headers?: Record<string, string>
}
