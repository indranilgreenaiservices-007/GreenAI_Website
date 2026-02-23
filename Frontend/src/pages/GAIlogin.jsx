
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import API_BASE_URL from '../api.config';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // For password change flow
    const [needsChange, setNeedsChange] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [changeSuccess, setChangeSuccess] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Check if password change is required
            if (data.needsPasswordChange) {
                setNeedsChange(true);
                // Temporarily store token so we can use it to change password
                localStorage.setItem('tempToken', data.token);
            } else {
                // Login successful
                localStorage.setItem('employeeToken', data.token);
                localStorage.setItem('employeeUser', JSON.stringify({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role
                }));
                navigate('/gai-portal');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError(null);

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        const token = localStorage.getItem('tempToken');

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword: password, newPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Password change failed');
            }

            setChangeSuccess(true);
            localStorage.removeItem('tempToken'); // Clear temp token

            // Redirect to login after 2 seconds or just log them in directly?
            // Let's ask them to login again with new password for security confirmation, or just login directly.
            // For better UX, let's just log them in if backend returned a new token (but it didn't).
            // So we ask them to login again.
            setTimeout(() => {
                setNeedsChange(false);
                setPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setChangeSuccess(false);
                setError(null);
            }, 2000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (needsChange) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8">
                    <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Change Password Required</h2>
                    <p className="text-center text-slate-500 mb-6 text-sm">
                        For security, please set a new password for your account.
                    </p>

                    {changeSuccess ? (
                        <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center mb-4">
                            Password changed successfully! Redirecting to login...
                        </div>
                    ) : (
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            {error && (
                                <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm flex items-center">
                                    <AlertCircle size={16} className="mr-2" />
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Updating...' : 'Set New Password'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <img src="/logo.webp" alt="GreenAI" className="h-12 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-900">Employee Login</h2>
                        <p className="text-slate-500 text-sm mt-2">Sign in to access the internal portal</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm flex items-center">
                                <AlertCircle size={16} className="mr-2" />
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    placeholder="name@greenai.services"
                                />
                                <Mail size={18} className="absolute left-3 top-3 text-slate-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    placeholder="••••••••"
                                />
                                <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
