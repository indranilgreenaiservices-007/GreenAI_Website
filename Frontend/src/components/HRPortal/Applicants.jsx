
import API_BASE_URL from "../../api.config";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, CheckCircle, Eye, FileText, Loader2, Check, Plus } from "lucide-react";
import ApplicantDetailModal from "./ApplicantDetailModal";

const DEPARTMENTS = [
    "Sales & Business Development", "Education & Training", "Legal & Compliance",
    "Engineering", "Hardware Engineering", "Robotics & Automation", "AI & Data Science",
];
const STATUS_OPTIONS = ["All", "Pending", "Accepted", "Rejected", "Interviewing"];

export default function Applicants() {
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDept, setSelectedDept] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [schedulingId, setSchedulingId] = useState(null);

    const fetchApplicants = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("employeeToken");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get(`${API_BASE_URL}/api/hr/applications`, config);
            setApplicants(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchApplicants(); }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const token = localStorage.getItem("employeeToken");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.patch(`${API_BASE_URL}/api/hr/applications/${id}`, { status: newStatus }, config);
            setApplicants(prev => prev.map(app => app._id === id ? { ...app, status: newStatus } : app));
        } catch (err) {
            console.error("Status update error:", err);
            alert("Failed to update status");
        }
    };

    const handleScheduleInterview = async (app) => {
        setSchedulingId(app._id);
        try {
            const token = localStorage.getItem("employeeToken");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.patch(`${API_BASE_URL}/api/hr/applications/${app._id}`, { status: "Interviewing" }, config);
            setApplicants(prev => prev.map(a => a._id === app._id ? { ...a, status: "Interviewing" } : a));
        } catch (err) {
            console.error("Interview schedule error:", err);
            alert("Failed to schedule interview");
        } finally {
            setSchedulingId(null);
        }
    };

    const filteredApplicants = applicants.filter((app) => {
        const matchesDept = selectedDept === "All" || app.department === selectedDept;
        const matchesStatus = selectedStatus === "All" || app.status === selectedStatus;
        const matchesSearch =
            (app.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (app.jobTitle?.toLowerCase() || "").includes(searchTerm.toLowerCase());
        return matchesDept && matchesStatus && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">List of Applicants</h2>
                    <p className="text-gray-500 text-sm">Review professional backgrounds and resumes</p>
                </div>
                <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                    <CheckCircle className="text-emerald-600" size={20} />
                    <span className="text-emerald-800 font-semibold">{filteredApplicants.length} Candidates</span>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or role..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-emerald-500 text-sm transition-all text-gray-700 placeholder-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl outline-emerald-500 text-sm bg-white text-gray-700 font-medium"
                >
                    <option value="All">All Departments</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>

                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl outline-emerald-500 text-sm bg-white text-gray-700 font-medium"
                >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            {/* Table */}
            <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest font-black border-b">
                            <tr>
                                <th className="px-6 py-4">Candidate</th>
                                <th className="px-6 py-4">Current Role</th>
                                <th className="px-6 py-4 text-center">Experience</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                                <th className="px-6 py-4 text-center">Interview</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-10 text-gray-400">Loading applicants...</td>
                                </tr>
                            ) : filteredApplicants.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-10 text-gray-400">No candidates found matching filters.</td>
                                </tr>
                            ) : (
                                filteredApplicants.map((app) => (
                                    <tr key={app._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-800">{app.fullName}</div>
                                            <div className="text-xs text-blue-600 font-medium mt-0.5">{app.jobTitle}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`text-sm ${app.currentRole ? "text-gray-700" : "text-gray-400"}`}>
                                                {app.currentRole || "Not Specified"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center text-gray-600 font-medium">
                                            {app.experienceYears} Years
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <select
                                                value={app.status}
                                                onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                                                className={`text-xs font-bold uppercase rounded px-2 py-1 border outline-none cursor-pointer
                            ${app.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                        app.status === 'Accepted' ? 'bg-green-50 text-green-700 border-green-200' :
                                                            app.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                                                'bg-purple-50 text-purple-700 border-purple-200'}
                        `}
                                            >
                                                {STATUS_OPTIONS.filter(s => s !== "All").map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => setSelectedApplicant(app)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View Profile"><Eye size={18} /></button>
                                                {app.resumeLink && (
                                                    <button onClick={() => window.open(app.resumeLink, '_blank')} className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Resume"><FileText size={18} /></button>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => handleScheduleInterview(app)}
                                                    disabled={app.status === "Interviewing" || schedulingId === app._id}
                                                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 shadow-sm
                            ${app.status === "Interviewing"
                                                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-default"
                                                            : "bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-600 hover:text-white"
                                                        }`}
                                                >
                                                    {schedulingId === app._id ? <Loader2 size={14} className="animate-spin" /> : app.status === "Interviewing" ? <Check size={14} /> : <Plus size={14} />}
                                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                                        {app.status === "Interviewing" ? "Added" : "Schedule"}
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Linked Detail Modal */}
            {selectedApplicant && (
                <ApplicantDetailModal
                    applicant={selectedApplicant}
                    onClose={() => setSelectedApplicant(null)}
                />
            )}
        </div>
    );
}
