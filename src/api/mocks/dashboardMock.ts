import type { UserDashboard } from '../../types/userDashboard'

export const mockDashboardData: UserDashboard = {
  id_usuario: 1,
  bem_estar: [
    {
      data_registro: '2025-01-10T10:00:00',
      nivel_estresse: 7,
      nivel_motivacao: 6,
      qualidade_sono: 5,
    },
    {
      data_registro: '2025-01-11T10:00:00',
      nivel_estresse: 6,
      nivel_motivacao: 7,
      qualidade_sono: 6,
    },
    {
      data_registro: '2025-01-12T10:00:00',
      nivel_estresse: 5,
      nivel_motivacao: 8,
      qualidade_sono: 7,
    },
    {
      data_registro: '2025-01-13T10:00:00',
      nivel_estresse: 4,
      nivel_motivacao: 8,
      qualidade_sono: 8,
    },
    {
      data_registro: '2025-01-14T10:00:00',
      nivel_estresse: 3,
      nivel_motivacao: 9,
      qualidade_sono: 8,
    },
    {
      data_registro: '2025-01-15T10:00:00',
      nivel_estresse: 4,
      nivel_motivacao: 8,
      qualidade_sono: 7,
    },
    {
      data_registro: '2025-01-16T10:00:00',
      nivel_estresse: 5,
      nivel_motivacao: 7,
      qualidade_sono: 6,
    },
  ],
  trilhas: [
    {
      nome_trilha: 'React Avançado',
      progresso_percentual: 75,
      status: 'Em andamento',
    },
    {
      nome_trilha: 'TypeScript Pro',
      progresso_percentual: 45,
      status: 'Em andamento',
    },
    {
      nome_trilha: 'Node.js Backend',
      progresso_percentual: 90,
      status: 'Quase concluído',
    },
  ],
  recomendacoes: [
    {
      tipo: 'Curso',
      id_referencia: 123,
      motivo: 'Baseado no seu perfil de desenvolvimento',
      data_recomendacao: '2025-01-15T14:30:00',
    },
    {
      tipo: 'Artigo',
      id_referencia: 456,
      motivo: 'Tendências de tecnologia 2025',
      data_recomendacao: '2025-01-14T09:00:00',
    },
    {
      tipo: 'Trilha',
      id_referencia: 789,
      motivo: 'Complementa suas habilidades atuais',
      data_recomendacao: '2025-01-13T16:00:00',
    },
  ],
}
