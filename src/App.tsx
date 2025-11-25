import { Route, Routes, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Cadastro from './routes/Cadastro'
import Contato from './routes/Contato'
import Cursos from './routes/Cursos'
import Dashboard from './routes/Dashboard/Dashboard'
import DashboardEmpresa from './routes/DashboardEmpresa'
import Dicas from './routes/Dicas'
import Error404 from './routes/Error'
import FAQ from './routes/FAQ'
import Home from './routes/Home'
import Login from './routes/Login/Login'
import Perfil from './routes/Perfil/Perfil'
import Privacidade from './routes/Privacidade'
import Protected from './routes/Protected/Protected'
import ProtectedCompany from './routes/ProtectedCompany/ProtectedCompany'
import Questionario from './routes/Questionario'
import Termos from './routes/Termos'
import Integrantes from './routes/integrantes/integrantes'

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
        <Route path="/dicas" element={<Dicas />} />
        <Route path="/questionario" element={<Questionario />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
        <Route element={<ProtectedCompany />}>
          <Route path="/dashboard-empresa" element={<DashboardEmpresa />} />
        </Route>
        <Route path="*" element={<Error404 />} />
        <Route path="/integrantes*" element={<Integrantes />} />
      </Routes>
    </div>
  )
}
