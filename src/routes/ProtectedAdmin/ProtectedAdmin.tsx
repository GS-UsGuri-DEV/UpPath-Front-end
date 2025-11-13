import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';

export default function ProtectedAdmin() {
  const { user, userData, loading } = useAuth();
  const loc = useLocation();

  if (loading) return <div className="p-6">Carregando...</div>;
  if (!user) return <Navigate to="/" state={{ from: loc }} replace />;
  if (!userData?.is_admin) return <Navigate to="/dashboard" state={{ from: loc }} replace />;
  
  return <Outlet />;
}
