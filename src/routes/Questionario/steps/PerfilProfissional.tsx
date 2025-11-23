import { FaBriefcase } from 'react-icons/fa'
import RadioGroup from '../../../components/Form/RadioGroup'
import CheckboxGroup from '../../../components/Form/CheckboxGroup'
import TextArea from '../../../components/Form/TextArea'
import type { QuestionarioData, StepProps } from '../../../types/quest'
import {
  NIVEL_EXPERIENCIA_OPTIONS,
  MODALIDADES_TRABALHO_OPTIONS,
  TECNOLOGIAS_OPTIONS,
} from '../../../types/constants'

type PerfilProfissionalData = Pick<
  QuestionarioData,
  | 'nivelExperiencia'
  | 'modalidadesTrabalho'
  | 'tecnologias'
  | 'competenciasTecnicas'
>

export default function PerfilProfissional({
  data,
  updateData,
}: StepProps<PerfilProfissionalData>) {
  return (
    <div className="space-y-6">
      {/* Header da Etapa */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
          <FaBriefcase className="text-2xl text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Perfil Profissional
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            Conte sobre sua experiência
          </p>
        </div>
      </div>

      {/* Questão 1 */}
      <RadioGroup
        label="Qual é o seu nível de experiência em tecnologia?"
        name="nivelExperiencia"
        options={NIVEL_EXPERIENCIA_OPTIONS}
        value={data.nivelExperiencia}
        onChange={(value: string) => updateData({ nivelExperiencia: value })}
      />

      {/* Questão 2 */}
      <CheckboxGroup
        label="Você já trabalhou em alguma destas modalidades?"
        helperText="Pode marcar mais de uma"
        options={MODALIDADES_TRABALHO_OPTIONS}
        values={data.modalidadesTrabalho}
        onChange={(values: string[]) =>
          updateData({ modalidadesTrabalho: values })
        }
      />

      {/* Questão 3 */}
      <CheckboxGroup
        label="Quais tecnologias você já utiliza ou estudou?"
        helperText="Selecione todas que se aplicam"
        options={TECNOLOGIAS_OPTIONS}
        values={data.tecnologias}
        onChange={(values: string[]) => updateData({ tecnologias: values })}
      />

      {/* Questão 4 */}
      <TextArea
        label="Liste suas principais competências técnicas (hard skills)"
        placeholder="Ex: JavaScript, React, Node.js, SQL, Git, Figma..."
        value={data.competenciasTecnicas}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          updateData({ competenciasTecnicas: e.target.value })
        }
        helperText="Descreva em poucas palavras suas principais habilidades técnicas"
        rows={4}
      />
    </div>
  )
}
