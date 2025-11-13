import { useState } from 'react';
import { account } from '../../shared/appwrite';
import { ID } from 'appwrite';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [msg,setMsg] = useState('');
  const nav = useNavigate();

  async function signup(){
    try{
      await account.create(ID.unique(), email, password);
      await account.createEmailPasswordSession(email, password);
      nav('/dashboard');
    }catch(e: unknown){
      const msgText = e instanceof Error ? e.message : String(e);
      setMsg(msgText);
    }
  }

  async function signin(){
    try{
      await account.createEmailPasswordSession(email, password);
      nav('/dashboard');
    }catch(e: unknown){
      const msgText = e instanceof Error ? e.message : String(e);
      setMsg(msgText);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-sm bg-white rounded-xl shadow p-6 space-y-3">
        <h1 className="text-xl font-semibold">UpPath — Login</h1>
        {msg && <p className="text-sm text-red-600">{msg}</p>}
        <input className="w-full border rounded p-2" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="flex gap-2">
          <button onClick={signup} className="flex-1 bg-green-600 text-white rounded p-2">Sign up</button>
          <button onClick={signin} className="flex-1 bg-blue-600 text-white rounded p-2">Login</button>
        </div>
      </div>
    </div>
  );
}
