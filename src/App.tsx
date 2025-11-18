import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './routes/Login/Login'
import Cadastro from './routes/Cadastro'
import Dashboard from './routes/Dashboard/Dashboard'
import Protected from './routes/Protected/Protected'
import ProtectedAdmin from './routes/ProtectedAdmin/ProtectedAdmin'
import AdminPanel from './routes/AdminPanel'
import Home from './routes/Home'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route element={<Protected />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<ProtectedAdmin />}>
        <Route path="/admin" element={<AdminPanel />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
