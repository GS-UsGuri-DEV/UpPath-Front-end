import { Client, Account, Databases, Storage, ID, Permission, Role } from 'appwrite'

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT
const project = import.meta.env.VITE_APPWRITE_PROJECT ?? import.meta.env.VITE_APPWRITE_PROJECT_ID
if (!endpoint || !project) {
  throw new Error('Defina ENDPOINT e PROJECT no .env')
}

export const client = new Client().setEndpoint(endpoint).setProject(project)
export const account = new Account(client)
export const db = new Databases(client)
export const storage = new Storage(client)

export { ID, Permission, Role }
export const BUCKET_PUBLIC = import.meta.env.VITE_APPWRITE_BUCKET_PUBLIC || 'public-media'
