import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.reload().then(() => {
          if (user.emailVerified) {
            navigate("/");
          } else {
            navigate("/sign-in");
          }
        });
      } else {
        navigate("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [navigate]);  
};

export default useAuthRedirect;
