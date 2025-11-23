import { useEffect, useState, type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowRight, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import FormButton from '../../components/Form/FormButton'
import FormInput from '../../components/Form/FormInput'
import { useAuth } from '../../contexts/useAuth'
import { account } from '../../shared/appwrite'
import type { LoginFormData } from '../../types/auth'

export default function Login() {
  const [msg, setMsg] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMsg, setResetMsg] = useState('')
  const [resetSuccess, setResetSuccess] = useState(false)
  const nav = useNavigate()
  const { login } = useAuth()

  const { register, handleSubmit, formState, setValue, watch } =
    useForm<LoginFormData>({
      defaultValues: { email: '', password: '' },
    })
  const { errors } = formState
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  const emailValue = watch('email')
  const passwordValue = watch('password')

  function formatCPFOrEmail(value: string) {
    const raw = value.trim()

    if (/@/.test(raw) || /[A-Za-z]/.test(raw)) return raw

    const digits = raw.replace(/\D/g, '').slice(0, 11)
    if (digits.length === 0) return ''

    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const formatted = formatCPFOrEmail(e.target.value)
    setValue('email', formatted)
  }

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail')
    const savedPassword = localStorage.getItem('rememberedPassword')
    if (savedEmail && savedPassword) {
      setValue('email', savedEmail)
      setValue('password', savedPassword)
      setRemember(true)
    }
  }, [setValue])

  async function onSubmit(data: LoginFormData) {
    try {
      const loggedUserData = await login(data.email, data.password)

      if (remember) {
        localStorage.setItem('rememberedEmail', data.email)
        localStorage.setItem('rememberedPassword', data.password)
      } else {
        localStorage.removeItem('rememberedEmail')
        localStorage.removeItem('rememberedPassword')
      }

      // Verifica se é empresa e redireciona apropriadamente
      const userDataObj = loggedUserData as unknown as Record<string, unknown>
      if (userDataObj?.tipo_conta === 'empresa') {
        nav('/dashboard-empresa')
      } else {
        nav('/')
      }
    } catch (e: unknown) {
      const msgText = e instanceof Error ? e.message : String(e)
      setMsg(msgText)
    }
  }

  async function handlePasswordRecovery(e: React.FormEvent) {
    e.preventDefault()
    setResetMsg('')
    setResetSuccess(false)

    if (!resetEmail || !resetEmail.includes('@')) {
      setResetMsg('Por favor, insira um e-mail válido')
      return
    }

    try {
      const redirectUrl = `${window.location.origin}/login`
      await account.createRecovery(resetEmail, redirectUrl)
      setResetSuccess(true)
      setResetMsg(
        'E-mail de recuperação enviado! Verifique sua caixa de entrada.',
      )
    } catch (error) {
      setResetMsg(
        'Erro ao enviar e-mail de recuperação. Verifique o endereço e tente novamente.',
      )
    }
  }

  return (
    <div className="login-bg">
      <div className="login-card-wrapper">
        <form onSubmit={handleSubmit(onSubmit)} className="login-card">
          <div className="login-brand">
            <h1 className="login-title">Login</h1>
          </div>
          {msg && (
            <div className="msg-box">
              <p className="msg-text">{msg}</p>
            </div>
          )}

          <FormInput
            label="CPF ou E-mail"
            placeholder="CPF ou e-mail"
            {...register('email', {
              required: 'CPF ou email é obrigatório',
              onChange: handleEmailChange,
            })}
            error={errors.email?.message as string | undefined}
            isValid={!errors.email && !!emailValue && emailValue.length > 0}
            required
          />

          <div className="space-y-2">
            <FormInput
              label="Senha"
              placeholder="••••••••"
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Senha é obrigatória' })}
              error={errors.password?.message as string | undefined}
              isValid={
                !errors.password && !!passwordValue && passwordValue.length >= 8
              }
              rightIcon={
                showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />
              }
              onRightIconClick={() => setShowPassword((s) => !s)}
              required
            />

            <div className="flex items-center justify-between text-sm text-[var(--text-muted)]">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-[var(--border-color)] bg-[var(--bg-tertiary)]"
                  checked={remember}
                  onChange={() => setRemember((s) => !s)}
                />
                Lembrar-me
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                Esqueceu a senha?
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <FormButton type="submit" disabled={formState.isSubmitting}>
              {formState.isSubmitting ? (
                'Entrando...'
              ) : (
                <>
                  <span>Entrar</span>
                  <FaArrowRight />
                </>
              )}
            </FormButton>
            <Link to="/cadastro" className="block text-center text-sm">
              <span className="text-[var(--text-muted)]">Não tem conta?</span>{' '}
              <span className="font-semibold text-blue-400 transition-colors hover:text-blue-300">
                Criar conta
              </span>
            </Link>
          </div>
        </form>
      </div>

      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-[var(--bg-secondary)] p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Recuperar Senha
              </h2>
              <button
                onClick={() => {
                  setShowForgotPassword(false)
                  setResetMsg('')
                  setResetEmail('')
                  setResetSuccess(false)
                }}
                className="rounded p-1 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {resetMsg && (
              <div
                className={`mb-4 rounded-lg p-3 text-sm ${
                  resetSuccess
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}
              >
                {resetMsg}
              </div>
            )}

            {!resetSuccess ? (
              <form onSubmit={handlePasswordRecovery}>
                <p className="mb-4 text-sm text-[var(--text-secondary)]">
                  Digite seu e-mail cadastrado. Enviaremos um link para você
                  redefinir sua senha.
                </p>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="mb-4 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-2 text-[var(--text-primary)] focus:border-indigo-500 focus:outline-none"
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false)
                      setResetMsg('')
                      setResetEmail('')
                    }}
                    className="flex-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                  >
                    Enviar Link
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => {
                  setShowForgotPassword(false)
                  setResetMsg('')
                  setResetEmail('')
                  setResetSuccess(false)
                }}
                className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Fechar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
