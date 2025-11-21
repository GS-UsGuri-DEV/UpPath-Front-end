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
  const inputClassName = `input-field ${
    error ? 'input-error' : isValid ? 'input-success' : ''
  } ${rightIcon ? 'pr-10' : ''}`

  return (
    <div className={'space-y-2 ' + (className ?? '')}>
      {label && (
        <label className="input-label">
          {label}
          {rest.required && <span className="required-indicator">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          className={inputClassName}
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        />
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
