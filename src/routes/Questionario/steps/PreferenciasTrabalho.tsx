import { FaPuzzlePiece } from 'react-icons/fa'
import RadioGroup from '../../../components/Form/RadioGroup'
import TextArea from '../../../components/Form/TextArea'
import type { QuestionarioData, StepProps } from '../../../types/quest'
import {
  MODELO_TRABALHO_OPTIONS,
  TIPO_EMPRESA_OPTIONS,
  TIPO_EQUIPE_OPTIONS,
} from '../../../types/constants'

type PreferenciasTrabalhoData = Pick<
  QuestionarioData,
  'modeloTrabalho' | 'tipoEmpresa' | 'tipoEquipe' | 'desmotivadores'
>

export default function PreferenciasTrabalho({
  data,
  updateData,
}: StepProps<PreferenciasTrabalhoData>) {
  return (
    <div className="space-y-6">
      {/* Header da Etapa */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
          <FaPuzzlePiece className="text-2xl text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Preferências de Trabalho
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            Seu ambiente de trabalho ideal
          </p>
        </div>
      </div>

      {/* Questão 1 */}
      <RadioGroup
        label="Qual modelo de trabalho você considera ideal?"
        name="modeloTrabalho"
        options={MODELO_TRABALHO_OPTIONS}
        value={data.modeloTrabalho}
        onChange={(value: string) => updateData({ modeloTrabalho: value })}
      />

      {/* Questão 2 */}
      <RadioGroup
        label="Que tipo de empresa combina mais com você?"
        name="tipoEmpresa"
        options={TIPO_EMPRESA_OPTIONS}
        value={data.tipoEmpresa}
        onChange={(value: string) => updateData({ tipoEmpresa: value })}
      />

      {/* Questão 3 */}
      <RadioGroup
        label="Você se imagina trabalhando mais em:"
        name="tipoEquipe"
        options={TIPO_EQUIPE_OPTIONS}
        value={data.tipoEquipe}
        onChange={(value: string) => updateData({ tipoEquipe: value })}
      />

      {/* Questão 4 */}
      <TextArea
        label="O que te desmotiva em um ambiente de trabalho?"
        placeholder="Ex: falta de reconhecimento, comunicação ruim, sobrecarga, microgerenciamento..."
        value={data.desmotivadores}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          updateData({ desmotivadores: e.target.value })
        }
        helperText="Seja honesto(a), isso nos ajuda a te orientar melhor"
        rows={3}
      />
    </div>
  )
}
