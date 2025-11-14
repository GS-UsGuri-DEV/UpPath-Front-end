import { useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import type { SignupFormData } from '../../types/auth';
import { account, db } from '../../shared/appwrite';
import { ID } from 'appwrite';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../../components/Form/FormInput';
import FormButton from '../../components/Form/FormButton';

export default function Cadastro() {
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const { register, handleSubmit, formState, watch, setValue } = useForm<SignupFormData>({
    defaultValues: { type: 'usuario' } as unknown as SignupFormData,
  });

  const type = watch('type') as 'usuario' | 'admin' | 'empresa' | undefined;

  // Máscaras simples para CPF e CNPJ (formatam durante a digitação)
  function formatCPF(v: string) {
    const digits = v.replace(/\D/g, '').slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function formatCNPJ(v: string) {
    const digits = v.replace(/\D/g, '').slice(0, 14);
    return digits
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }

  async function onSubmit(data: SignupFormData) {
    const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    const COLLECTION_USERS = import.meta.env.VITE_APPWRITE_COLLECTION_USERS;
    const COLLECTION_COMPANIES = import.meta.env.VITE_APPWRITE_COLLECTION_COMPANIES;

    if (!DB_ID || !COLLECTION_USERS || !COLLECTION_COMPANIES) {
      setMsg('Configure VITE_APPWRITE_DATABASE_ID, VITE_APPWRITE_COLLECTION_USERS e VITE_APPWRITE_COLLECTION_COMPANIES no .env');
      return;
    }

    if (data.type === 'empresa') {
      try {
        const company = data as (SignupFormData & { nome_empresa?: string; cnpj?: string; email_contato?: string; senha?: string; confirmPassword?: string });
        
        const senha = company.senha;
        const confirm = company.confirmPassword;
        if (!senha || senha !== confirm) {
          setMsg('As senhas não coincidem');
          return;
        }

        try {
          await account.deleteSession('current');
        } catch {
          // Ignora erro se não houver sessão ativa
        }

        await account.create(ID.unique(), company.email_contato ?? '', senha);
        await account.createEmailPasswordSession(company.email_contato ?? '', senha);

        const companyPayload = {
          nome_empresa: company.nome_empresa ?? '',
          cnpj: company.cnpj ?? '',
          email_contato: company.email_contato ?? '',
          data_cadastro: new Date().toISOString(),
        };
        const companyDoc = await db.createDocument(DB_ID, COLLECTION_COMPANIES, ID.unique(), companyPayload);

        const adminPayload = {
          id_empresa: companyDoc.$id,
          nome_completo: company.nome_empresa ?? '',
          email: company.email_contato ?? '',
          cpf: '',
          is_admin: true,
          data_cadastro: new Date().toISOString(),
        };
        await db.createDocument(DB_ID, COLLECTION_USERS, ID.unique(), adminPayload);

        nav('/dashboard');
      } catch (e: unknown) {
        const msgText = e instanceof Error ? e.message : String(e);
        setMsg(msgText);
      }
      return;
    }

    if (data.type === 'usuario' || data.type === 'admin') {
      const user = data as (SignupFormData & { email?: string; senha?: string; confirmPassword?: string; id_empresa?: string | number | null; nome_completo?: string; cpf?: string });
      const senha = user.senha;
      const confirm = user.confirmPassword;
      if (!senha || senha !== confirm) {
        setMsg('As senhas não coincidem');
        return;
      }

      try {
        try {
          await account.deleteSession('current');
        } catch {
          // Ignora erro se não houver sessão ativa
        }

        await account.create(ID.unique(), user.email ?? '', senha);
        await account.createEmailPasswordSession(user.email ?? '', senha);

        const userPayload = {
          id_empresa: user.id_empresa ?? null,
          nome_completo: user.nome_completo ?? '',
          email: user.email ?? '',
          cpf: user.cpf ?? '',
          is_admin: data.type === 'admin',
          data_cadastro: new Date().toISOString(),
        };

        await db.createDocument(DB_ID, COLLECTION_USERS, ID.unique(), userPayload);

        nav('/dashboard');
      } catch (e: unknown) {
        const msgText = e instanceof Error ? e.message : String(e);
        setMsg(msgText);
      }
    }
  }

  return (
    <div className="cadastro-bg">
      <form onSubmit={handleSubmit(onSubmit)} className="cadastro-card">
        <h1 className="cadastro-title">Cadastro</h1>
        {msg && (
          <div className="msg-box">
            <p className="msg-text">{msg}</p>
          </div>
        )}

        <div className="radio-group">
          <label className="radio-label" style={{ fontWeight: '600' }}>Tipo:</label>
          <label className="radio-label">
            <input type="radio" value="usuario" className="radio-input" {...register('type')} defaultChecked />
            Usuário
          </label>
          <label className="radio-label">
            <input type="radio" value="admin" className="radio-input" {...register('type')} />
            Admin
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
              placeholder="nome da empresa" 
              {...register('nome_empresa', { required: 'Nome da empresa é obrigatório' })} 
              required
            />
            <FormInput
              label="CNPJ"
              placeholder="00.000.000/0000-00"
              {...register('cnpj', {
                required: 'CNPJ é obrigatório',
                onChange: (e: ChangeEvent<HTMLInputElement>) => setValue('cnpj', formatCNPJ(e.target.value)),
                validate: v => (v ? v.replace(/\D/g,'').length === 14 : false) || 'CNPJ inválido',
              })}
              required
            />
            <FormInput 
              label="Email de contato" 
              placeholder="email de contato" 
              {...register('email_contato', { required: 'Email é obrigatório', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' } })} 
              required
            />
            <FormInput 
              label="Senha" 
              placeholder="senha" 
              type="password" 
              {...register('senha', { required: 'Senha é obrigatória', minLength: { value: 8, message: 'Senha mínima 8 caracteres' }, pattern: { value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, message: 'Senha deve conter letras maiúsculas, minúsculas e números' } })} 
              required
            />
            <FormInput 
              label="Confirmar senha" 
              placeholder="confirme a senha" 
              type="password" 
              {...register('confirmPassword', { validate: v => v === watch('senha') || 'As senhas não coincidem' })} 
              required
            />
          </>
        ) : (
          <>
            <FormInput 
              label="Nome completo" 
              placeholder="nome completo" 
              {...register('nome_completo', { required: 'Nome é obrigatório' })} 
              required
            />
            <FormInput 
              label="CPF" 
              placeholder="000.000.000-00" 
              {...register('cpf', { required: 'CPF é obrigatório', onChange: (e: ChangeEvent<HTMLInputElement>) => setValue('cpf', formatCPF(e.target.value)), validate: v => (v ? v.replace(/\D/g,'').length === 11 : false) || 'CPF inválido' })} 
              required
            />
            <FormInput 
              label="Email" 
              placeholder="email" 
              {...register('email', { required: 'Email é obrigatório', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' } })} 
              required
            />
            <FormInput 
              label="Senha" 
              placeholder="senha" 
              type="password" 
              {...register('senha', { required: 'Senha é obrigatória', minLength: { value: 8, message: 'Senha mínima 8 caracteres' }, pattern: { value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, message: 'Senha deve conter letras maiúsculas, minúsculas e números' } })} 
              required
            />
            <FormInput 
              label="Confirmar senha" 
              placeholder="confirme a senha" 
              type="password" 
              {...register('confirmPassword', { validate: v => v === watch('senha') || 'As senhas não coincidem' })} 
              required
            />
            <FormInput label="ID da empresa (opcional)" placeholder="id_empresa" {...register('id_empresa')} />
            <FormInput 
              label="Data de nascimento" 
              placeholder="YYYY-MM-DD" 
              type="date" 
              {...register('data_nascimento', { required: 'Data de nascimento é obrigatória' })} 
              required
            />
            <FormInput label="Nível de carreira" placeholder="ex: Junior, Senior" {...register('nivel_carreira')} />
            <FormInput label="Ocupação" placeholder="ocupação" {...register('ocupacao')} />
            <FormInput label="Gênero" placeholder="gênero" {...register('genero')} />
          </>
        )}

        <div className="space-y-3">
          <FormButton type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? 'Criando conta...' : 'Criar conta'}
          </FormButton>
          <p className="link-muted">
            <span className="text-slate-400">Já tem cadastro?</span> <Link to="/" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Faça login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
