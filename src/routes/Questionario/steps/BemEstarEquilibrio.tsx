import { FaHeart } from 'react-icons/fa'
import RadioGroup from '../../../components/Form/RadioGroup'
import CheckboxGroup from '../../../components/Form/CheckboxGroup'
import type { QuestionarioData, StepProps } from '../../../types/quest'
import {
  NIVEL_BEM_ESTAR_OPTIONS,
  FREQUENCIA_SOBRECARGA_OPTIONS,
  SITUACOES_DIARIAS_OPTIONS,
  APOIO_DESEJADO_OPTIONS,
} from '../../../types/constants'

type BemEstarEquilibrioData = Pick<
  QuestionarioData,
  'nivelBemEstar' | 'frequenciaSobrecarga' | 'situacoesDiarias' | 'apoioDesejado'
>

export default function BemEstarEquilibrio({
  data,
  updateData,
}: StepProps<BemEstarEquilibrioData>) {
  return (
    <div className="space-y-6">
      {/* Header da Etapa */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
          <FaHeart className="text-2xl text-pink-600 dark:text-pink-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Bem-Estar e Equilíbrio</h2>
          <p className="text-sm text-[var(--text-muted)]">Cuidando da sua saúde mental</p>
        </div>
      </div>

      {/* Questão 1 */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-[var(--text-primary)]">
          Como você classificaria seu nível atual de bem-estar em relação ao trabalho/estudos?
        </label>
        <div className="space-y-2">
          {NIVEL_BEM_ESTAR_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--border-color)] p-3 transition-all ${
                data.nivelBemEstar === option.value
                  ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/20'
                  : 'bg-[var(--bg-primary)] hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/20'
              }`}
            >
              <input
                type="radio"
                name="nivelBemEstar"
                value={option.value}
                checked={data.nivelBemEstar === option.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateData({ nivelBemEstar: e.target.value })
                }
                className="h-4 w-4 border-gray-300 text-pink-600 focus:ring-2 focus:ring-pink-500"
              />
              <span className="text-sm text-[var(--text-primary)]">{option.label}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          Escala de 1 a 5 (1 = muito sobrecarregado, 5 = muito equilibrado)
        </p>
      </div>

      {/* Questão 2 */}
      <RadioGroup
        label="Com que frequência você sente que está sobrecarregado(a) com estudos/trabalho?"
        name="frequenciaSobrecarga"
        options={FREQUENCIA_SOBRECARGA_OPTIONS}
        value={data.frequenciaSobrecarga}
        onChange={(value: string) => updateData({ frequenciaSobrecarga: value })}
      />

      {/* Questão 3 */}
      <CheckboxGroup
        label="Quais dessas situações você mais enfrenta no dia a dia?"
        helperText="Selecione todas que se aplicam"
        options={SITUACOES_DIARIAS_OPTIONS}
        values={data.situacoesDiarias}
        onChange={(values: string[]) => updateData({ situacoesDiarias: values })}
      />

      {/* Questão 4 */}
      <CheckboxGroup
        label="Que tipo de apoio o UpPath poderia te oferecer para melhorar seu bem-estar?"
        helperText="Marque todas as opções que te interessam"
        options={APOIO_DESEJADO_OPTIONS}
        values={data.apoioDesejado}
        onChange={(values: string[]) => updateData({ apoioDesejado: values })}
      />
    </div>
  )
}
