/* eslint-disable @typescript-eslint/no-explicit-any */
import { LayoutDashboard, ArrowLeftRight, LogOut, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const Sidebar = ({ collapsed, mobileOpen, setMobileOpen }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: ArrowLeftRight },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const navClass = (path: string) => {
    const active = location.pathname === path;

    return `
      flex items-center gap-3 rounded-xl transition-all w-full p-3
      ${active
        ? "bg-indigo-600 text-white shadow-lg"
        : "text-slate-500 hover:bg-slate-50"}
      ${collapsed ? "lg:justify-center" : ""}
    `;
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`
          bg-white border-r border-slate-100 flex flex-col
          transition-all duration-300 z-50 p-6
          fixed top-0 left-0 h-screen
          ${mobileOpen
            ? "translate-x-0 w-64 shadow-2xl"
            : "-translate-x-full lg:translate-x-0"}

          ${collapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md shrink-0">
              $
            </div>

            {(!collapsed || mobileOpen) && (
              <span className="text-xl font-bold text-slate-800 whitespace-nowrap">
                FinanceTrack
              </span>
            )}
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 space-y-2 w-full">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={navClass(item.path)}
              >
                <div className="flex items-center justify-center w-5 h-5 shrink-0">
                  <Icon size={20} />
                </div>

                {(!collapsed || mobileOpen) && (
                  <span className="text-sm font-medium whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-slate-100 pt-4 mt-auto">
          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-3 cursor-pointer text-slate-500 hover:text-rose-500
              w-full p-3 transition-colors
              ${collapsed ? "lg:justify-center" : ""}
            `}
          >
            <div className="flex items-center justify-center w-5 h-5 shrink-0">
              <LogOut size={20} />
            </div>

            {(!collapsed || mobileOpen) && (
              <span className="text-sm font-medium">
                Logout
              </span>
            )}
          </button>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;