import React, { useState, useEffect } from "react";
import { Leaf, MapPin, Briefcase, ChevronDown, ArrowRight, Share2, CheckCircle2, Clock, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import API_BASE_URL from "../../api.config.js";
import JobApplicationModal from "./JobApplicationModal";

export default function Career() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedIds, setExpandedIds] = useState([]);
    const [showAllJobs, setShowAllJobs] = useState(false);
    const [copiedId, setCopiedId] = useState(null);

    // Application Modal State
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Fetch from your exposed backend endpoint
                const res = await axios.get(`${API_BASE_URL}/api/hr/jobs`);
                // The backend returns an array of jobs directly
                // Filter for OPEN status if needed, but the controller just returns sort createdAt -1
                // Let's assume we show all unless status is CLOSED
                const activeJobs = res.data.filter(job => job.status !== 'CLOSED');
                setJobs(activeJobs);
            } catch (err) {
                console.error("Failed to fetch jobs:", err);
                setError("Unable to load open positions at the moment.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const toggleJob = (id) => {
        if (!showAllJobs) {
            setShowAllJobs(true);
        }
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleShare = (e, id) => {
        e.stopPropagation();
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleApplyClick = (e, job) => {
        e.stopPropagation(); // prevent accordion toggle
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    // Show all jobs if expanded, otherwise only first 3
    const displayedJobs = showAllJobs ? jobs : jobs.slice(0, 3);

    return (
        <section id="career" className="py-24 bg-slate-50 relative min-h-[600px]">
            <div className="container mx-auto px-6 w-full max-w-5xl">
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 font-semibold text-xs tracking-wide uppercase mb-4 shadow-sm">
                        <Briefcase size={12} />
                        Join Our Team
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Build the Future of <span className="text-emerald-600">Green AI</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        We're hiring passionate minds to build next-gen AI solutions.
                        Join us in our mission to leverage artificial intelligence for a sustainable & automated future.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-emerald-600">
                        <Loader2 size={40} className="animate-spin mb-4" />
                        <p className="text-slate-500 font-medium">Loading opportunities...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                        <AlertCircle size={48} className="mb-4 text-slate-300" />
                        <p>{error}</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                        <p className="text-slate-500 font-medium">No open positions at the moment. Please check back later!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {displayedJobs.map((job, index) => {
                                const isExpanded = expandedIds.includes(job._id);
                                const isMasked = !showAllJobs && index === 2 && jobs.length > 3;

                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        key={job._id}
                                        id={job._id}
                                        className={`relative rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${isExpanded ? "border-emerald-500 shadow-lg ring-1 ring-emerald-100" : "border-slate-200 hover:border-emerald-200 shadow-sm"
                                            }`}
                                    >
                                        {isMasked && (
                                            <div className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-white/60 to-slate-50 flex flex-col justify-end items-center pb-8 backdrop-blur-[1px]">
                                                <button
                                                    onClick={() => setShowAllJobs(true)}
                                                    className="px-6 py-3 rounded-full bg-slate-900 text-white font-bold text-sm shadow-xl hover:bg-emerald-600 transition-all hover:scale-105 flex items-center gap-2 animate-bounce-slow"
                                                >
                                                    See {jobs.length - 2} More Positions <ChevronDown size={16} />
                                                </button>
                                            </div>
                                        )}

                                        <button
                                            onClick={() => toggleJob(job._id)}
                                            className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left relative z-10"
                                        >
                                            <div className="flex-1">
                                                <h3 className={`text-lg font-bold transition-colors ${isExpanded ? "text-emerald-700" : "text-slate-800"}`}>
                                                    {job.title}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-slate-500 font-medium">
                                                    <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                        <MapPin size={14} className="text-slate-400" />
                                                        {job.location || 'Kolkata'}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                        <Clock size={14} className="text-slate-400" />
                                                        {job.experience || 'Not specified'}
                                                    </span>
                                                    {job.salary && (
                                                        <span className="text-emerald-600 px-2 py-1 bg-emerald-50 rounded-md text-xs font-bold border border-emerald-100">
                                                            {job.salary}
                                                        </span>
                                                    )}
                                                    <span className="text-slate-400 px-2 py-1 bg-slate-50 rounded-md text-xs font-bold border border-slate-100 uppercase tracking-wider">
                                                        {job.department}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div
                                                    role="button"
                                                    tabIndex={0}
                                                    onClick={(e) => handleShare(e, job._id)}
                                                    className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-colors relative group"
                                                    title="Share Job"
                                                >
                                                    {copiedId === job._id ? <CheckCircle2 size={18} className="text-emerald-600" /> : <Share2 size={18} />}
                                                    {copiedId === job._id && (
                                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-90 whitespace-nowrap">
                                                            Copied!
                                                        </span>
                                                    )}
                                                </div>
                                                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isExpanded ? "bg-emerald-50 border-emerald-200 rotate-180 text-emerald-600" : "bg-white border-slate-200 text-slate-400"
                                                    }`}>
                                                    <ChevronDown size={18} />
                                                </div>
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <div className="px-6 pb-6 border-t border-slate-100 pt-6">
                                                        <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed mb-6">
                                                            <p className="mb-4 text-base whitespace-pre-line">{job.description}</p>

                                                            <div className="grid md:grid-cols-2 gap-8">
                                                                <div>
                                                                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                                                        <Briefcase size={16} className="text-emerald-600" /> Key Responsibilities
                                                                    </h4>
                                                                    <ul className="space-y-2">
                                                                        {job.responsibilities?.split('\n').filter(r => r.trim()).map((res, i) => (
                                                                            <li key={i} className="flex gap-2.5 items-start">
                                                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                                                                <span>{res}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                                                        <CheckCircle2 size={16} className="text-emerald-600" /> Requirements & Skills
                                                                    </h4>
                                                                    <ul className="space-y-2">
                                                                        {job.skills?.split('\n').filter(s => s.trim()).map((skill, i) => (
                                                                            <li key={i} className="flex gap-2.5 items-start">
                                                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                                                                                <span>{skill}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-end pt-4 border-t border-slate-50">
                                                            <button
                                                                onClick={(e) => handleApplyClick(e, job)}
                                                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-900/10 hover:shadow-emerald-900/20"
                                                            >
                                                                Apply Now <ArrowRight size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Application Modal */}
            <JobApplicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                job={selectedJob}
            />
        </section>
    );
}