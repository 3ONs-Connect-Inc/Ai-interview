import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const ProtectedRoute = () => {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" replace state={{ from: location.pathname }} />
  );
};

export default ProtectedRoute;
