import { FaChevronRight, FaChevronDown } from 'react-icons/fa'

interface FAQItemProps {
  question: string
  answer: string
  isExpanded: boolean
  onToggle: () => void
}

export default function FAQItem({
  question,
  answer,
  isExpanded,
  onToggle,
}: FAQItemProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-blue-50 shadow-sm transition-all hover:shadow-md">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <FaChevronDown className="text-blue-600" />
          ) : (
            <FaChevronRight className="text-blue-600" />
          )}
          <div>
            <p className="font-medium text-gray-800">{question}</p>
            {!isExpanded && (
              <p className="text-xs text-gray-500">
                Resposta oculta, expande ao clicar
              </p>
            )}
          </div>
        </div>
        <FaChevronRight className="text-gray-400" />
      </button>
      {isExpanded && (
        <div className="border-t border-blue-100 bg-white p-4">
          <p className="text-sm text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  )
}
