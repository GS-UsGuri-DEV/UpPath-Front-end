export default function WelcomeSection() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Bem-vindo ao UpPath
      </h1>
      <p className="mb-8 text-gray-600">
        Acompanhe seu bem-estar e evolua todos os dias.
      </p>

      <section className="mb-6 rounded-xl border bg-white p-6">
        <h2 className="mb-2 text-xl font-semibold">O que é o UpPath?</h2>
        <p className="text-sm text-gray-700">
          UpPath é uma plataforma EduTech que combina inteligência artificial,
          gestão de carreira e bem-estar emocional para orientar o
          desenvolvimento profissional de forma personalizada e sustentável.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          A plataforma identifica lacunas de competência, recomenda trilhas de
          aprendizado adaptadas e monitora o equilíbrio emocional do usuário —
          tudo para apoiar crescimento técnico e humano.
        </p>
      </section>
    </>
  )
}
