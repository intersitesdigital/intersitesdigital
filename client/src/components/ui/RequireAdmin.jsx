import { Navigate } from 'react-router-dom';

function RequireAdmin({ children }) {
  const token = localStorage.getItem('admin_token');
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
}

export default RequireAdmin;
