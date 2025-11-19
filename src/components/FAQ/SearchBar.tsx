import { FaSearch } from 'react-icons/fa'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Digite sua pesquisa...',
}: SearchBarProps) {
  return (
    <div className="relative">
      <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border-0 bg-white py-4 pr-4 pl-12 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  )
}
