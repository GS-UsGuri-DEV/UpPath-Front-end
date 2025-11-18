import { useState } from 'react'
import { storage, BUCKET_PUBLIC, ID, db } from '../../shared/appwrite'
import { useAuth } from '../../contexts/useAuth'

interface UploadProfileImageProps {
  onUploadSuccess: (url: string) => void
}

export default function UploadProfileImage({
  onUploadSuccess,
}: UploadProfileImageProps) {
  const { userData, checkAuth } = useAuth()
  const [uploadError, setUploadError] = useState<string | null>(null)

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.type || !f.type.startsWith('image/')) {
      setUploadError(
        'Apenas arquivos de imagem são aceitos (png, jpg, webp, svg, etc.)',
      )
      return
    }
    try {
      const r = await storage.createFile(BUCKET_PUBLIC, ID.unique(), f)
      const url = storage.getFileView(BUCKET_PUBLIC, r.$id).toString()
      onUploadSuccess(url)

      const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
      const COLLECTION_USERS = import.meta.env.VITE_APPWRITE_COLLECTION_USERS
      if (DB_ID && COLLECTION_USERS && userData?.$id) {
        try {
          await db.updateDocument(DB_ID, COLLECTION_USERS, userData.$id, {
            profile_image: url,
          })
          await checkAuth()
        } catch (err) {
          console.error('Error saving profile image in DB', err)
          setUploadError(String((err as Error)?.message ?? err))
        }
      }
    } catch (err) {
      console.error('Error uploading file', err)
      const msg = String((err as Error)?.message ?? err ?? '')
      setUploadError(msg)
    }
  }

  return (
    <section className="rounded-xl border bg-white p-4">
      <h3 className="mb-2 font-semibold">Foto de Perfil</h3>
      <input
        type="file"
        accept="image/*"
        onChange={upload}
        className="block w-full text-sm text-gray-700 file:mr-4 file:rounded file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:text-indigo-700 hover:file:bg-indigo-100"
      />
      {uploadError && (
        <div className="mt-2 text-sm text-red-600">{uploadError}</div>
      )}
    </section>
  )
}
