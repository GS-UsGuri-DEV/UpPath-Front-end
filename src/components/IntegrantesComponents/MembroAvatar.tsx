import type { MembroAvatarProps } from '../../types/member'

export default function MembroAvatar({ src, alt, className = '' }: MembroAvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={[
        'h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 xl:h-40 xl:w-40',
        'shrink-0 rounded-full object-cover',
        className,
      ].join(' ')}
      loading="lazy"
    />
  )
}
