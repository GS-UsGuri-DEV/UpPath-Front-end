import { FaBrain } from 'react-icons/fa'
import RadioGroup from '../../../components/Form/RadioGroup'
import CheckboxGroup from '../../../components/Form/CheckboxGroup'
import type { QuestionarioData, StepProps } from '../../../types/quest'
import {
  PREFERENCIAS_APRENDIZADO_OPTIONS,
  TEMPO_DISPONIVEL_OPTIONS,
  HORARIOS_ESTUDO_OPTIONS,
  INTENSIDADE_TRILHA_OPTIONS,
} from '../../../types/constants'

type EstiloAprendizadoData = Pick<
  QuestionarioData,
  | 'preferenciasAprendizado'
  | 'tempoDisponivel'
  | 'horariosEstudo'
  | 'intensidadeTrilha'
>

export default function EstiloAprendizado({
  data,
  updateData,
}: StepProps<EstiloAprendizadoData>) {
  return (
    <div className="space-y-6">
      {/* Header da Etapa */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
          <FaBrain className="text-2xl text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Estilo de Aprendizado
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            Como você aprende melhor
          </p>
        </div>
      </div>

      {/* Questão 1 */}
      <CheckboxGroup
        label="Como você prefere aprender?"
        helperText="Selecione todas as formas que funcionam para você"
        options={PREFERENCIAS_APRENDIZADO_OPTIONS}
        values={data.preferenciasAprendizado}
        onChange={(values: string[]) =>
          updateData({ preferenciasAprendizado: values })
        }
      />

      {/* Questão 2 */}
      <RadioGroup
        label="Quanto tempo por semana você consegue dedicar ao seu desenvolvimento profissional?"
        name="tempoDisponivel"
        options={TEMPO_DISPONIVEL_OPTIONS}
        value={data.tempoDisponivel}
        onChange={(value: string) => updateData({ tempoDisponivel: value })}
      />

      {/* Questão 3 */}
      <CheckboxGroup
        label="Em quais horários você costuma estudar com mais foco?"
        helperText="Marque todos os períodos em que você consegue se concentrar melhor"
        options={HORARIOS_ESTUDO_OPTIONS}
        values={data.horariosEstudo}
        onChange={(values: string[]) => updateData({ horariosEstudo: values })}
      />

      {/* Questão 4 */}
      <RadioGroup
        label="Você prefere trilhas mais intensas ou mais leves?"
        name="intensidadeTrilha"
        options={INTENSIDADE_TRILHA_OPTIONS}
        value={data.intensidadeTrilha}
        onChange={(value: string) => updateData({ intensidadeTrilha: value })}
      />
    </div>
  )
}
