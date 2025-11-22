import { FaFlask } from 'react-icons/fa'
import CheckboxGroup from '../../../components/Form/CheckboxGroup'
import Input from '../../../components/Form/Input'
import TextArea from '../../../components/Form/TextArea'
import type { QuestionarioData, StepProps } from '../../../types/quest'
import {
  FALTAS_PLATAFORMAS_OPTIONS,
  RECOMENDACOES_POR_OPTIONS,
} from '../../../types/constants'

type UsoPlataformaData = Pick<
  QuestionarioData,
  | 'plataformasUsadas'
  | 'faltasPlataformas'
  | 'faltasPlataformasOutra'
  | 'resultadoSucesso'
  | 'recomendacoesPor'
>

export default function UsoPlataforma({
  data,
  updateData,
}: StepProps<UsoPlataformaData>) {
  return (
    <div className="space-y-6">
      {/* Header da Etapa */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30">
          <FaFlask className="text-2xl text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Uso da Plataforma e Expectativas
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            Última etapa! Conte suas expectativas
          </p>
        </div>
      </div>

      {/* Questão 1 */}
      <Input
        label="Você já usou alguma plataforma de cursos ou carreira? Qual(is)?"
        placeholder="Ex: FIAP On, Alura, Coursera, Udemy, LinkedIn Learning..."
        value={data.plataformasUsadas}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          updateData({ plataformasUsadas: e.target.value })
        }
        helperText="Deixe em branco se nunca usou"
      />

      {/* Questão 2 */}
      <div className="space-y-3">
        <CheckboxGroup
          label="O que você mais sente falta nessas plataformas?"
          helperText="Selecione todas as opções que fazem sentido para você"
          options={FALTAS_PLATAFORMAS_OPTIONS}
          values={data.faltasPlataformas}
          onChange={(values: string[]) =>
            updateData({ faltasPlataformas: values })
          }
        />

        {/* Campo "Outra" */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[var(--text-primary)]">
            Outra:
          </label>
          <input
            type="text"
            placeholder="Descreva o que você sente falta..."
            value={data.faltasPlataformasOutra}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateData({ faltasPlataformasOutra: e.target.value })
            }
            className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] placeholder-gray-400 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
          />
        </div>
      </div>

      {/* Questão 3 */}
      <TextArea
        label="O que seria um 'resultado de sucesso' pra você usando o UpPath nos próximos 6 meses?"
        placeholder="Ex: Conseguir meu primeiro emprego em tech, completar 3 cursos de programação, melhorar minha organização de estudos..."
        value={data.resultadoSucesso}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          updateData({ resultadoSucesso: e.target.value })
        }
        helperText="Seja específico(a), isso nos ajuda a personalizar sua experiência"
        rows={4}
      />

      {/* Questão 4 */}
      <CheckboxGroup
        label="Você gostaria de receber recomendações de trilhas por:"
        helperText="Selecione todos os critérios que você considera importantes"
        options={RECOMENDACOES_POR_OPTIONS}
        values={data.recomendacoesPor}
        onChange={(values: string[]) =>
          updateData({ recomendacoesPor: values })
        }
      />

      {/* Mensagem de conclusão */}
      <div className="mt-8 rounded-lg border-2 border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-950/20">
        <p className="text-center text-sm font-semibold text-indigo-700 dark:text-indigo-300">
          🎉 Você está quase lá! Clique em "Finalizar" para salvar suas
          respostas e começar sua jornada personalizada no UpPath.
        </p>
      </div>
    </div>
  )
}
