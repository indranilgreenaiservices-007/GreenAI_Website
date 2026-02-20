import React, { useState } from 'react';
import axios from 'axios';
import { X, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../../api.config.js'; // Ensure correct import path

const JobApplicationModal = ({ isOpen, onClose, job }) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // { type: 'success' | 'error', msg: string }

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        experienceYears: '',
        currentCompany: '',
        currentRole: '',
        currentSalary: '',
        resumeLink: '',
        linkedInProfile: '',
        coverLetter: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Simple phone validation (digits only)
        if (name === 'phone') {
            const onlyNums = value.replace(/\D/g, '');
            if (onlyNums.length <= 10) {
                setFormData({ ...formData, [name]: onlyNums });
            }
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.phone.length !== 10) {
            setStatus({ type: 'error', msg: 'Please enter a valid 10-digit phone number.' });
            return;
        }

        setLoading(true);
        setStatus(null);

        const payload = {
            ...formData,
            jobId: job._id,
            jobTitle: job.title,
            department: job.department,
            experienceYears: Number(formData.experienceYears) || 0
        };

        try {
            // Use the configured axios instance or base URL
            await axios.post(`${API_BASE_URL}/api/hr/applications`, payload);
            setStatus({ type: 'success', msg: 'Application submitted successfully! Our team will reach out soon.' });

            // Auto-close
            setTimeout(() => {
                onClose();
                setFormData({
                    fullName: '', email: '', phone: '', experienceYears: '',
                    currentCompany: '', currentRole: '', currentSalary: '',
                    resumeLink: '', linkedInProfile: '', coverLetter: ''
                });
                setStatus(null);
            }, 3000);

        } catch (error) {
            setStatus({
                type: 'error',
                msg: error.response?.data?.error || 'Something went wrong. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !job) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Apply for Position</h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    {job.title} <span className="text-slate-300 mx-2">|</span> {job.department}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            {status && (
                                <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}>
                                    {status.type === 'success' ? <CheckCircle2 className="shrink-0 mt-0.5" size={18} /> : <AlertCircle className="shrink-0 mt-0.5" size={18} />}
                                    <p className="text-sm font-medium">{status.msg}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Personal Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name *</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium"
                                            placeholder="name@gmail.com"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Number *</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-2.5 text-slate-400 font-medium text-sm">+91</span>
                                            <input
                                                type="text"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium"
                                                placeholder=""
                                                maxLength={10}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Years of Experience *</label>
                                        <input
                                            type="number"
                                            name="experienceYears"
                                            required
                                            min="0"
                                            step="0.1"
                                            value={formData.experienceYears}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium"
                                            placeholder="e.g. 2.5"
                                        />
                                    </div>
                                </div>

                                {/* Professional Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Company</label>
                                        <input
                                            type="text"
                                            name="currentCompany"
                                            value={formData.currentCompany}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium"
                                            placeholder="Current Organization"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Role</label>
                                        <input
                                            type="text"
                                            name="currentRole"
                                            value={formData.currentRole}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium"
                                            placeholder="e.g. Senior Developer"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Salary (INR/Year)</label>
                                        <input
                                            type="text"
                                            name="currentSalary"
                                            value={formData.currentSalary}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium"
                                            placeholder="e.g. 12,00,000"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">LinkedIn Profile URL</label>
                                        <input
                                            type="url"
                                            name="linkedInProfile"
                                            value={formData.linkedInProfile}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium"
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5 pt-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resume Link (Google Drive / dropbox) *</label>
                                    <div className="relative">
                                        <Upload className="absolute left-4 top-2.5 text-slate-400" size={18} />
                                        <input
                                            type="url"
                                            name="resumeLink"
                                            required
                                            value={formData.resumeLink}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium"
                                            placeholder="https://drive.google.com/file/d/..."
                                        />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">Make sure the link is publicly accessible (Anyone with the link can view).</p>
                                </div>

                                <div className="space-y-1.5 pt-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cover Letter / Why GreenAI?</label>
                                    <textarea
                                        name="coverLetter"
                                        rows={4}
                                        value={formData.coverLetter}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium resize-none"
                                        placeholder="Tell us why you'd be a great fit..."
                                    />
                                </div>

                                <div className="pt-4 pb-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/10 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="animate-spin" size={20} />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Submit Application
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default JobApplicationModal;
