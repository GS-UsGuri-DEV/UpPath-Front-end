import type { FAQItem as FAQData } from '../../data/faqData'
import FAQItem from './FAQItem'

interface FAQCategoryProps {
  category: string
  categoryNumber: number
  items: FAQData[]
  expandedItems: number[]
  onToggleItem: (index: number) => void
  allItems: FAQData[]
}

export default function FAQCategory({
  category,
  categoryNumber,
  items,
  expandedItems,
  onToggleItem,
  allItems,
}: FAQCategoryProps) {
  if (items.length === 0) return null

  return (
    <div>
      <h2 className="mb-4 text-sm font-bold text-[var(--text-secondary)]">
        --- CATEGORIA {categoryNumber}: {category} ---
      </h2>
      <div className="space-y-3">
        {items.map((item) => {
          const globalIndex = allItems.indexOf(item)
          const isExpanded = expandedItems.includes(globalIndex)

          return (
            <FAQItem
              key={globalIndex}
              question={item.question}
              answer={item.answer}
              isExpanded={isExpanded}
              onToggle={() => onToggleItem(globalIndex)}
            />
          )
        })}
      </div>
    </div>
  )
}
