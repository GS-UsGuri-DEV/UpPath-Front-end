import { useState } from 'react'
import { account } from '../../shared/appwrite'

export default function ChangePassword() {
  const [showChange, setShowChange] = useState(false)
  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [pwMessage, setPwMessage] = useState<string | null>(null)

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setPwMessage(null)
    if (!newPass || newPass !== confirmPass) {
      setPwMessage('Confirme a nova senha corretamente')
      return
    }
    try {
      const acct = account as unknown as {
        updatePassword?: (
          newPassword: string,
          oldPassword?: string,
        ) => Promise<unknown>
      }
      if (typeof acct.updatePassword !== 'function') {
        throw new Error(
          'SDK não expõe updatePassword (verifique a versão do Appwrite)',
        )
      }
      await acct.updatePassword(newPass, currentPass)
      setPwMessage('Senha atualizada com sucesso')
      setShowChange(false)
      setCurrentPass('')
      setNewPass('')
      setConfirmPass('')
    } catch (err) {
      console.error('Error changing password', err)
      setPwMessage(String((err as Error)?.message ?? err))
    }
  }

  return (
    <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
      <h3 className="mb-2 font-semibold">Alterar Senha</h3>
      {!showChange ? (
        <button
          onClick={() => setShowChange(true)}
          className="rounded bg-[var(--accent-primary)] px-3 py-1 text-sm text-white hover:bg-[var(--accent-primary-hover)]"
        >
          Trocar Senha
        </button>
      ) : (
        <form onSubmit={handleChangePassword} className="space-y-2">
          <input
            type="password"
            placeholder="Senha Atual"
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
            className="block w-full rounded border border-[var(--input-border)] p-2 text-sm"
          />
          <input
            type="password"
            placeholder="Nova Senha"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="block w-full rounded border border-[var(--input-border)] p-2 text-sm"
          />
          <input
            type="password"
            placeholder="Confirmar Nova Senha"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="block w-full rounded border border-[var(--input-border)] p-2 text-sm"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded bg-[var(--accent-primary)] px-3 py-1 text-sm text-white hover:bg-[var(--accent-primary-hover)]"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => setShowChange(false)}
              className="rounded bg-[var(--bg-tertiary)] px-3 py-1 text-sm"
            >
              Cancelar
            </button>
          </div>
          {pwMessage && (
            <div className="text-sm text-[var(--accent-success)]">
              {pwMessage}
            </div>
          )}
        </form>
      )}
    </section>
  )
}
