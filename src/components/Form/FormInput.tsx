import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name?: string;
  error?: string | undefined;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  isValid?: boolean;
};

export default function FormInput({ label, className, error, rightIcon, onRightIconClick, isValid, ...rest }: Props) {
  const inputClassName = `input-field ${
    error ? 'input-error' : isValid ? 'input-success' : ''
  } ${rightIcon ? 'pr-10' : ''}`;

  return (
    <div className={"space-y-2 " + (className ?? '')}>
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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
          >
            {rightIcon}
          </button>
        )}
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
