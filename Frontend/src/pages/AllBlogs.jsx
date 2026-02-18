import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ArrowRight } from 'lucide-react';
import { articles } from '../components/home/Blogs';
import ActiveBackground from '../components/layout/ActiveBackground';
import Footer from '../components/layout/Footer';

export default function AllBlogs() {
    const navigate = useNavigate();
    // Convert object to array
    const allArticles = Object.values(articles);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen font-sans text-[#0b1220] bg-slate-50">

            <main className="pt-24 pb-24">
                <div className="container mx-auto px-6 w-full max-w-7xl">
                    <div className="mb-16 text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">All Insights & News</h1>
                        <p className="text-lg text-slate-600">
                            Explore our complete archive of articles, updates, and thought leadership on sustainable AI.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allArticles.map((article) => (
                            <div
                                key={article.id}
                                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full cursor-pointer"
                                onClick={() => navigate(`/blog/${article.id}`)}
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                                        Read Article <ArrowRight size={16} className="ml-2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
