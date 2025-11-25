import { useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import CarrosselIntegrantes from '../../components/IntegrantesComponents/CarrosselIntegrantes'
import { members } from '../../data/membersData'

export default function Integrantes() {
  useEffect(() => {
    document.title = 'Integrantes'
  }, [])
  return (
    <>
      <main className="container mx-auto px-4 py-30" aria-label="Integrantes do projeto Luma">
        <CarrosselIntegrantes members={members} autoMs={8000} showControls showIndicators />
      </main>
      <Footer />
    </>
  )
}
