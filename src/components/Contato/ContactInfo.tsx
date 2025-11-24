import { FaEnvelope, FaHeadset, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import { contactInfo, contactItems } from '../../data/contactData'

export default function ContactInfo() {
  return (
    <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-8 shadow-md">
      <h2 className="mb-2 text-2xl font-bold text-[var(--accent-indigo)]">
        {contactInfo.companyName}
      </h2>
      <p className="mb-6 text-sm text-[var(--text-muted)]">{contactInfo.tagline}</p>

      <div className="space-y-6">
        {contactItems.map((item) => {
          const iconMap = {
            email: <FaEnvelope className="text-xl text-[var(--accent-indigo)]" />,
            support: <FaHeadset className="text-xl text-[var(--accent-success)]" />,
            phone: <FaPhoneAlt className="text-xl text-[var(--accent-primary)]" />,
            whatsapp: <FaWhatsapp className="text-xl text-[var(--accent-success)]" />,
            location: <FaMapMarkerAlt className="text-xl text-[var(--accent-danger)]" />,
          }

          return (
            <div key={item.icon} className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--bg-tertiary)]">
                {iconMap[item.icon as keyof typeof iconMap]}
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
                {Array.isArray(item.content) ? (
                  item.content.map((line) => (
                    <p
                      key={`${item.icon}-${line}`}
                      className="text-sm text-[var(--text-secondary)]"
                    >
                      {line}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-[var(--text-secondary)]">{item.content}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] p-4">
        <p className="text-center text-sm text-[var(--text-secondary)]">
          <span className="font-semibold">Horário de Atendimento:</span> {contactInfo.schedule}
        </p>
      </div>
    </div>
  )
}
