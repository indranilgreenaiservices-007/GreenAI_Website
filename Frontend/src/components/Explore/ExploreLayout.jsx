
import React from "react";
import {
    LayoutDashboard,
    Mic,
    ShieldCheck,
    Scale,
    ArrowLeft,
    LogOut,
    UserCircle
} from 'lucide-react';
import { useNavigate, Outlet, Link, NavLink, useLocation } from "react-router-dom";
import logo from "../images/logo-bg.webp";

export default function ExploreLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const userData = JSON.parse(localStorage.getItem("platformUser") || "{}");
    const userName = userData.name || "Enterprise User";

    const handleLogout = () => {
        localStorage.removeItem("platformToken");
        localStorage.removeItem("platformUser");
        navigate("/auth/login");
    };

    const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes("clics")) return "CLiCS — Voice & Multilingual AI";
        if (path.includes("regintel")) return "RegIntel 360 — ESG & Compliance";
        if (path.includes("vidhilab")) return "VidhiLab — Legal & Tender Intelligence";
        return "Enterprise Solutions Dashboard";
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">

            {/* 1. Sidebar */}
            <aside className="w-72 bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm relative">
                <div className="p-6 pt-8 flex items-center justify-center border-b border-gray-50/50">
                    <Link to="/">
                        <img src={logo} alt="GreenAI" className="h-10 w-auto" />
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 mt-6 overflow-y-auto">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all font-medium mb-4">
                        <ArrowLeft size={18} />
                        <span>Back to Home</span>
                    </Link>

                    <NavLink
                        to="/dashboard"
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
                        to="/dashboard/clics"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`
                        }
                    >
                        <Mic size={20} />
                        <span>CLiCS</span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/regintel"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`
                        }
                    >
                        <ShieldCheck size={20} />
                        <span>RegIntel 360</span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/vidhilab"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`
                        }
                    >
                        <Scale size={20} />
                        <span>VidhiLab</span>
                    </NavLink>
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/30 space-y-2">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all font-medium"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>

                    <div className="pt-2 flex items-center gap-3 px-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                            <ShieldCheck size={16} className="text-emerald-600" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest leading-none mb-1">Secure Access</span>
                            <span className="text-[9px] text-gray-500 uppercase">Enterprise Protocol</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* 2. Main content Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Visual Top Bar decoration consistent with HR Portal */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500 z-30"></div>

                {/* Header Section */}
                <header className="h-20 bg-white shadow-sm flex items-center justify-between px-10 border-b border-gray-100 flex-shrink-0 z-10">
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                        {getPageTitle()}
                    </h1>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                            <div className="flex flex-col items-end">
                                {/* <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Authorized User</span> */}
                                <span className="text-sm font-bold text-emerald-600">{userName}</span>
                            </div>
                            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
                                <UserCircle size={22} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content area */}
                <main className="flex-1 overflow-y-auto bg-slate-50/50 p-10">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
