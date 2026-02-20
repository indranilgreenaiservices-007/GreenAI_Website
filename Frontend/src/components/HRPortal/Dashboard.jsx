
import API_BASE_URL from "../../api.config";
import { useState, useEffect } from "react";
import axios from "axios";
import {
    Users,
    Briefcase,
    Clock,
    CheckCircle,
    TrendingUp,
    ChevronRight,
    X
} from "lucide-react";
import { AddJobModal } from "./AddJobForm";
import { useLocation, useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("employeeToken");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const user = JSON.parse(localStorage.getItem("employeeUser") || "{}");
    const displayName = user.name || "HR Manager";

    const [stats, setStats] = useState({
        totalJobs: 0,
        activeJobs: 0,
        totalApplicants: 0,
        pendingReviews: 0,
        interviewing: 0
    });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to fetch data
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("employeeToken");
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            // We need to create these endpoints in the backend
            const [jobsRes, appsRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/hr/jobs`, config),
                axios.get(`${API_BASE_URL}/api/hr/applications`, config)
            ]);

            const jobs = jobsRes.data || [];
            const apps = appsRes.data || [];

            setStats({
                totalJobs: jobs.length,
                activeJobs: jobs.filter(j => j.status === "OPEN").length,
                totalApplicants: apps.length,
                pendingReviews: apps.filter(a => a.status === "Pending").length,
                interviewing: apps.filter(a => a.status === "Interviewing").length
            });
        } catch (error) {
            console.error("Dashboard load error:", error);
            // Fallback for demo if API fails? No, better show error or 0.
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const statCards = [
        {
            label: "Active Jobs",
            value: stats.activeJobs,
            icon: Briefcase,
            color: "bg-blue-50 text-blue-600",
            description: "Currently accepting applications"
        },
        {
            label: "Total Applicants",
            value: stats.totalApplicants,
            icon: Users,
            color: "bg-emerald-50 text-emerald-600",
            description: "Across all job postings"
        },
        {
            label: "Pending Reviews",
            value: stats.pendingReviews,
            icon: Clock,
            color: "bg-amber-50 text-amber-600",
            description: "New candidates to evaluate"
        },
        {
            label: "In Interviewing",
            value: stats.interviewing,
            icon: CheckCircle,
            color: "bg-purple-50 text-purple-600",
            description: "Candidates in active rounds"
        }
    ];

    if (loading) return (
        <div className="flex h-64 items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
    );

    return (
        <div className="space-y-8 relative">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Hi, {displayName}
                </h1>
                <p className="text-gray-500 font-medium">Welcome Back.</p>
            </div>

            {/* KPI Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${card.color}`}>
                                <card.icon size={24} />
                            </div>
                            <TrendingUp className="text-gray-300" size={20} />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800">{card.value}</h3>
                        <p className="text-sm font-medium text-gray-600">{card.label}</p>
                        <p className="text-xs text-gray-400 mt-2">{card.description}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-between p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 hover:bg-emerald-50 transition-colors group text-left"
                    >
                        <div>
                            <span className="font-bold text-emerald-800 block">Post a New Job</span>
                            <span className="text-xs text-emerald-600">Create a new vacancy listing</span>
                        </div>
                        <ChevronRight className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* --- ADD JOB MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Create New Opportunity</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        <div className="p-8">
                            <AddJobModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onJobAdded={fetchDashboardData}
                                editingJob={null}
                                isReadOnly={false}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
