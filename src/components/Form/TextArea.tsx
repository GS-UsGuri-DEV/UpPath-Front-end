interface TextAreaProps {
  label: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  helperText?: string
  rows?: number
}

export default function TextArea({
  label,
  placeholder,
  value,
  onChange,
  helperText,
  rows = 3,
}: TextAreaProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[var(--text-primary)]">
        {label}
      </label>

      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] placeholder-gray-400 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
      />

      {helperText && (
        <p className="text-xs text-[var(--text-muted)]">{helperText}</p>
      )}
    </div>
  )
}
