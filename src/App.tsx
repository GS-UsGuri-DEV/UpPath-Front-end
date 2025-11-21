import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import AdminPanel from './routes/AdminPanel'
import Cadastro from './routes/Cadastro'
import Contato from './routes/Contato'
import Cursos from './routes/Cursos'
import Dashboard from './routes/Dashboard/Dashboard'
import FAQ from './routes/FAQ'
import Home from './routes/Home'
import Login from './routes/Login/Login'
import Perfil from './routes/Perfil/Perfil'
import Protected from './routes/Protected/Protected'
import ProtectedAdmin from './routes/ProtectedAdmin/ProtectedAdmin'

export default function App() {
  const location = useLocation()
  const hideNavBarOn = ['/login', '/cadastro']
  const showNavBar = !hideNavBarOn.includes(location.pathname)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
        <Route element={<ProtectedAdmin />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
