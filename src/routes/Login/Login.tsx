import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import FormButton from '../../components/Form/FormButton'
import FormInput from '../../components/Form/FormInput'
import { useAuth } from '../../contexts/useAuth'
import type { LoginFormData } from '../../types/auth'

export default function Login() {
  const [msg, setMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const nav = useNavigate()
  const { login } = useAuth()

  const { register, handleSubmit, formState, watch, setValue } =
    useForm<LoginFormData>({ defaultValues: { email: '', password: '' } })
  const { errors } = formState
  const emailValue = watch('email')
  const passwordValue = watch('password')

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail')
    const savedPassword = localStorage.getItem('rememberedPassword')
    if (savedEmail) setValue('email', savedEmail)
    if (savedPassword) setValue('password', savedPassword)
    if (savedEmail && savedPassword) setRemember(true)
  }, [setValue])

  async function onSubmit(data: LoginFormData) {
    setMsg('')
    try {
      const user = await login(data.email, data.password)

      if (remember) {
        localStorage.setItem('rememberedEmail', data.email)
        localStorage.setItem('rememberedPassword', data.password)
      } else {
        localStorage.removeItem('rememberedEmail')
        localStorage.removeItem('rememberedPassword')
      }

      const isCompany = (user as any)?.tipo_conta === 'empresa'
      if (isCompany) nav('/dashboard-empresa')
      else nav('/')
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err)
      setMsg(text || 'Erro ao autenticar')
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
            label="E-mail"
            placeholder="seu@exemplo.com"
            {...register('email', { required: 'E-mail é obrigatório' })}
            error={errors.email?.message as string | undefined}
            isValid={!errors.email && !!emailValue}
            required
          />

          <div className="space-y-2">
            <FormInput
              label="Senha"
              placeholder="••••••••"
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Senha é obrigatória' })}
              error={errors.password?.message as string | undefined}
              isValid={!errors.password && !!passwordValue}
              rightIcon={showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              onRightIconClick={() => setShowPassword((s) => !s)}
              required
            />

            <div className="flex items-center text-sm text-[var(--text-muted)]">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-[var(--border-color)] bg-[var(--bg-tertiary)]"
                  checked={remember}
                  onChange={() => setRemember((s) => !s)}
                />
                Lembrar-me
              </label>
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
    </div>
  )
}
