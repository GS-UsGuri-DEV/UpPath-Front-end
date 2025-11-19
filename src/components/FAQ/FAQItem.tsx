import { FaChevronDown, FaChevronRight } from 'react-icons/fa'

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
    <div className="overflow-hidden rounded-lg bg-[var(--bg-secondary)] shadow-sm transition-all hover:shadow-md">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <FaChevronDown className="text-[var(--accent-indigo)]" />
          ) : (
            <FaChevronRight className="text-[var(--accent-indigo)]" />
          )}
          <div>
            <p className="font-medium text-[var(--text-primary)]">{question}</p>
            {!isExpanded && (
              <p className="text-xs text-[var(--text-muted)]">
                Resposta oculta, expande ao clicar
              </p>
            )}
          </div>
        </div>
        <FaChevronRight className="text-[var(--text-muted)]" />
      </button>
      {isExpanded && (
        <div className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
          <p className="text-sm text-[var(--text-secondary)]">{answer}</p>
        </div>
      )}
    </div>
  )
}
