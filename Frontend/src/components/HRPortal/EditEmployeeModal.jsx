
import API_BASE_URL from "../../api.config";
import React, { useState, useEffect } from "react";
import { X, Save, User, Briefcase, Phone, Mail, MapPin, Calendar, CreditCard, Shield } from "lucide-react";
import axios from "axios";

const DEPARTMENTS = ['Sales & Business Development', 'Education & Training', 'Legal & Compliance', 'Engineering', 'Hardware Engineering', 'Robotics & Automation', 'AI & Data Science'];
const EMPLOYMENT_TYPES = ['Full-Time', 'Part-Time', 'Internship', 'Contractual', 'Temporary', 'Freelance', 'Consultant', 'Apprenticeship', 'Trainee', 'Probationary', 'Permanent', 'Seasonal'];
const WORK_ARRANGEMENTS = ['On-Site', 'Remote', 'Hybrid', 'Field-Based'];
const COMPENSATION_TYPES = ['Paid', 'Unpaid', 'Stipend-Based', 'Commission-Based', 'Retainer-Based'];
const SENIORITY_LEVELS = ['Entry-Level', 'Junior', 'Mid-Level', 'Senior', 'Lead', 'Managerial', 'Executive (C-Level)'];

export default function EditEmployeeModal({ isOpen, onClose, onUpdated, employee, isReadOnly }) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(null);

    useEffect(() => {
        if (employee) {
            const formattedDate = employee.joiningDate ? employee.joiningDate.split('T')[0] : "";
            setForm({ ...employee, joiningDate: formattedDate });
        }
    }, [employee]);

    if (!isOpen || !form) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isReadOnly) return;
        setLoading(true);
        try {
            const token = localStorage.getItem("employeeToken");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`${API_BASE_URL}/api/hr/employees/${employee._id}`, form, config);
            onUpdated();
            onClose();
        } catch (error) {
            alert("Error updating employee details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in duration-200">

                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold text-xl">
                            {form.name?.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                {isReadOnly ? "Employee Profile" : "Edit Profile"}
                            </h2>
                            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">{form.Id}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={20} /></button>
                </div>

                {/* Scrollable List View Form */}
                <form onSubmit={handleSubmit} className="p-0 overflow-y-auto">
                    <div className="divide-y divide-gray-100">

                        {/* Section: Personal Info */}
                        <div className="p-6 space-y-4">
                            <h3 className="text-[15px] font-bold text-gray-800 uppercase tracking-[2px] mb-4">Personal Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2"><User size={12} /> Full Name</label>
                                    <input required disabled={isReadOnly} value={form.name} className="w-full p-3 border rounded-xl outline-emerald-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm"
                                        onChange={e => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2"><Mail size={12} /> Email Address</label>
                                    <input required disabled={isReadOnly} type="email" value={form.email} className="w-full p-3 border rounded-xl outline-emerald-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm"
                                        onChange={e => setForm({ ...form, email: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2"><Phone size={12} /> Phone Number</label>
                                    <input required disabled={isReadOnly} value={form.Phone} className="w-full p-3 border rounded-xl outline-emerald-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm"
                                        onChange={e => {
                                            const val = e.target.value.replace(/\D/g, "");
                                            if (val.length <= 10) setForm({ ...form, Phone: val });
                                        }} />
                                </div>
                            </div>
                        </div>

                        {/* Section: Work & Contract */}
                        <div className="p-6 bg-gray-50/30 space-y-4">
                            <h3 className="text-[15px] font-bold text-gray-800 uppercase tracking-[2px] mb-4">Work & Arrangement</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2"><Briefcase size={12} /> Department</label>
                                    <select disabled={isReadOnly} value={form.department} className="w-full p-3 border rounded-xl outline-emerald-500 bg-white disabled:bg-gray-50 text-sm"
                                        onChange={e => setForm({ ...form, department: e.target.value })}>
                                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2"><Shield size={12} /> Seniority Level</label>
                                    <select disabled={isReadOnly} value={form.seniorityLevel} className="w-full p-3 border rounded-xl outline-emerald-500 bg-white disabled:bg-gray-50 text-sm"
                                        onChange={e => setForm({ ...form, seniorityLevel: e.target.value })}>
                                        {SENIORITY_LEVELS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2"><Calendar size={12} /> Employment Type</label>
                                    <select disabled={isReadOnly} value={form.employmentType} className="w-full p-3 border rounded-xl outline-emerald-500 bg-white disabled:bg-gray-50 text-sm"
                                        onChange={e => setForm({ ...form, employmentType: e.target.value })}>
                                        {EMPLOYMENT_TYPES.map(e => <option key={e} value={e}>{e}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2"><MapPin size={12} /> Work Arrangement</label>
                                    <select disabled={isReadOnly} value={form.workArrangement} className="w-full p-3 border rounded-xl outline-emerald-500 bg-white disabled:bg-gray-50 text-sm"
                                        onChange={e => setForm({ ...form, workArrangement: e.target.value })}>
                                        {WORK_ARRANGEMENTS.map(w => <option key={w} value={w}>{w}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section: Finance & Timeline */}
                        <div className="p-6 space-y-4">
                            <h3 className="text-[15px] font-bold text-gray-800 uppercase tracking-[2px] mb-4">Dates</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2"><Calendar size={12} /> Joining Date</label>
                                    <input required disabled={isReadOnly} type="date" value={form.joiningDate} className="w-full p-3 border rounded-xl outline-emerald-500 disabled:bg-gray-50 text-sm"
                                        onChange={e => setForm({ ...form, joiningDate: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sticky Footer Action */}
                    {!isReadOnly && (
                        <div className="p-6 bg-gray-50 border-t sticky bottom-0">
                            <button disabled={loading} type="submit" className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-2">
                                {loading ? "Saving Changes..." : <><Save size={18} /> Save Employee Profile</>}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
