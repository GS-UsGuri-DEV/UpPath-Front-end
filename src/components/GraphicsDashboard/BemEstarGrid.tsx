import type { BemEstarGridProps } from '../../types/graphicsDashboard'
import BemEstarCard from './BemEstarCard'

/**
 * BemEstarGrid - Grid de cards de bem-estar
 */
export default function BemEstarGrid({ cards }: BemEstarGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <BemEstarCard key={card.label} {...card} />
      ))}
    </div>
  )
}
