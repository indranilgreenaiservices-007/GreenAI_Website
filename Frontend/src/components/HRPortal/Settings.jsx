
import API_BASE_URL from "../../api.config";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShieldCheck, UserPlus, Trash2, Clock, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function Settings() {
    const [email, setEmail] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);

    const SUPER_ADMINS = [
        "prasenjit.majumder@gmail.com",
        "subrata.mitra@greenai.services",
        "admin@greenai.services",
        "indranil.greenaiservices@gmail.com"
    ];

    const fetchPermissions = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("employeeToken");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${API_BASE_URL}/api/hr/permissions`, config);
            setPermissions(response.data);
        } catch (error) {
            console.error("Failed to fetch permissions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPermissions();
    }, []);

    const handleGrantAccess = async (e) => {
        e.preventDefault();
        const targetEmail = email.toLowerCase();

        if (SUPER_ADMINS.includes(targetEmail)) {
            setStatus({ type: 'error', msg: "This user already has permanent Super Admin access." });
            return;
        }

        try {
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 24);

            const token = localStorage.getItem("employeeToken");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.post(`${API_BASE_URL}/api/hr/grant-access`, {
                email: targetEmail,
                expiresAt
            }, config);

            setStatus({ type: 'success', msg: `Temporary access granted to ${email}` });
            setEmail("");

            // Refresh list to show the new permission
            fetchPermissions();

            setTimeout(() => setStatus(null), 3000);
        } catch (error) {
            setStatus({ type: 'error', msg: "Failed to update permissions." });
        }
    };

    const handleRevoke = async (id) => {
        if (!window.confirm("Are you sure you want to revoke this user's access?")) return;

        // OPTIMISTIC UI: Remove from list immediately so UI feels fast
        const previousPermissions = [...permissions];
        setPermissions(permissions.filter(p => p._id !== id));

        try {
            const token = localStorage.getItem("employeeToken");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`${API_BASE_URL}/api/hr/permissions/${id}`, config);
        } catch (error) {
            // Rollback if the server fails
            setPermissions(previousPermissions);
            alert("Failed to revoke access on the server.");
        }
    };

    return (
        <div className="max-w-4xl space-y-8 p-4">
            {/* Header section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Portal Settings</h2>
                <p className="text-gray-500 text-sm mt-1">Manage administrative permissions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Column: Grant Access Form */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-indigo-600">
                            <UserPlus size={20} />
                            <h3 className="font-bold">Grant Access</h3>
                        </div>
                        <form onSubmit={handleGrantAccess} className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Employee Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@greenai.services"
                                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                />
                            </div>
                            <div className="p-3 bg-indigo-50 rounded-xl">
                                <p className="text-[11px] text-indigo-700 leading-relaxed">
                                    <b>Note:</b> Access granted here is temporary and will automatically expire in 24 hours.
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                            >
                                Grant 24h Access
                            </button>
                        </form>
                        {status && (
                            <div className={`mt-4 p-3 rounded-xl text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-1 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                {status.type === 'success' ? <CheckCircle2 size={14} /> : <ShieldAlert size={14} />}
                                {status.msg}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Access List */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <ShieldCheck size={20} className="text-emerald-500" />
                                Active Permissions
                            </h3>
                            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-bold uppercase">
                                {permissions.length + SUPER_ADMINS.length} Total
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase">User</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase">Access Level</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {/* Super Admins (Static) */}
                                    {SUPER_ADMINS.map((adminEmail) => (
                                        <tr key={adminEmail} className="group hover:bg-gray-50/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">
                                                        {adminEmail[0].toUpperCase()}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">{adminEmail}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase">
                                                    Permanent Admin
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-[10px] text-gray-300 font-bold uppercase">System Lock</span>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* Temporary Admins (From DB) */}
                                    {permissions.map((p) => (
                                        <tr key={p._id} className="group hover:bg-gray-50/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold">
                                                        {p.email[0].toUpperCase()}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">{p.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="inline-flex items-center gap-1 w-fit px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase">
                                                        Temporary
                                                    </span>
                                                    <span className="text-[9px] text-gray-400 flex items-center gap-1">
                                                        <Clock size={10} /> Expires {new Date(p.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleRevoke(p._id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {!loading && permissions.length === 0 && (
                                <div className="p-12 text-center">
                                    <p className="text-sm text-gray-400">No temporary access records found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
