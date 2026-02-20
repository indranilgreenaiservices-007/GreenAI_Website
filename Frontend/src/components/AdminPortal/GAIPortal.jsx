
import { useNavigate } from 'react-router-dom';
import { HardDrive, LayoutDashboard, Users, Shield, LogOut } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const DRIVE_URL =
    'https://drive.google.com/drive/u/3/folders/1yjFZdTG3vY7vhwn0X_myn90QD8AykwQn';

const GAIPortal = () => {
    const navigate = useNavigate();
    const logo = '/logo.webp';
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('employeeUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('employeeToken');
        localStorage.removeItem('employeeUser');
        navigate('/login');
    };

    const handleDriveAccess = () => {
        window.location.href = DRIVE_URL;
    };

    const handleInternalPortal = () => {
        window.location.href = 'https://internal.greenai.services/';
    };

    const handleHRPortal = () => {
        navigate("/gai-portal/hr");
    };

    const handleAdminAccess = () => {
        navigate("/gai-portal/admin");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 hover:text-red-600 transition-all text-sm font-medium text-slate-600"
            >
                <LogOut size={16} /> Logout
            </button>

            <div className="max-w-6xl my-12 w-full">
                <div className="text-center mb-12">
                    <img src={logo} alt="GreenAI Logo" className="h-16 mx-auto mb-4" />
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Welcome to GAI Internal
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Logged in as: <span className="font-semibold text-green-700">{user?.name || 'Employee'}</span>
                    </p>
                </div>

                <div className="flex  gap-6 md:gap-8 justify-center">
                    {/* 1. HR Portal Option */}
                    <div
                        onClick={handleHRPortal}
                        className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all hover:scale-105 border-2 border-transparent hover:border-green-500 flex flex-col items-center text-center h-full group"
                    >
                        <div className="bg-blue-100 p-5 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
                            <Users className="h-10 w-10 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            HR Portal
                        </h3>
                        <p className="text-gray-600 mb-6 text-sm flex-grow">
                            Access HR-related tools and resources
                        </p>
                        <button className="mt-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full text-sm font-semibold">
                            Open Portal
                        </button>
                    </div>

                    {/* 2. Education Portal Option */}
                    <div
                        onClick={handleInternalPortal}
                        className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all hover:scale-105 border-2 border-transparent hover:border-green-500 flex flex-col items-center text-center h-full group"
                    >
                        <div className="bg-green-100 p-5 rounded-full mb-6 group-hover:bg-green-200 transition-colors">
                            <LayoutDashboard className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Education Portal
                        </h3>
                        <p className="text-gray-600 mb-6 text-sm flex-grow">
                            Access Education dashboards
                        </p>
                        <button className="mt-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full text-sm font-semibold">
                            Open Portal
                        </button>
                    </div>

                    {/* 3. Google Drive Option */}


                    {/* 4. Admin Access Management (Only for Admins) */}
                    {user?.role === 'admin' && (
                        <div
                            onClick={handleAdminAccess}
                            className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all hover:scale-105 border-2 border-transparent hover:border-purple-500 flex flex-col items-center text-center h-full group ring-2 ring-purple-100"
                        >
                            <div className="bg-purple-100 p-5 rounded-full mb-6 group-hover:bg-purple-200 transition-colors">
                                <Shield className="h-10 w-10 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Access Control
                            </h3>
                            <p className="text-gray-600 mb-6 text-sm flex-grow">
                                Manage users, roles & permissions
                            </p>
                            <button className="mt-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full text-sm font-semibold">
                                Manage Users
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GAIPortal;
