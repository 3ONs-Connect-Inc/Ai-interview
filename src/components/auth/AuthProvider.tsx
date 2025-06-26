import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { auth, db } from "../../firebase/config";
import { roleRoutes, type Role } from "../../types";
import { FullScreenLoader } from "../ui/Spinner";

const publicRoutes = ["/", "/sign-in", "/sign-up", "/unauthorized"];

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser, setRole, setLoading, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUser({ ...firebaseUser, ...userData });
          setRole(userData.role);

          if (
            publicRoutes.includes(location.pathname) &&
            !["/sign-in", "/sign-up"].includes(location.pathname)
          ) {
            let redirectPath = "/";
            if (userData.role === "Company" && userData.companyId) {
              redirectPath = roleRoutes.Company(userData.companyId);
            } else if (["Admin", "User"].includes(userData.role)) {
              const role = userData.role as Exclude<Role, "Company">;
              redirectPath = roleRoutes[role]();
            }

            //  Only navigate if not already at the correct path
            if (location.pathname !== redirectPath) {
              navigate(redirectPath, { replace: true });
            }
          }
        } else {
          setUser(null);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false); // ✅ mark session as checked
    });

    return () => unsubscribe();
  }, [setUser, setRole, setLoading, navigate, location]);

  //  Only render app once session is known
  if (loading) return <FullScreenLoader />;

  return <>{children}</>;
};

export default AuthProvider;
