import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { articles as mediaArticles } from '../components/home/Media';
import { insightsData } from '../components/home/Insights';
import ActiveBackground from '../components/layout/ActiveBackground';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

function highlightBoldText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, (_, p1) => `<strong>${p1}</strong>`);
}

export default function BlogPost() {
    const { id } = useParams();
    const articleId = isNaN(Number(id)) ? id : Number(id);
    const allArticles = { ...mediaArticles, ...insightsData };
    const article = allArticles[articleId];
    const location = useLocation();
    const navigate = useNavigate();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = useMemo(() => {
        const imgs = [];
        if (article?.image) imgs.push(article.image);
        if (article?.secondaryImage) imgs.push(article.secondaryImage);
        return imgs;
    }, [article]);

    useEffect(() => {
        if (!images || images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [images]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    // Helper inside component to scroll top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const handleBack = (e) => {
        e.preventDefault();
        if (location.state?.from) {
            if (location.state.from === 'media-events' || location.state.from === 'insights') {
                if (location.state.page) {
                    navigate(-1);
                } else {
                    navigate('/', { state: { scrollTo: location.state.from === 'insights' ? 'insights' : 'media' } });
                }
            } else {
                navigate(-1);
            }
        } else {
            const section = location.pathname.startsWith('/insights') ? 'insights' : 'media';
            navigate('/', { state: { scrollTo: section } });
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

                    {images.length > 0 && (
                        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg mb-10 bg-slate-50 border border-slate-100 flex justify-center group">
                            <img
                                src={images[currentImageIndex]}
                                alt={`${article.title} - Image ${currentImageIndex + 1}`}
                                className="w-auto h-auto max-h-[60vh] md:max-h-[80vh] object-contain transition-opacity duration-500"
                            />

                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight size={24} />
                                    </button>

                                    {/* Indicators */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                                                    }`}
                                                aria-label={`Go to image ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

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
