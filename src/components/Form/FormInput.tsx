import type { FormInputProps } from '../../types/form'

export default function FormInput({
  label,
  className,
  error,
  rightIcon,
  onRightIconClick,
  isValid,
  ...rest
}: FormInputProps) {
  let statusClass = ''
  if (error) {
    statusClass = 'input-error'
  } else if (isValid) {
    statusClass = 'input-success'
  }

  const inputClassName = `input-field ${statusClass} ${rightIcon ? 'pr-10' : ''}`

  return (
    <div className={`space-y-2 ${className ?? ''}`}>
      {label && (
        <label className="input-label">
          {label}
          {rest.required && <span className="required-indicator">*</span>}
        </label>
      )}
      <div className="relative">
        <input className={inputClassName} aria-invalid={error ? 'true' : 'false'} {...rest} />
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            title="Mostrar/Ocultar senha"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            {rightIcon}
          </button>
        )}
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  )
}
