
import API_BASE_URL from "../../api.config";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail, Clock, CheckCircle, Send, X, Loader2, RotateCcw, Video, MapPin, Link as LinkIcon, CalendarDays } from "lucide-react";

export default function Interviews() {
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All'); // 'All' | 'Sent' | 'Not Sent'

    const [previewModal, setPreviewModal] = useState({ open: false, applicant: null });
    const [sending, setSending] = useState(false);

    const [mailBody, setMailBody] = useState("");
    const [activeSchedule, setActiveSchedule] = useState({ date: '', time: '', mode: 'Virtual', link: '' });

    useEffect(() => {
        fetchInterviewees();
    }, []);

    const fetchInterviewees = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("employeeToken");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get(`${API_BASE_URL}/api/hr/applications`, config);
            const interviewing = res.data.filter((app) => app.status === "Interviewing");
            setApplicants(interviewing);
        } catch (err) {
            console.error("Error fetching applicants:", err);
        } finally {
            setLoading(false);
        }
    };

    const getCategorizedInterviews = () => {
        // Normalize "Today" to the very start of the day
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Normalize "Week End" to the very end of the 7th day
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(today.getDate() + 7);
        sevenDaysFromNow.setHours(23, 59, 59, 999);

        const scheduled = applicants.filter(app => app.mailSent && app.interviewDate);

        const recent = scheduled.filter(app => {
            if (!app.interviewDate) return false;
            // Parse the stored YYYY-MM-DD string
            const parts = app.interviewDate.split('-');
            if (parts.length < 3) return false;
            const [year, month, day] = parts.map(Number);
            // Create date object using local time
            const interviewDateObj = new Date(year, month - 1, day);

            return interviewDateObj >= today && interviewDateObj <= sevenDaysFromNow;
        });

        const future = scheduled.filter(app => {
            if (!app.interviewDate) return false;
            const parts = app.interviewDate.split('-');
            if (parts.length < 3) return false;
            const [year, month, day] = parts.map(Number);
            const interviewDateObj = new Date(year, month - 1, day);

            return interviewDateObj > sevenDaysFromNow;
        });

        return { recent, future };
    };

    const { recent, future } = getCategorizedInterviews();

    const getDefaultPlainText = (app) => {
        return `Thank you for your interest in GreenAI Services Pvt. Ltd. Following a review of your application for the ${app.jobTitle} position, we are pleased to invite you for the next round of our selection process.

Please reply to this email to confirm your availability. If the proposed time does not align with your schedule, let us know a few alternative slots that work for you.`;
    };

    const wrapTextInHTML = (app, text, sched) => {
        const isVirtual = sched.mode === 'Virtual' || false;
        const cleanLink = sched.link ? sched.link.trim() : "";
        const formattedText = text ? text.replace(/\n/g, '<br>') : '';
        const displayDate = sched.date || 'To be decided';
        const displayTime = sched.time || 'To be decided';

        const linkRow = (isVirtual && cleanLink)
            ? `<tr>
            <td style="padding: 8px 0; color: #374151; font-size: 15px;"><strong>Meeting Link:</strong></td>
            <td style="padding: 8px 0; color: #111827; font-size: 15px; text-align: right;">
                <a href="${cleanLink}" style="color: #059669; font-weight: bold; text-decoration: none;">Join Meeting</a>
            </td>
            </tr>`
            : '';

        const modeLabel = isVirtual ? "Virtual Video Conference" : "On-site Interview";

        return `
        <div style="background-color: #f9fafb; padding: 40px 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb;">
            <div style="background-color: #059669; height: 6px;"></div>
            <div style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 24px; font-weight: 700;">Interview Invitation</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">Dear <strong>${app.fullName}</strong>,</p>
              <div style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">${formattedText}</div>
              
              <div style="background-color: #f0fdf4; border: 1px solid #dcfce7; border-radius: 12px; padding: 24px; margin: 32px 0;">
                <h3 style="margin: 0 0 16px 0; color: #065f46; font-size: 14px; font-weight: 700; text-transform: uppercase;">Schedule Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #374151;"><strong>Date:</strong></td>
                    <td style="padding: 8px 0; color: #111827; text-align: right;">${displayDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #374151;"><strong>Time:</strong></td>
                    <td style="padding: 8px 0; color: #111827; text-align: right;">${displayTime}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #374151;"><strong>Format:</strong></td>
                    <td style="padding: 8px 0; color: #111827; text-align: right;">${modeLabel}</td>
                  </tr>
                  ${linkRow}
                </table>
              </div>

              <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 32px;">
                <p style="margin: 0; color: #111827; font-weight: 600;">Best regards,</p>
                <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">HR Talent Acquisition Team<br>GreenAI Services Pvt. Ltd.</p>
              </div>
            </div>
          </div>
        </div>`;
    };

    const openPreview = (app) => {
        // schedules is not state managed in this simplification, we derive from app data if previously saved, 
        // or just default. In the original code 'schedules' was a state dictionary.
        // For now we will check if app has interview details
        const existingSched = {
            date: app.interviewDate || '',
            time: app.interviewTime || '',
            mode: app.mode || 'Virtual',
            link: app.link || ''
        };
        setActiveSchedule(existingSched);
        setMailBody(getDefaultPlainText(app));
        setPreviewModal({ open: true, applicant: app });
    };

    const confirmAndSendMail = async () => {
        if (!previewModal.applicant) return;

        if (!activeSchedule.date || !activeSchedule.time) {
            alert("Please enter both a Date and Time before sending.");
            return;
        }

        const storageDate = activeSchedule.date;

        setSending(true);
        try {
            const token = localStorage.getItem("employeeToken");
            const config = { headers: { Authorization: `Bearer ${token}` } };

            await axios.post(`${API_BASE_URL}/api/hr/send-interview-mail`, {
                applicantId: previewModal.applicant._id,
                email: previewModal.applicant.email,
                fullName: previewModal.applicant.fullName,
                jobTitle: previewModal.applicant.jobTitle,
                date: storageDate,
                time: activeSchedule.time,
                mode: activeSchedule.mode,
                link: activeSchedule.link
            }, config);

            alert("Mail sent successfully!");
            setPreviewModal({ open: false, applicant: null });
            fetchInterviewees();
        } catch (err) {
            console.error(err);
            alert("Failed to send mail.");
        } finally {
            setSending(false);
        }
    };

    const filteredApplicants = applicants.filter(app => {
        if (filter === 'Sent') return app.mailSent === true;
        if (filter === 'Not Sent') return !app.mailSent;
        return true;
    });

    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        const parts = dateStr.split("-");
        if (parts.length < 3) return dateStr;
        const [year, month, day] = parts;
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="p-4 space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Interview Management</h1>
                    <p className="text-gray-500 text-sm">Track schedules and send invitations.</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
                    {['All', 'Sent', 'Not Sent'].map((opt) => (
                        <button key={opt} onClick={() => setFilter(opt)} className={`px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest rounded-lg transition-all ${filter === opt ? "bg-white text-emerald-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>{opt}</button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <div className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-pulse" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Due This Week</h3>
                    </div>
                    <div className="grid gap-3">
                        {recent.length > 0 ? recent.map(app => (
                            <div key={app._id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold text-xs">{app.fullName.charAt(0)}</div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-800">{app.fullName}</h4>
                                        <div className="flex items-center gap-3 mt-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                            <span className="flex items-center gap-1"><CalendarDays size={12} className="text-emerald-500" /> {formatDate(app.interviewDate)}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} className="text-emerald-500" /> {app.interviewTime}</span>
                                        </div>
                                    </div>
                                </div>
                                {app.link && <a href={app.link} target="_blank" rel="noreferrer" className="p-2 text-gray-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"><Video size={18} /></a>}
                            </div>
                        )) : (
                            <div className="py-10 border-2 border-dashed border-gray-100 rounded-3xl text-center text-gray-300 text-[10px] font-bold uppercase tracking-widest">No Immediate Interviews</div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Upcoming Later</h3>
                    </div>
                    <div className="grid gap-3">
                        {future.length > 0 ? future.map(app => (
                            <div key={app._id} className="bg-white/60 p-4 rounded-3xl border border-gray-100 flex items-center justify-between opacity-80 hover:opacity-100 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-gray-100 text-gray-400 rounded-2xl flex items-center justify-center font-bold text-xs">{app.fullName.charAt(0)}</div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-600">{app.fullName}</h4>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-wider">{formatDate(app.interviewDate)}</p>
                                    </div>
                                </div>
                                <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg uppercase">Scheduled</div>
                            </div>
                        )) : (
                            <div className="py-10 border-2 border-dashed border-gray-100 rounded-3xl text-center text-gray-300 text-[10px] font-bold uppercase tracking-widest">No Interview</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Queue Management</h3>
                </div>
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-gray-500">Candidate</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-gray-500 text-center">Action</th>
                                <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-gray-500">Mail Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredApplicants.length === 0 ? (
                                <tr><td colSpan={3} className="p-10 text-center text-gray-400 italic font-medium">No applicants found.</td></tr>
                            ) : filteredApplicants.map((app) => (
                                <tr key={app._id} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-800">{app.fullName}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button disabled={app.mailSent} onClick={() => openPreview(app)} className={`inline-flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${app.mailSent ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100"}`}>
                                            <Send size={12} /> Review & Send
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        {app.mailSent ? <span className="text-emerald-600 flex items-center gap-1 font text-[10px] tracking-widest font-bold"><CheckCircle size={14} /> SENT</span> : <span className="text-orange-400 flex items-center gap-1 font text-[10px] tracking-widest font-bold"><Clock size={14} /> PENDING</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {previewModal.open && previewModal.applicant && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl w-full max-w-6xl h-[90vh] shadow-2xl overflow-hidden flex flex-col">
                        <div className="p-5 border-b flex justify-between items-center bg-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Mail size={20} /></div>
                                <div>
                                    <h2 className="font-bold text-gray-800 leading-tight">Prepare Invitation</h2>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Editing: {previewModal.applicant.fullName}</p>
                                </div>
                            </div>
                            <button onClick={() => setPreviewModal({ open: false, applicant: null })} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={20} /></button>
                        </div>

                        <div className="flex-1 flex overflow-hidden bg-gray-50">
                            <div className="w-1/2 overflow-y-auto p-6 flex flex-col gap-6 border-r custom-scrollbar">
                                <div className="space-y-4">
                                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-2">1. Date & Time</span>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-gray-600">Date</label>
                                            <input type="date" value={activeSchedule.date} onChange={(e) => setActiveSchedule({ ...activeSchedule, date: e.target.value })} className="w-full p-2 text-sm border rounded-xl outline-emerald-500 shadow-sm" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-gray-600">Time</label>
                                            <input type="time" value={activeSchedule.time} onChange={(e) => setActiveSchedule({ ...activeSchedule, time: e.target.value })} className="w-full p-2 text-sm border rounded-xl outline-emerald-500 shadow-sm" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-600">Interview Mode</label>
                                        <div className="flex gap-2">
                                            <button onClick={() => setActiveSchedule({ ...activeSchedule, mode: 'Virtual' })} className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 border transition-all ${activeSchedule.mode === 'Virtual' ? 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm' : 'bg-white text-gray-400 hover:bg-gray-50'}`}>
                                                <Video size={14} /> Virtual
                                            </button>
                                            <button onClick={() => setActiveSchedule({ ...activeSchedule, mode: 'On-site' })} className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 border transition-all ${activeSchedule.mode === 'On-site' ? 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm' : 'bg-white text-gray-400 hover:bg-gray-50'}`}>
                                                <MapPin size={14} /> On-site
                                            </button>
                                        </div>
                                    </div>

                                    {activeSchedule.mode === 'Virtual' && (
                                        <div className="space-y-1 animate-in slide-in-from-top-2 duration-300">
                                            <label className="text-xs font-semibold text-gray-600">Meeting Link</label>
                                            <div className="relative">
                                                <LinkIcon size={14} className="absolute left-3 top-3 text-gray-400" />
                                                <input type="url" placeholder="https://meet.google.com/..." value={activeSchedule.link} onChange={(e) => setActiveSchedule({ ...activeSchedule, link: e.target.value })} className="w-full p-2 pl-9 text-sm border rounded-xl outline-emerald-500 shadow-sm" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col min-h-[250px]">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">2. Email Content</span>
                                        <button onClick={() => setMailBody(getDefaultPlainText(previewModal.applicant))} className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 uppercase"><RotateCcw size={12} /> Reset Text</button>
                                    </div>
                                    <textarea value={mailBody} onChange={(e) => setMailBody(e.target.value)} className="flex-1 w-full p-4 text-sm text-gray-700 leading-relaxed border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 bg-white shadow-inner resize-none" />
                                </div>
                            </div>

                            <div className="w-1/2 flex flex-col bg-white">
                                <div className="p-2 bg-gray-100 border-b text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Preview</div>
                                <div className="flex-1 overflow-hidden relative">
                                    <iframe title="Preview" srcDoc={wrapTextInHTML(previewModal.applicant, mailBody, activeSchedule)} className="w-full h-full border-none" />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white border-t flex items-center justify-between">
                            <div className="text-xs text-gray-400">Sending to: <span className="font-semibold text-gray-600">{previewModal.applicant.email}</span></div>
                            <div className="flex gap-3">
                                <button onClick={() => setPreviewModal({ open: false, applicant: null })} className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-widest">Cancel</button>
                                <button onClick={confirmAndSendMail} disabled={sending} className="px-10 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-100 transition-all">
                                    {sending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                                    {sending ? "Sending..." : "Confirm & Send"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
