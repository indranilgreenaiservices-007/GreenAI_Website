import React, { useEffect, useRef } from "react";
import { Sparkles, Cpu, Leaf, Globe2 } from "lucide-react";



const advisorMembers = [
    { name: "Prof. Tathagata Bandyopadhyay", title: "Director General at DAU", photo: "/images/img/TB.webp" },
    { name: "Prof. Mandar Mitra", title: "Professor at ISI, Kolkata", photo: "/images/img/MM.webp" },
    { name: "Dr. Maniklal Das", title: "Professor of Computer Science and Dean Faculty at DAU", photo: "/images/img/Maniklal.webp" },
    { name: "Dr. Sripati Tudu", title: "Assistant Professor, School of Languages at ILSR and Assistant Professor of Santali at SKBU", photo: "/images/img/Sripati_Tudu.jpeg" },
];

export default function AboutUs() {
    const cardRefs = useRef([]);

    useEffect(() => {
        // Observer removed to ensure cards are always visible
    }, []);

    const renderCard = (member) => {
        const isFixedSize = ["Prof. Tathagata Bandyopadhyay", "Prof. Mandar Mitra", "Dr. Maniklal Das"].includes(member.name);
        const isLeadershipCard = ["Mr. Berjis Desai", "Prof. Prasenjit Majumder", "Mr. Subrata Mitra", "Mr. Sivaramakrishnan S Iyer"].includes(member.name);

        const isContain = member.name === "Prof. Prasenjit Majumder";
        const objectPosition = member.name === "Mr. Berjis Desai" ? "50% 20%" : member.name === "Prof. Tathagata Bandyopadhyay" ? "50% 10%" : "center";
        const bgWhite = ["Prof. Prasenjit Majumder", "Mr. Sabyasachi Chatterjee"].includes(member.name);

        return (
            <div
                className="w-full bg-white rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-md border border-slate-100 flex flex-col items-center group cursor-default h-full"
            >
                <div className={`w-[120px] h-[120px] rounded-full mb-6 overflow-hidden flex items-center justify-center shrink-0 ${bgWhite ? 'bg-white' : 'bg-slate-50'} shadow-sm border border-slate-100/50 group-hover:scale-[0.9] transition-transform duration-300 ease-in-out`}>
                    <img
                        src={member.photo}
                        alt={`Photo of ${member.name}`}
                        className={`w-full h-full ${isContain ? 'object-contain' : 'object-cover'}`}
                        style={{ objectPosition }}
                        loading="lazy"
                    />
                </div>
                <div className="flex flex-col flex-grow w-full">
                    <h5 className="text-[1.1rem] font-bold text-[#0f6d3a] mb-2 leading-tight">
                        {member.name}
                    </h5>
                    <p className="text-sm font-semibold text-slate-800 leading-snug">
                        {member.title}
                    </p>
                    {member.expertise && (
                        <p className="text-xs text-slate-500 mt-2">
                            {member.expertise}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    const renderTeamSection = (title, members, startIndex) => (
        <div className="mt-16 sm:mt-24">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-8 sm:mb-12">
                <span className="border-b-4 border-green-500 pb-2 inline-block">{title}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
                {members.map((member, idx) => (
                    <div
                        key={member.name}
                        ref={(el) => (cardRefs.current[startIndex + idx] = el)}
                        className="transition-all duration-700 ease-out"
                        style={{ transitionDelay: `${(idx % 4) * 100}ms` }}
                    >
                        {renderCard(member)}
                    </div>
                ))}
            </div>
        </div>
    );



    return (
        <section id="about-us" className="pt-20 pb-16 bg-[#f8f8f8] w-full overflow-hidden text-center relative z-10 transition-colors duration-300">
            <div className="container mx-auto px-6 w-full max-w-7xl">

                {/* Team Introduction Section */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        MEET GREEN<span className="text-green-500">A</span>I BOARD
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
                        Innovators Behind Sustainable AI Solutions
                    </p>

                    {/* Board Image Banner with Descriptions */}
                    <div className="w-full max-w-5xl mx-auto mb-16 px-4">
                        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50 flex flex-col w-full">
                            <div className="flex items-center justify-center p-2 bg-slate-100/50">
                                <img
                                    src="/images/boards/b1.jpeg"
                                    alt="GreenAI Board Members"
                                    className="w-full object-contain transition-opacity duration-700 ease-in-out h-[350px] sm:h-[450px] md:h-[600px] rounded-t-xl"
                                />
                            </div>
                            <div className="bg-white w-full p-6 border-t border-slate-200">
                                <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed max-w-4xl mx-auto text-left sm:text-center md:leading-loose">
                                    <span className="font-bold text-slate-900">From left , </span>
                                    <span className="font-bold text-green-700">Mr. Subrata Mitra, </span>
                                    <span className="text-slate-500 block sm:inline">Managing Director; </span>

                                    <span className="font-bold text-green-700 mt-2 sm:mt-0 inline-block">Mr. Berjis Desai, </span>
                                    <span className="text-slate-500 block sm:inline"> Distinguished Lawyer & Acclaimed Author; </span>

                                    <span className="font-bold text-green-700 mt-2 sm:mt-0 inline-block">Prof. Prasenjit Majumder, </span>
                                    <span className="text-slate-500 block sm:inline"> Professor at DAU and Founder Director & Principal Scientist; </span>

                                    <span className="font-bold text-green-700 mt-2 sm:mt-0 inline-block">Mr. Sivaramakrishnan S Iyer, </span>
                                    <span className="text-slate-500 block sm:inline">Founder Director.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>



                {renderTeamSection(
                    "Advisors",
                    advisorMembers,
                    0
                )}


                {/* Appended Philosophy Section Content */}
                

            </div>
        </section>
    );
}
