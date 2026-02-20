
import React from "react";
import { X, User, Mail, Phone, Calendar, Building2, Briefcase, Award, IndianRupee, MessageSquare, FileText, Linkedin, Link as LinkIcon } from "lucide-react";

export default function ApplicantDetailModal({ applicant, onClose }) {
    if (!applicant) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in duration-200">

                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold text-xl shadow-sm border border-emerald-200">
                            {applicant.fullName?.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Candidate Profile</h2>
                            <p className="text-xs font-mono text-emerald-600 uppercase tracking-widest font-semibold">
                                {applicant.jobTitle}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-0 overflow-y-auto">
                    <div className="divide-y divide-gray-100">

                        <div className="p-6 space-y-4">
                            <h3 className="text-[13px] font-bold text-gray-800 uppercase tracking-[2px] mb-4">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2">
                                        <User size={12} className="text-emerald-500" /> Full Name
                                    </label>
                                    <p className="w-full p-3 bg-gray-50 border rounded-xl text-sm text-gray-700 font-medium">
                                        {applicant.fullName}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2">
                                        <Mail size={12} className="text-emerald-500" /> Email Address
                                    </label>
                                    <p className="w-full p-3 bg-gray-50 border rounded-xl text-sm text-gray-700 font-medium break-all">
                                        {applicant.email}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2">
                                        <Phone size={12} className="text-emerald-500" /> Phone Number
                                    </label>
                                    <p className="w-full p-3 bg-gray-50 border rounded-xl text-sm text-gray-700 font-medium">
                                        {applicant.phone || "Not Provided"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2">
                                        <Calendar size={12} className="text-emerald-500" /> Applied Date
                                    </label>
                                    <p className="w-full p-3 bg-gray-50 border rounded-xl text-sm text-gray-700 font-medium">
                                        {applicant.appliedAt ? new Date(applicant.appliedAt).toLocaleDateString('en-IN', {
                                            day: '2-digit', month: 'long', year: 'numeric'
                                        }) : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50/30 space-y-4">
                            <h3 className="text-[13px] font-bold text-gray-800 uppercase tracking-[2px] mb-4">Professional Background</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2">
                                        <Building2 size={12} className="text-emerald-500" /> Current Company
                                    </label>
                                    <p className="w-full p-3 bg-white border rounded-xl text-sm text-gray-700 font-medium">
                                        {applicant.currentCompany || "N/A"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2">
                                        <Briefcase size={12} className="text-emerald-500" /> Current Role
                                    </label>
                                    <p className="w-full p-3 bg-white border rounded-xl text-sm text-gray-700 font-medium">
                                        {applicant.currentRole || "N/A"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2">
                                        <Award size={12} className="text-emerald-500" /> Experience
                                    </label>
                                    <p className="w-full p-3 bg-white border rounded-xl text-sm text-gray-700 font-medium">
                                        {applicant.experienceYears || 0} Years
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2">
                                        <IndianRupee size={12} className="text-emerald-500" /> Current Salary
                                    </label>
                                    <p className="w-full p-3 bg-white border rounded-xl text-sm text-gray-700 font-medium">
                                        {applicant.currentSalary || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <h3 className="text-[13px] font-bold text-gray-800 uppercase tracking-[2px] mb-2">Statement</h3>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-500 ml-1 flex items-center gap-2">
                                    <MessageSquare size={12} className="text-emerald-500" /> Applicant Message
                                </label>
                                <div className="w-full p-4 bg-gray-50 border border-dashed rounded-2xl text-sm text-gray-600 leading-relaxed italic">
                                    "{applicant.coverLetter || "No additional message provided."}"
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sticky Footer */}
                    <div className="p-6 bg-gray-50 border-t sticky bottom-0 flex flex-wrap gap-3">
                        {applicant.resumeLink && (
                            <a href={applicant.resumeLink} target="_blank" rel="noreferrer" className="flex-1 min-w-[150px] py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-2 text-sm">
                                <FileText size={18} /> View Resume
                            </a>
                        )}
                        {applicant.linkedInProfile && (
                            <a href={applicant.linkedInProfile} target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#0077b5] text-white font-bold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm">
                                <Linkedin size={18} /> LinkedIn
                            </a>
                        )}
                        {applicant.portfolioLink && (
                            <a href={applicant.portfolioLink} target="_blank" rel="noreferrer" className="px-6 py-3 border border-gray-300 bg-white text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-sm">
                                <LinkIcon size={18} /> Portfolio
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
