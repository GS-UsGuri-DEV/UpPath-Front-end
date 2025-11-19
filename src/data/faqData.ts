export interface FAQItem {
  question: string
  answer: string
  category: string
}

export const faqData: FAQItem[] = [
  {
    category: 'PLATAFORMA',
    question: 'O que é o UpPath?',
    answer:
      'O UpPath é uma plataforma EduTech que une inteligência artificial, gestão de carreira e bem-estar emocional para guiar seu desenvolvimento profissional de forma personalizada e sustentável. Ajudamos você a identificar lacunas de competências e criar trilhas de aprendizado adaptadas às suas metas.',
  },
  {
    category: 'PLATAFORMA',
    question: 'Como o UpPath se diferencia de outras plataformas de cursos?',
    answer:
      'Enquanto outras plataformas apenas ofertam cursos, o UpPath vai além: combinamos tecnologia, IA e empatia para criar trilhas personalizadas baseadas no seu perfil profissional, além de monitorar seu bem-estar emocional durante todo o processo de aprendizado.',
  },
  {
    category: 'CONTA E ACESSO',
    question: 'Como criar uma conta no UpPath?',
    answer:
      'Clique em "Cadastro" no menu superior, preencha seus dados pessoais e profissionais, e confirme seu e-mail. Após isso, você terá acesso à plataforma e poderá começar a criar seu perfil profissional.',
  },
  {
    category: 'CONTA E ACESSO',
    question: 'Quais são os planos disponíveis?',
    answer:
      'Oferecemos três planos: Gratuito (perfil, trilhas sugeridas e check-ins emocionais), Premium Individual (relatórios completos, integração com plataformas de ensino e IA de bem-estar), e Corporativo (para empresas, com dashboards de clima emocional e desempenho da equipe).',
  },
  {
    category: 'TRILHAS DE APRENDIZADO',
    question: 'Como as trilhas de aprendizado são personalizadas?',
    answer:
      'Nossa IA analisa seu perfil profissional, identifica lacunas de competências e cruza com dados de mercado para sugerir trilhas customizadas que aceleram seu desenvolvimento e alinham com seus objetivos de carreira.',
  },
  {
    category: 'TRILHAS DE APRENDIZADO',
    question: 'Posso criar minha própria trilha personalizada?',
    answer:
      'Sim! Além das trilhas sugeridas pela IA, você pode criar trilhas 100% personalizadas selecionando cursos específicos de diferentes plataformas parceiras (Coursera, Alura, FIAP ON, etc.) que atendam suas necessidades.',
  },
  {
    category: 'TRILHAS DE APRENDIZADO',
    question: 'As trilhas incluem certificados?',
    answer:
      'As trilhas são compostas por cursos de nossas plataformas parceiras. Os certificados são emitidos pelas próprias plataformas de origem conforme você completa os cursos. O UpPath monitora seu progresso e mantém tudo organizado em um só lugar.',
  },
  {
    category: 'BEM-ESTAR EMOCIONAL',
    question: 'O que é o módulo de bem-estar emocional?',
    answer:
      'É uma ferramenta exclusiva que monitora seu nível de estresse, motivação e qualidade de sono. A IA oferece insights personalizados e sugere pausas ou ajustes no ritmo de aprendizado, reconhecendo que o desenvolvimento só é efetivo quando você está saudável e equilibrado.',
  },
  {
    category: 'BEM-ESTAR EMOCIONAL',
    question: 'Como funciona o sistema de gamificação?',
    answer:
      'Acompanhamos seu progresso diário através de check-ins emocionais e geramos um score de bem-estar. Você ganha badges (Ouro, Prata, Bronze) e mantém sequências (streaks) ao registrar consistentemente seu estado emocional, tornando o autocuidado mais engajador.',
  },
  {
    category: 'BEM-ESTAR EMOCIONAL',
    question: 'Meus dados de bem-estar são privados?',
    answer:
      'Sim, absolutamente. Seus dados emocionais são criptografados e usados apenas para gerar insights personalizados para você. Para planos corporativos, empresas recebem apenas dados agregados e anônimos sobre clima emocional da equipe.',
  },
  {
    category: 'EMPRESAS (B2B)',
    question: 'Como funciona o plano corporativo?',
    answer:
      'Empresas podem contratar pacotes para capacitar suas equipes. Oferecemos dashboards com análise de clima emocional, identificação de lacunas de competências, trilhas personalizadas por departamento e consultoria especializada para RH.',
  },
  {
    category: 'EMPRESAS (B2B)',
    question: 'O UpPath ajuda a prevenir burnout nas equipes?',
    answer:
      'Sim! Nosso módulo de bem-estar monitora indicadores emocionais da equipe e alerta gestores de RH sobre padrões de risco, permitindo ações preventivas. Também sugerimos pausas e recursos de apoio psicológico quando necessário.',
  },
]
