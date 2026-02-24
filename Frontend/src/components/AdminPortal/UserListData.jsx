
import React, { useState, useEffect } from 'react';
import {
    Search,
    Download,
    Filter,
    MoreVertical,
    Mail,
    Phone,
    Building2,
    Calendar,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import API_BASE_URL from '../../api.config';

export default function UserListData() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('employeeToken');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/platform-users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.organizationName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-500">
            {/* Table Controls */}
            <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, email or company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-sm">
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                            <th className="px-6 py-4">User Details</th>
                            <th className="px-6 py-4">Organization & Sector</th>
                            <th className="px-6 py-4">Contact Info</th>
                            <th className="px-6 py-4">Last Activity</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            Array(5).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan="6" className="px-6 py-8"><div className="h-4 bg-slate-100 rounded w-full"></div></td>
                                </tr>
                            ))
                        ) : filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-20 text-center text-slate-400 font-medium">No users found matching your criteria.</td>
                            </tr>
                        ) : (
                            filteredUsers.map(user => (
                                <tr key={user._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                                                {user.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">{user.name}</div>
                                                <div className="text-xs text-slate-500">{user.designation || 'Member'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                                            <Building2 size={14} className="text-slate-400" />
                                            {user.organizationName || 'Individual'}
                                        </div>
                                        <div className="text-[11px] font-bold text-slate-400 uppercase mt-0.5 ml-5">{user.sector || 'N/A'}</div>
                                    </td>
                                    <td className="px-6 py-4 space-y-1">
                                        <div className="flex items-center gap-2 text-xs text-slate-600">
                                            <Mail size={12} className="text-slate-400" />
                                            {user.email}
                                        </div>
                                        {user.phone && (
                                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                                <Phone size={12} className="text-slate-400" />
                                                {user.phone}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-xs text-slate-600">
                                            <Calendar size={14} className="text-slate-400" />
                                            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider
                                            ${user.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="p-6 border-t border-slate-50 flex items-center justify-between">
                <div className="text-sm text-slate-500">
                    Showing <span className="font-bold text-slate-800">1</span> to <span className="font-bold text-slate-800">{filteredUsers.length}</span> of <span className="font-bold text-slate-800">{filteredUsers.length}</span> users
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
                        <ChevronLeft size={18} />
                    </button>
                    <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
