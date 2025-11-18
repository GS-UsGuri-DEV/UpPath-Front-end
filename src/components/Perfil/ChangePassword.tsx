import { useState } from 'react';
import { account } from '../../shared/appwrite';

export default function ChangePassword() {
  const [showChange, setShowChange] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [pwMessage, setPwMessage] = useState<string | null>(null);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMessage(null);
    if (!newPass || newPass !== confirmPass) {
      setPwMessage('Confirme a nova senha corretamente');
      return;
    }
    try {
      const acct = account as unknown as { updatePassword?: (newPassword: string, oldPassword?: string) => Promise<unknown> };
      if (typeof acct.updatePassword !== 'function') {
        throw new Error('SDK não expõe updatePassword (verifique a versão do Appwrite)');
      }
      await acct.updatePassword(newPass, currentPass);
      setPwMessage('Senha atualizada com sucesso');
      setShowChange(false);
      setCurrentPass(''); 
      setNewPass(''); 
      setConfirmPass('');
    } catch (err) {
      console.error('Error changing password', err);
      setPwMessage(String((err as Error)?.message ?? err));
    }
  }

  return (
    <section className="rounded-xl border bg-white p-4">
      <h3 className="font-semibold mb-2">Alterar Senha</h3>
      {!showChange ? (
        <button onClick={() => setShowChange(true)} className="px-3 py-1 bg-gray-600 text-white rounded text-sm">Trocar Senha</button>
      ) : (
        <form onSubmit={handleChangePassword} className="space-y-2">
          <input 
            type="password" 
            placeholder="Senha Atual" 
            value={currentPass} 
            onChange={(e) => setCurrentPass(e.target.value)} 
            className="block w-full p-2 border rounded text-sm" 
          />
          <input 
            type="password" 
            placeholder="Nova Senha" 
            value={newPass} 
            onChange={(e) => setNewPass(e.target.value)} 
            className="block w-full p-2 border rounded text-sm" 
          />
          <input 
            type="password" 
            placeholder="Confirmar Nova Senha" 
            value={confirmPass} 
            onChange={(e) => setConfirmPass(e.target.value)} 
            className="block w-full p-2 border rounded text-sm" 
          />
          <div className="flex gap-2">
            <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Salvar</button>
            <button type="button" onClick={() => setShowChange(false)} className="px-3 py-1 bg-gray-200 rounded text-sm">Cancelar</button>
          </div>
          {pwMessage && <div className="text-sm text-green-600">{pwMessage}</div>}
        </form>
      )}
    </section>
  );
}
