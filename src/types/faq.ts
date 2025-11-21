// Tipos para FAQ
export interface FAQItem {
  question: string
  answer: string
  category: string
}

export interface FAQItemProps {
  question: string
  answer: string
  isExpanded: boolean
  onToggle: () => void
}

export interface FAQCategoryProps {
  category: string
  categoryNumber: number
  items: FAQItem[]
  expandedItems: number[]
  onToggleItem: (index: number) => void
  allItems: FAQItem[]
}

export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}
