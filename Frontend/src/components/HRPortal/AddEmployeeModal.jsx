
import API_BASE_URL from "../../api.config";
import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const DEPARTMENTS = [
    'Sales & Business Development', 'Education & Training', 'Legal & Compliance',
    'Engineering', 'Hardware Engineering', 'Robotics & Automation', 'AI & Data Science'
];

const EMPLOYMENT_TYPES = [
    'Full-Time', 'Part-Time', 'Internship', 'Contractual', 'Temporary',
    'Freelance', 'Consultant', 'Apprenticeship', 'Trainee', 'Probationary', 'Permanent', 'Seasonal'
];

const WORK_ARRANGEMENTS = ['On-Site', 'Remote', 'Hybrid', 'Field-Based'];

const COMPENSATION_TYPES = ['Paid', 'Unpaid', 'Stipend-Based', 'Commission-Based', 'Retainer-Based'];

const SENIORITY_LEVELS = ['Entry-Level', 'Junior', 'Mid-Level', 'Senior', 'Lead', 'Managerial', 'Executive (C-Level)'];

export default function AddEmployeeModal({ isOpen, onClose, onAdded }) {
    const [loading, setLoading] = useState(false);
    const initialState = {
        Id: "",
        name: "",
        role: "",
        department: "Engineering",
        Phone: "",
        email: "",
        salary: "",
        joiningDate: "",
        employmentType: "Full-Time",
        workArrangement: "On-Site",
        compensationType: "Paid",
        seniorityLevel: "Entry-Level"
    };

    const [form, setForm] = useState(initialState);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("employeeToken");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.post(`${API_BASE_URL}/api/hr/employees`, form, config);
            onAdded();
            onClose();
            setForm(initialState);
        } catch (error) {
            console.error("Submission Error:", error);
            alert("Error adding employee. Ensure Employee ID and Email are unique.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in duration-200">

                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Add New Employee</h2>
                        <p className="text-xs text-gray-500">Register a new member with full classification</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Form Content - Scrollable to accommodate new fields */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">

                    {/* Section: Basic Identity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1 block">Employee ID</label>
                            <input required placeholder="EMP-001" value={form.Id} className="w-full p-3 border rounded-xl outline-emerald-500 text-sm"
                                onChange={e => setForm({ ...form, Id: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1 block">Full Name</label>
                            <input required placeholder="John Doe" value={form.name} className="w-full p-3 border rounded-xl outline-emerald-500 text-sm"
                                onChange={e => setForm({ ...form, name: e.target.value })} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1 block">Email</label>
                            <input required type="email" placeholder="john@company.com" value={form.email} className="w-full p-3 border rounded-xl outline-emerald-500 text-sm"
                                onChange={e => setForm({ ...form, email: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1 block">Phone Number</label>
                            <input required type="tel" placeholder="10 digit phone number" value={form.Phone} className="w-full p-3 border rounded-xl outline-emerald-500 text-sm"
                                onChange={e => {
                                    // Remove any non-numeric characters and limit to 10 digits
                                    const val = e.target.value.replace(/\D/g, "");
                                    if (val.length <= 10) {
                                        setForm({ ...form, Phone: val });
                                    }
                                }} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1 block">Role</label>
                            <input required placeholder="Software Engineer" value={form.role} className="w-full p-3 border rounded-xl outline-emerald-500 text-sm"
                                onChange={e => setForm({ ...form, role: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1 block">Department</label>
                            <select value={form.department} className="w-full p-3 border rounded-xl outline-emerald-500 bg-white text-sm"
                                onChange={e => setForm({ ...form, department: e.target.value })}>
                                {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Section: New Classifications */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] uppercase font-bold text-emerald-600 ml-1 mb-1 block">Employment Type</label>
                            <select value={form.employmentType} className="w-full p-3 border rounded-xl outline-emerald-500 bg-white text-sm"
                                onChange={e => setForm({ ...form, employmentType: e.target.value })}>
                                {EMPLOYMENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold text-emerald-600 ml-1 mb-1 block">Work Arrangement</label>
                            <select value={form.workArrangement} className="w-full p-3 border rounded-xl outline-emerald-500 bg-white text-sm"
                                onChange={e => setForm({ ...form, workArrangement: e.target.value })}>
                                {WORK_ARRANGEMENTS.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] uppercase font-bold text-emerald-600 ml-1 mb-1 block">Compensation</label>
                            <select value={form.compensationType} className="w-full p-3 border rounded-xl outline-emerald-500 bg-white text-sm"
                                onChange={e => setForm({ ...form, compensationType: e.target.value })}>
                                {COMPENSATION_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold text-emerald-600 ml-1 mb-1 block">Seniority Level</label>
                            <select value={form.seniorityLevel} className="w-full p-3 border rounded-xl outline-emerald-500 bg-white text-sm"
                                onChange={e => setForm({ ...form, seniorityLevel: e.target.value })}>
                                {SENIORITY_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1 block">Salary Package</label>
                            <input required placeholder="6 LPA" value={form.salary} className="w-full p-3 border rounded-xl outline-emerald-500 text-sm"
                                onChange={e => setForm({ ...form, salary: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1 block">Joining Date</label>
                            <input required type="date" value={form.joiningDate} className="w-full p-3 border rounded-xl outline-emerald-500 text-sm"
                                onChange={e => setForm({ ...form, joiningDate: e.target.value })} />
                        </div>
                    </div>

                    <div className="pt-2 sticky bottom-0 bg-white">
                        <button disabled={loading} type="submit" className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                            {loading ? "Registering..." : "Register Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
