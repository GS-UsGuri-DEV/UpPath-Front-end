// Opções e constantes para os campos do questionário

export type Option = {
  value: string
  label: string
}

// ===== ETAPA 1: DADOS BÁSICOS =====
export const MOMENTOS_OPTIONS: Option[] = [
  { value: 'ensino-medio', label: 'Estudando Ensino Médio' },
  { value: 'graduacao', label: 'Estudando Graduação/Técnico' },
  { value: 'trabalhando-tech', label: 'Trabalhando na área de tecnologia' },
  { value: 'trabalhando-outro', label: 'Trabalhando em outra área' },
  { value: 'transicao', label: 'Em transição de carreira' },
  { value: 'desempregado', label: 'Desempregado no momento' },
]

export const ATUA_NA_AREA_OPTIONS: Option[] = [
  { value: 'sim', label: 'Sim' },
  { value: 'parcialmente', label: 'Parcialmente' },
  { value: 'nao', label: 'Ainda não' },
]

// ===== ETAPA 2: PERFIL PROFISSIONAL =====
export const NIVEL_EXPERIENCIA_OPTIONS: Option[] = [
  { value: 'iniciante', label: 'Iniciante (estou começando agora)' },
  { value: 'junior', label: 'Júnior' },
  { value: 'pleno', label: 'Pleno' },
  { value: 'senior', label: 'Sênior' },
  { value: 'nao-tech', label: 'Não trabalho com tecnologia (ainda)' },
]

export const MODALIDADES_TRABALHO_OPTIONS: Option[] = [
  { value: 'clt', label: 'CLT' },
  { value: 'estagio', label: 'Estágio' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'pj', label: 'PJ' },
  { value: 'voluntario', label: 'Projeto voluntário' },
]

export const TECNOLOGIAS_OPTIONS: Option[] = [
  { value: 'frontend', label: 'Front-end' },
  { value: 'backend', label: 'Back-end' },
  { value: 'banco-dados', label: 'Banco de Dados' },
  { value: 'ux-ui', label: 'UX/UI' },
  { value: 'dados-ia', label: 'Dados/IA' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'seguranca', label: 'Segurança' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'devops', label: 'DevOps' },
]

// ===== ETAPA 3: OBJETIVOS DE CARREIRA =====
export const OBJETIVOS_CARREIRA_OPTIONS: Option[] = [
  {
    value: 'primeiro-emprego',
    label: 'Conseguir o primeiro emprego em tecnologia',
  },
  { value: 'mudar-area', label: 'Mudar de área para tecnologia' },
  { value: 'crescer-carreira', label: 'Crescer na carreira atual (promoção)' },
  { value: 'aumentar-salario', label: 'Aumentar salário' },
  { value: 'empreender', label: 'Empreender / abrir negócio próprio' },
  { value: 'descobrindo', label: 'Ainda estou descobrindo' },
]

export const AREAS_INTERESSE_OPTIONS: Option[] = [
  { value: 'web', label: 'Desenvolvimento Web' },
  { value: 'ia-ml', label: 'Inteligência Artificial / Machine Learning' },
  { value: 'dados-bi', label: 'Análise de Dados / BI' },
  { value: 'ux-ui', label: 'UX/UI Design' },
  { value: 'seguranca', label: 'Segurança da Informação' },
  { value: 'cloud-devops', label: 'Cloud / DevOps' },
  { value: 'produto', label: 'Produto / Gestão de Projetos' },
]

export const VALORES_CARREIRA_OPTIONS: Option[] = [
  { value: 'estabilidade', label: 'Estabilidade financeira' },
  { value: 'proposito', label: 'Propósito / impacto social' },
  { value: 'qualidade-vida', label: 'Qualidade de vida' },
  { value: 'remoto', label: 'Possibilidade de trabalho remoto' },
  { value: 'crescimento', label: 'Crescimento rápido' },
  { value: 'reconhecimento', label: 'Reconhecimento / status' },
  { value: 'liberdade', label: 'Liberdade e flexibilidade' },
]

// ===== ETAPA 4: ESTILO DE APRENDIZADO =====
export const PREFERENCIAS_APRENDIZADO_OPTIONS: Option[] = [
  { value: 'video', label: 'Vídeo-aulas' },
  { value: 'leitura', label: 'Leitura (artigos, e-books, documentação)' },
  { value: 'ao-vivo', label: 'Aulas ao vivo' },
  { value: 'pratico', label: 'Projetos práticos / mão na massa' },
  { value: 'mentoria', label: 'Mentoria / acompanhamento individual' },
  { value: 'gamificacao', label: 'Gamificação / desafios' },
]

export const TEMPO_DISPONIVEL_OPTIONS: Option[] = [
  { value: 'menos-2h', label: 'Menos de 2 horas' },
  { value: '2-4h', label: '2 a 4 horas' },
  { value: '5-8h', label: '5 a 8 horas' },
  { value: 'mais-8h', label: 'Mais de 8 horas' },
]

export const HORARIOS_ESTUDO_OPTIONS: Option[] = [
  { value: 'manha', label: 'Manhã' },
  { value: 'tarde', label: 'Tarde' },
  { value: 'noite', label: 'Noite' },
  { value: 'fim-semana', label: 'Fins de semana' },
]

export const INTENSIDADE_TRILHA_OPTIONS: Option[] = [
  { value: 'intensa', label: 'Intensas (muito conteúdo em pouco tempo)' },
  { value: 'equilibrada', label: 'Equilibradas' },
  { value: 'leve', label: 'Leves (pouco conteúdo por semana)' },
]

// ===== ETAPA 5: PREFERÊNCIAS DE TRABALHO =====
export const MODELO_TRABALHO_OPTIONS: Option[] = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'remoto', label: 'Remoto' },
  { value: 'hibrido', label: 'Híbrido' },
  { value: 'tanto-faz', label: 'Tanto faz, desde que o trabalho faça sentido' },
]

export const TIPO_EMPRESA_OPTIONS: Option[] = [
  { value: 'startup', label: 'Startup / empresa pequena' },
  { value: 'medio-porte', label: 'Empresa de médio porte' },
  { value: 'grande', label: 'Grande empresa / multinacional' },
  { value: 'publico', label: 'Setor público' },
  { value: 'ong', label: 'ONG / impacto social' },
]

export const TIPO_EQUIPE_OPTIONS: Option[] = [
  {
    value: 'multidisciplinar',
    label: 'Equipes multidisciplinares (várias áreas)',
  },
  { value: 'pequeno-focado', label: 'Times pequenos e focados' },
  { value: 'individual', label: 'Trabalho mais individual' },
  { value: 'nao-sei', label: 'Ainda não sei' },
]

// ===== ETAPA 6: BEM-ESTAR E EQUILÍBRIO =====
export const NIVEL_BEM_ESTAR_OPTIONS: Option[] = [
  { value: '1', label: '1 - Muito sobrecarregado(a)' },
  { value: '2', label: '2 - Um pouco sobrecarregado(a)' },
  { value: '3', label: '3 - Equilibrado(a)' },
  { value: '4', label: '4 - Bem equilibrado(a)' },
  { value: '5', label: '5 - Muito equilibrado(a)' },
]

export const FREQUENCIA_SOBRECARGA_OPTIONS: Option[] = [
  { value: 'quase-nunca', label: 'Quase nunca' },
  { value: 'as-vezes', label: 'Às vezes' },
  { value: 'frequentemente', label: 'Frequentemente' },
  { value: 'quase-sempre', label: 'Quase sempre' },
]

export const SITUACOES_DIARIAS_OPTIONS: Option[] = [
  { value: 'falta-foco', label: 'Falta de foco' },
  { value: 'cansaco-mental', label: 'Cansaço mental' },
  { value: 'ansiedade-prazos', label: 'Ansiedade com prazos' },
  {
    value: 'dificuldade-organizar',
    label: 'Dificuldade em organizar a rotina',
  },
  { value: 'comparacao', label: 'Comparação com outras pessoas' },
  { value: 'falta-motivacao', label: 'Falta de motivação para estudar' },
]

export const APOIO_DESEJADO_OPTIONS: Option[] = [
  { value: 'lembretes-pausa', label: 'Lembretes de pausa e descanso' },
  { value: 'tecnicas-foco', label: 'Técnicas de foco e produtividade' },
  { value: 'saude-mental', label: 'Conteúdos sobre saúde mental' },
  {
    value: 'equilibrio',
    label: 'Sugestões de equilíbrio entre estudo e lazer',
  },
  { value: 'registrar-humor', label: 'Espaço para registrar humor/energia' },
]

// ===== ETAPA 7: USO DA PLATAFORMA =====
export const FALTAS_PLATAFORMAS_OPTIONS: Option[] = [
  { value: 'trilhas-personalizadas', label: 'Trilhas mais personalizadas' },
  { value: 'acompanhamento', label: 'Acompanhamento mais próximo' },
  { value: 'praticos', label: 'Conteúdos mais práticos' },
  { value: 'saude-mental', label: 'Foco em saúde mental' },
  { value: 'feedback', label: 'Feedback sobre minha evolução' },
]

export const RECOMENDACOES_POR_OPTIONS: Option[] = [
  { value: 'area-interesse', label: 'Área de interesse' },
  { value: 'nivel-experiencia', label: 'Nível de experiência' },
  { value: 'objetivo-carreira', label: 'Objetivo de carreira' },
  { value: 'tempo-disponivel', label: 'Tempo disponível por semana' },
  {
    value: 'estado-emocional',
    label: 'Estado emocional (cansaço, energia, etc.)',
  },
]
