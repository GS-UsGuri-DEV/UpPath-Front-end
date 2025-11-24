export type Curso = {
  id: number
  titulo: string
  descricao: string
  categoria: string
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado'
  duracao: string
  plataforma: string
  imagem: string
  tags: string[]
  progresso?: number
}

export type TrilhaCompleta = {
  id: number
  nome: string
  descricao: string
  categoria: string
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado'
  duracao_total: string
  num_cursos: number
  imagem: string
  cursos: Curso[]
  tags: string[]
  progresso?: number
}

export const categorias = [
  'Todas',
  'Desenvolvimento',
  'Design',
  'Data Science',
  'Business',
  'Soft Skills',
]

export const cursosDisponiveis: Curso[] = [
  {
    id: 1,
    titulo: 'React Avançado',
    descricao: 'Aprenda hooks avançados, performance optimization, e padrões de projeto no React.',
    categoria: 'Desenvolvimento',
    nivel: 'Avançado',
    duracao: '40 horas',
    plataforma: 'FIAP ON',
    imagem: '/images/cursos/react.jpg',
    tags: ['React', 'JavaScript', 'Frontend'],
    progresso: 75,
  },
  {
    id: 2,
    titulo: 'TypeScript Pro',
    descricao: 'Domine TypeScript com tipos avançados, generics, decorators e melhores práticas.',
    categoria: 'Desenvolvimento',
    nivel: 'Intermediário',
    duracao: '30 horas',
    plataforma: 'Alura',
    imagem: '/images/cursos/typescript.jpg',
    tags: ['TypeScript', 'JavaScript', 'Backend'],
    progresso: 45,
  },
  {
    id: 3,
    titulo: 'Node.js Backend',
    descricao: 'Construa APIs robustas com Node.js, Express, autenticação e banco de dados.',
    categoria: 'Desenvolvimento',
    nivel: 'Intermediário',
    duracao: '50 horas',
    plataforma: 'Coursera',
    imagem: '/images/cursos/nodejs.jpg',
    tags: ['Node.js', 'Backend', 'API'],
    progresso: 90,
  },
  {
    id: 4,
    titulo: 'UI/UX Design Fundamentals',
    descricao: 'Princípios de design, prototipagem, pesquisa com usuários e ferramentas Figma.',
    categoria: 'Design',
    nivel: 'Iniciante',
    duracao: '25 horas',
    plataforma: 'Udemy',
    imagem: '/images/cursos/uiux.jpg',
    tags: ['Design', 'UX', 'Figma'],
    progresso: 0,
  },
  {
    id: 5,
    titulo: 'Python para Data Science',
    descricao: 'Análise de dados com Pandas, NumPy, visualização com Matplotlib e Seaborn.',
    categoria: 'Data Science',
    nivel: 'Intermediário',
    duracao: '45 horas',
    plataforma: 'Coursera',
    imagem: '/images/cursos/python-ds.jpg',
    tags: ['Python', 'Data Science', 'ML'],
    progresso: 0,
  },
  {
    id: 6,
    titulo: 'Machine Learning Essentials',
    descricao: 'Algoritmos de ML, scikit-learn, regressão, classificação e clustering.',
    categoria: 'Data Science',
    nivel: 'Avançado',
    duracao: '60 horas',
    plataforma: 'FIAP ON',
    imagem: '/images/cursos/ml.jpg',
    tags: ['Machine Learning', 'Python', 'IA'],
    progresso: 0,
  },
  {
    id: 7,
    titulo: 'Liderança e Gestão de Equipes',
    descricao: 'Desenvolva habilidades de liderança, comunicação e gestão de conflitos.',
    categoria: 'Soft Skills',
    nivel: 'Intermediário',
    duracao: '20 horas',
    plataforma: 'LinkedIn Learning',
    imagem: '/images/cursos/lideranca.jpg',
    tags: ['Liderança', 'Soft Skills', 'Gestão'],
    progresso: 0,
  },
  {
    id: 8,
    titulo: 'Marketing Digital',
    descricao: 'SEO, redes sociais, Google Ads e estratégias de growth hacking.',
    categoria: 'Business',
    nivel: 'Iniciante',
    duracao: '35 horas',
    plataforma: 'Alura',
    imagem: '/images/cursos/marketing.jpg',
    tags: ['Marketing', 'Digital', 'SEO'],
    progresso: 0,
  },
]

export const trilhasDisponiveis: TrilhaCompleta[] = [
  {
    id: 1,
    nome: 'Desenvolvedor Full Stack',
    descricao:
      'Trilha completa para se tornar um desenvolvedor full stack, do frontend ao backend.',
    categoria: 'Desenvolvimento',
    nivel: 'Intermediário',
    duracao_total: '120 horas',
    num_cursos: 4,
    imagem: '/images/trilhas/fullstack.jpg',
    tags: ['Full Stack', 'JavaScript', 'React', 'Node.js'],
    cursos: [cursosDisponiveis[0], cursosDisponiveis[1], cursosDisponiveis[2]].filter(
      (c): c is Curso => c !== undefined,
    ),
    progresso: 65,
  },
  {
    id: 2,
    nome: 'Data Scientist',
    descricao: 'Torne-se um cientista de dados completo, desde análise até machine learning.',
    categoria: 'Data Science',
    nivel: 'Avançado',
    duracao_total: '150 horas',
    num_cursos: 5,
    imagem: '/images/trilhas/datascience.jpg',
    tags: ['Data Science', 'Python', 'ML', 'IA'],
    cursos: [cursosDisponiveis[4], cursosDisponiveis[5]].filter((c): c is Curso => c !== undefined),
    progresso: 30,
  },
  {
    id: 3,
    nome: 'Product Manager',
    descricao: 'Desenvolva habilidades essenciais para gerenciar produtos digitais de sucesso.',
    categoria: 'Business',
    nivel: 'Intermediário',
    duracao_total: '80 horas',
    num_cursos: 6,
    imagem: '/images/trilhas/product.jpg',
    tags: ['Product', 'Gestão', 'UX', 'Business'],
    cursos: [cursosDisponiveis[3], cursosDisponiveis[6], cursosDisponiveis[7]].filter(
      (c): c is Curso => c !== undefined,
    ),
  },
  {
    id: 4,
    nome: 'UX/UI Designer',
    descricao: 'Trilha completa de design de experiência e interface do usuário.',
    categoria: 'Design',
    nivel: 'Iniciante',
    duracao_total: '60 horas',
    num_cursos: 3,
    imagem: '/images/trilhas/uxui.jpg',
    tags: ['Design', 'UX', 'UI', 'Figma'],
    cursos: [cursosDisponiveis[3]].filter((c): c is Curso => c !== undefined),
  },
]
