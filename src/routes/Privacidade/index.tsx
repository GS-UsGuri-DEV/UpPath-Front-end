import { FaCheckCircle, FaShieldAlt } from 'react-icons/fa'
import Footer from '../../components/Footer/Footer'

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-green-600 to-emerald-600 p-4">
              <FaShieldAlt className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="mb-3 text-4xl font-bold text-[var(--text-primary)]">
            Política de Privacidade
          </h1>
          <p className="text-[var(--text-muted)]">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Seção 1 */}
          <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-green-600" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                1. Informações que Coletamos
              </h2>
            </div>
            <div className="space-y-3 leading-relaxed text-[var(--text-secondary)]">
              <p>A UpPath coleta as seguintes informações:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Informações de Cadastro:</strong> Nome, email, data de nascimento,
                  ocupação, nível de carreira e gênero
                </li>
                <li>
                  <strong>Dados de Bem-estar:</strong> Níveis de estresse, motivação, qualidade do
                  sono e observações pessoais
                </li>
                <li>
                  <strong>Dados de Uso:</strong> Informações sobre como você usa a plataforma,
                  cursos acessados e progresso
                </li>
                <li>
                  <strong>Dados Técnicos:</strong> Endereço IP, tipo de navegador, páginas visitadas
                  e tempo de acesso
                </li>
              </ul>
            </div>
          </section>

          {/* Seção 2 */}
          <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-green-600" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                2. Como Usamos suas Informações
              </h2>
            </div>
            <div className="space-y-3 leading-relaxed text-[var(--text-secondary)]">
              <p>Utilizamos suas informações para:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Fornecer e personalizar trilhas de aprendizado</li>
                <li>Monitorar e melhorar seu bem-estar profissional</li>
                <li>Gerar recomendações personalizadas de cursos e recursos</li>
                <li>Enviar notificações sobre atualizações e novos recursos</li>
                <li>Melhorar a experiência geral da plataforma</li>
                <li>Análise de dados agregados para insights sobre bem-estar corporativo</li>
              </ul>
            </div>
          </section>

          {/* Seção 3 */}
          <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-green-600" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                3. Compartilhamento de Dados
              </h2>
            </div>
            <div className="space-y-3 leading-relaxed text-[var(--text-secondary)]">
              <p>A UpPath pode compartilhar suas informações nas seguintes situações:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Com sua Empresa:</strong> Se você foi cadastrado por uma empresa, dados
                  agregados e anônimos sobre bem-estar podem ser compartilhados com o RH
                </li>
                <li>
                  <strong>Prestadores de Serviço:</strong> Com fornecedores terceirizados que nos
                  ajudam a operar a plataforma (hospedagem, análise, etc.)
                </li>
                <li>
                  <strong>Requisitos Legais:</strong> Quando exigido por lei ou para proteger nossos
                  direitos
                </li>
              </ul>
              <p className="mt-4 font-semibold">
                Nunca vendemos suas informações pessoais a terceiros.
              </p>
            </div>
          </section>

          {/* Seção 4 */}
          <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-green-600" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                4. Segurança dos Dados
              </h2>
            </div>
            <div className="space-y-3 leading-relaxed text-[var(--text-secondary)]">
              <p>Implementamos medidas de segurança para proteger suas informações:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controle de acesso rigoroso aos dados pessoais</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Auditorias regulares de segurança</li>
              </ul>
              <p className="mt-4">
                No entanto, nenhum método de transmissão pela Internet é 100% seguro, e não podemos
                garantir segurança absoluta.
              </p>
            </div>
          </section>

          {/* Seção 5 */}
          <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-green-600" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                5. Seus Direitos (LGPD)
              </h2>
            </div>
            <div className="space-y-3 leading-relaxed text-[var(--text-secondary)]">
              <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Confirmar a existência de tratamento de dados pessoais</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
                <li>Solicitar a portabilidade de dados</li>
                <li>Revogar consentimento a qualquer momento</li>
              </ul>
              <p className="mt-4">
                Para exercer esses direitos, entre em contato através da página de{' '}
                <a href="/contato" className="text-green-600 hover:underline">
                  Contato
                </a>
                .
              </p>
            </div>
          </section>

          {/* Seção 6 */}
          <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-green-600" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">6. Cookies</h2>
            </div>
            <p className="leading-relaxed text-[var(--text-secondary)]">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o
              uso da plataforma e personalizar conteúdo. Você pode configurar seu navegador para
              recusar cookies, mas isso pode afetar algumas funcionalidades da plataforma.
            </p>
          </section>

          {/* Seção 7 */}
          <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-green-600" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                7. Alterações na Política
              </h2>
            </div>
            <p className="leading-relaxed text-[var(--text-secondary)]">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre
              mudanças significativas através da plataforma ou por email. Recomendamos revisar esta
              página regularmente.
            </p>
          </section>

          {/* Seção 8 */}
          <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-green-600" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">8. Contato</h2>
            </div>
            <p className="leading-relaxed text-[var(--text-secondary)]">
              Para questões sobre esta Política de Privacidade ou sobre o tratamento de seus dados,
              entre em contato conosco através da página de{' '}
              <a href="/contato" className="text-green-600 hover:underline">
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
