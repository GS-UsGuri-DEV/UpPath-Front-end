import { useState, useEffect, type ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { LoginFormData } from '../../types/auth';
import { useAuth } from '../../contexts/useAuth';
import FormInput from '../../components/Form/FormInput';
import FormButton from '../../components/Form/FormButton';
import { FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [msg, setMsg] = useState('');
  const nav = useNavigate();
  const { login } = useAuth();

  const { register, handleSubmit, formState, setValue, watch } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
  });
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const emailValue = watch('email');
  const passwordValue = watch('password');

  function formatCPFOrEmail(value: string) {
    const raw = value.trim();

    // Considera email apenas se houver '@' ou letras — não trate um ponto '.' isolado como email
    if (/@/.test(raw) || /[A-Za-z]/.test(raw)) return raw;

    const digits = raw.replace(/\D/g, '').slice(0, 11);
    if (digits.length === 0) return '';
    
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const formatted = formatCPFOrEmail(e.target.value);
    setValue('email', formatted);
  }

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    if (savedEmail && savedPassword) {
      setValue('email', savedEmail);
      setValue('password', savedPassword);
      setRemember(true);
    }
  }, [setValue]);

  async function onSubmit(data: LoginFormData) {
    try {
      await login(data.email, data.password);
      
      if (remember) {
        localStorage.setItem('rememberedEmail', data.email);
        localStorage.setItem('rememberedPassword', data.password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }
      
      nav('/dashboard');
    } catch (e: unknown) {
      const msgText = e instanceof Error ? e.message : String(e);
      setMsg(msgText);
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
                onChange: handleEmailChange
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
                onRightIconClick={() => setShowPassword(s => !s)}
                required
              />

              <div className="flex items-center justify-between text-sm text-slate-400">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded bg-slate-700 border-slate-600" checked={remember} onChange={() => setRemember(s => !s)} />
                  Lembrar-me
                </label>
                <Link to="#" className="text-slate-400 hover:text-white">Esqueceu a senha?</Link>
              </div>
            </div>

            <div className="space-y-3">
              <FormButton type="submit" disabled={formState.isSubmitting}>
                {formState.isSubmitting ? 'Entrando...' : (
                  <>
                    <span>Entrar</span>
                    <FaArrowRight />
                  </>
                )}
              </FormButton>
              <Link 
                to="/cadastro" 
                className="block text-center text-sm"
              >
                <span className="text-slate-400">Não tem conta?</span> <span className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Criar conta</span>
              </Link>
            </div>
        </form>
      </div>
    </div>
  );
}
