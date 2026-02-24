import React from 'react';
import { Layers, Radio, Mic, Rss, ArrowRight, Calendar, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

import Events6 from "../images/events6.png";
import Events5 from "../images/event5.jpeg";
import Events1 from "../images/Events1.jpeg";
import Events2 from "../images/event2.png";

export const insightsData = {
    1: {
        id: 1,
        title: "Meeting with VC Prof. (Dr.) R. Venkata Rao on the Future of Law & AI",
        excerpt: "GreenAI had an insightful meeting with VC Prof. (Dr.) R. Venkata Rao, joined by our Executive Director & Principal Scientist, along with the professors and students of IILUER.",
        content: [
            "GreenAI had an insightful meeting with VC Prof. (Dr.) R. Venkata Rao, joined by our Executive Director & Principal Scientist, along with the professors and students of IILUER.",
            "The discussion focused on the evolving landscape of Law and Artificial Intelligence, exploring opportunities for collaboration, innovation, and the future of tech-driven legal education.",
            "GreenAI appreciates the warm welcome from IILUER and looks forward to building impactful initiatives together."
        ],
        image: Events6,
        date: "November 18, 2025",
        author: "GreenAI Team"
    },
    3: {
        id: 3,
        title: "GreenAI Engages in Productive Discussion at IME 2025, Kolkata",
        excerpt: "GreenAI had a productive discussion with John Finlay and their teams at IME 2025, Kolkata, introducing our upcoming flagship release, VidhiLab.",
        content: [
            "GreenAI had a productive discussion with John Finlay and their teams at IME 2025, Kolkata. Our Technical Sales Executive, Mr. Akash Chakraborty, introduced GreenAI's products and services, including an overview of our upcoming flagship release, VidhiLab, an AI-powered legal assistant chatbot. The conversation also opened opportunities to explore new ideas, enhancements, and strategies to further grow and strengthen our business."
        ],
        image: Events5,
        date: "October 30, 2025",
        author: "GreenAI Team"
    },
    5: {
        id: 5,
        title: "Panel Dicussion: GreenAI vs RedAI",
        excerpt: "Industry experts, professors, and leaders came together to engage in an insightful GreenAI vs RedAI discussion at the GreenAI office.",
        content: [
            "Today at the **GreenAI office**, industry experts, professors, and leaders came together to engage in an insightful **GreenAI vs RedAI** discussion. Participants shared their ideas, suggestions, and perspectives on how artificial intelligence can be used responsibly, addressing key challenges related to sustainability, ethics, and privacy. The event fostered meaningful dialogue and collaboration among thought leaders striving to shape a more ethical and sustainable AI future."
        ],
        image: Events2,
        date: "August 18, 2025",
        author: "GreenAI Team"
    },
    6: {
        id: 6,
        title: "Brunch with Computation Gastronomy Pioneer",
        excerpt: "A meeting with IIIT, Delhi professor Dr. Ganesh Bagler to explore converging possibilities at the intersection of AI-driven analytics and food-science.",
        content: [
            "We met IIIT, Delhi professor and the founder of Foodoscope Technologies **Dr. Ganesh Bagler**, whose interdisciplinary research for computation gastronomy bridges complex systems, AI and food science, enabling algorithmic modeling of food pairing, nutrition and culinary evolution. Greenai and Prof. Bagler explored converging possibilities at the intersection of AI-driven analytics and food-science innovation in this meeting. The discussion focused on leveraging shared expertise to co-develop **AI‑powered tools** ranging from predictive flavor pairing models and nutrition-aware recipe generators to sustainability-indexed food analytics services."
        ],
        image: Events1,
        date: "July 25, 2025",
        author: "GreenAI Team"
    },
    7: {
        id: 7,
        title: "Registered Office Inauguration",
        excerpt: "Glimpses from the inauguration of our registered office, highlighting discussions on Green AI vs. Red AI and the transformative role of AI in improving workflows within the medical and legal domains.",
        content: [
            "Glimpses from the inauguration of our registered office, highlighting discussions on Green AI vs. Red AI and the transformative role of AI in improving workflows within the medical and legal domains."
        ],
        image: "/images/boards/b2.jpeg",
        secondaryImage: "/images/boards/b3-cropped.jpeg",
        date: "August 18, 2025",
        author: "GreenAI Team"
    }
};

export default function Insights() {
    const navigate = useNavigate();
    const visibleData = Object.values(insightsData).slice(0, 4);

    return (
        <section id="insights" className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
            <div className="container mx-auto px-6 w-full max-w-7xl">
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-700 font-semibold text-xs tracking-wide uppercase mb-4 shadow-sm">
                        <Layers size={12} />
                        Insights
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">GreenAI Insights</h2>
                    <p className="text-lg text-slate-600">
                        Deep dives into our technology, podcasts, and industry perspectives.
                    </p>
                </div>

                {visibleData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {visibleData.map((article) => (
                            <div
                                key={article.id}
                                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full cursor-pointer"
                                onClick={() => navigate(`/insights/${article.id}`, { state: { from: 'insights' } })}
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <div className={`grid h-full ${article.secondaryImage ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {article.secondaryImage && (
                                            <img
                                                src={article.secondaryImage}
                                                alt={article.title + " 2"}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 border-l border-white/20"
                                            />
                                        )}
                                    </div>
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-700 shadow-sm flex items-center gap-1">
                                        <Calendar size={10} className="text-blue-600" />
                                        {article.date}
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex items-center gap-1.5 mb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                                        <User size={10} /> {article.author}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2 leading-tight">
                                        {article.title}
                                    </h3>
                                    <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3 flex-grow">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center text-blue-600 font-bold text-xs group-hover:translate-x-1 transition-transform">
                                        Read More <ArrowRight size={14} className="ml-1" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 md:py-20 bg-white rounded-3xl border border-slate-200 shadow-sm text-center px-6 mx-auto w-full max-w-2xl mb-12">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <Radio size={32} className="md:w-10 md:h-10 text-blue-600" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">Stay Tuned!</h2>
                        <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
                            We are currently crafting in-depth technical posts, podcasts, and updates.
                        </p>
                    </div>
                )}

                {visibleData.length > 0 && (
                    <div className="text-center">
                        <Link
                            to="/insights"
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all hover:-translate-y-0.5"
                        >
                            View All Insights <ArrowRight size={16} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
