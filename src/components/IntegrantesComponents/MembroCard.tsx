import type { MembroCardProps } from '../../types/member'
import { mapMemberSocialNetworks } from '../../utils/socialNetworks'
import MembroAvatar from './MembroAvatar'
import MembrosSocial from './MembrosSocial'

export default function MembroCard({
  member,
  className = '',
}: MembroCardProps) {
  const { name, rm, class: memberClass, img, description } = member
  const socialNetworks = mapMemberSocialNetworks(member)
  return (
    <article
      className={[
        'w-full max-w-[700px]',
        'mb-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6',
        'shadow-[0_4px_12px_rgba(0,0,0,0.1)]',
        'animate-fade box-border',
        className,
      ].join(' ')}
    >
      <header className="flex flex-col items-center justify-center gap-4 text-center sm:gap-5 md:flex-row md:items-start md:justify-between md:text-left">
        <MembroAvatar
          src={img}
          alt={`Foto de ${name}`}
          className="mx-auto h-28 w-28 sm:h-32 sm:w-32 md:mx-0 md:h-36 md:w-36"
        />

        <div className="flex w-full flex-1 flex-col items-center gap-1.5 md:items-start md:gap-2">
          <h3 className="text-fontPrimary m-0 text-xl font-bold sm:text-2xl lg:text-[26px]">
            {name}
          </h3>

          <div className="text-fontSecondary inline-flex flex-wrap items-center justify-center gap-4 text-sm sm:text-base md:justify-start">
            <span>{rm}</span>
            {memberClass && <span>{memberClass}</span>}
          </div>

          {socialNetworks.length > 0 && (
            <div className="mt-2 flex justify-center md:justify-start">
              <MembrosSocial socials={socialNetworks} />
            </div>
          )}
        </div>
      </header>

      {description && (
        <div className="mt-4 sm:mt-5">
          <p className="text-fontPrimary mb-0 text-center text-[15px] font-bold sm:text-base md:text-justify">
            {description}
          </p>
        </div>
      )}
    </article>
  )
}
