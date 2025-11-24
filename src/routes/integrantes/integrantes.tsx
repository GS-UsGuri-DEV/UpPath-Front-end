import { members } from '../../data/membersData'
import CarrosselIntegrantes from '../../components/IntegrantesComponents/CarrosselIntegrantes'
import { useEffect } from 'react'

export default function Integrantes() {
  useEffect(() => {
    document.title = 'Integrantes'
  }, [])
  return (
    <main
      className="container mx-auto px-4 py-30"
      aria-label="Integrantes do projeto Luma"
    >
      <CarrosselIntegrantes
        members={members}
        autoMs={8000}
        showControls
        showIndicators
      />
    </main>
  )
}
