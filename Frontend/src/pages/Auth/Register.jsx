import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ShieldCheck, Mail, Lock, User, Building2,
    Phone, Briefcase, ChevronRight, Loader2,
    AlertCircle, Eye, EyeOff
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import ReactFacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
const FacebookLogin = ReactFacebookLogin.default || ReactFacebookLogin;
import logo from "../../components/images/logo-bg.webp";
import axios from "axios";
import API_BASE_URL from "../../api.config";

export default function PlatformRegister() {
    const navigate = useNavigate();

    // State for form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        organizationName: "",
        designation: "",
        sector: "",
        password: "",
        confirmPassword: ""
    });

    // Added missing state for password visibility
    const [showPassword, setShowPassword] = useState(false);
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
                setError(err.response?.data?.message || "Google Authentication failed.");
                setLoading(false);
            }
        },
        onError: () => setError("Google Authentication failed.")
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
            setError(err.response?.data?.message || "Facebook Authentication failed.");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post(`${API_BASE_URL}/api/platform-auth/register`, formData);
            localStorage.setItem("platformToken", response.data.token);
            localStorage.setItem("platformUser", JSON.stringify(response.data));
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white font-sans">
            {/* Left Section: Branding & Info */}
            <div className="hidden lg:flex lg:w-1/3 bg-slate-900 flex-col justify-between p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-500 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 space-y-6">
                    <h2 className="text-4xl font-bold text-white leading-tight">
                        Powering the <span className="text-emerald-400">Intelligent Enterprise</span>
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Join global leaders in Enterprise, Government, and Corporate sectors leveraging GreenAI for mission-critical operations.
                    </p>

                    <ul className="space-y-4 pt-6">
                        {[
                            "Multilingual Voice AI (CLiCS)",
                            "ESG & Compliance Automation (RegIntel)",
                            "Legal & Tender Intelligence (VidhiLab)"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                <ShieldCheck size={18} className="text-emerald-500" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative z-10 flex items-center gap-3 text-slate-500 text-xs font-semibold uppercase tracking-widest">
                    <span>Enterprise Security Protocol Enabled</span>
                </div>
            </div>

            {/* Right Section: Register Form */}
            <div className="w-full lg:w-2/3 flex flex-col items-center p-8 bg-gray-50/50 overflow-y-auto">
                <div className="w-full max-w-[640px] py-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Logo for mobile and desktop */}
                    <div className="flex justify-center mb-4">
                        <Link to="/">
                            <img src={logo} alt="GreenAI" className="h-10 md:h-12 w-auto" />
                        </Link>
                    </div>

                    <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
                        <p className="text-slate-500 font-medium">Register your organization for GreenAI solutions.</p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm animate-shake">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Details Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-emerald-600">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-900 shadow-sm"
                                        placeholder="First Name"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-900 shadow-sm"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Work Email</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-emerald-600">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-900 shadow-sm"
                                        placeholder="abc@company.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-emerald-600">
                                        <Phone size={18} />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        inputMode="numeric"
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                        value={formData.phone}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");
                                            if (value.length <= 10) {
                                                setFormData({ ...formData, phone: value });
                                            }
                                        }}
                                        className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-900 shadow-sm"
                                        placeholder="10 digit number"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Organization & Sector */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Organization Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-emerald-600">
                                        <Building2 size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="organizationName"
                                        required
                                        value={formData.organizationName}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-900 shadow-sm"
                                        placeholder="TechCorp Solutions"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Sector</label>
                                <select
                                    name="sector"
                                    required
                                    value={formData.sector}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-900 shadow-sm appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>Select Sector</option>
                                    <option value="Enterprise">Enterprise</option>
                                    <option value="Government">Government</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Startup">Startup</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Designation */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Designation</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-emerald-600">
                                    <Briefcase size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="designation"
                                    required
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-900 shadow-sm"
                                    placeholder="Enter your designation"
                                />
                            </div>
                        </div>

                        {/* Passwords Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-emerald-600">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-900 shadow-sm"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-emerald-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-900 shadow-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        Create Account <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Social Registration Section */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 border-t border-slate-200"></div>
                        <span className="text-sm font-medium text-slate-400">Or sign up with</span>
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
                            appId={import.meta.env.VITE_FACEBOOK_APP_ID || "1234567890"}
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={handleFacebookResponse}
                            render={(renderProps) => (
                                <button
                                    type="button"
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

                    <p className="text-center text-slate-500 font-medium pb-8">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}