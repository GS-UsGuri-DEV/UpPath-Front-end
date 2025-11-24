type InputProps = {
  label: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  helperText?: string
  type?: string
}

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  helperText,
  type = 'text',
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[var(--text-primary)]">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] placeholder-gray-400 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
      />

      {helperText && <p className="text-xs text-[var(--text-muted)]">{helperText}</p>}
    </div>
  )
}
