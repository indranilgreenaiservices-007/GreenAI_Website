import React, { useMemo } from "react";
import { Leaf, Calendar, User, ArrowRight, Newspaper } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Events3 from "../images/statement.png";
import Events4 from "../images/greenai news.jpeg";

export const articles = {
    2: {
        id: 2,
        title: "GreenAI Pioneers Sustainable AI Innovation in National Spotlight",
        excerpt: "GreenAI has proudly made headlines for its pioneering role in India's shift toward sustainable and energy-efficient artificial intelligence.",
        content: [
            "GreenAI has proudly made headlines for its pioneering role in India's shift toward sustainable and energy-efficient artificial intelligence. The recent news feature highlights the vision and leadership of our **Founder Director Prasenjit Majumder** and **Managing Director Subrata Mitra**, whose efforts are positioning the company at the forefront of Green AI innovation.",
            "Their insights on reducing AI's environmental footprint and building accessible, affordable technological solutions for all have drawn national attention. This recognition marks an exciting milestone for GreenAI Services, reinforcing our commitment to developing responsible, inclusive, and eco-friendly AI that empowers people while protecting the planet."
        ],
        image: Events4,
        date: "November 14, 2025",
        author: "GreenAI Team"
    },
    4: {
        id: 4,
        title: "GreenAI Mission for Ethical AI Featured in The Statesman",
        excerpt: "GreenAI Services Pvt Ltd has been featured in The Statesman, highlighting our mission for ethical, energy-efficient, and responsible AI.",
        content: [
            "We're delighted to share that **Greenai Services Pvt Ltd** has been featured in The **Statesman**, where GreenAI's mission for ethical, energy-efficient, and responsible AI took center stage. The article, titled **\"GreenAI launches crusade against RedAI, focusing on model compression, distillation & Edge AI to cut energy use,\"** highlights our initiatives to build sustainable and accessible AI solutions for India, including upcoming multilingual LLMs and advancements in low-energy model design.",
            "Behind this vision and continuous innovation stand our Founder Director, **Prasenjit Majumder**, and Managing Director, **Subrata Mitra**, whose leadership and commitment drive GreenAI's journey toward a more responsible technological future.",
            "This recognition is a proud moment for the entire GreenAI family and strengthens our dedication to delivering innovative and socially responsible AI for the years ahead."
        ],
        image: Events3,
        date: "November 14, 2025",
        author: "GreenAI Team"
    }
};
export default function Blogs() {
    const navigate = useNavigate();

    const visibleArticles = useMemo(() => {
        return Object.values(articles).slice(0, 4);
    }, []);

    return (
        <section id="media" className="py-24 bg-slate-50 relative">
            <div className="container  mx-auto px-6 w-full max-w-7xl">
                <div className="mb-12 max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-700 font-semibold text-xs tracking-wide uppercase mb-4 shadow-sm">
                        <Newspaper size={12} />
                        Media & Updates
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                        GreenAI Media & Updates
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        Explore our latest press releases, company announcements, media coverage, and key updates highlighting .
                    </p>
                </div>

                <div className="flex flex-wrap justify-center items-stretch gap-6 mb-12">
                    {visibleArticles.map((article, index) => (
                        <div
                            key={article.id}
                            className={`w-full md:w-[calc(50%-1.5rem)] lg:w-[320px] bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col cursor-pointer ${index >= 2 ? "hidden md:flex" : "flex"
                                }`}
                            onClick={() => navigate(`/media-events/${article.id}`, { state: { from: 'media' } })}
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
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
                                <div className="flex items-center text-blue-600 font-bold text-xs group-hover:translate-x-1 transition-transform mt-auto">
                                    Read News <ArrowRight size={14} className="ml-1" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/media-events"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all hover:-translate-y-0.5"
                    >
                        View All Media & News <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}