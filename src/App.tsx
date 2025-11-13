import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './routes/Login/Login';
import Dashboard from './routes/Dashboard/Dashboard';
import Protected from './routes/Protected/Protected';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Protected />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
