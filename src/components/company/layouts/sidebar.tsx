import { forwardRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { companyLinks } from "../../../constants";
import { cn } from "../../../lib/utils";
import '../styles/layout/sidebar.scss'


export interface SidebarProps {
  collapsed?: boolean;
   isMobile?: boolean;
   
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ collapsed = false, isMobile = false  }, ref) => {
 const { companyId } = useParams<{ companyId: string }>();

    const links = companyLinks(companyId ?? ""); // provide fallback or handle null

    const [openSections, setOpenSections] = useState<Record<string, boolean>>(
      () => Object.fromEntries(links.map((link) => [link.title, true]))
    );

    const toggleSection = (title: string) => {
      setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    return (
      <aside
        ref={ref}
        className={cn(
          "sidebar",
          collapsed ? "sidebar--collapsed" : "",
          isMobile && "sidebar--mobile"
        )}
      >
        

        <div className="sidebar__nav">  
          {links.map((group) => {
            const isOpen = openSections[group.title];

            return (
              <nav key={group.title} className="sidebar__group">
                <p
                  className="sidebar__group-title"
                  onClick={() => toggleSection(group.title)}
                >
                  {group.title}
                </p>
                {isOpen &&
                  group.links.map((link) => (
                    <NavLink
                      key={link.label}
                      to={link.path}
                      end//={link.path === "/admin"}
                      state={  
                        link.label === "Dashboard"
                          ? { openFromSidebar: true }
                          : undefined
                      }
                      className={({ isActive }) =>
                        cn(  
                          "sidebar__item",
                          isActive && ` sidebar__item--active`,
                          collapsed && "sidebar__item--collapsed"
                        )
                      }
                    >
                      <link.icon size={22} className="sidebar__icon" />
                      {!collapsed && (
                        <p className="sidebar__label">{link.label}</p>
                      )}
                    </NavLink>
                  ))}
              </nav>
            );
          })}
        </div>
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";
export default Sidebar;