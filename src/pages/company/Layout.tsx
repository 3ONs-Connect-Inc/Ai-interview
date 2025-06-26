import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Sidebar } from "../../components/company/layouts/sidebar";
import useClickOutside from "../../hooks/useClickOutside";
import { cn } from "../../lib/utils";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

interface LayoutProps {
  showSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ showSidebar = true }) => {
  const isDesktopDevice = useMediaQuery("(min-width: 896px)");
  const [collapsed, setCollapsed] = useState<boolean>(() => !isDesktopDevice);

  const sidebarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setCollapsed(!isDesktopDevice);
  }, [isDesktopDevice]);

  useClickOutside([sidebarRef], () => {
    if (!isDesktopDevice && !collapsed) {
      setCollapsed(true);
    }
  });

  return (
    <>
      <div className="min-h-screen  transition-colors dark:bg-slate-950">
        <Nav showSidebar={showSidebar}/>
        <div
          className={cn(
            "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
            !collapsed &&
              "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30"
          )}
        />
       {showSidebar && isDesktopDevice && <Sidebar ref={sidebarRef} collapsed={collapsed} />}

        <div
          className={cn(
            "transition-[margin] duration-300",
            collapsed ? "md:ml-[70px]" : "md:ml-[240px]"
          )}
        >
          <div className="  overflow-y-auto overflow-x-auto p-6">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
