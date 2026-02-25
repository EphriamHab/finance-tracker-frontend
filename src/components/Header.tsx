/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search, Bell, Menu } from "lucide-react";
import { useGetCurrentUserQuery } from "../app/api";

const Header = ({ collapsed, setCollapsed, setMobileOpen }: any) => {
  const { data: user } = useGetCurrentUserQuery({});

  const username = user?.username || "User";

  const initials = username
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="h-20 px-8 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-30">

      {/* ✅ Left Section */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu Button → Opens Drawer */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-200 transition"
        >
          <Menu size={20} />
        </button>

        {/* Desktop Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block p-2 rounded-lg hover:bg-slate-200 transition"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className="relative w-64 lg:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* ✅ Right Section */}
      <div className="flex items-center gap-4">
        <Bell className="text-slate-400 cursor-pointer" size={20} />

        <div className="flex items-center gap-3 bg-white p-1 pr-4 rounded-full shadow-sm border border-slate-200">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
            {initials}
          </div>

          <span className="text-sm font-semibold">
            {username}
          </span>
        </div>
      </div>

    </header>
  );
};

export default Header;