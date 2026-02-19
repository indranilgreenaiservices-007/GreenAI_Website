import React, { useMemo } from "react";
import { Leaf, Calendar, User, ArrowRight, Newspaper } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Importing images from the correct location
// Importing images from the correct location
import Events1 from "../images/Events1.jpeg";
import Events2 from "../images/event2.png";
import Events3 from "../images/statement.png";
import Events4 from "../images/greenai news.jpeg";
import Events5 from "../images/event5.jpeg";
import Events6 from "../images/events6.png";

// Shared data source for blogs
export const articles = {
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
};

export default function Blogs() {
    const navigate = useNavigate();

    // Sort articles by date descending (assuming simple string comparison or just reverse order of ID for now)
    // Actually ID 1 is the latest based on data provided (Nov 18 vs Nov 14 etc), so we map 1..N
    // The user wants only 4 blogs shown here.
    const visibleArticles = useMemo(() => {
        return Object.values(articles).slice(0, 4);
    }, []);

    return (
        <section id="media" className="py-24 bg-slate-50 relative">
            <div className="container mx-auto px-6 w-full max-w-7xl">
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

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {visibleArticles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full cursor-pointer"
                            onClick={() => navigate(`/media-events/${article.id}`)}
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
                                <div className="flex items-center text-blue-600 font-bold text-xs group-hover:translate-x-1 transition-transform">
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