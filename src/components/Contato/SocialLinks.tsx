import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa'
import { contactInfo } from '../../data/contactData'

interface SocialLink {
  icon: React.ReactNode
  url: string
  bgColor: string
  hoverColor: string
}

export default function SocialLinks() {
  const socialLinks: SocialLink[] = [
    {
      icon: <FaFacebookF />,
      url: contactInfo.socialMedia.facebook,
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
    },
    {
      icon: <FaTwitter />,
      url: contactInfo.socialMedia.twitter,
      bgColor: 'bg-sky-500',
      hoverColor: 'hover:bg-sky-600',
    },
    {
      icon: <FaInstagram />,
      url: contactInfo.socialMedia.instagram,
      bgColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600',
    },
    {
      icon: <FaLinkedinIn />,
      url: contactInfo.socialMedia.linkedin,
      bgColor: 'bg-blue-700',
      hoverColor: 'hover:bg-blue-800',
    },
  ]

  return (
    <div className="flex items-center justify-center gap-4">
      {socialLinks.map((link, index) => (
        <a
          key={index}
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
