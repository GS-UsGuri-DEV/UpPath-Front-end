import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './routes/Login/Login'
import Cadastro from './routes/Cadastro'
import Dashboard from './routes/Dashboard/Dashboard'
import Perfil from './routes/Perfil/Perfil'
import Protected from './routes/Protected/Protected'
import ProtectedAdmin from './routes/ProtectedAdmin/ProtectedAdmin'
import AdminPanel from './routes/AdminPanel'
import Home from './routes/Home'
import FAQ from './routes/FAQ'
import Contato from './routes/Contato'
import NavBar from './components/NavBar/NavBar'

export default function App() {
  const location = useLocation()
  const hideNavBarOn = ['/login', '/cadastro']
  const showNavBar = !hideNavBarOn.includes(location.pathname)

  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contato" element={<Contato />} />
        <Route element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
        <Route element={<ProtectedAdmin />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
