import { FaSearch } from 'react-icons/fa'

import type { SearchBarProps } from '../../types/faq'

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Digite sua pesquisa...',
}: SearchBarProps) {
  return (
    <div className="relative">
      <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--text-muted)]" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border-0 bg-[var(--input-bg)] py-4 pr-4 pl-12 text-[var(--text-primary)] shadow-sm focus:ring-2 focus:ring-[var(--accent-primary)] focus:outline-none"
      />
    </div>
  )
}
