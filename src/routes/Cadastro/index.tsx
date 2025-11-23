import { useState, type ChangeEvent } from 'react'
import SuccessMessage from '../../components/SuccessMessage'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import FormButton from '../../components/Form/FormButton'
import FormInput from '../../components/Form/FormInput'
import { post } from '../../api/client'
import { useAuth } from '../../contexts/useAuth'
import type { SignupFormData } from '../../types/auth'

export default function Cadastro() {
  const [msg, setMsg] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const nav = useNavigate()

  const { register, handleSubmit, formState, watch, setValue } =
    useForm<SignupFormData>({
      defaultValues: { type: 'usuario' } as unknown as SignupFormData,
    })

  const { login, checkAuth } = useAuth()

  const type = watch('type') as 'usuario' | 'admin' | 'empresa' | undefined


  function formatCNPJ(v: string) {
    const digits = v.replace(/\D/g, '').slice(0, 14)
    return digits
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
  }

  async function onSubmit(data: SignupFormData) {
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
          setMsg('As senhas não coincidem')
          return
        }

        const companyPayload = {
          name: company.nome_empresa ?? '',
          cnpj: company.cnpj ?? '',
          email: company.email_contato ?? '',
        }

        const companyRes = await post('https://uppath.onrender.com/empresas', companyPayload)
        const companyId = (companyRes as any)?.idEmpresa ?? (companyRes as any)?.id ?? (companyRes as any)?.id_empresa

        const adminPayload = {
          idEmpresa: companyId ?? 0,
          name: company.nome_empresa ?? '',
          email: company.email_contato ?? '',
          password: senha ?? '',
          nivelCarreira: 'Admin',
          occupation: 'Administrador',
          gender: null,
          birthDate: new Date().toISOString().split('T')[0],
          admin: 1,
        }

        await post('https://uppath.onrender.com/users', adminPayload)
        try {
          await login(company.email_contato ?? '', senha ?? '')
        } catch (err) {
          console.warn('Login automático após criar empresa falhou, tentando fallback', err)
          try {
            const fallback = await post('https://uppath.onrender.com/login', {
              email: company.email_contato ?? '',
              password: senha ?? '',
            }) as any
            const token = fallback?.token ?? fallback?.accessToken ?? fallback?.access_token ?? null
            const externalUser = fallback?.user ?? fallback?.data ?? null
            if (token) {
              localStorage.setItem('authToken', String(token))
            }
            if (externalUser) {
              try { localStorage.setItem('userData', JSON.stringify(externalUser)) } catch {}
            }
            try { await checkAuth() } catch (e) { console.warn('checkAuth fallback failed', e) }
          } catch (fallbackErr) {
            console.warn('Fallback login também falhou', fallbackErr)
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
        setMsg('As senhas não coincidem')
        return
      }

      try {
        const idEmpresaNumber = user.id_empresa ? Number(user.id_empresa) : 0

        const userPayload = {
          idEmpresa: Number.isFinite(idEmpresaNumber) ? idEmpresaNumber : 0,
          name: user.nome_completo ?? '',
          email: user.email ?? '',
          password: senha,
          nivelCarreira: user.nivel_carreira ?? null,
          occupation: user.ocupacao ?? null,
          gender: user.genero ?? null,
          birthDate: user.data_nascimento ?? '',
          dateRegistered: new Date().toISOString(),
          admin: data.type === 'admin' ? 1 : null,
        }

        console.debug('POST /users payload:', userPayload)
        const createdUser = await post('https://uppath.onrender.com/users', userPayload)
        console.debug('POST /users response:', createdUser)

        try {
          await login(user.email ?? '', senha ?? '')
        } catch (err) {
          console.warn('Login automático após criar usuário falhou, tentando fallback', err)
          try {
            const fallback = await post('https://uppath.onrender.com/login', {
              email: user.email ?? '',
              password: senha ?? '',
            }) as any
            const token = fallback?.token ?? fallback?.accessToken ?? fallback?.access_token ?? null
            const externalUser = fallback?.user ?? fallback?.data ?? null
            if (token) {
              localStorage.setItem('authToken', String(token))
            }
            if (externalUser) {
              try { localStorage.setItem('userData', JSON.stringify(externalUser)) } catch {}
            }
            try { await checkAuth() } catch (e) { console.warn('checkAuth fallback failed', e) }
          } catch (fallbackErr) {
            console.warn('Fallback login também falhou', fallbackErr)
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
            <input
              type="radio"
              value="empresa"
              className="radio-input"
              {...register('type')}
            />
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
              required
            />
            <FormInput
              label="CNPJ"
              placeholder="00.000.000/0000-00"
              {...register('cnpj', {
                required: 'CNPJ é obrigatório',
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  setValue('cnpj', formatCNPJ(e.target.value)),
                validate: (v) =>
                  (v ? v.replace(/\D/g, '').length === 14 : false) ||
                  'CNPJ inválido',
              })}
              required
            />
            <FormInput
              label="E-mail de Contato"
              placeholder="E-mail de Contato"
              {...register('email_contato', {
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email inválido',
                },
              })}
              required
            />
            <FormInput
              label="Senha"
              placeholder="Sua Senha"
              type="password"
              {...register('senha', {
                required: 'Senha é obrigatória',
                minLength: { value: 8, message: 'Senha mínima 8 caracteres' },
                pattern: {
                  value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
                  message:
                    'Senha deve conter letras maiúsculas, minúsculas e números',
                },
              })}
              required
            />
            <FormInput
              label="Confirmar senha"
              placeholder="Confirme a Senha"
              type="password"
              {...register('confirmPassword', {
                validate: (v) =>
                  v === watch('senha') || 'As senhas não coincidem',
              })}
              required
            />
          </>
        ) : (
          <>
            <FormInput
              label="Nome Completo"
              placeholder="Nome Completo"
              {...register('nome_completo', { required: 'Nome é obrigatório' })}
              required
            />
            {/* CPF removido */}
            <FormInput
              label="Email"
              placeholder="E-mail"
              {...register('email', {
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email inválido',
                },
              })}
              required
            />
            <FormInput
              label="Senha"
              placeholder="Sua Senha"
              type="password"
              {...register('senha', {
                required: 'Senha é obrigatória',
                minLength: { value: 8, message: 'Senha mínima 8 caracteres' },
                pattern: {
                  value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
                  message:
                    'Senha deve conter letras maiúsculas, minúsculas e números',
                },
              })}
              required
            />
            <FormInput
              label="Confirmar senha"
              placeholder="Confirme a Senha"
              type="password"
              {...register('confirmPassword', {
                validate: (v) =>
                  v === watch('senha') || 'As senhas não coincidem',
              })}
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
              required
            />
            <FormInput
              label="Nível de carreira"
              placeholder="ex: Junior, Senior"
              {...register('nivel_carreira')}
            />
            <FormInput
              label="Ocupação"
              placeholder="Ocupação"
              {...register('ocupacao')}
            />
            <FormInput
              label="Gênero"
              placeholder="Gênero"
              {...register('genero')}
            />
          </>
        )}

        <div className="space-y-3">
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
