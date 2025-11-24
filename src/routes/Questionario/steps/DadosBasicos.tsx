import { FaUserGraduate } from 'react-icons/fa'
import RadioGroup from '../../../components/Form/RadioGroup'
import Input from '../../../components/Form/Input'
import type { QuestionarioData, StepProps } from '../../../types/quest'
import { MOMENTOS_OPTIONS, ATUA_NA_AREA_OPTIONS } from '../../../types/constants'

type DadosBasicosData = Pick<QuestionarioData, 'momentoAtual' | 'areaFormacao' | 'atuaNaArea'>

export default function DadosBasicos({ data, updateData }: StepProps<DadosBasicosData>) {
  return (
    <div className="space-y-6">
      {/* Header da Etapa */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
          <FaUserGraduate className="text-2xl text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Dados Básicos</h2>
          <p className="text-sm text-[var(--text-muted)]">Conte-nos um pouco sobre você</p>
        </div>
      </div>

      {/* Questão 1 */}
      <RadioGroup
        label="Qual é o seu momento atual?"
        name="momentoAtual"
        options={MOMENTOS_OPTIONS}
        value={data.momentoAtual}
        onChange={(value: string) => updateData({ momentoAtual: value })}
      />

      {/* Questão 2 */}
      <Input
        label="Qual é a sua área de formação ou estudo atual?"
        placeholder="Ex: Tecnologia da Informação, Saúde, Negócios, Design..."
        value={data.areaFormacao}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          updateData({ areaFormacao: e.target.value })
        }
        helperText="Digite sua área de formação ou o que você está estudando"
      />

      {/* Questão 3 */}
      <RadioGroup
        label="Você já atua na área que deseja para o futuro?"
        name="atuaNaArea"
        options={ATUA_NA_AREA_OPTIONS}
        value={data.atuaNaArea}
        onChange={(value: string) => updateData({ atuaNaArea: value })}
      />
    </div>
  )
}
