import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const sidebarWidth = collapsed ? "lg:ml-20" : "lg:ml-64";

    return (
        <div className="flex min-h-screen text-slate-700 font-sans">

            <Sidebar
                collapsed={collapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />
            <div
                className={`
          flex-1 flex flex-col transition-all duration-300
          ${sidebarWidth}
        `}
            >
                <Header
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    setMobileOpen={setMobileOpen}
                />

                <main className="p-4 md:p-8 flex-1 bg-[#F8F9FE]">
                    <Outlet />
                </main>
            </div>

        </div>
    );
};

export default Layout;