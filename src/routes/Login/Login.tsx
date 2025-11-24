import { useEffect, useState, type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowRight, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import FormButton from '../../components/Form/FormButton'
import FormInput from '../../components/Form/FormInput'
import { useAuth } from '../../contexts/useAuth'
import { account, db } from '../../shared/appwrite'
import type { LoginFormData } from '../../types/auth'

export default function Login() {
  const [msg, setMsg] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [loginType, setLoginType] = useState<'usuario' | 'empresa'>('usuario')
  const [accountType, setAccountType] = useState<'usuario' | 'empresa'>('usuario')
  const [resetEmail, setResetEmail] = useState('')
  const [resetCpf, setResetCpf] = useState('')
  const [resetBirthdate, setResetBirthdate] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetMsg, setResetMsg] = useState('')
  const [resetSuccess, setResetSuccess] = useState(false)
  const [verificationStep, setVerificationStep] = useState(1)
  const nav = useNavigate()
  const { login } = useAuth()

  const { register, handleSubmit, formState, setValue, watch } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
  })
  const { errors } = formState
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  const emailValue = watch('email')
  const passwordValue = watch('password')

  function formatCNPJ(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 14)
    if (digits.length === 0) {
      return ''
    }

    return digits
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    if (loginType === 'empresa') {
      const formatted = formatCNPJ(value)
      setValue('email', formatted)
    } else {
      setValue('email', value)
    }
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
      // Limpar mensagens de erro anteriores
      setMsg('')

      // Se for empresa, converter CNPJ formatado para apenas números
      let loginIdentifier = data.email
      if (loginType === 'empresa') {
        loginIdentifier = data.email.replace(/\D/g, '')
      } else {
        // Para usuário, só aceita e-mail válido contendo @ e .com
        if (!/^[^@\s]+@[^@\s]+\.com$/.test(data.email)) {
          setMsg('Digite um e-mail válido (deve conter @ e .com)')
          return
        }
      }

      await login(loginIdentifier, data.password, loginType)

      if (remember) {
        localStorage.setItem('rememberedEmail', data.email)
        localStorage.setItem('rememberedPassword', data.password)
      } else {
        localStorage.removeItem('rememberedEmail')
        localStorage.removeItem('rememberedPassword')
      }

      if (loginType === 'empresa') {
        nav('/dashboard-empresa')
      } else {
        nav('/')
      }
    } catch (e: unknown) {
      const msgText = e instanceof Error ? e.message : String(e)
      setMsg(msgText)
    }
  }

  async function handleVerifyData(e: React.FormEvent) {
    e.preventDefault()
    setResetMsg('')

    if (!resetEmail || !resetEmail.includes('@')) {
      setResetMsg('Por favor, insira um e-mail válido')
      return
    }

    const cpfCnpjClean = resetCpf.replace(/\D/g, '')
    if (!resetCpf || (cpfCnpjClean.length !== 11 && cpfCnpjClean.length !== 14)) {
      setResetMsg('Por favor, insira um CPF ou CNPJ válido')
      return
    }

    if (accountType === 'usuario' && !resetBirthdate) {
      setResetMsg('Por favor, insira sua data de nascimento')
      return
    }

    try {
      const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID

      if (accountType === 'empresa') {
        const COLLECTION_COMPANIES = import.meta.env.VITE_APPWRITE_COLLECTION_COMPANIES
        const response = await db.listDocuments(DB_ID, COLLECTION_COMPANIES)
        const companyDoc = response.documents.find((doc) => {
          const d = doc as unknown as Record<string, unknown>
          return d.email_contato === resetEmail && d.cnpj === cpfCnpjClean
        })

        if (companyDoc) {
          setVerificationStep(2)
          setResetMsg('')
        } else {
          setResetMsg('Dados não conferem. Verifique as informações e tente novamente.')
        }
      } else {
        const COLLECTION_USERS = import.meta.env.VITE_APPWRITE_COLLECTION_USERS
        const response = await db.listDocuments(DB_ID, COLLECTION_USERS)

        const userDoc = response.documents.find((doc) => {
          const d = doc as unknown as Record<string, unknown>
          const docDate =
            typeof d.data_nascimento === 'string'
              ? d.data_nascimento.split('T')[0]
              : d.data_nascimento

          // Normaliza CPF para comparar só números
          const docCpf = typeof d.cpf === 'string' ? d.cpf.replace(/\D/g, '') : d.cpf

          return d.email === resetEmail && docCpf === cpfCnpjClean && docDate === resetBirthdate
        })

        if (userDoc) {
          setVerificationStep(2)
          setResetMsg('')
        } else {
          setResetMsg('Dados não conferem. Verifique as informações e tente novamente.')
        }
      }
    } catch (_error) {
      setResetMsg('Erro ao verificar dados. Tente novamente.')
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setResetMsg('')

    if (newPassword.length < 8) {
      setResetMsg('A senha deve ter no mínimo 8 caracteres')
      return
    }

    if (newPassword !== confirmPassword) {
      setResetMsg('As senhas não conferem')
      return
    }

    try {
      const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID

      if (accountType === 'empresa') {
        const COLLECTION_COMPANIES = import.meta.env.VITE_APPWRITE_COLLECTION_COMPANIES
        const response = await db.listDocuments(DB_ID, COLLECTION_COMPANIES)
        const companyDoc = response.documents.find((doc) => {
          const d = doc as unknown as Record<string, unknown>
          return d.email_contato === resetEmail
        })

        if (companyDoc) {
          await db.updateDocument(DB_ID, COLLECTION_COMPANIES, companyDoc.$id, {
            senha: newPassword,
          })
          setResetSuccess(true)
          setResetMsg('Senha alterada com sucesso!')
        }
      } else {
        // Usuário: alterar senha via Appwrite Account
        await account.updatePassword(newPassword)
        setResetSuccess(true)
        setResetMsg('Senha alterada com sucesso!')
      }
    } catch (_error) {
      setResetMsg('Erro ao alterar senha. Tente novamente.')
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

          {/* Tabs para escolher tipo de login */}
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                value="usuario"
                className="radio-input"
                checked={loginType === 'usuario'}
                onChange={() => {
                  setLoginType('usuario')
                  setValue('email', '')
                }}
              />
              Usuário
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="empresa"
                className="radio-input"
                checked={loginType === 'empresa'}
                onChange={() => {
                  setLoginType('empresa')
                  setValue('email', '')
                }}
              />
              Empresa
            </label>
          </div>

          <FormInput
            label={loginType === 'empresa' ? 'CNPJ' : 'E-mail'}
            placeholder={loginType === 'empresa' ? '00.000.000/0000-00' : 'seu@email.com'}
            {...register('email', {
              required: loginType === 'empresa' ? 'CNPJ é obrigatório' : 'E-mail é obrigatório',
              onChange: handleInputChange,
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
              isValid={!errors.password && !!passwordValue && passwordValue.length >= 8}
              rightIcon={showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
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
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Recuperar Senha</h2>
              <button
                onClick={() => {
                  setShowForgotPassword(false)
                  setResetMsg('')
                  setResetEmail('')
                  setResetCpf('')
                  setResetBirthdate('')
                  setNewPassword('')
                  setConfirmPassword('')
                  setResetSuccess(false)
                  setVerificationStep(1)
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
              verificationStep === 1 ? (
                <form onSubmit={handleVerifyData}>
                  <p className="mb-4 text-sm text-[var(--text-secondary)]">
                    Para redefinir sua senha, precisamos verificar seus dados.
                  </p>
                  <div className="space-y-3">
                    <div className="flex gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] p-1">
                      <button
                        type="button"
                        onClick={() => {
                          setAccountType('usuario')
                          setResetCpf('')
                          setResetBirthdate('')
                        }}
                        className={`flex-1 rounded px-4 py-2 text-sm font-medium transition-colors ${
                          accountType === 'usuario'
                            ? 'bg-indigo-600 text-white'
                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        Usuário
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAccountType('empresa')
                          setResetCpf('')
                          setResetBirthdate('')
                        }}
                        className={`flex-1 rounded px-4 py-2 text-sm font-medium transition-colors ${
                          accountType === 'empresa'
                            ? 'bg-indigo-600 text-white'
                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        Empresa
                      </button>
                    </div>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="E-mail"
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-2 text-[var(--text-primary)] focus:border-indigo-500 focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      value={resetCpf}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '')
                        if (accountType === 'empresa') {
                          const formatted = raw
                            .replace(/(\d{2})(\d)/, '$1.$2')
                            .replace(/(\d{3})(\d)/, '$1.$2')
                            .replace(/(\d{3})(\d)/, '$1/$2')
                            .replace(/(\d{4})(\d{2})$/, '$1-$2')
                          setResetCpf(formatted)
                        } else {
                          const formatted = raw
                            .replace(/(\d{3})(\d)/, '$1.$2')
                            .replace(/(\d{3})(\d)/, '$1.$2')
                            .replace(/(\d{3})(\d{2})$/, '$1-$2')
                          setResetCpf(formatted)
                        }
                      }}
                      placeholder={accountType === 'empresa' ? 'CNPJ' : 'CPF'}
                      maxLength={accountType === 'empresa' ? 18 : 14}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-2 text-[var(--text-primary)] focus:border-indigo-500 focus:outline-none"
                      required
                    />
                    {accountType === 'usuario' && (
                      <input
                        type="date"
                        value={resetBirthdate}
                        onChange={(e) => setResetBirthdate(e.target.value)}
                        placeholder="Data de Nascimento"
                        className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-2 text-[var(--text-primary)] focus:border-indigo-500 focus:outline-none"
                        required
                      />
                    )}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotPassword(false)
                        setResetMsg('')
                        setResetEmail('')
                        setResetCpf('')
                        setResetBirthdate('')
                        setVerificationStep(1)
                      }}
                      className="flex-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                    >
                      Verificar
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleChangePassword}>
                  <p className="mb-4 text-sm text-[var(--text-secondary)]">
                    Dados verificados! Agora defina sua nova senha.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Nova senha (mínimo 8 caracteres)"
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-2 text-[var(--text-primary)] focus:border-indigo-500 focus:outline-none"
                      required
                      minLength={8}
                    />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirmar nova senha"
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-2 text-[var(--text-primary)] focus:border-indigo-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setVerificationStep(1)
                        setNewPassword('')
                        setConfirmPassword('')
                        setResetMsg('')
                      }}
                      className="flex-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                    >
                      Alterar Senha
                    </button>
                  </div>
                </form>
              )
            ) : (
              <button
                onClick={() => {
                  setShowForgotPassword(false)
                  setResetMsg('')
                  setResetEmail('')
                  setResetCpf('')
                  setResetBirthdate('')
                  setNewPassword('')
                  setConfirmPassword('')
                  setResetSuccess(false)
                  setVerificationStep(1)
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
