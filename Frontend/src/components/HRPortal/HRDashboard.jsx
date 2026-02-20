
import { useEffect } from "react";
import {
    LayoutDashboard,
    Users,
    Briefcase,
    UserPlus,
    LogOut,
    Settings,
    CalendarDays,
    ArrowLeft
} from 'lucide-react';
import { useNavigate, Outlet, Link, NavLink, useLocation } from "react-router-dom";

export default function HRDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const logo = "/images/logo-bg.webp";

    useEffect(() => {
        const token = localStorage.getItem("employeeToken");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const user = JSON.parse(localStorage.getItem("employeeUser") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("employeeToken");
        localStorage.removeItem("employeeUser");
        navigate("/login");
    };

    // --- Dynamic Title Logic ---
    const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes("employees")) return "Employee Management";
        if (path.includes("jobs")) return "Job Postings";
        if (path.includes("applicants")) return "Review the Applications";
        if (path.includes("interviews")) return "Interview Scheduling";
        if (path.includes("settings")) return "Portal Settings";
        return "HR Dashboard";
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">

            {/* 1. Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm relative">
                <div className="p-6 pt-8 flex items-center justify-center border-b border-gray-50/50">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="h-10 w-auto" />
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 mt-6 overflow-y-auto">
                    <Link to="/gai-portal" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all font-medium mb-4">
                        <ArrowLeft size={18} />
                        <span>Back to Portal</span>
                    </Link>

                    <NavLink
                        to="/gai-portal/hr"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`
                        }
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="employees"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`
                        }
                    >
                        <Users size={20} />
                        <span>Employees</span>
                    </NavLink>

                    <NavLink
                        to="jobs"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`
                        }
                    >
                        <Briefcase size={20} />
                        <span>Jobs</span>
                    </NavLink>

                    <NavLink
                        to="applicants"
                        className={({ isActive }) =>
                            `flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`
                        }
                    >
                        <div className="flex items-center gap-3">
                            <UserPlus size={20} />
                            <span>Applicants</span>
                        </div>
                    </NavLink>

                    <NavLink
                        to="interviews"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`
                        }
                    >
                        <CalendarDays size={20} />
                        <span>Interviews</span>
                    </NavLink>
                </nav>

                {/* Bottom Section: Settings & Logout */}
                <div className="p-4 border-t border-gray-100 space-y-1 bg-gray-50/50">
                    {/* <NavLink
                        to="settings"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200"
                                : "text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm"
                            }`
                        }
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </NavLink> */}

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-xl transition-colors font-medium hover:shadow-sm"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* 2. Main Section Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500 z-30"></div>

                {/* Dynamic Header */}
                <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8 border-b border-gray-100 flex-shrink-0 z-10">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 tracking-tight transition-all duration-300">
                            {getPageTitle()}
                        </h1>
                        
                    </div>

                    <div className="flex items-center gap-3">
                        
                        
                    </div>
                </header>

                {/* Dynamic Content Scroll Area */}
                <main className="flex-1 overflow-y-auto p-8 bg-slate-50 scroll-smooth">
                    <div className="max-w-7xl mx-auto pb-10">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
