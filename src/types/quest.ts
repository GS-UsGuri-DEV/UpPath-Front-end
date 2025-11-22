// Tipos para os dados do questionário

export interface QuestionarioData {
  // Etapa 1: Dados Básicos
  momentoAtual: string
  areaFormacao: string
  atuaNaArea: string

  // Etapa 2: Perfil Profissional
  nivelExperiencia: string
  modalidadesTrabalho: string[]
  tecnologias: string[]
  competenciasTecnicas: string

  // Etapa 3: Objetivos de Carreira
  objetivoPrincipal: string
  areasInteresse: string[]
  areasInteresseOutra: string
  valoresCarreira: string[]

  // Etapa 4: Estilo de Aprendizado
  preferenciasAprendizado: string[]
  tempoDisponivel: string
  horariosEstudo: string[]
  intensidadeTrilha: string

  // Etapa 5: Preferências de Trabalho
  modeloTrabalho: string
  tipoEmpresa: string
  tipoEquipe: string
  desmotivadores: string

  // Etapa 6: Bem-Estar e Equilíbrio
  nivelBemEstar: string
  frequenciaSobrecarga: string
  situacoesDiarias: string[]
  apoioDesejado: string[]

  // Etapa 7: Uso da Plataforma
  plataformasUsadas: string
  faltasPlataformas: string[]
  faltasPlataformasOutra: string
  resultadoSucesso: string
  recomendacoesPor: string[]
}

// Props genérico para os steps
export interface StepProps<T> {
  data: T
  updateData: (data: Partial<T>) => void
}
