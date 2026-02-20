import React, { useMemo } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { articles } from '../components/home/Media'; // Import data from Blogs component
import ActiveBackground from '../components/layout/ActiveBackground';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

function highlightBoldText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, (_, p1) => `<strong>${p1}</strong>`);
}

export default function BlogPost() {
    const { id } = useParams();
    const articleId = Number(id);
    const article = articles[articleId];
    const location = useLocation();
    const navigate = useNavigate();

    // Helper inside component to scroll top on mount
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const handleBack = (e) => {
        e.preventDefault();
        // Check if user came from 'media-events' (pagination) or elsewhere
        if (location.state?.from === 'media-events') {
            navigate(-1); // Go back to history (preserves page numbers)
        } else {
            // Direct access or from home, go to Home Media Section
            navigate('/', { state: { scrollTo: "media" } });
        }
    };

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Article Not Found</h2>
                    <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans text-[#0b1220] bg-slate-50">
            <div className="pt-24 pb-24">
                <article className="container mx-auto px-6 w-full max-w-4xl relative">
                    <div className="mb-8">
                        <button
                            onClick={handleBack}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 font-medium text-sm shadow-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all duration-200 hover:-translate-y-0.5 mb-6 cursor-pointer"
                        >
                            <ArrowLeft size={16} /> Back
                        </button>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 border-b border-slate-200 pb-8 mb-8">
                            <span className="flex items-center gap-2">
                                <Calendar size={16} className="text-blue-500" /> {article.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <User size={16} className="text-blue-500" /> By {article.author}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={16} className="text-blue-500" /> 3 min read
                            </span>
                        </div>
                    </div>

                    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg mb-10 bg-slate-50 border border-slate-100 flex justify-center">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-auto h-auto max-h-[80vh] object-contain"
                        />
                    </div>

                    <div className="prose prose-lg prose-slate max-w-none">
                        {article.content.map((paragraph, index) => (
                            <p
                                key={index}
                                className="mb-6 leading-relaxed text-slate-700"
                                dangerouslySetInnerHTML={{
                                    __html: highlightBoldText(paragraph),
                                }}
                            />
                        ))}
                    </div>
                </article>
            </div>
        </div>
    );
}
