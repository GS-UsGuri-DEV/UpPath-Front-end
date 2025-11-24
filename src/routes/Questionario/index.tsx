import { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import SuccessMessage from '../../components/SuccessMessage'
import type { QuestionarioData } from '../../types/quest'
import BemEstarEquilibrio from './steps/BemEstarEquilibrio'
import DadosBasicos from './steps/DadosBasicos'
import EstiloAprendizado from './steps/EstiloAprendizado'
import ObjetivosCarreira from './steps/ObjetivosCarreira'
import PerfilProfissional from './steps/PerfilProfissional'
import PreferenciasTrabalho from './steps/PreferenciasTrabalho'
import UsoPlataforma from './steps/UsoPlataforma'

export default function Questionario() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const totalSteps = 7

  const [formData, setFormData] = useState<QuestionarioData>({
    // Etapa 1: Dados Básicos
    momentoAtual: '',
    areaFormacao: '',
    atuaNaArea: '',
    // Etapa 2: Perfil Profissional
    nivelExperiencia: '',
    modalidadesTrabalho: [],
    tecnologias: [],
    competenciasTecnicas: '',
    // Etapa 3: Objetivos de Carreira
    objetivoPrincipal: '',
    areasInteresse: [],
    areasInteresseOutra: '',
    valoresCarreira: [],
    // Etapa 4: Estilo de Aprendizado
    preferenciasAprendizado: [],
    tempoDisponivel: '',
    horariosEstudo: [],
    intensidadeTrilha: '',
    // Etapa 5: Preferências de Trabalho
    modeloTrabalho: '',
    tipoEmpresa: '',
    tipoEquipe: '',
    desmotivadores: '',
    // Etapa 6: Bem-Estar e Equilíbrio
    nivelBemEstar: '',
    frequenciaSobrecarga: '',
    situacoesDiarias: [],
    apoioDesejado: [],
    // Etapa 7: Uso da Plataforma
    plataformasUsadas: '',
    faltasPlataformas: [],
    faltasPlataformasOutra: '',
    resultadoSucesso: '',
    recomendacoesPor: [],
  })

  const updateFormData = (data: Partial<QuestionarioData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = () => {
    // Aqui você pode enviar os dados para o backend
    // Dados do questionário processados
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      navigate('/login')
    }, 1800)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DadosBasicos data={formData} updateData={updateFormData} />
      case 2:
        return <PerfilProfissional data={formData} updateData={updateFormData} />
      case 3:
        return <ObjetivosCarreira data={formData} updateData={updateFormData} />
      case 4:
        return <EstiloAprendizado data={formData} updateData={updateFormData} />
      case 5:
        return <PreferenciasTrabalho data={formData} updateData={updateFormData} />
      case 6:
        return <BemEstarEquilibrio data={formData} updateData={updateFormData} />
      case 7:
        return <UsoPlataforma data={formData} updateData={updateFormData} />
      default:
        return <DadosBasicos data={formData} updateData={updateFormData} />
    }
  }

  const getStepColor = (index: number, current: number) => {
    if (index + 1 === current) {
      return 'w-8 bg-indigo-600'
    }
    if (index + 1 < current) {
      return 'bg-indigo-400'
    }
    return 'bg-gray-300 dark:bg-gray-600'
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-4 sm:py-8">
      {showSuccess && (
        <SuccessMessage
          message="Questionário finalizado com sucesso!"
          onClose={() => setShowSuccess(false)}
        />
      )}
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
            Personalize sua jornada
          </h1>
          <p className="text-[var(--text-muted)]">
            Responda algumas perguntas para criarmos a melhor experiência para você
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm text-[var(--text-muted)]">
            <span>
              Etapa {currentStep} de {totalSteps}
            </span>
            <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 rounded-lg bg-gray-300 px-6 py-3 font-semibold text-black transition-all hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
          >
            <FaArrowLeft />
            Voltar
          </button>

          <button
            onClick={currentStep === totalSteps ? handleFinish : nextStep}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:from-indigo-700 hover:to-purple-700"
          >
            {currentStep === totalSteps ? 'Finalizar' : 'Próximo'}
            <FaArrowRight />
          </button>
        </div>

        {/* Steps Indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${getStepColor(index, currentStep)}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
