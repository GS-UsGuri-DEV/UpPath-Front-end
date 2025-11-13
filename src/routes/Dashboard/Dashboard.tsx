import { useEffect, useState } from 'react';
import { account, storage, BUCKET_PUBLIC, ID } from '../../shared/appwrite';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';

export default function Dashboard() {
  const [me, setMe] = useState<unknown | null>(null);
  const [fileUrl, setFileUrl] = useState<string | undefined>();
  const nav = useNavigate();
  const { logout, userData } = useAuth();

  useEffect(() => {
    account.get().then(setMe).catch(() => nav('/'));
  }, [nav]);

  async function upload(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.target.files?.[0]; if(!f) return;
    const r = await storage.createFile(BUCKET_PUBLIC, ID.unique(), f);
    const url = storage.getFilePreview(BUCKET_PUBLIC, r.$id);
    setFileUrl(url);
  }

  async function handleLogout() {
    await logout();
    nav('/');
  }  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">UpPath — Dashboard</h1>
          {userData && (
            <p className="text-sm text-gray-600">
              {userData.nome_completo} {userData.is_admin && <span className="text-blue-600 font-semibold">(Admin)</span>}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          {userData?.is_admin && (
            <Link to="/admin" className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
              Painel Admin
            </Link>
          )}
          <button onClick={handleLogout} className="px-3 py-1 rounded bg-gray-800 text-white">Sair</button>
        </div>
      </header>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="font-semibold mb-2">Minha conta</h2>
        <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">{JSON.stringify(me, null, 2)}</pre>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="font-semibold mb-2">Upload (Storage)</h2>
        <input type="file" onChange={upload} />
        {fileUrl && <img src={fileUrl} alt="preview" className="w-28 mt-3 rounded" />}
      </section>
    </div>
  );
}
