import GamificationCard from '../../components/BemEstar/GamificationCard'

export default function Home() {
  return (
    <div className="space-y-6">
      <GamificationCard />
      <section className="rounded-xl border bg-white p-4">
        <h3 className="font-semibold">Bem-vindo</h3>
        <p className="text-sm text-gray-600">
          Painel inicial — aqui você pode colocar atalhos, novidades ou widgets.
        </p>
      </section>
    </div>
  )
}
