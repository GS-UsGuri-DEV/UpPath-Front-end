import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { LoginFormData } from '../../types/auth';
import { useAuth } from '../../contexts/useAuth';
import FormInput from '../../components/Form/FormInput';
import FormButton from '../../components/Form/FormButton';

export default function Login() {
  const [msg, setMsg] = useState('');
  const nav = useNavigate();
  const { login } = useAuth();

  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      await login(data.email, data.password);
      nav('/dashboard');
    } catch (e: unknown) {
      const msgText = e instanceof Error ? e.message : String(e);
      setMsg(msgText);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-xl font-semibold">UpPath — Login</h1>
        {msg && <p className="text-sm text-red-600">{msg}</p>}

        <FormInput label="Email" placeholder="email" {...register('email')} />
        <FormInput label="Senha" placeholder="senha" type="password" {...register('password')} />

        <div className="space-y-2">
          <FormButton type="submit" disabled={formState.isSubmitting}>Login</FormButton>
          <Link to="/cadastro" className="block text-center text-sm text-blue-600">Criar conta</Link>
        </div>
      </form>
    </div>
  );
}
