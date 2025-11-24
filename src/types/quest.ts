/**
 * Tipos para sistema de questionário de perfil do usuário
 * @module types/quest
 */

/**
 * Estrutura completa de dados do questionário
 * Agrupa todas as 7 etapas de perguntas
 * @example
 * const data: QuestionarioData = {
 *   momentoAtual: 'graduacao',
 *   areaFormacao: 'Ciência da Computação',
 *   // ... demais campos
 * }
 */
export type QuestionarioData = {
  // Etapa 1: Dados Básicos
  /** Momento de vida atual do usuário (estudando, trabalhando, etc.) */
  momentoAtual: string
  /** Área de formação acadêmica */
  areaFormacao: string
  /** Se já atua na área de tecnologia */
  atuaNaArea: string

  // Etapa 2: Perfil Profissional
  /** Nível de experiência (iniciante, júnior, pleno, sênior) */
  nivelExperiencia: string
  /** Modalidades de trabalho (CLT, PJ, freelancer, etc.) */
  modalidadesTrabalho: string[]
  /** Tecnologias que domina ou tem interesse */
  tecnologias: string[]
  /** Descrição de competências técnicas */
  competenciasTecnicas: string

  // Etapa 3: Objetivos de Carreira
  /** Objetivo principal de carreira */
  objetivoPrincipal: string
  /** Áreas de interesse em tecnologia */
  areasInteresse: string[]
  /** Outra área de interesse não listada */
  areasInteresseOutra: string
  /** Valores importantes na carreira */
  valoresCarreira: string[]

  // Etapa 4: Estilo de Aprendizado
  /** Preferências de formato de aprendizado */
  preferenciasAprendizado: string[]
  /** Tempo disponível por semana para estudar */
  tempoDisponivel: string
  /** Horários preferenciais para estudo */
  horariosEstudo: string[]
  /** Intensidade desejada das trilhas */
  intensidadeTrilha: string

  // Etapa 5: Preferências de Trabalho
  /** Modelo de trabalho preferido (presencial, remoto, híbrido) */
  modeloTrabalho: string
  /** Tipo de empresa preferido (startup, grande empresa, etc.) */
  tipoEmpresa: string
  /** Tipo de equipe preferido */
  tipoEquipe: string
  /** Desmotivadores profissionais (texto livre) */
  desmotivadores: string

  // Etapa 6: Bem-Estar e Equilíbrio
  /** Nível de bem-estar atual (escala 1-5) */
  nivelBemEstar: string
  /** Frequência de sobrecarga */
  frequenciaSobrecarga: string
  /** Situações diárias enfrentadas */
  situacoesDiarias: string[]
  /** Tipos de apoio desejados da plataforma */
  apoioDesejado: string[]

  // Etapa 7: Uso da Plataforma
  /** Plataformas de aprendizado já utilizadas */
  plataformasUsadas: string
  /** O que falta em outras plataformas */
  faltasPlataformas: string[]
  /** Outra falta não listada */
  faltasPlataformasOutra: string
  /** Definição de sucesso para o usuário */
  resultadoSucesso: string
  /** Como gostaria de receber recomendações */
  recomendacoesPor: string[]
}

/**
 * Props genérico para componentes de step do questionário
 * @template T - Tipo dos dados (geralmente QuestionarioData)
 */
export type StepProps<T> = {
  /** Dados atuais do questionário */
  data: T
  /** Função para atualizar dados parcialmente */
  updateData: (data: Partial<T>) => void
}
