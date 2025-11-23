import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import MembroCard from './MembroCard';
import type { CarrosselIntegrantesProps } from '../../types/member';
import CarrosselBase from './CarrosselBase';

export default function CarrosselIntegrantes({
  members,
  title,
  autoMs = 8000,
  showControls = true,
  showIndicators = true,
  className,
}: CarrosselIntegrantesProps) {
  if (!members.length) return null;

  return (
    <section aria-label={title || 'Integrantes'} className={className}>
      {title && (
        <h2 className='text-center text-xl sm:text-2xl font-bold text-fontPrimary mb-4'>{title}</h2>
      )}

      <div className='relative max-w-[900px] mx-auto'>
        <CarrosselBase
          total={members.length}
          autoMs={autoMs}
          renderItem={(i) => (
            <ul className='list-none p-0 m-0 flex justify-center'>
              <MembroCard member={members[i]} />
            </ul>
          )}
          renderControls={(api) => {
            const { prev, next, total } = api;
            if (!(showControls && total > 1)) return null;

            return (
              <>
                <button
                  type='button'
                  aria-label='Anterior'
                  onClick={prev}
                    className='
                    hidden lg:inline-flex
                    absolute top-1/2 -translate-y-1/2 left-3 xl:left-4
                    z-20 items-center justify-center
                    w-10 h-10 xl:w-12 xl:h-12
                    rounded-full bg-gray-800 dark:bg-backBtn text-white shadow
                    hover:bg-hoverBtn
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-backBtn/60
                  '
                >
                  <IoIosArrowBack className='text-lg xl:text-xl' />
                </button>

                <button
                  type='button'
                  aria-label='Próximo'
                  onClick={next}
                  className='
                    hidden lg:inline-flex
                    absolute top-1/2 -translate-y-1/2 right-3 xl:right-4
                    z-20 items-center justify-center
                    w-10 h-10 xl:w-12 xl:h-12
                    rounded-full bg-gray-800 dark:bg-backBtn text-white shadow
                    hover:bg-hoverBtn
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-backBtn/60
                  '
                >
                  <IoIosArrowForward className='text-lg xl:text-xl' />
                </button>
              </>
            );
          }}
          renderIndicators={(api) => {
            const { goTo, index, total } = api;
            if (!(showIndicators && total > 1)) return null;

            const wrap = (n: number) => (n + total) % total;

            return (
              <div className='mt-4 lg:mt-6 flex flex-col items-center gap-3'>
                {/* botões abaixo do card apenas em <lg */}
                <div className='flex lg:hidden items-center justify-center gap-6'>
                  <button
                    type='button'
                    aria-label='Anterior'
                    onClick={() => goTo(wrap(index - 1))}
                    className='
                      inline-flex items-center justify-center
                      w-9 h-9 rounded-full bg-black dark:bg-backBtn text-white shadow
                      hover:bg-hoverBtn
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-backBtn/60
                    '
                  >
                    <IoIosArrowBack className='text-base' />
                  </button>

                  <button
                    type='button'
                    aria-label='Próximo'
                    onClick={() => goTo(wrap(index + 1))}
                    className='
                      inline-flex items-center justify-center
                      w-9 h-9 rounded-full bg-black dark:bg-backBtn text-white shadow
                      hover:bg-hoverBtn
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-backBtn/60
                    '
                  >
                    <IoIosArrowForward className='text-base' />
                  </button>
                </div>

                {/* bolinhas (sempre visíveis) */}
                <div
                  className='flex items-center justify-center gap-2 sm:gap-3 md:gap-4'
                  role='tablist'
                >
                  {Array.from({ length: total }).map((_, i) => (
                    <button
                      key={i}
                      type='button'
                      role='tab'
                      aria-label={`Ir ao passo ${i + 1}`}
                      aria-selected={i === index}
                      onClick={() => goTo(i)}
                      className={[
                          'rounded-full transition',
                          'h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5',
                          i === index
                            ? 'bg-gray-800 dark:bg-backBtn ring-2 ring-gray-300 dark:ring-fontPrimary'
                            : 'bg-gray-300 hover:bg-gray-400',
                        ].join(' ')}
                    />
                  ))}
                </div>
              </div>
            );
          }}
        />
      </div>
    </section>
  );
}
