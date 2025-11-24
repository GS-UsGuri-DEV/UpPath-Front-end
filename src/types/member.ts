export type Member = {
  name: string
  rm: string
  img: string
  class: string
  description: string
  linkedin?: string
  github?: string
}

export type CarrosselIntegrantesProps = {
  members: Array<{
    name: string
    rm: string
    class?: string
    img: string
    description?: string
    linkedin?: string
    github?: string
  }>
  title?: string
  showControls?: boolean
  showIndicators?: boolean
  className?: string
  autoMs?: number
}
export type MembroCardProps = {
  member: {
    name: string
    rm: string
    class?: string
    img: string
    description?: string
    linkedin?: string
    github?: string
  }
  className?: string
}

export type MembroAvatarProps = {
  src: string
  alt: string
  className?: string
}

export type MembrosSocialProps = {
  socials: Array<{
    href: string
    alt: string
    icon: string
  }>
}
