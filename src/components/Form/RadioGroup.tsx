interface RadioOption {
  value: string
  label: string
}

interface RadioGroupProps {
  label: string
  name: string
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  helperText?: string
}

export default function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  helperText,
}: RadioGroupProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-[var(--text-primary)]">
        {label}
      </label>

      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] p-3 transition-all hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-sm text-[var(--text-primary)]">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {helperText && (
        <p className="text-xs text-[var(--text-muted)]">{helperText}</p>
      )}
    </div>
  )
}
