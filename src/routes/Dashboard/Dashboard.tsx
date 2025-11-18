import { useEffect, useState } from 'react';
import { account, storage, BUCKET_PUBLIC, ID, db } from '../../shared/appwrite';
import type { Models } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import BemEstar from '../../components/BemEstar/BemEstar';
import NavBar from '../../components/NavBar/NavBar';

export default function Dashboard() {
  const [me, setMe] = useState<Models.User<Models.Preferences> | null>(null);
  const [fileUrl, setFileUrl] = useState<string | undefined>();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [lastFileId, setLastFileId] = useState<string | null>(null);
  
  const [editMode, setEditMode] = useState(false);
  const [editNome, setEditNome] = useState('');
  const [editDataNasc, setEditDataNasc] = useState('');
  const [editMessage, setEditMessage] = useState<string | null>(null);
  const nav = useNavigate();
  const { userData, checkAuth } = useAuth();

  // Format date to only show date part (YYYY-MM-DD)
  const formatDate = (dateStr: string | undefined | null) => {
    if (!dateStr) return '—';
    try {
      return dateStr.split('T')[0]; // Remove time part if ISO format
    } catch {
      return dateStr;
    }
  };

  useEffect(() => {
    account.get().then(setMe).catch(() => nav('/'));
  }, [nav]);

  

  useEffect(() => {
    // Initialize edit fields with current data
    if (userData) {
      setEditNome(String((userData as unknown as Record<string, unknown>)?.nome_completo ?? ''));
      setEditDataNasc(formatDate(String((userData as unknown as Record<string, unknown>)?.data_nascimento ?? '')));
    }
  }, [userData]);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    // only accept image types
    if (!f.type || !f.type.startsWith('image/')) {
      setUploadError('Apenas arquivos de imagem são aceitos (png, jpg, webp, svg, etc.)');
      return;
    }
    try {
      const r = await storage.createFile(BUCKET_PUBLIC, ID.unique(), f);
      setLastFileId(r.$id);
      // Use getFileView instead of preview (preview requires paid plan)
      const url = storage.getFileView(BUCKET_PUBLIC, r.$id).toString();
      setFileUrl(url);
      console.log('Uploaded file id:', r.$id, 'url:', url);

      const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
      const COLLECTION_USERS = import.meta.env.VITE_APPWRITE_COLLECTION_USERS;
      if (DB_ID && COLLECTION_USERS && userData?.$id) {
        try {
          await db.updateDocument(DB_ID, COLLECTION_USERS, userData.$id, { profile_image: url });
          // refresh userData from server
          await checkAuth();
        } catch (err) {
          console.error('Error saving profile image in DB', err);
          setUploadError(String((err as Error)?.message ?? err));
        }
      } else if (DB_ID && COLLECTION_USERS && !userData?.$id) {
        // if there's no user document yet, create one and include the profile image
        try {
          const ownerEmail = (me as unknown as Record<string, unknown>)?.email ?? displayEmail ?? '';
          const ownerName = displayName && displayName !== '—' ? displayName : '';
          const payload: Record<string, unknown> = { 
            email: ownerEmail, 
            nome_completo: ownerName,
            cpf: '',
            is_admin: false,
            data_nascimento: '',
            data_cadastro: new Date().toISOString(),
            profile_image: url
          };
          const created = await db.createDocument(DB_ID, COLLECTION_USERS, ID.unique(), payload);
          console.log('Created user document for profile image:', created.$id);
          await checkAuth();
        } catch (err) {
          console.error('Error creating user document and saving profile image', err);
          setUploadError(String((err as Error)?.message ?? err));
        }
      }
    } catch (err) {
      console.error('Error uploading file', err);
      const msg = String((err as Error)?.message ?? err ?? '');
      if (msg.includes('Storage bucket with the requested ID could not be found')) {
        setUploadError('Erro: bucket do Storage não encontrado. Verifique `VITE_APPWRITE_BUCKET_PUBLIC` e se o bucket existe no painel do Appwrite.');
      } else if (msg.includes('not authorized to perform the requested action')) {
        setUploadError('Erro: Sem permissão para upload. Configure as permissões do bucket no Appwrite Console.');
      } else {
        setUploadError(msg);
      }
    }
  }

  // logout handled by NavBar; keep nav available if needed

  const displayName = String(userData?.nome_completo ?? ((me as unknown as Record<string, unknown>)?.name as string) ?? '—');
  const displayEmail = String(((me as unknown as Record<string, unknown>)?.email as string) ?? userData?.email ?? '—');

  const profileImage = String((userData && (userData.profile_image as unknown)) ?? fileUrl ?? '');

  // password change state
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
      setCurrentPass(''); setNewPass(''); setConfirmPass('');
    } catch (err) {
      console.error('Error changing password', err);
      setPwMessage(String((err as Error)?.message ?? err));
    }
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setEditMessage(null);
    if (!userData?.$id) {
      setEditMessage('Documento do usuário não encontrado');
      return;
    }
    try {
      const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
      const COLLECTION_USERS = import.meta.env.VITE_APPWRITE_COLLECTION_USERS;
      await db.updateDocument(DB_ID, COLLECTION_USERS, userData.$id, {
        nome_completo: editNome,
        data_nascimento: editDataNasc
      });
      setEditMessage('Perfil atualizado com sucesso!');
      setEditMode(false);
      await checkAuth();
    } catch (err) {
      console.error('Error updating profile', err);
      setEditMessage(String((err as Error)?.message ?? err));
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <header>
        <NavBar />
      </header>

      <section className="rounded-xl border bg-white p-6 flex items-center gap-6">
        <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center text-xl font-semibold text-gray-500">
          {profileImage ? (
            <>
              <img
                src={profileImage}
                alt="avatar"
                className="w-full h-full object-cover"
                onError={() => {
                  // if SVG/image doesn't load, log URL so user can inspect in Network tab
                  console.error('Avatar failed to load:', profileImage);
                  setFileUrl('');
                }}
              />
            </>
          ) : (
            <span className="inline-block">{displayName.split(' ').map((n: string) => n[0]).slice(0,2).join('')}</span>
          )}
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-lg">{displayName}</h2>
          
          {editMode ? (
            <form onSubmit={handleSaveProfile} className="mt-3 space-y-2">
              <div>
                <label className="text-xs font-medium">Email:</label>
                <p className="text-sm">{displayEmail}</p>
              </div>
              <div>
                <label className="text-xs font-medium block">Data de nascimento:</label>
                <input 
                  type="date" 
                  value={editDataNasc} 
                  onChange={(e) => setEditDataNasc(e.target.value)}
                  className="w-full px-2 py-1 text-sm border rounded"
                />
              </div>
              {editMessage && <p className="text-sm text-green-600">{editMessage}</p>}
              <div className="flex gap-2">
                <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded text-sm">Salvar</button>
                <button type="button" onClick={() => setEditMode(false)} className="px-3 py-1 bg-gray-300 rounded text-sm">Cancelar</button>
              </div>
            </form>
          ) : (
            <>
              <div className="mt-3 text-sm space-y-1">
                <p><strong>Email:</strong> {displayEmail}</p>
                <p><strong>Data de nascimento:</strong> {formatDate(String((userData as unknown as Record<string, unknown>)?.data_nascimento ?? ''))}</p>
                {String((userData as unknown as Record<string, unknown>)?.nivel_carreira ?? '') && (
                  <p><strong>Nível de carreira:</strong> {String((userData as unknown as Record<string, unknown>)?.nivel_carreira)}</p>
                )}
                {String((userData as unknown as Record<string, unknown>)?.ocupacao ?? '') && (
                  <p><strong>Ocupação:</strong> {String((userData as unknown as Record<string, unknown>)?.ocupacao)}</p>
                )}
                {String((userData as unknown as Record<string, unknown>)?.genero ?? '') && (
                  <p><strong>Gênero:</strong> {String((userData as unknown as Record<string, unknown>)?.genero)}</p>
                )}
              </div>
              <div className="mt-4 flex gap-3 items-center">
                <button onClick={() => setEditMode(true)} className="px-3 py-1 rounded bg-gray-200 text-sm">Editar perfil</button>
              </div>
            </>
          )}

          <div className="mt-4 flex gap-3 items-center">
            <label className="px-3 py-1 rounded bg-gray-200 text-sm cursor-pointer">
              Alterar foto
              <input accept="image/*" type="file" onChange={upload} className="hidden" />
            </label>
            <button onClick={() => setShowChange(v => !v)} className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">Alterar senha</button>
          </div>

          {showChange && (
            <form onSubmit={handleChangePassword} className="mt-3 space-y-2">
              <div>
                <label className="text-xs">Senha atual</label>
                <input type="password" value={currentPass} onChange={e => setCurrentPass(e.target.value)} className="w-full mt-1 p-2 border rounded" />
              </div>
              <div>
                <label className="text-xs">Nova senha</label>
                <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} className="w-full mt-1 p-2 border rounded" />
              </div>
              <div>
                <label className="text-xs">Confirme a nova senha</label>
                <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} className="w-full mt-1 p-2 border rounded" />
              </div>
              <div className="flex gap-2 items-center">
                <button type="submit" className="px-3 py-1 rounded bg-green-600 text-white text-sm">Salvar senha</button>
                <button type="button" onClick={() => setShowChange(false)} className="px-3 py-1 rounded bg-gray-200 text-sm">Cancelar</button>
              </div>
              {pwMessage && <p className="text-sm text-red-600">{pwMessage}</p>}
            </form>
          )}
        </div>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="font-semibold mb-2">Dados brutos (debug)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xs font-medium mb-1">Account (me)</h3>
            <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">{JSON.stringify(me, null, 2)}</pre>
          </div>
          <div>
            <h3 className="text-xs font-medium mb-1">User document (userData)</h3>
            <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">{JSON.stringify(userData, null, 2)}</pre>
            <div className="mt-2 text-xs">
              <p>fileUrl: <span className="break-all">{fileUrl ?? '—'}</span></p>
              <p>profile_image (field): <span className="break-all">{String((userData as unknown as Record<string, unknown>)?.profile_image ?? '—')}</span></p>
              <p>lastFileId: <span className="break-all">{lastFileId ?? '—'}</span></p>
              <p>BUCKET_PUBLIC usado: <span className="break-all">{BUCKET_PUBLIC}</span></p>
              {uploadError && <p className="text-sm text-red-600">Erro: {uploadError}</p>}
              {uploadError && (uploadError.includes('bucket do Storage não encontrado') || uploadError.includes('Sem permissão para upload')) && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-300 rounded text-xs">
                  <p className="font-semibold">Como resolver:</p>
                  {uploadError.includes('Sem permissão para upload') ? (
                    <ol className="list-decimal ml-4 mt-1">
                      <li>Acesse Appwrite Console → Storage → Buckets → private-media</li>
                      <li>Vá em Settings → Permissions</li>
                      <li>Em <strong>File create</strong>, adicione:<br/>
                        - Role: <code>Users</code> (para usuários logados)<br/>
                        - Ou Role: <code>Any</code> (para qualquer um — mais fácil para testes)
                      </li>
                      <li>Em <strong>File read</strong>, adicione a mesma role (para ver a imagem depois)</li>
                      <li>Salve e tente o upload novamente</li>
                    </ol>
                  ) : (
                    <ol className="list-decimal ml-4 mt-1">
                      <li>Acesse Appwrite Console → Storage → Buckets</li>
                      <li>Crie um bucket ou copie o ID de um existente</li>
                      <li>No projeto, crie/edite <code>.env.local</code> e adicione:<br/><code>VITE_APPWRITE_BUCKET_PUBLIC=seu-bucket-id</code></li>
                      <li>Reinicie o dev server: <code>pnpm run dev</code></li>
                    </ol>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <BemEstar />

      <section className="rounded-xl border bg-white p-4">
        <h2 className="font-semibold mb-2">Upload (Storage)</h2>
        <input type="file" onChange={upload} />
        {fileUrl && <img src={fileUrl} alt="preview" className="w-28 mt-3 rounded" />}
      </section>
    </div>
  );
}
