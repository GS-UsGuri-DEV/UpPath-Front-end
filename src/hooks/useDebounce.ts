/**
 * Hook para aplicar debounce em valores
 * Retorna um valor debounced que só atualiza após o delay especificado
 * @module hooks/useDebounce
 */

import { useEffect, useState } from 'react'

/**
 * Hook que debounce (atrasa) a atualização de um valor
 * Útil para otimizar chamadas em inputs de busca
 * @template T - Tipo do valor a ser debounced
 * @param value - Valor original
 * @param delay - Delay em milissegundos (padrão: 500ms)
 * @returns Valor debounced que só atualiza após o delay
 * @example
 * const [searchTerm, setSearchTerm] = useState('')
 * const debouncedSearchTerm = useDebounce(searchTerm, 300)
 *
 * useEffect(() => {
 *   // Esta busca só executa 300ms após o usuário parar de digitar
 *   fetchResults(debouncedSearchTerm)
 * }, [debouncedSearchTerm])
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Define um timer para atualizar o valor debounced
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Limpa o timer se o valor mudar antes do delay
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
