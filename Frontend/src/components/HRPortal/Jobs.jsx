
import API_BASE_URL from "../../api.config";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddJobModal } from "./AddJobForm";
import { Search, Filter, Plus, Eye, Edit2, Trash2 } from "lucide-react";

const DEPARTMENTS = [
    "All",
    "Sales & Business Development", "Education & Training", "Legal & Compliance",
    "Engineering", "Hardware Engineering", "Robotics & Automation", "AI & Data Science",
];

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDept, setSelectedDept] = useState("All");

    // New States for View/Edit Logic
    const [editingJob, setEditingJob] = useState(null);
    const [isReadOnly, setIsReadOnly] = useState(false);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("employeeToken");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${API_BASE_URL}/api/hr/jobs`, config);
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    // Open modal for a fresh job post
    const handleAddClick = () => {
        setEditingJob(null);
        setIsReadOnly(false);
        setIsModalOpen(true);
    };

    // Open modal to view details (disabled inputs)
    const handleViewClick = (job) => {
        setEditingJob(job);
        setIsReadOnly(true);
        setIsModalOpen(true);
    };

    // Open modal to edit details (enabled inputs)
    const handleEditClick = (job) => {
        setEditingJob(job);
        setIsReadOnly(false);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            try {
                const token = localStorage.getItem("employeeToken");
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await axios.delete(`${API_BASE_URL}/api/hr/jobs/${id}`, config);
                setJobs((prev) => prev.filter((job) => job._id !== id));
            } catch (error) {
                alert("Failed to delete the job.");
            }
        }
    };

    const filteredJobs = selectedDept === "All"
        ? jobs
        : jobs.filter((job) => job.department === selectedDept);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Job Postings</h2>
                    <p className="text-gray-500">Manage open positions and requirements.</p>
                </div>
                <button
                    onClick={handleAddClick}
                    className="bg-emerald-600 text-white px-5 py-3 rounded-xl hover:bg-emerald-700 transition shadow-sm font-bold flex items-center gap-2"
                >
                    <Plus size={20} /> Post New Job
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                    <Filter size={18} />
                    <span className="text-sm font-semibold uppercase">Filter</span>
                </div>
                <div className="h-6 w-px bg-gray-200"></div>
                <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer w-full md:w-64"
                >
                    {DEPARTMENTS.map(dept => (
                        <option key={dept} value={dept}>{dept === "All" ? "All Departments" : dept}</option>
                    ))}
                </select>
            </div>

            <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {loading ? (
                                <tr><td colSpan={5} className="text-center py-12 text-gray-400">Loading jobs...</td></tr>
                            ) : filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <tr key={job._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4 font-bold text-gray-800">{job.title}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">{job.department}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{job.location}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${(job.status || "OPEN").toUpperCase() === "OPEN"
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                    : "bg-red-50 text-red-700 border-red-100"
                                                }`}>
                                                {job.status || "OPEN"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-3 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleViewClick(job)} className="text-gray-400 hover:text-blue-600 transition-colors font-medium text-xs decoration-2" title="View">View</button>
                                                <button onClick={() => handleEditClick(job)} className="text-gray-400 hover:text-amber-600 transition-colors font-medium text-xs decoration-2" title="Edit">Edit</button>
                                                <button onClick={() => handleDelete(job._id)} className="text-gray-400 hover:text-red-600 transition-colors font-medium text-xs decoration-2" title="Delete">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={5} className="text-center py-12 text-gray-400 italic">No jobs found matching your criteria.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden relative z-10 animate-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{isReadOnly ? "View Job Details" : editingJob ? "Edit Job Post" : "Create New Job"}</h2>
                                <p className="text-xs text-gray-500">Manage job listing details</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><div className="w-5 h-5 grid place-items-center text-gray-500 font-bold">✕</div></button>
                        </div>
                        <div className="p-8 overflow-y-auto max-h-[80vh]">
                            <AddJobModal
                                isOpen={true} // Logic handled by parent wrapper now
                                onClose={() => setIsModalOpen(false)}
                                onJobAdded={fetchJobs}
                                editingJob={editingJob}
                                isReadOnly={isReadOnly}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
