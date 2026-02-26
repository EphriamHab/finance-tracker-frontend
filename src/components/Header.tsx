/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search, Bell, Menu } from "lucide-react";
import { useGetCurrentUserQuery } from "../app/api";
import { useMemo, useRef, useState } from "react";
import { searchIndex } from "../libs/SearchIndex";
import { useNavigate } from "react-router-dom";

const Header = ({ collapsed, setCollapsed, setMobileOpen }: any) => {
  const { data: user } = useGetCurrentUserQuery({});
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const username = user?.username || "User";

  const initials = username
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);


  const results = useMemo(() => {
    if (!query) return [];
    return searchIndex.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  const handleSelect = (path: any) => {
    navigate(path);
    setQuery('');
    setOpen(false);
  };



  return (
    <header className="h-20 px-8 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-30">


      <div className="flex items-center gap-4">


        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-200 transition"
        >
          <Menu size={20} />
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block p-2 rounded-lg hover:bg-slate-200 transition"
        >
          <Menu size={20} />
        </button>
        <div className="relative w-64 lg:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm focus:ring-1 focus:ring-indigo-100"
          />

          {open && results.length > 0 && (
            <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-64 overflow-auto">
              {results.map((item) => (
                <button
                  key={item.path}
                  onMouseDown={() => handleSelect(item.path)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {open && query && results.length === 0 && (
            <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-md shadow-lg px-3 py-2 text-sm text-slate-500">
              No results found
            </div>
          )}
        </div>
      </div>
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