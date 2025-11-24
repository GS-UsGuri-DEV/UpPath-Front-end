import type { SocialNetwork } from '../types/socialNetwork'

export function mapMemberSocialNetworks(m: {
  linkedin?: string
  github?: string
}): SocialNetwork[] {
  const socials: SocialNetwork[] = []
  if (m.linkedin) {
    socials.push({
      href: m.linkedin,
      icon: '/icones/linkedin.svg',
      alt: 'LinkedIn',
    })
  }
  if (m.github) {
    socials.push({ href: m.github, icon: '/icones/github.svg', alt: 'GitHub' })
  }
  return socials
}
