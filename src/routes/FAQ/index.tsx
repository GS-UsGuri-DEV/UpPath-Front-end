import { useState } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import FAQCategory from '../../components/FAQ/FAQCategory'
import SearchBar from '../../components/FAQ/SearchBar'
import Footer from '../../components/Footer'
import { faqData } from '../../data/faqData'

export default function FAQ() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  const filteredFAQ = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const categories = Array.from(new Set(faqData.map((item) => item.category)))

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-4xl px-4 py-8 pb-16 sm:px-6 sm:py-12 sm:pb-24">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <FaQuestionCircle className="text-3xl text-[var(--accent-indigo)]" />
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">
              PERGUNTAS FREQUENTES (FAQ)
            </h1>
          </div>
        </div>

        <div className="mb-8">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Digite sua dúvida aqui..."
          />
        </div>

        <div className="space-y-6">
          {categories.map((category) => {
            const categoryItems = filteredFAQ.filter((item) => item.category === category)

            return (
              <FAQCategory
                key={category}
                category={category}
                categoryNumber={categories.indexOf(category) + 1}
                items={categoryItems}
                expandedItems={expandedItems}
                onToggleItem={toggleItem}
                allItems={faqData}
              />
            )
          })}
        </div>

        <div className="mt-12 rounded-lg border-t-4 border-[var(--accent-indigo)] bg-[var(--bg-secondary)] p-8 text-center shadow-sm">
          <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)]">Precisa de ajuda?</h3>
          <div className="mb-4 flex items-center justify-center gap-2">
            <p className="text-xl font-semibold text-[var(--accent-indigo)] sm:text-2xl">
              Ainda tem dúvidas?
            </p>
          </div>
          <p className="mb-6 text-sm text-[var(--text-muted)]">
            Se você não encontrou a resposta, nossa equipe pode ajudar.
          </p>
          <button
            onClick={() => navigate('/contato')}
            className="rounded-lg bg-[var(--accent-indigo)] px-8 py-3 font-semibold text-white transition-colors hover:bg-[var(--accent-indigo-hover)]"
          >
            IR PARA PÁGINA DE CONTATO
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
