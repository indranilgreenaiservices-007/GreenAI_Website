
import API_BASE_URL from "../../api.config";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

const DEPARTMENTS = [
    "Sales & Business Development",
    "Education & Training",
    "Legal & Compliance",
    "Engineering",
    "Hardware Engineering",
    "Robotics & Automation",
    "AI & Data Science",
];

const API_BASE = `${API_BASE_URL}/api/hr/jobs`;

const initialState = {
    title: "",
    department: "Engineering",
    location: "Kolkata",
    employmentType: "Full-time",
    experience: "2-3 Years",
    education: "B.Tech (any discipline)",
    salary: "4-5 LPA",
    description: "GreenAI Services Private Limited is a fast-growing AI company specialized in sustainable technology solutions.",
    roleOverview: "",
    responsibilities: "",
    skills: "",
    offers: "Competitive salary, health insurance, and flexible work environment.",
    status: "OPEN"
};

export function AddJobModal({ isOpen, onClose, onJobAdded, editingJob, isReadOnly }) {
    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);

    // Sync form data when modal opens or editingJob changes
    useEffect(() => {
        if (editingJob) {
            setForm(editingJob);
        } else {
            setForm(initialState);
        }
    }, [editingJob, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isReadOnly) return;

        setLoading(true);
        const token = localStorage.getItem("employeeToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            if (editingJob?._id) {
                // UPDATE Logic
                await axios.put(`${API_BASE}/${editingJob._id}`, form, config);
            } else {
                // CREATE Logic
                await axios.post(API_BASE, form, config);
            }
            onJobAdded();
            onClose();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to save job. Check if backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full">
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Main Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Job Title</label>
                        <input
                            value={form.title}
                            disabled={isReadOnly}
                            className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Department</label>
                        <select
                            value={form.department}
                            disabled={isReadOnly}
                            className="w-full border-gray-200 border p-3 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50 transition-all"
                            onChange={e => setForm({ ...form, department: e.target.value })}
                        >
                            {DEPARTMENTS.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Status</label>
                        <select
                            value={form.status}
                            disabled={isReadOnly}
                            className="w-full border-gray-200 border p-3 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50 transition-all"
                            onChange={e => setForm({ ...form, status: e.target.value })}
                        >
                            <option value="OPEN">OPEN</option>
                            <option value="CLOSED">CLOSED</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Experience</label>
                        <input
                            value={form.experience}
                            disabled={isReadOnly}
                            className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50 transition-all"
                            onChange={e => setForm({ ...form, experience: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Salary Range</label>
                        <input
                            value={form.salary}
                            disabled={isReadOnly}
                            className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50 transition-all"
                            onChange={e => setForm({ ...form, salary: e.target.value })}
                        />
                    </div>
                </div>

                {/* Detailed Content */}
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Company Description</label>
                        <textarea
                            value={form.description}
                            disabled={isReadOnly}
                            className="w-full border-gray-200 border p-3 rounded-xl h-24 text-sm focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50 resize-none transition-all"
                            onChange={e => setForm({ ...form, description: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Responsibilities</label>
                        <textarea
                            value={form.responsibilities}
                            disabled={isReadOnly}
                            placeholder="List key responsibilities..."
                            className="w-full border-gray-200 border p-3 rounded-xl h-32 text-sm focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50 resize-none transition-all"
                            onChange={e => setForm({ ...form, responsibilities: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Required Skills</label>
                        <textarea
                            value={form.skills}
                            disabled={isReadOnly}
                            placeholder="List required technical skills..."
                            className="w-full border-gray-200 border p-3 rounded-xl h-32 text-sm focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50 resize-none transition-all"
                            onChange={e => setForm({ ...form, skills: e.target.value })}
                        />
                    </div>
                </div>

                {/* Action Button */}
                {!isReadOnly && (
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-200 flex items-center justify-center disabled:opacity-70 mt-6"
                    >
                        {loading ? "Processing..." : editingJob ? "Save Changes" : "Post Job to Portal"}
                    </button>
                )}
            </form>
        </div>
    );
}
