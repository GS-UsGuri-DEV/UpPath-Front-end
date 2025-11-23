export interface Dica {
  tipo: 'frase' | 'pratica' | 'motivacional'
  categoria: 'sono' | 'estresse' | 'motivacao'
  conteudo: string
}

export interface NiveisBemEstar {
  sono: number
  estresse: number
  motivacao: number
}

export const DICAS_SONO: Dica[] = [
  // Frases rápidas
  {
    tipo: 'frase',
    categoria: 'sono',
    conteudo:
      'Seu corpo não é máquina: menos de 7h de sono merecem um pouco mais de carinho hoje. Vá com calma.',
  },
  {
    tipo: 'frase',
    categoria: 'sono',
    conteudo:
      'Dormir pouco não é fraqueza, é um sinal do corpo. Que tal planejar um horário de descanso melhor pra hoje?',
  },
  {
    tipo: 'frase',
    categoria: 'sono',
    conteudo:
      'Seu cérebro aprende melhor quando descansa. Priorizar sono também é investir na sua carreira.',
  },
  {
    tipo: 'frase',
    categoria: 'sono',
    conteudo:
      'Você não precisa render 100% todos os dias. Hoje pode ser um dia de ritmo mais leve.',
  },
  {
    tipo: 'frase',
    categoria: 'sono',
    conteudo:
      'Se você está cansado, o descanso faz parte do progresso, não é o oposto dele.',
  },
  // Dicas práticas
  {
    tipo: 'pratica',
    categoria: 'sono',
    conteudo:
      'Hoje, tente dormir 30 minutos mais cedo que o normal. Um pequeno ajuste já faz diferença.',
  },
  {
    tipo: 'pratica',
    categoria: 'sono',
    conteudo:
      'Faça uma pausa de 5 minutos longe das telas: alongue o pescoço, respire fundo e tome água.',
  },
  {
    tipo: 'pratica',
    categoria: 'sono',
    conteudo:
      'Evite telas fortes pelo menos 20 minutos antes de dormir. Seu cérebro agradece.',
  },
  {
    tipo: 'pratica',
    categoria: 'sono',
    conteudo:
      'Se possível, faça uma mini-sesta de 10 a 20 minutos durante o dia (sem culpa!).',
  },
  {
    tipo: 'pratica',
    categoria: 'sono',
    conteudo:
      'Escolha uma tarefa simples para fazer agora e deixe as mais complexas para quando estiver mais descansado.',
  },
  // Textos motivacionais
  {
    tipo: 'motivacional',
    categoria: 'sono',
    conteudo:
      'Você dormiu menos do que o ideal, e isso impacta seu foco, memória e humor. Em vez de se cobrar produtividade máxima, faça um acordo consigo mesmo: hoje você vai dar o seu melhor dentro do que é possível, e em troca vai cuidar melhor do seu descanso mais tarde. Progresso também é aprender a respeitar seus limites.',
  },
  {
    tipo: 'motivacional',
    categoria: 'sono',
    conteudo:
      'Seu corpo está pedindo pausa. Você não precisa provar nada pra ninguém hoje. Ajuste o ritmo, faça pequenos blocos de estudo ou trabalho e se recompense com um momento de descanso real depois. Cuidar do sono é uma forma poderosa de acelerar seus resultados no longo prazo.',
  },
]

export const DICAS_ESTRESSE: Dica[] = [
  // Frases rápidas
  {
    tipo: 'frase',
    categoria: 'estresse',
    conteudo:
      'Seu nível de estresse está alto. Antes de continuar, você merece um respiro.',
  },
  {
    tipo: 'frase',
    categoria: 'estresse',
    conteudo:
      'Estresse alto não significa que você é fraco, significa que você está sobrecarregado. Vamos aliviar um pouco?',
  },
  {
    tipo: 'frase',
    categoria: 'estresse',
    conteudo:
      'Você não precisa carregar tudo sozinho. Um passo de cada vez já é suficiente.',
  },
  {
    tipo: 'frase',
    categoria: 'estresse',
    conteudo:
      'Respirar fundo por 1 minuto pode não resolver tudo, mas ajuda você a voltar pro eixo.',
  },
  {
    tipo: 'frase',
    categoria: 'estresse',
    conteudo: 'Pausa não é abandono. É estratégia pra continuar melhor.',
  },
  // Dicas práticas
  {
    tipo: 'pratica',
    categoria: 'estresse',
    conteudo:
      'Pare por 2 minutos e faça: inspire pelo nariz em 4 segundos, segure 4, solte pela boca em 6. Repita 5 vezes.',
  },
  {
    tipo: 'pratica',
    categoria: 'estresse',
    conteudo:
      'Escolha apenas uma tarefa importante agora e ignore o resto por alguns minutos. Foco reduz o peso mental.',
  },
  {
    tipo: 'pratica',
    categoria: 'estresse',
    conteudo:
      'Se possível, levante da cadeira, dê alguns passos, alongue ombros e pescoço por 1–2 minutos.',
  },
  {
    tipo: 'pratica',
    categoria: 'estresse',
    conteudo:
      'Anote em uma lista tudo que está te preocupando. Tirar da cabeça e colocar no papel já alivia.',
  },
  {
    tipo: 'pratica',
    categoria: 'estresse',
    conteudo:
      'Envie uma mensagem para alguém de confiança ou dê um oi rápido: conexão humana ajuda a regular o estresse.',
  },
  // Textos motivacionais
  {
    tipo: 'motivacional',
    categoria: 'estresse',
    conteudo:
      'Seu estresse está alto e isso é um sinal importante, não um defeito. Em vez de se forçar a continuar no automático, faça uma pequena pausa consciente. Respire, organize seus próximos passos e lembre: você não precisa resolver tudo hoje. Um pouco de gentileza consigo mesmo agora vai te deixar mais forte para seguir em frente.',
  },
  {
    tipo: 'motivacional',
    categoria: 'estresse',
    conteudo:
      'Estar sobrecarregado não significa que você está falhando, significa que você foi longe demais sem pausa. Permita-se reduzir a marcha: diminua o ritmo, priorize o essencial e dê espaço para o seu corpo e sua mente se reequilibrarem. Você não precisa ser perfeito, só consistente – e consistência só existe com cuidado.',
  },
]

export const DICAS_MOTIVACAO: Dica[] = [
  // Frases rápidas
  {
    tipo: 'frase',
    categoria: 'motivacao',
    conteudo:
      'Motivação baixa não impede o progresso. Hoje o foco é: pequenos passos.',
  },
  {
    tipo: 'frase',
    categoria: 'motivacao',
    conteudo:
      'Você não precisa estar 100% motivado para começar, só precisa dar o primeiro mini passo.',
  },
  {
    tipo: 'frase',
    categoria: 'motivacao',
    conteudo:
      'Tudo bem não estar empolgado sempre. Disciplina gentil também conta.',
  },
  {
    tipo: 'frase',
    categoria: 'motivacao',
    conteudo:
      'Quando a motivação está baixa, reduza o tamanho da tarefa, não o tamanho do seu sonho.',
  },
  {
    tipo: 'frase',
    categoria: 'motivacao',
    conteudo:
      'Seu valor não depende do quanto você produz hoje. Um avanço mínimo já é vitória.',
  },
  // Dicas práticas
  {
    tipo: 'pratica',
    categoria: 'motivacao',
    conteudo:
      'Quebre a tarefa em algo de 5 a 10 minutos. Faça só essa parte e depois se permita decidir se continua.',
  },
  {
    tipo: 'pratica',
    categoria: 'motivacao',
    conteudo:
      'Relembre por que você começou essa jornada. Escreva em uma frase seu objetivo principal.',
  },
  {
    tipo: 'pratica',
    categoria: 'motivacao',
    conteudo:
      'Escolha uma atividade bem simples (ler 1 página, ver 1 vídeo curto, revisar 1 conceito) e marque como concluída.',
  },
  {
    tipo: 'pratica',
    categoria: 'motivacao',
    conteudo:
      'Use uma recompensa pequena: depois de terminar esse mini bloco, faça algo que você gosta (café, música, alongar).',
  },
  {
    tipo: 'pratica',
    categoria: 'motivacao',
    conteudo:
      'Se hoje estiver muito difícil, transforme o dia em dia de manutenção, não de alta performance: revisar, organizar, planejar.',
  },
  // Textos motivacionais
  {
    tipo: 'motivacional',
    categoria: 'motivacao',
    conteudo:
      'Nem todo dia vai ser épico, e tudo bem. Hoje talvez você não esteja se sentindo muito motivado, mas isso não apaga o quanto você já caminhou. Em dias assim, a estratégia é simples: diminuir o tamanho do passo, não desistir do caminho. O que você pode fazer agora em 5 minutos que te aproxima, mesmo que um pouquinho, do seu objetivo?',
  },
  {
    tipo: 'motivacional',
    categoria: 'motivacao',
    conteudo:
      'Motivação é como bateria: algumas horas está cheia, outras nem tanto. Em vez de se culpar, trate seu dia com mais gentileza. Foque em tarefas pequenas, comemore o mínimo progresso e lembre: grandes conquistas nascem de pequenas ações repetidas em dias bons e ruins.',
  },
]
