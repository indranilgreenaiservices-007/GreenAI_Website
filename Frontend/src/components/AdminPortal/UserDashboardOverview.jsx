
import React, { useState, useEffect } from 'react';
import {
    Users,
    UserCheck,
    UserPlus,
    UserMinus,
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import API_BASE_URL from '../../api.config';

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

export default function UserDashboardOverview() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('employeeToken');

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/platform-user-stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch stats', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-20 text-center text-slate-500 font-medium">Loading analytics...</div>;
    if (!stats) return <div className="p-20 text-center text-red-500">Failed to load statistics.</div>;

    const sectorData = stats.sectorStats.map(s => ({
        name: s._id || 'Unknown',
        value: s.count
    }));

    const growthData = stats.growthStats.map(g => ({
        name: `${g._id.month}/${g._id.year}`,
        users: g.count
    }));

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Row 1: Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={<Users className="text-blue-600" />}
                    color="blue"
                    trend="+12%"
                />
                <StatCard
                    title="Active Users"
                    subtitle="Last 7 days"
                    value={stats.activeUsers7d}
                    icon={<UserCheck className="text-emerald-600" />}
                    color="emerald"
                    trend="+5%"
                />
                <StatCard
                    title="New Registrations"
                    subtitle="Today"
                    value={stats.newRegistrationsToday}
                    icon={<UserPlus className="text-purple-600" />}
                    color="purple"
                    trend="+2"
                />
                <StatCard
                    title="Inactive Users"
                    subtitle="30+ days"
                    value={stats.inactiveUsers30d}
                    icon={<UserMinus className="text-amber-600" />}
                    color="amber"
                    trend="-3%"
                    isReverse
                />
            </div>

            {/* Row 2: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Growth Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">User Growth</h3>
                            <p className="text-sm text-slate-500">Monthly new registrations</p>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold">
                            <TrendingUp size={14} /> +18.4%
                        </div>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sector Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Users by Sector</h3>
                        <p className="text-sm text-slate-500 mb-8">Classification based on organization type</p>
                    </div>
                    <div className="h-80 w-full flex flex-col md:flex-row items-center">
                        <div className="flex-1 h-full w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sectorData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {sectorData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex-shrink-0 space-y-3 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                            {sectorData.map((s, i) => (
                                <div key={s.name} className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                        <span className="text-sm font-medium text-slate-600">{s.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900">{s.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, color, trend, subtitle, isReverse }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-${color}-100/50`}>
                    {icon}
                </div>
                {trend && (
                    <div className={`flex items-center gap-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded-md ${isReverse ? 'text-amber-600 bg-amber-50' : 'text-emerald-600 bg-emerald-50'
                        }`}>
                        {trend.includes('-') || isReverse ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                        {trend}
                    </div>
                )}
            </div>
            <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{title}</h4>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900">{value}</span>
                    {subtitle && <span className="text-xs font-medium text-slate-400">{subtitle}</span>}
                </div>
            </div>
        </div>
    );
}
