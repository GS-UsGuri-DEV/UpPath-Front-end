import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import type { CarrosselIntegrantesProps } from '../../types/member'
import CarrosselBase from './CarrosselBase'
import MembroCard from './MembroCard'

export default function CarrosselIntegrantes({
  members,
  title,
  autoMs = 8000,
  showControls = true,
  showIndicators = true,
  className,
}: CarrosselIntegrantesProps) {
  if (!members.length) {
    return null
  }

  return (
    <section aria-label={title || 'Integrantes'} className={className}>
      {title && (
        <h2 className="text-fontPrimary mb-4 text-center text-xl font-bold sm:text-2xl">{title}</h2>
      )}

      <div className="relative mx-auto max-w-[900px]">
        <CarrosselBase
          total={members.length}
          autoMs={autoMs}
          renderItem={(i) => {
            const member = members[i]
            if (!member) {
              return null
            }
            return (
              <ul className="m-0 flex list-none justify-center p-0">
                <MembroCard member={member} />
              </ul>
            )
          }}
          renderControls={(api) => {
            const { prev, next, total } = api
            if (!(showControls && total > 1)) {
              return null
            }

            return (
              <>
                <button
                  type="button"
                  aria-label="Anterior"
                  onClick={prev}
                  className="dark:bg-backBtn hover:bg-hoverBtn focus:ring-backBtn/60 absolute top-1/2 left-3 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-800 text-white shadow focus:ring-2 focus:ring-offset-2 focus:outline-none lg:inline-flex xl:left-4 xl:h-12 xl:w-12"
                >
                  <IoIosArrowBack className="text-lg xl:text-xl" />
                </button>

                <button
                  type="button"
                  aria-label="Próximo"
                  onClick={next}
                  className="dark:bg-backBtn hover:bg-hoverBtn focus:ring-backBtn/60 absolute top-1/2 right-3 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-800 text-white shadow focus:ring-2 focus:ring-offset-2 focus:outline-none lg:inline-flex xl:right-4 xl:h-12 xl:w-12"
                >
                  <IoIosArrowForward className="text-lg xl:text-xl" />
                </button>
              </>
            )
          }}
          renderIndicators={(api) => {
            const { goTo, index, total } = api
            if (!(showIndicators && total > 1)) {
              return null
            }

            const wrap = (n: number) => (n + total) % total

            return (
              <div className="mt-4 flex flex-col items-center gap-3 lg:mt-6">
                {/* botões abaixo do card apenas em <lg */}
                <div className="flex items-center justify-center gap-6 lg:hidden">
                  <button
                    type="button"
                    aria-label="Anterior"
                    onClick={() => goTo(wrap(index - 1))}
                    className="dark:bg-backBtn hover:bg-hoverBtn focus:ring-backBtn/60 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  >
                    <IoIosArrowBack className="text-base" />
                  </button>

                  <button
                    type="button"
                    aria-label="Próximo"
                    onClick={() => goTo(wrap(index + 1))}
                    className="dark:bg-backBtn hover:bg-hoverBtn focus:ring-backBtn/60 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  >
                    <IoIosArrowForward className="text-base" />
                  </button>
                </div>

                {/* bolinhas (sempre visíveis) */}
                <div
                  className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4"
                  role="tablist"
                >
                  {Array.from({ length: total }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-label={`Ir ao passo ${i + 1}`}
                      aria-selected={i === index}
                      onClick={() => goTo(i)}
                      className={[
                        'rounded-full transition',
                        'h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5',
                        i === index
                          ? 'dark:bg-backBtn dark:ring-fontPrimary bg-gray-800 ring-2 ring-gray-300'
                          : 'bg-gray-300 hover:bg-gray-400',
                      ].join(' ')}
                    />
                  ))}
                </div>
              </div>
            )
          }}
        />
      </div>
    </section>
  )
}
