import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaHeadset,
} from 'react-icons/fa'
import { contactInfo, contactItems } from '../../data/contactData'

export default function ContactInfo() {
  return (
    <div className="rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-2 text-2xl font-bold text-indigo-600">
        {contactInfo.companyName}
      </h2>
      <p className="mb-6 text-sm text-gray-600">{contactInfo.tagline}</p>

      <div className="space-y-6">
        {contactItems.map((item, index) => {
          const iconMap = {
            email: <FaEnvelope className="text-xl text-indigo-600" />,
            support: <FaHeadset className="text-xl text-green-600" />,
            phone: <FaPhoneAlt className="text-xl text-blue-600" />,
            whatsapp: <FaWhatsapp className="text-xl text-green-500" />,
            location: <FaMapMarkerAlt className="text-xl text-red-600" />,
          }

          return (
            <div key={index} className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50">
                {iconMap[item.icon as keyof typeof iconMap]}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  {item.title}
                </p>
                {Array.isArray(item.content) ? (
                  item.content.map((line, i) => (
                    <p key={i} className="text-sm text-gray-600">
                      {line}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">{item.content}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
        <p className="text-center text-sm text-gray-700">
          <span className="font-semibold">Horário de Atendimento:</span>{' '}
          {contactInfo.schedule}
        </p>
      </div>
    </div>
  )
}
