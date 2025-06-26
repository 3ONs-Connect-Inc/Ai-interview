import { Outlet } from "react-router-dom";
import Nav from "../../components/Nav";

interface LayoutProps {
  showSidebar?: boolean;
}

const MainLayout: React.FC<LayoutProps> = ({ showSidebar = false }) => (
  <>
    <Nav showSidebar={showSidebar}/>
      <Outlet />
  </>
);

export default MainLayout;