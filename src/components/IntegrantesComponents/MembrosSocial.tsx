import type { MembrosSocialProps } from '../../types/member'
import BtnExterno from '../Buttons/BtnExterno'

export default function MembrosSocial({ socials }: MembrosSocialProps) {
  return (
    <div className="mt-2 flex gap-3 sm:gap-4">
      {socials.map((s) => (
        <BtnExterno
          key={s.alt}
          href={s.href}
          target="_blank"
          className="!hover:bg-transparent !bg-transparent !p-0 focus:!outline-none"
          aria-label={s.alt}
        >
          <img
            src={s.icon}
            alt={s.alt}
            className="h-8 w-8 transition-transform duration-300 hover:scale-110 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 xl:h-12 xl:w-12"
          />
        </BtnExterno>
      ))}
    </div>
  )
}
