interface CheckboxOption {
  value: string
  label: string
}

interface CheckboxGroupProps {
  label: string
  options: CheckboxOption[]
  values: string[]
  onChange: (values: string[]) => void
  helperText?: string
}

export default function CheckboxGroup({
  label,
  options,
  values,
  onChange,
  helperText,
}: CheckboxGroupProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...values, optionValue])
    } else {
      onChange(values.filter((v) => v !== optionValue))
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-[var(--text-primary)]">
        {label}
      </label>

      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] p-3 transition-all hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20"
          >
            <input
              type="checkbox"
              value={option.value}
              checked={values.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
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
