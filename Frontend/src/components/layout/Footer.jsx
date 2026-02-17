import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Linkedin, Instagram, Youtube, ExternalLink } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../images/logo.webp"

const Footer = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
        window.scrollTo(0, 0);
    };

    const socialLinks = [
        {
            icon: <Linkedin size={16} />,
            url: "https://www.linkedin.com/company/greenai-services/",
            label: "LinkedIn",
        },
        {
            icon: <Instagram size={16} />,
            url: "https://www.instagram.com/greenai.services/",
            label: "Instagram",
        },
        {
            icon: <Facebook size={16} />,
            url: "https://www.facebook.com/people/Greenai-Services-Private-Limited/61564319840679/",
            label: "Facebook",
        },
        {
            icon: <FaXTwitter size={16} />,
            url: "https://x.com/Greenaiservices",
            label: "X (formerly Twitter)",
        },
        {
            icon: <Youtube size={16} />,
            url: "https://www.youtube.com/@greenaiservicesprivatelimited",
            label: "YouTube",
        },
    ];

    const portals = [
        { name: "GAI Portal", path: "/gai-portal" },
        { name: "HR Portal", path: "/hr-portal" },
    ];

    const quickLinks = [
        { name: "GreenAI Portfolio", path: "/greenai-portfolio" },
        { name: "Education", path: "/education" },
        { name: "Board", path: "/board" },
        { name: "Careers", path: "/careers" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <footer className="bg-[#0b1220] text-slate-400 text-sm mt-auto border-t border-slate-800/50">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
                    {/* Brand Section */}
                    <div className="md:col-span-4 space-y-4">
                        <Link
                            to="/"
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="block"
                        >
                            <img src={logo} alt="Logo" className="w-10 h-10" />
                        </Link>

                        <p className="text-xs leading-relaxed text-slate-500 max-w-sm">
                            Unlock your potential with GreenAI Services. Delivering cutting-edge AI solutions that drive efficiency and fuel growth.
                        </p>
                        <div className="flex gap-2 pt-2">
                            {socialLinks.map(({ icon, url, label }) => (
                                <a
                                    key={label}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/50 text-slate-400 hover:bg-[#2E7D32] hover:text-white transition-all duration-300"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3">
                        <h4 className="text-slate-200 font-semibold mb-4 text-sm">Company</h4>
                        <ul className="space-y-2 text-xs">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        onClick={() => handleNavigation(link.path)}
                                        className="hover:text-[#4CAF50] transition-colors block py-0.5"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-3">
                        <h4 className="text-slate-200 font-semibold mb-4 text-sm">Contact Us</h4>
                        <div className="space-y-3 text-xs">
                            <div>
                                <span className="block text-slate-500 mb-1">Email</span>
                                <a href="mailto:reach@greenai.services" className="text-slate-300 hover:text-[#4CAF50] transition-colors">
                                    reach@greenai.services
                                </a>
                            </div>
                            <div>
                                <span className="block text-slate-500 mb-1">Phone</span>
                                <a href="tel:+918981941888" className="text-slate-300 hover:text-[#4CAF50] transition-colors">
                                    +91 89819 41888
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Portals Buttons */}
                    <div className="md:col-span-2">
                        <h4 className="text-slate-200 font-semibold mb-4 text-sm">Portals</h4>
                        <div className="flex flex-col gap-3">
                            {portals.map((p) => (
                                <Link
                                    key={p.name}
                                    to={p.path}
                                    onClick={() => handleNavigation(p.path)}
                                    className="group flex items-center justify-between px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-[#2E7D32] hover:border-[#2E7D32] text-xs font-medium text-slate-300 hover:text-white transition-all duration-300"
                                >
                                    {p.name}
                                    <ExternalLink size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-6 border-t border-slate-800 text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
                    <p>© {new Date().getFullYear()} GreenAI Services Pvt Ltd. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy-policy" onClick={() => handleNavigation("/privacy-policy")} className="hover:text-slate-300 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms-services" onClick={() => handleNavigation("/terms-services")} className="hover:text-slate-300 transition-colors">
                            Terms & Services
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
