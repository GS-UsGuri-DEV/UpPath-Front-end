import { FaBullseye } from 'react-icons/fa'
import RadioGroup from '../../../components/Form/RadioGroup'
import CheckboxGroup from '../../../components/Form/CheckboxGroup'
import type { QuestionarioData, StepProps } from '../../../types/quest'
import {
  OBJETIVOS_CARREIRA_OPTIONS,
  AREAS_INTERESSE_OPTIONS,
  VALORES_CARREIRA_OPTIONS,
} from '../../../types/constants'

type ObjetivosCarreiraData = Pick<
  QuestionarioData,
  'objetivoPrincipal' | 'areasInteresse' | 'areasInteresseOutra' | 'valoresCarreira'
>

export default function ObjetivosCarreira({ data, updateData }: StepProps<ObjetivosCarreiraData>) {
  return (
    <div className="space-y-6">
      {/* Header da Etapa */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <FaBullseye className="text-2xl text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Objetivos de Carreira</h2>
          <p className="text-sm text-[var(--text-muted)]">Onde você quer chegar</p>
        </div>
      </div>

      {/* Questão 1 */}
      <RadioGroup
        label="Qual é o seu principal objetivo de carreira para os próximos 2 anos?"
        name="objetivoPrincipal"
        options={OBJETIVOS_CARREIRA_OPTIONS}
        value={data.objetivoPrincipal}
        onChange={(value: string) => updateData({ objetivoPrincipal: value })}
      />

      {/* Questão 2 */}
      <CheckboxGroup
        label="Em quais áreas de tecnologia você tem mais interesse em se desenvolver?"
        helperText="Selecione todas que despertem seu interesse"
        options={AREAS_INTERESSE_OPTIONS}
        values={data.areasInteresse}
        onChange={(values: string[]) => updateData({ areasInteresse: values })}
      />

      {/* Campo "Outra" */}
      {data.areasInteresse.includes('outra') && (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[var(--text-primary)]">
            Qual outra área?
          </label>
          <input
            type="text"
            placeholder="Digite a área de interesse..."
            value={data.areasInteresseOutra}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateData({ areasInteresseOutra: e.target.value })
            }
            className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] placeholder-gray-400 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
          />
        </div>
      )}

      {/* Questão 3 */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-[var(--text-primary)]">
          O que é mais importante pra você em uma carreira?
        </label>
        <p className="text-xs text-[var(--text-muted)]">Escolha até 3 opções</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {VALORES_CARREIRA_OPTIONS.map((option) => {
            const isChecked = data.valoresCarreira.includes(option.value)
            const isDisabled = !isChecked && data.valoresCarreira.length >= 3

            return (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] p-3 transition-all ${
                  isDisabled
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20'
                }`}
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.checked) {
                      updateData({
                        valoresCarreira: [...data.valoresCarreira, option.value],
                      })
                    } else {
                      updateData({
                        valoresCarreira: data.valoresCarreira.filter((v) => v !== option.value),
                      })
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed"
                />
                <span className="text-sm text-[var(--text-primary)]">{option.label}</span>
              </label>
            )
          })}
        </div>
        <p className="text-xs text-indigo-600 dark:text-indigo-400">
          {data.valoresCarreira.length}/3 selecionados
        </p>
      </div>
    </div>
  )
}
