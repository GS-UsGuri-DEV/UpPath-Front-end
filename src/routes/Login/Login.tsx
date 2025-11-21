import { useEffect, useState, type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import FormButton from '../../components/Form/FormButton'
import FormInput from '../../components/Form/FormInput'
import { useAuth } from '../../contexts/useAuth'
import type { LoginFormData } from '../../types/auth'

export default function Login() {
  const [msg, setMsg] = useState('')
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
      await login(data.email, data.password)

      if (remember) {
        localStorage.setItem('rememberedEmail', data.email)
        localStorage.setItem('rememberedPassword', data.password)
      } else {
        localStorage.removeItem('rememberedEmail')
        localStorage.removeItem('rememberedPassword')
      }

      nav('/dashboard')
    } catch (e: unknown) {
      const msgText = e instanceof Error ? e.message : String(e)
      setMsg(msgText)
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
              <Link
                to="#"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                Esqueceu a senha?
              </Link>
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
