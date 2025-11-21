import type { ContactInfoItem } from '../types/contact'

export const contactInfo = {
  companyName: 'UpPath',
  tagline: 'Desenvolvendo carreiras com IA e empatia',
  email: 'contato@uppath.com.br',
  supportEmail: 'suporte@uppath.com.br',
  phone: '(11) 3456-7890',
  whatsapp: '(11) 99876-5432',
  address: {
    street: 'Avenida Paulista, 1578',
    complement: 'Conjunto 1401',
    city: 'São Paulo',
    state: 'SP',
    cep: '01310-200',
  },
  schedule: 'Segunda a Sexta, 9h às 18h',
  socialMedia: {
    facebook: 'https://facebook.com/uppath',
    twitter: 'https://twitter.com/uppath',
    instagram: 'https://instagram.com/uppath',
    linkedin: 'https://linkedin.com/company/uppath',
  },
}

export const contactItems: ContactInfoItem[] = [
  {
    icon: 'email',
    title: 'Email Geral:',
    content: contactInfo.email,
  },
  {
    icon: 'support',
    title: 'Suporte Técnico:',
    content: contactInfo.supportEmail,
  },
  {
    icon: 'phone',
    title: 'Telefone:',
    content: contactInfo.phone,
  },
  {
    icon: 'whatsapp',
    title: 'WhatsApp:',
    content: contactInfo.whatsapp,
  },
  {
    icon: 'location',
    title: 'Endereço:',
    content: [
      contactInfo.address.street,
      contactInfo.address.complement,
      `${contactInfo.address.city} - ${contactInfo.address.state}`,
      `CEP: ${contactInfo.address.cep}`,
    ],
  },
]
