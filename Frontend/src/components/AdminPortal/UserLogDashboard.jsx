
import { useEffect } from "react";
import {
    LayoutDashboard,
    Database,
    LogOut,
    ArrowLeft
} from 'lucide-react';
import { useNavigate, Outlet, Link, NavLink, useLocation } from "react-router-dom";

export default function UserLogDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const logo = "/images/logo-bg.webp";

    useEffect(() => {
        const token = localStorage.getItem("employeeToken");
        const user = JSON.parse(localStorage.getItem("employeeUser") || "{}");
        if (!token) {
            navigate("/login");
        } else if (user.role !== 'admin') {
            navigate("/gai-portal");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("employeeToken");
        localStorage.removeItem("employeeUser");
        navigate("/login");
    };

    const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes("data")) return "User Records";
        return "User Analytics Dashboard";
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">

            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm relative">
    {/* Logo Section */}
    <div className="p-6 pt-8 flex items-center justify-center border-b border-gray-50/50">
        <Link to="/">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>
    </div>

    {/* Navigation Links */}
    <nav className="flex-1 px-4 space-y-1.5 mt-6 overflow-y-auto">
        <Link 
            to="/gai-portal" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all font-medium mb-4"
        >
            <ArrowLeft size={18} />
            <span>Back to Portal</span>
        </Link>

        <NavLink
            to="/gai-portal/user-logs"
            end
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    isActive
                        ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`
            }
        >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
        </NavLink>

        <NavLink
            to="data"
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    isActive
                        ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`
            }
        >
            <Database size={20} />
            <span>User Data</span>
        </NavLink>
    </nav>

    {/* Bottom Section: Logout */}
    <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-xl transition-colors font-medium hover:shadow-sm"
        >
            <LogOut size={20} />
            Logout
        </button>
    </div>
</aside>

            {/* Main Section Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 z-30"></div>

                {/* Header */}
                <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8 border-b border-gray-100 flex-shrink-0 z-10">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                            {getPageTitle()}
                        </h1>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
                    <div className="max-w-7xl mx-auto pb-10">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
