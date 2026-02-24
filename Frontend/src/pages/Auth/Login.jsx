
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import ReactFacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
const FacebookLogin = ReactFacebookLogin.default || ReactFacebookLogin;
import logo from "../../components/images/logo-bg.webp";
import axios from "axios";
import API_BASE_URL from "../../api.config";

export default function PlatformLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoading(true);
            setError("");
            try {
                const response = await axios.post(`${API_BASE_URL}/api/platform-auth/google`, {
                    token: tokenResponse.access_token
                });
                localStorage.setItem("platformToken", response.data.token);
                localStorage.setItem("platformUser", JSON.stringify(response.data));
                navigate("/dashboard");
            } catch (err) {
                setError(err.response?.data?.message || "Google Login failed.");
                setLoading(false);
            }
        },
        onError: () => setError("Google Login failed.")
    });

    const handleFacebookResponse = async (response) => {
        if (!response.accessToken) {
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await axios.post(`${API_BASE_URL}/api/platform-auth/facebook`, {
                accessToken: response.accessToken,
                userID: response.userID
            });
            localStorage.setItem("platformToken", res.data.token);
            localStorage.setItem("platformUser", JSON.stringify(res.data));
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Facebook Login failed.");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(`${API_BASE_URL}/api/platform-auth/login`, formData);
            localStorage.setItem("platformToken", response.data.token);
            localStorage.setItem("platformUser", JSON.stringify(response.data));
            navigate("/dashboard"); // Redirect to the enterprise solutions dashboard
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white font-sans">
            {/* Left Section: Branding & Info */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-16 pt-35  relative overflow-hidden">
                {/* Abstract Background Decoration */}
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 space-y-6 max-w-lg">
                    <h1 className="text-5xl font-bold text-white leading-tight">
                        Secure Access to <span className="text-emerald-400">Enterprise AI</span> Platforms
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        Access CLiCS, RegIntel 360, and VidhiLab through a secure, role-based authentication system built for mission-critical operations.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 text-slate-500 text-sm">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-emerald-500" />
                        <span>ISO 27001 Certified </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-emerald-500" />
                        <span>ISO 9001 Certified </span>
                    </div>


                </div>
            </div>

            {/* Right Section: Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 md:p-20 bg-gray-50/50">
                <div className="w-full max-w-[440px] space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    {/* Logo for mobile and desktop */}
                    <div className="flex justify-center">
                        <Link to="/">
                            <img src={logo} alt="GreenAI" className="h-10 md:h-12 w-auto" />
                        </Link>
                    </div>

                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold text-slate-900">Sign In</h2>
                        <p className="text-slate-500 font-medium">Welcome back. Enter your enterprise credentials.</p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm animate-shake">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Work Email</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                                        placeholder="name@organization.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-bold text-slate-700">Password</label>
                                    <button type="button" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">Forgot password?</button>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Social Login Section */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 border-t border-slate-200"></div>
                        <span className="text-sm font-medium text-slate-400">Or continue with</span>
                        <div className="flex-1 border-t border-slate-200"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button
                            type="button"
                            onClick={() => handleGoogleLogin()}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <FcGoogle size={20} />
                            Google
                        </button>

                        <FacebookLogin
                            // Replace with your actual Facebook App ID
                            appId={import.meta.env.VITE_FACEBOOK_APP_ID || "1234567890"}
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={handleFacebookResponse}
                            render={(renderProps) => (
                                <button
                                    onClick={renderProps.onClick}
                                    disabled={loading || renderProps.isDisabled}
                                    className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1877F2] text-white rounded-xl font-semibold hover:bg-[#166FE5] transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <FaFacebook size={20} />
                                    Facebook
                                </button>
                            )}
                        />
                    </div>

                    <p className="text-center text-slate-500 font-medium">
                        Don't have an account?{" "}
                        <Link to="/auth/register" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
