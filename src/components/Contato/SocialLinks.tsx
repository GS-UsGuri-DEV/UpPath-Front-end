import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { contactInfo } from '../../data/contactData'

import type { SocialLink } from '../../types/social'

export default function SocialLinks() {
  const socialLinks: SocialLink[] = [
    {
      icon: <FaFacebookF />,
      url: contactInfo.socialMedia.facebook,
      bgColor: 'bg-[var(--accent-primary)]',
      hoverColor: 'hover:bg-[var(--accent-primary-hover)]',
    },
    {
      icon: <FaTwitter />,
      url: contactInfo.socialMedia.twitter,
      bgColor: 'bg-[var(--accent-primary)]',
      hoverColor: 'hover:bg-[var(--accent-primary-hover)]',
    },
    {
      icon: <FaInstagram />,
      url: contactInfo.socialMedia.instagram,
      bgColor: 'bg-[var(--accent-indigo)]',
      hoverColor: 'hover:bg-[var(--accent-indigo-hover)]',
    },
    {
      icon: <FaLinkedinIn />,
      url: contactInfo.socialMedia.linkedin,
      bgColor: 'bg-[var(--accent-indigo)]',
      hoverColor: 'hover:bg-[var(--accent-indigo-hover)]',
    },
  ]

  return (
    <div className="flex items-center justify-center gap-4">
      {socialLinks.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex h-12 w-12 items-center justify-center rounded-full ${link.bgColor} text-white shadow-md transition-all ${link.hoverColor} hover:scale-110`}
          aria-label={`Siga-nos no ${link.url.split('/').pop()}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  )
}
