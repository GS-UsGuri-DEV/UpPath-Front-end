import { useState, type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { post } from '../../api/client'
import FormButton from '../../components/Form/FormButton'
import FormInput from '../../components/Form/FormInput'
import SuccessMessage from '../../components/SuccessMessage'
import { useAuth } from '../../contexts/useAuth'
import type { SignupFormData } from '../../types/auth'

export default function Cadastro() {
  const [msg, setMsg] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const nav = useNavigate()

  const { register, handleSubmit, formState, watch, setValue } = useForm<SignupFormData>({
    defaultValues: { type: 'usuario' } as unknown as SignupFormData,
  })

  const { login, checkAuth } = useAuth()

  const type = watch('type') as 'usuario' | 'empresa' | undefined
  const senhaValue = watch('senha') as string | undefined
  const _senhaValue = senhaValue ?? ''
  const senhaValidAll =
    _senhaValue.length >= 8 &&
    /[A-Z]/.test(_senhaValue) &&
    /[a-z]/.test(_senhaValue) &&
    /[0-9]/.test(_senhaValue) &&
    /[^A-Za-z0-9]/.test(_senhaValue)
  const senhaValidationMessage = validatePassword(_senhaValue)
  const cnpjValue = watch('cnpj') as string | undefined
  const _cnpjValue = cnpjValue ?? ''
  const cnpjValidationResult = validateCNPJ(_cnpjValue)
  const cnpjValidAll = _cnpjValue.length > 0 && cnpjValidationResult === true
  const emailValue = watch('email') as string | undefined
  const _emailValue = emailValue ?? ''
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const emailValid = emailRegex.test(_emailValue)
  const emailContatoValue = watch('email_contato') as string | undefined
  const _emailContatoValue = emailContatoValue ?? ''
  const emailContatoValid = emailRegex.test(_emailContatoValue)

  function formatCNPJ(v: string) {
    const digits = v.replace(/\D/g, '').slice(0, 14)
    return digits
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
  }

  function validateCNPJ(v?: string) {
    if (!v) {
      return true
    }
    const c = v.replace(/\D/g, '')
    if (c.length !== 14) {
      return 'CNPJ inválido'
    }
    if (/^(\d)\1+$/.test(c)) {
      return 'CNPJ inválido'
    }

    const calc = (base: string) => {
      const nums = base.split('').map((d) => Number(d))
      const multipliers =
        base.length === 12
          ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
          : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      const sum = nums.reduce((acc, n, i) => acc + n * (multipliers[i] ?? 0), 0)
      const r = sum % 11
      return r < 2 ? 0 : 11 - r
    }

    const base12 = c.slice(0, 12)
    const d1 = calc(base12)
    const d2 = calc(base12 + String(d1))
    if (Number(d1) !== Number(c[12]) || Number(d2) !== Number(c[13])) {
      return 'CNPJ inválido'
    }
    return true
  }

  function validatePassword(v?: string) {
    if (!v) {
      return 'Senha é obrigatória'
    }
    const misses: string[] = []
    if (v.length < 8) {
      misses.push('mínimo 8 caracteres')
    }
    if (!/[A-Z]/.test(v)) {
      misses.push('uma letra maiúscula')
    }
    if (!/[a-z]/.test(v)) {
      misses.push('uma letra minúscula')
    }
    if (!/[0-9]/.test(v)) {
      misses.push('um número')
    }
    if (!/[^A-Za-z0-9]/.test(v)) {
      misses.push('um caractere especial')
    }
    if (misses.length > 0) {
      return `Senha deve conter: ${misses.join(', ')}`
    }
    return true
  }

  async function onSubmit(data: SignupFormData) {
    setSubmitError('')
    if (data.type === 'empresa') {
      try {
        const company = data as SignupFormData & {
          nome_empresa?: string
          cnpj?: string
          email_contato?: string
          senha?: string
          confirmPassword?: string
        }

        const senha = company.senha
        const confirm = company.confirmPassword
        if (!senha || senha !== confirm) {
          setSubmitError('As senhas não coincidem')
          return
        }

        const companyPayload = {
          name: company.nome_empresa ?? '',
          cnpj: company.cnpj ?? '',
          email: company.email_contato ?? '',
          senha: company.senha ?? '',
        }

        await post('https://uppath.onrender.com/empresas', companyPayload)

        try {
          await login(company.email_contato ?? '', senha ?? '', 'empresa')
        } catch (err) {
          // Login automático após criar empresa falhou, tentando fallback
          try {
            const fallback = (await post('https://uppath.onrender.com/login', {
              email: company.email_contato ?? '',
              password: senha ?? '',
            })) as Record<string, unknown>
            const token = fallback?.token ?? fallback?.accessToken ?? fallback?.access_token ?? null
            const externalUser = fallback?.user ?? fallback?.data ?? null
            if (token) {
              localStorage.setItem('authToken', String(token))
            }
            if (externalUser) {
              try {
                localStorage.setItem('userData', JSON.stringify(externalUser))
              } catch {}
            }
            try {
              await checkAuth()
            } catch (_e) {
              // checkAuth fallback failed
            }
          } catch (_fallbackErr) {
            // Fallback login também falhou
          }
        }

        nav('/dashboard')
      } catch (e: unknown) {
        const msgText = e instanceof Error ? e.message : String(e)
        setMsg(msgText)
      }
      return
    }

    if (data.type === 'usuario') {
      const user = data as SignupFormData & {
        email?: string
        senha?: string
        confirmPassword?: string
        id_empresa?: string | number | null
        nome_completo?: string
        cpf?: string
        data_nascimento?: string
        nivel_carreira?: string
        ocupacao?: string
        genero?: string
      }
      const senha = user.senha
      const confirm = user.confirmPassword
      if (!senha || senha !== confirm) {
        setSubmitError('As senhas não coincidem')
        return
      }

      const birthRaw = user.data_nascimento ?? ''
      if (!birthRaw) {
        setSubmitError('Data de nascimento é obrigatória')
        return
      }
      const birthDate = new Date(String(birthRaw))
      if (Number.isNaN(birthDate.getTime())) {
        setSubmitError('Data de nascimento inválida')
        return
      }
      const today = new Date()
      if (birthDate.getFullYear() === today.getFullYear()) {
        setSubmitError('Ano inválido')
        return
      }
      let age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      if (age < 12 || age > 80) {
        setSubmitError('Somente pessoas entre 12 e 80 anos podem se registrar')
        return
      }

      try {
        const idEmpresaNumber = user.id_empresa ? Number(user.id_empresa) : null

        const userPayload = {
          idEmpresa:
            idEmpresaNumber != null && Number.isFinite(idEmpresaNumber) ? idEmpresaNumber : null,
          name: user.nome_completo ?? '',
          email: user.email ?? '',
          password: senha,
          nivelCarreira: user.nivel_carreira ?? null,
          occupation: user.ocupacao ?? null,
          gender: user.genero ?? null,
          birthDate: user.data_nascimento ?? '',
          dateRegistered: new Date().toISOString(),
          admin: 0,
        }

        await post('https://uppath.onrender.com/users', userPayload)

        try {
          await login(user.email ?? '', senha ?? '')
        } catch (err) {
          // Login automático após criar usuário falhou, tentando fallback
          try {
            const fallback = (await post('https://uppath.onrender.com/login', {
              email: user.email ?? '',
              password: senha ?? '',
            })) as Record<string, unknown>
            const token = fallback?.token ?? fallback?.accessToken ?? fallback?.access_token ?? null
            const externalUser = fallback?.user ?? fallback?.data ?? null
            if (token) {
              localStorage.setItem('authToken', String(token))
            }
            if (externalUser) {
              try {
                localStorage.setItem('userData', JSON.stringify(externalUser))
              } catch {}
            }
            try {
              await checkAuth()
            } catch (_e) {
              // checkAuth fallback failed
            }
          } catch (_fallbackErr) {
            // Fallback login também falhou
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 300))
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
          nav('/questionario')
        }, 1800)
      } catch (e: unknown) {
        const msgText = e instanceof Error ? e.message : String(e)
        setMsg(msgText)
        setSubmitError('Erro ao cadastrar usuário: ')
      }
    }
  }

  return (
    <div className="cadastro-bg">
      {showSuccess && (
        <SuccessMessage
          message="Cadastro realizado com sucesso!"
          onClose={() => {
            setShowSuccess(false)
          }}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="cadastro-card">
        <h1 className="cadastro-title">Cadastro</h1>
        {msg && (
          <div className="msg-box">
            <p className="msg-text">{msg}</p>
          </div>
        )}

        <div className="radio-group">
          <label className="radio-label" style={{ fontWeight: '600' }}>
            Tipo:
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="usuario"
              className="radio-input"
              {...register('type')}
              defaultChecked
            />
            Usuário
          </label>
          <label className="radio-label">
            <input type="radio" value="empresa" className="radio-input" {...register('type')} />
            Empresa
          </label>
        </div>

        {type === 'empresa' ? (
          <>
            <FormInput
              label="Nome da empresa"
              placeholder="Nome da Empresa"
              {...register('nome_empresa', {
                required: 'Nome da empresa é obrigatório',
              })}
              error={(formState.errors as any).nome_empresa?.message as string | undefined}
              isValid={!(formState.errors as any).nome_empresa && !!watch('nome_empresa')}
              required
            />
            <FormInput
              label="CNPJ"
              placeholder="00.000.000/0000-00"
              {...register('cnpj', {
                required: 'CNPJ é obrigatório',
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  setValue('cnpj', formatCNPJ(e.target.value)),
                validate: (v) => validateCNPJ(v),
              })}
              error={
                ((formState.errors as any).cnpj?.message as string | undefined) ??
                (typeof cnpjValidationResult === 'string' && _cnpjValue
                  ? (cnpjValidationResult as string)
                  : undefined)
              }
              isValid={cnpjValidAll}
              required
            />
            <FormInput
              label="E-mail de Contato"
              placeholder="E-mail de Contato"
              {...register('email_contato', {
                required: 'Email é obrigatório',
                pattern: {
                  value: emailRegex,
                  message: 'Email inválido',
                },
              })}
              error={
                ((formState.errors as any).email_contato?.message as string | undefined) ??
                (_emailContatoValue && !emailContatoValid ? 'Email inválido' : undefined)
              }
              isValid={emailContatoValid}
              required
            />
            <FormInput
              label="Senha"
              placeholder="Sua Senha"
              type="password"
              {...register('senha', {
                validate: validatePassword,
              })}
              error={
                ((formState.errors as any).senha?.message as string | undefined) ??
                (typeof senhaValidationMessage === 'string' && _senhaValue
                  ? (senhaValidationMessage as string)
                  : undefined)
              }
              isValid={senhaValidAll}
              required
            />
            {!senhaValidAll && (
              <div
                className="password-requirements"
                style={{ fontSize: '0.875rem', marginTop: '0.375rem' }}
              >
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      color:
                        senhaValue && senhaValue.length >= 8
                          ? 'rgb(34 197 94)'
                          : 'rgb(148 163 184)',
                    }}
                  >
                    {senhaValue && senhaValue.length >= 8 ? '✓' : '✗'} mínimo 8 caracteres
                  </div>
                  <div
                    style={{
                      color:
                        senhaValue && /[A-Z]/.test(senhaValue)
                          ? 'rgb(34 197 94)'
                          : 'rgb(148 163 184)',
                    }}
                  >
                    {senhaValue && /[A-Z]/.test(senhaValue) ? '✓' : '✗'} letra maiúscula
                  </div>
                  <div
                    style={{
                      color:
                        senhaValue && /[a-z]/.test(senhaValue)
                          ? 'rgb(34 197 94)'
                          : 'rgb(148 163 184)',
                    }}
                  >
                    {senhaValue && /[a-z]/.test(senhaValue) ? '✓' : '✗'} letra minúscula
                  </div>
                  <div
                    style={{
                      color:
                        senhaValue && /[0-9]/.test(senhaValue)
                          ? 'rgb(34 197 94)'
                          : 'rgb(148 163 184)',
                    }}
                  >
                    {senhaValue && /[0-9]/.test(senhaValue) ? '✓' : '✗'} número
                  </div>
                  <div
                    style={{
                      color:
                        senhaValue && /[^A-Za-z0-9]/.test(senhaValue)
                          ? 'rgb(34 197 94)'
                          : 'rgb(148 163 184)',
                    }}
                  >
                    {senhaValue && /[^A-Za-z0-9]/.test(senhaValue) ? '✓' : '✗'} caractere especial
                  </div>
                </div>
              </div>
            )}
            <FormInput
              label="Confirmar senha"
              placeholder="Confirme a Senha"
              type="password"
              {...register('confirmPassword', {
                validate: (v) => v === watch('senha') || 'As senhas não coincidem',
              })}
              error={(formState.errors as any).confirmPassword?.message as string | undefined}
              isValid={!(formState.errors as any).confirmPassword && !!watch('confirmPassword')}
              required
            />
          </>
        ) : (
          <>
            <FormInput
              label="Nome Completo"
              placeholder="Nome Completo"
              {...register('nome_completo', { required: 'Nome é obrigatório' })}
              error={(formState.errors as any).nome_completo?.message as string | undefined}
              isValid={!(formState.errors as any).nome_completo && !!watch('nome_completo')}
              required
            />
            {/* CPF removido */}
            <FormInput
              label="Email"
              placeholder="E-mail"
              {...register('email', {
                required: 'Email é obrigatório',
                pattern: {
                  value: emailRegex,
                  message: 'Email inválido',
                },
              })}
              error={
                ((formState.errors as any).email?.message as string | undefined) ??
                (_emailValue && !emailValid ? 'Email inválido' : undefined)
              }
              isValid={emailValid}
              required
            />
            <FormInput
              label="Senha"
              placeholder="Sua Senha"
              type="password"
              {...register('senha', {
                validate: validatePassword,
              })}
              error={
                ((formState.errors as any).senha?.message as string | undefined) ??
                (typeof senhaValidationMessage === 'string' && _senhaValue
                  ? (senhaValidationMessage as string)
                  : undefined)
              }
              isValid={senhaValidAll}
              required
            />
            {!senhaValidAll && (
              <div
                className="password-requirements"
                style={{ fontSize: '0.875rem', marginTop: '0.375rem' }}
              >
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      color:
                        senhaValue && senhaValue.length >= 8
                          ? 'rgb(34 197 94)'
                          : 'rgb(148 163 184)',
                    }}
                  >
                    {senhaValue && senhaValue.length >= 8 ? '✓' : '✗'} mínimo 8 caracteres
                  </div>
                  <div
                    style={{
                      color:
                        senhaValue && /[A-Z]/.test(senhaValue)
                          ? 'rgb(34 197 94)'
                          : 'rgb(148 163 184)',
                    }}
                  >
                    {senhaValue && /[A-Z]/.test(senhaValue) ? '✓' : '✗'} letra maiúscula
                  </div>
                  <div
                    style={{
                      color:
                        senhaValue && /[a-z]/.test(senhaValue)
                          ? 'rgb(34 197 94)'
                          : 'rgb(148 163 184)',
                    }}
                  >
                    {senhaValue && /[a-z]/.test(senhaValue) ? '✓' : '✗'} letra minúscula
                  </div>
                  <div
                    style={{
                      color:
                        senhaValue && /[0-9]/.test(senhaValue)
                          ? 'rgb(34 197 94)'
                          : 'rgb(148 163 184)',
                    }}
                  >
                    {senhaValue && /[0-9]/.test(senhaValue) ? '✓' : '✗'} número
                  </div>
                  <div
                    style={{
                      color:
                        senhaValue && /[^A-Za-z0-9]/.test(senhaValue)
                          ? 'rgb(34 197 94)'
                          : 'rgb(148 163 184)',
                    }}
                  >
                    {senhaValue && /[^A-Za-z0-9]/.test(senhaValue) ? '✓' : '✗'} caractere especial
                  </div>
                </div>
              </div>
            )}
            <FormInput
              label="Confirmar senha"
              placeholder="Confirme a Senha"
              type="password"
              {...register('confirmPassword', {
                validate: (v) => v === watch('senha') || 'As senhas não coincidem',
              })}
              error={(formState.errors as any).confirmPassword?.message as string | undefined}
              isValid={!(formState.errors as any).confirmPassword && !!watch('confirmPassword')}
              required
            />
            <FormInput
              label="ID da empresa (opcional)"
              placeholder="ID da Empresa"
              {...register('id_empresa')}
            />
            <FormInput
              label="Data de nascimento"
              placeholder="YYYY-MM-DD"
              type="date"
              {...register('data_nascimento', {
                required: 'Data de nascimento é obrigatória',
              })}
              error={(formState.errors as any).data_nascimento?.message as string | undefined}
              isValid={!(formState.errors as any).data_nascimento && !!watch('data_nascimento')}
              required
            />
            <FormInput
              label="Nível de carreira "
              placeholder="ex: Junior, Senior"
              {...register('nivel_carreira', {
                required: 'Nível de carreira é obrigatório',
              })}
              error={(formState.errors as any).nivel_carreira?.message as string | undefined}
              isValid={!(formState.errors as any).nivel_carreira && !!watch('nivel_carreira')}
              required
            />
            <FormInput
              label="Ocupação "
              placeholder="Ocupação"
              {...register('ocupacao', { required: 'Ocupação é obrigatória' })}
              error={(formState.errors as any).ocupacao?.message as string | undefined}
              isValid={!(formState.errors as any).ocupacao && !!watch('ocupacao')}
              required
            />
            <FormInput
              label="Gênero "
              placeholder="Gênero"
              {...register('genero', { required: 'Gênero é obrigatório' })}
              error={(formState.errors as any).genero?.message as string | undefined}
              isValid={!(formState.errors as any).genero && !!watch('genero')}
              required
            />
          </>
        )}

        <div className="space-y-3">
          {submitError && (
            <div
              className="submit-error"
              style={{ color: 'rgb(220 38 38)', marginBottom: '0.5rem' }}
            >
              {submitError}
            </div>
          )}
          <FormButton type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? 'Criando conta...' : 'Criar conta'}
          </FormButton>
          <p className="link-muted">
            <span className="text-[var(--text-muted)]">Já tem cadastro?</span>{' '}
            <Link
              to="/login"
              className="font-semibold text-blue-400 transition-colors hover:text-blue-300"
            >
              Faça login
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
