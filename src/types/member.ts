/**
 * Tipos para página de integrantes/membros
 * @module types/member
 */

/**
 * Dados completos de um membro da equipe
 * @example
 * const member: Member = {
 *   name: 'João Silva',
 *   rm: 'RM12345',
 *   img: '/integrantes/joao.jpg',
 *   class: '3° ESPW',
 *   description: 'Desenvolvedor Full Stack',
 *   linkedin: 'https://linkedin.com/in/joaosilva',
 *   github: 'https://github.com/joaosilva'
 * }
 */
export type Member = {
  /** Nome completo do membro */
  name: string
  /** Registro de Matrícula (RM) */
  rm: string
  /** Caminho da imagem de perfil */
  img: string
  /** Turma/classe do aluno */
  class: string
  /** Descrição ou função no projeto */
  description: string
  /** URL do perfil LinkedIn (opcional) */
  linkedin?: string
  /** URL do perfil GitHub (opcional) */
  github?: string
}

/**
 * Props do componente CarrosselIntegrantes
 * Carrossel especializado para exibir membros da equipe
 */
export type CarrosselIntegrantesProps = {
  /** Array de membros a exibir */
  members: Array<{
    name: string
    rm: string
    class?: string
    img: string
    description?: string
    linkedin?: string
    github?: string
  }>
  /** Título do carrossel (ex: 'Nossa Equipe') */
  title?: string
  /** Exibir controles de navegação (prev/next) */
  showControls?: boolean
  /** Exibir indicadores de posição (dots) */
  showIndicators?: boolean
  /** Classes CSS adicionais */
  className?: string
  /** Intervalo de auto-play em ms (padrão: sem auto-play) */
  autoMs?: number
}

/**
 * Props do componente MembroCard
 * Card individual de um membro
 */
export type MembroCardProps = {
  /** Dados do membro */
  member: {
    name: string
    rm: string
    class?: string
    img: string
    description?: string
    linkedin?: string
    github?: string
  }
  /** Classes CSS adicionais para customização */
  className?: string
}

/**
 * Props do componente MembroAvatar
 * Avatar circular de um membro
 */
export type MembroAvatarProps = {
  /** URL da imagem */
  src: string
  /** Texto alternativo para acessibilidade */
  alt: string
  /** Classes CSS adicionais */
  className?: string
}

/**
 * Props do componente MembrosSocial
 * Links de redes sociais de um membro
 */
export type MembrosSocialProps = {
  /** Array de redes sociais */
  socials: Array<{
    /** URL do perfil */
    href: string
    /** Texto alt para acessibilidade */
    alt: string
    /** Ícone da rede social */
    icon: string
  }>
}
