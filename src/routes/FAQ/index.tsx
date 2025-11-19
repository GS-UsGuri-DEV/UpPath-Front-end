import { useState } from 'react'
import { FaQuestionCircle, FaChevronRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/FAQ/SearchBar'
import FAQCategory from '../../components/FAQ/FAQCategory'
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <FaQuestionCircle className="text-3xl text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              PERGUNTAS FREQUENTES (FAQ)
            </h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Digite sua dúvida aqui..."
          />
        </div>

        {/* FAQ Content */}
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryItems = filteredFAQ.filter(
              (item) => item.category === category,
            )

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

        {/* Contact Section */}
        <div className="mt-12 rounded-lg border-t-4 border-blue-600 bg-white p-8 text-center shadow-sm">
          <h3 className="mb-2 text-xl font-bold text-gray-800">
            --- E ASSIM DI POIRNE
          </h3>
          <div className="mb-4 flex items-center justify-center gap-2">
            <FaChevronRight className="text-2xl text-blue-600" />
            <p className="text-2xl font-bold text-blue-900">
              AINDA TEM DÚVIAS?
            </p>
          </div>
          <p className="mb-6 text-sm text-gray-600">
            Se você encuntro de resposta de preqquvá, nousa equip pranta de
            ajudar.
          </p>
          <button
            onClick={() => navigate('/contato')}
            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            IR PARA PÁGINA DE CONTATO
          </button>
        </div>
      </div>
    </div>
  )
}
