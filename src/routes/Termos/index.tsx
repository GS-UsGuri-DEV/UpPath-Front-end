import { FaCheckCircle, FaFileContract } from 'react-icons/fa'
import Footer from '../../components/Footer/Footer'

export default function Termos() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 p-4">
              <FaFileContract className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="mb-3 text-4xl font-bold text-[var(--text-primary)]">Termos de Uso</h1>
          <p className="text-[var(--text-muted)]">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Seção 1 */}
          <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-indigo-600" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                1. Aceitação dos Termos
              </h2>
            </div>
            <p className="leading-relaxed text-[var(--text-secondary)]">
              Ao acessar e usar a plataforma UpPath, você concorda em cumprir e estar vinculado aos
              seguintes termos e condições de uso. Se você não concorda com estes termos, por favor,
              não utilize nossa plataforma.
            </p>
          </section>

          {/* Seção 2 */}
          <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-indigo-600" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                2. Uso da Plataforma
              </h2>
            </div>
            <div className="space-y-3 leading-relaxed text-[var(--text-secondary)]">
              <p>A plataforma UpPath oferece:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Trilhas de aprendizado personalizadas para desenvolvimento profissional</li>
                <li>Dashboard de bem-estar e acompanhamento de progresso</li>
                <li>Cursos e recursos educacionais</li>
                <li>Ferramentas de gamificação para engajamento</li>
              </ul>
              <p className="mt-4">
                Você concorda em usar a plataforma apenas para fins legais e de acordo com todas as
                leis aplicáveis.
              </p>
            </div>
          </section>

          {/* Seção 3 */}
          <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-indigo-600" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">3. Conta de Usuário</h2>
            </div>
            <div className="space-y-3 leading-relaxed text-[var(--text-secondary)]">
              <p>Para acessar certos recursos da plataforma, você deve:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Criar uma conta fornecendo informações precisas e completas</li>
                <li>Manter a confidencialidade de sua senha</li>
                <li>Notificar-nos imediatamente sobre qualquer uso não autorizado da sua conta</li>
                <li>Ser responsável por todas as atividades que ocorrem em sua conta</li>
              </ul>
            </div>
          </section>

          {/* Seção 4 */}
          <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-indigo-600" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                4. Propriedade Intelectual
              </h2>
            </div>
            <p className="leading-relaxed text-[var(--text-secondary)]">
              Todo o conteúdo da plataforma UpPath, incluindo textos, gráficos, logotipos, ícones,
              imagens e software, é propriedade da UpPath ou de seus fornecedores de conteúdo e está
              protegido por leis de direitos autorais. Você não pode reproduzir, distribuir ou criar
              obras derivadas sem nossa permissão expressa por escrito.
            </p>
          </section>

          {/* Seção 5 */}
          <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-indigo-600" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                5. Limitação de Responsabilidade
              </h2>
            </div>
            <p className="leading-relaxed text-[var(--text-secondary)]">
              A UpPath não será responsável por quaisquer danos diretos, indiretos, incidentais,
              especiais ou consequenciais resultantes do uso ou da incapacidade de usar a
              plataforma. Fornecemos os serviços "como estão" e não garantimos que estarão livres de
              erros ou interrupções.
            </p>
          </section>

          {/* Seção 6 */}
          <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-indigo-600" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                6. Modificações dos Termos
              </h2>
            </div>
            <p className="leading-relaxed text-[var(--text-secondary)]">
              Reservamos o direito de modificar estes termos a qualquer momento. As alterações
              entrarão em vigor imediatamente após a publicação na plataforma. O uso continuado da
              plataforma após tais modificações constitui sua aceitação dos novos termos.
            </p>
          </section>

          {/* Seção 7 */}
          <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-indigo-600" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">7. Contato</h2>
            </div>
            <p className="leading-relaxed text-[var(--text-secondary)]">
              Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através da
              página de{' '}
              <a href="/contato" className="text-indigo-600 hover:underline">
                Contato
              </a>
              .
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
