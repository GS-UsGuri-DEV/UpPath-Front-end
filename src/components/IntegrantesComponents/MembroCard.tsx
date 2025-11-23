import type { MembroCardProps } from '../../types/member';
import { mapMemberSocialNetworks } from '../../utils/socialNetworks';
import MembroAvatar from './MembroAvatar';
import MembrosSocial from './MembrosSocial';

export default function MembroCard({ member, className = '' }: MembroCardProps) {
  const { name, rm, class: memberClass, img, description } = member;
  const socialNetworks = mapMemberSocialNetworks(member);
  return (
    <article
      className={[
        'w-full max-w-[700px]',
        'mb-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6',
        'shadow-[0_4px_12px_rgba(0,0,0,0.1)]',
        'box-border animate-fade',
        className,
      ].join(' ')}
    >
      <header
        className='
          flex flex-col md:flex-row
          items-center md:items-start          
          justify-center md:justify-between    
          gap-4 sm:gap-5
          text-center md:text-left              
        '
      >
        <MembroAvatar
          src={img}
          alt={`Foto de ${name}`}
          className='w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto md:mx-0'
        />

        <div className='flex-1 w-full flex flex-col items-center md:items-start gap-1.5 md:gap-2'>
          <h3 className='m-0 text-xl sm:text-2xl lg:text-[26px] font-bold text-fontPrimary'>
            {name}
          </h3>

          <div className='inline-flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm sm:text-base text-fontSecondary'>
            <span>{rm}</span>
            {memberClass && <span>{memberClass}</span>}
          </div>

          {socialNetworks.length > 0 && (
            <div className='mt-2 flex justify-center md:justify-start'>
              <MembrosSocial socials={socialNetworks} />
            </div>
          )}
        </div>
      </header>

      {description && (
        <div className='mt-4 sm:mt-5'>
          <p className='mb-0 text-[15px] sm:text-base font-bold text-fontPrimary text-center md:text-justify'>
            {description}
          </p>
        </div>
      )}
    </article>
  );
}
