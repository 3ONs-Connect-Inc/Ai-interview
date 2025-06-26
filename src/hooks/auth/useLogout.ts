
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../firebase/auth";



const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {  
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);  
    }
  };

  return { handleLogout };
};

export default useLogout;
