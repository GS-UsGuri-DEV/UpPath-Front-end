import { useState } from 'react'
import { BUCKET_PUBLIC, ID, storage } from '../../shared/appwrite'

import type { UploadProfileImageProps } from '../../types/profile'

export default function UploadProfileImage({
  onUploadSuccess,
}: UploadProfileImageProps) {
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
      const url = storage.getFileView(BUCKET_PUBLIC, r.$id)
      onUploadSuccess(url.toString())
      setUploadError(null)
    } catch (err) {
      console.error('Error uploading file', err)
      const msg = String((err as Error)?.message ?? err ?? '')
      setUploadError(msg)
    }
  }

  return (
    <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
      <h3 className="mb-2 font-semibold text-[var(--text-primary)]">
        Foto de Perfil
      </h3>
      <input
        type="file"
        accept="image/*"
        onChange={upload}
        className="block w-full text-sm text-[var(--text-secondary)] file:mr-4 file:rounded-lg file:border-2 file:border-indigo-500 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 file:transition-all hover:file:border-indigo-600 hover:file:bg-indigo-100 dark:file:bg-indigo-950/30 dark:file:text-indigo-400 dark:hover:file:bg-indigo-950/50"
      />
      {uploadError && (
        <div className="mt-2 text-sm text-[var(--accent-danger)]">
          {uploadError}
        </div>
      )}
    </section>
  )
}
