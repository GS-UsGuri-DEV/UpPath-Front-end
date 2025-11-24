// Tipos para FAQ
export type FAQItem = {
  question: string
  answer: string
  category: string
}

export type FAQItemProps = {
  question: string
  answer: string
  isExpanded: boolean
  onToggle: () => void
}

export type FAQCategoryProps = {
  category: string
  categoryNumber: number
  items: FAQItem[]
  expandedItems: number[]
  onToggleItem: (index: number) => void
  allItems: FAQItem[]
}

export type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}
