import React from 'react'

interface SuccessMessageProps {
  message: string
  onClose: () => void
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  onClose,
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mensagem de sucesso"
      className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="animate-fadeIn mx-4 max-h-[90vh] w-full max-w-sm overflow-auto rounded-lg bg-white p-4 shadow-lg sm:p-6 dark:bg-gray-800">
        <div className="flex flex-col items-center">
          <svg
            className="mb-2 h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="mb-4 text-center text-lg font-semibold">{message}</p>
          <button
            onClick={onClose}
            className="w-full rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 sm:w-auto"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessMessage
