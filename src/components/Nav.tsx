import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { signOut } from "firebase/auth";
import { useAuthStore } from "../store/useAuthStore";
import { auth } from "../firebase/config";
import "../styles/nav.scss";
import useClickOutside from "../hooks/useClickOutside";
import { Link } from "react-router-dom";
import { Logo } from "./ui/Logo";
import Sidebar from "./company/layouts/sidebar";

interface NavProps {
  showSidebar?: boolean;
}

const Nav: React.FC<NavProps> = ({ showSidebar = true }) => {
  const { user } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileRef = useRef<HTMLDivElement | null>(null);

  useClickOutside([dropdownRef], () => setDropdownOpen(false));
  useClickOutside([mobileRef], ()  => setMobileOpen(false));


  const handleLogout = () => {
    signOut(auth);
    setDropdownOpen(false);
  };

  return (
    <nav className="nav">
      <div className="nav__container">
        <Logo />

        <div className="nav__auth" ref={dropdownRef}>
          <button
            className="nav__signin"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {user ? (
              <span className="max-w-[200px] truncate inline-flex items-center gap-2">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}{" "}
                Welcome back,{" "}
                {user.firstName ?? user.displayName?.split(" ")[0] ?? "User"}
              </span>
            ) : (
              <Link to="/sign-in">Sign In</Link>
            )}
          </button>

          {dropdownOpen && (
            <div className="nav__dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

        <button
          className="nav__mobile-toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
       <div ref={mobileRef}>
        <div className="nav__mobile-menu" >
           
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            {user ? (
              <span className="max-w-[200px] truncate inline-flex items-center gap-2">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}{" "}
                Welcome back,{" "}
                {user.firstName ?? user.displayName?.split(" ")[0] ?? "User"}
              </span>
            ) : (
              <Link to="/sign-in">Sign In</Link>
            )}
          </button>
          {dropdownOpen && (
            <div
              className="nav__dropdown nav__dropdown--mobile"
              ref={dropdownRef}
            >
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
     
        </div>
             {showSidebar && <Sidebar  
             isMobile 
             collapsed={false} 
             />}
       </div>
      )}
    </nav>
  );
};

export default Nav;
