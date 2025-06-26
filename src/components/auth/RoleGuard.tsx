import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";


interface RoleGuardProps {
  allowedRoles: ("Admin" | "User" | "Company")[];
}

const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
  const { role, loading } = useAuthStore();

  if (loading) return <div>Loading...</div>;

  return role && allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default RoleGuard;
