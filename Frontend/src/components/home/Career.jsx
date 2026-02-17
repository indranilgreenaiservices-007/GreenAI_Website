import React, { useState } from "react";
import { Leaf, MapPin, Briefcase, ChevronDown, ArrowRight, Share2, CheckCircle2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const jobs = [
    {
        id: "technical-sales-associate",
        title: "Technical Sales Associate",
        location: "Kolkata",
        experience: "2–3 Years",
        type: "Full-time",
        description: "GreenAI Services is looking for a dynamic Technical Sales Associate to drive business development and strengthen client engagement across our AI products, services, and solutions.",
        responsibilities: [
            "Engage with prospective clients to understand needs",
            "Present and demonstrate AI solutions (AI & Law, ESG, Industrial AI)",
            "Support the sales cycle from lead qualification to closure",
            "Coordinate with technical teams for proposals",
            "Assisting with pricing, negotiation & commercials"
        ],
        skills: [
            "Excellent communication & presentation",
            "Understanding of AI fundamentals or industrial automation",
            "Ability to simplify technical concepts",
            "Strong client relationship-building mindset"
        ],
        link: "mailto:reach@greenai.services?subject=Application – Technical Sales Associate"
    },
    {
        id: "program-director-education",
        title: "Program Director (Education Vertical)",
        location: "Kolkata (On-site)",
        experience: "5–8 Years",
        type: "Full-time",
        salary: "₹9 LPA+",
        description: "Lead our education vertical focused on 'AI and Law: The Crossroads' — an initiative blending AI, legal scholarship, and ethics in partnership with major universities.",
        responsibilities: [
            "Manage academic programs, courses, and partnerships",
            "Coordinate operations, schedules, and reporting",
            "Lead marketing and outreach with schools and corporations",
            "Prepare strategic reports and identify new opportunities"
        ],
        skills: [
            "Postgraduate in Education Management, Law, or Business",
            "5–8 years in program management or academic partnerships",
            "Strong leadership, communication, and planning skills"
        ],
        link: "https://storage.googleapis.com/greenaiservice/uploads/7fc4fe97/index.html"
    },
    {
        id: "legal-compliance-associate",
        title: "Legal and Compliance Associate",
        location: "Kolkata",
        experience: "Min 1 Year",
        type: "Full-time",
        description: "Oversee legal matters, ensuring regulatory compliance and minimizing risks within the company's AI operations.",
        responsibilities: [
            "Develop legal frameworks and manage regulatory compliance",
            "Handle contracts and act as Grievance Associate",
            "Support due diligence processes",
            "Integrate legal considerations into AI products"
        ],
        skills: [
            "LL.B. from an Indian university",
            "Current State Bar Council enrollment",
            "Expertise in Indian legal frameworks (Data Protection, AI)"
        ],
        link: "mailto:careers@greenai.services?subject=Application – Legal and Compliance Associate"
    },
    {
        id: "full-stack-developer",
        title: "Full Stack Developer (LLM & Chatbots)",
        location: "Kolkata",
        experience: "3-5 Years",
        type: "Full-time",
        description: "We are looking for a skilled Full Stack Developer with hands-on experience in Large Language Models (LLMs) and Chatbots to work on cutting-edge solutions.",
        responsibilities: [
            "Design and optimize full-stack applications leveraging LLMs",
            "Integrate and fine-tune LLMs (OpenAI, LLaMA, etc.)",
            "Develop scalable APIs and microservices",
            "Work with frontend (React) and backend (Node.js/Python)"
        ],
        skills: [
            "Hands-on experience with LLMs, NLP, and Chatbots",
            "Proficiency in JavaScript/TypeScript, Python, or Node.js",
            "Experience with Vector Databases, LangChain, RAG",
            "Cloud deployment (AWS, GCP, Azure)"
        ],
        link: "https://docs.google.com/forms/d/e/1FAIpQLScMizrLM6JVKbAeZzJ22mLO8zomsaArgtlOj6FOMI7U4ygUbQ/viewform"
    },
    {
        id: "embedded-systems-engineer",
        title: "Embedded Systems Engineer (ECE)",
        location: "Kolkata",
        experience: "3-5 Years",
        type: "Full-time",
        description: "Work on IoT-based industrial automation solutions, applying RS-485 Modbus communication, 4G LTE connectivity, and relay control using ESP32.",
        responsibilities: [
            "Design and develop firmware for ESP32 and microcontrollers",
            "Implement RS-485 Modbus and 4G LTE integration",
            "Develop relay-based control systems",
            "Optimize processes using FreeRTOS"
        ],
        skills: [
            "Proficiency in Embedded C/C++, Arduino/ESP-IDF",
            "Experience with ESP32, STM32, Raspberry Pi",
            "Knowledge of MQTT, HTTP, WebSockets, Modbus"
        ],
        link: "https://docs.google.com/forms/d/e/1FAIpQLSfSb3WkioXcqEsk2mQSA8Q6DWobN3QqivSET7Ro1AdXMhlXfA/viewform"
    },
    {
        id: "robotic-arm-design-engineer",
        title: "Robotic Arm Design Engineer",
        location: "Kolkata",
        experience: "4+ Years",
        type: "Full-time",
        description: "Lead the mechanical design of robotic arms (6-DOF+) and integrate AI-based control systems for next-generation manufacturing.",
        responsibilities: [
            "Lead mechanical design of robotic arms (kinematics, dynamics)",
            "Develop AI models for motion planning and grasping",
            "Utilize simulation tools (ROS/Gazebo, PyBullet, Isaac Sim)",
            "Optimize robotic motion using inverse kinematics"
        ],
        skills: [
            "Degree in Robotics, Mechatronics, or Mechanical Engineering",
            "Proficiency in CAD tools (SolidWorks, Fusion 360)",
            "Strong programming in Python, C++, ROS2",
            "Experience with control systems (PID, MPC)"
        ],
        link: "https://docs.google.com/forms/d/e/1FAIpQLSftBCZ0e-MwwKFjAWBu5JRbX8TCBHRQR9zf8RZumUUJstC9Ew/viewform"
    },
    {
        id: "machine-learning-engineer",
        title: "Machine Learning Engineer",
        location: "Kolkata (Remote flexible)",
        experience: "2+ Years",
        type: "Full-time",
        description: "Optimize and ship models for Automatic Speech Recognition (ASR), Neural Machine Translation (NMT), and Text-to-Speech (TTS) on edge devices.",
        responsibilities: [
            "Develop ASR, NMT, and TTS models",
            "Optimize models for Edge deployment (TFLite, ONNX)",
            "Benchmark and integrate models into mobile apps"
        ],
        skills: [
            "2+ years of ML experience in Speech/NLP",
            "Proficiency in TensorFlow, PyTorch, ONNX",
            "Familiarity with Whisper, Vosk, MarianMT"
        ],
        link: "https://docs.google.com/forms/d/e/1FAIpQLSc14yMBDH3w7zSO8J1SnbNvnQXPdg5XFp6We35qbzZon84AlA/viewform"
    }
];

export default function Career() {
    const [expandedIds, setExpandedIds] = useState([]);
    const [showAllJobs, setShowAllJobs] = useState(false);
    const [copiedId, setCopiedId] = useState(null);

    const toggleJob = (id) => {
        if (!showAllJobs) {
            setShowAllJobs(true);
            // Optionally auto-expand the clicked job if desired, but user just said "make other jobs visible"
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

    // Show all jobs if expanded, otherwise only first 3
    const displayedJobs = showAllJobs ? jobs : jobs.slice(0, 3);

    return (
        <section id="career" className="py-24 bg-slate-50 relative">
            <div className="container mx-auto px-6 w-full max-w-5xl">
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 font-semibold text-xs tracking-wide uppercase mb-4 shadow-sm">
                        <Briefcase size={12} />
                        Join Our Team
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Build the Future of <span className="text-emerald-600">Green AI</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        We're hiring passionate minds to build next-gen AI solutions.
                        Join us in our mission to leverage artificial intelligence for a sustainable & automated future.
                    </p>
                </div>

                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {displayedJobs.map((job, index) => {
                            const isExpanded = expandedIds.includes(job.id);
                            const isMasked = !showAllJobs && index === 2;

                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    key={job.id}
                                    id={job.id}
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
                                        onClick={() => toggleJob(job.id)}
                                        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left relative z-10"
                                    >
                                        <div className="flex-1">
                                            <h3 className={`text-lg font-bold transition-colors ${isExpanded ? "text-emerald-700" : "text-slate-800"}`}>
                                                {job.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-slate-500 font-medium">
                                                <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                    <MapPin size={14} className="text-slate-400" />
                                                    {job.location}
                                                </span>
                                                <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                    <Clock size={14} className="text-slate-400" />
                                                    {job.experience}
                                                </span>
                                                {job.salary && (
                                                    <span className="text-emerald-600 px-2 py-1 bg-emerald-50 rounded-md text-xs font-bold border border-emerald-100">
                                                        {job.salary}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                role="button"
                                                tabIndex={0}
                                                onClick={(e) => handleShare(e, job.id)}
                                                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-colors relative group"
                                                title="Share Job"
                                            >
                                                {copiedId === job.id ? <CheckCircle2 size={18} className="text-emerald-600" /> : <Share2 size={18} />}
                                                {copiedId === job.id && (
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
                                                        <p className="mb-4 text-base">{job.description}</p>

                                                        <div className="grid md:grid-cols-2 gap-8">
                                                            <div>
                                                                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                                                    <Briefcase size={16} className="text-emerald-600" /> Key Responsibilities
                                                                </h4>
                                                                <ul className="space-y-2">
                                                                    {job.responsibilities.map((res, i) => (
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
                                                                    {job.skills.map((skill, i) => (
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
                                                        <a
                                                            href={job.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-900/10 hover:shadow-emerald-900/20"
                                                        >
                                                            Apply Now <ArrowRight size={16} />
                                                        </a>
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
            </div>
        </section>
    );
}