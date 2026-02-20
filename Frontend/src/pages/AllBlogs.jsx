import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { articles } from '../components/home/Media';
import ActiveBackground from '../components/layout/ActiveBackground';
import Footer from '../components/layout/Footer';

export default function AllBlogs() {
    const navigate = useNavigate();
    // Convert object to array
    const allArticles = Object.values(articles);
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(allArticles.length / itemsPerPage);

    const currentArticles = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return allArticles.slice(start, start + itemsPerPage);
    }, [allArticles, currentPage]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handleBack = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <div className="min-h-screen font-sans text-[#0b1220] bg-slate-50">

            <main className="pt-24 pb-24">
                <div className="container mx-auto px-6 w-full max-w-7xl relative">
                    <div className="mb-8">
                        <Link
                            to="/"
                            state={{ scrollTo: "media" }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 font-medium text-sm shadow-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <ArrowLeft size={16} /> Back
                        </Link>
                    </div>

                    <div className="mb-16 text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">All Media & News</h1>
                        <p className="text-lg text-slate-600">
                            Explore our complete archive of articles, updates, and thought leadership on sustainable AI.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentArticles.map((article) => (
                            <div
                                key={article.id}
                                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full cursor-pointer"
                                onClick={() => navigate(`/media-events/${article.id}`, { state: { from: 'media-events', page: currentPage } })}
                            >
                                <div className="h-56 overflow-hidden relative bg-slate-50 border-b border-slate-100">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1.5">
                                        <Calendar size={12} className="text-blue-600" />
                                        {article.date}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        <User size={12} /> {article.author}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                                        Read News <ArrowRight size={16} className="ml-2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="mt-16 flex justify-center items-center gap-4">
                            <button
                                onClick={handleBack}
                                disabled={currentPage === 1}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 font-medium text-sm shadow-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={16} /> Back
                            </button>

                            <div className="flex items-center gap-2 font-bold text-slate-700">
                                <span className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-sm">{currentPage}</span>
                                <span className="text-slate-400 text-sm">/</span>
                                <span className="text-slate-500 text-sm">{totalPages}</span>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 font-medium text-sm shadow-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
