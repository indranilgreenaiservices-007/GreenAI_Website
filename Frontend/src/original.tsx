// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   Leaf,
//   Menu,
//   X,
//   ArrowRight,
//   ShieldCheck,
//   LineChart,
//   Gauge,
//   AlertTriangle,
//   Scale,
//   Mic,
//   BookOpen,
//   Cpu,
//   Globe2,
//   CheckCircle2,
//   MapPin,
//   Mail,
//   Phone,
//   Building2,
//   Sparkles,
// } from "lucide-react";

// /**
//  * GreenAI Services — Single-file React corporate website
//  * Tech: React + lucide-react + Standard CSS injected via <style> tag
//  * Notes:
//  * - No Tailwind
//  * - Smooth scrolling enabled
//  * - Sticky glass navbar -> solid on scroll
//  * - Hero entrance animations + blurred orb background
//  * - Interactive RegIntel 360 tabbed “dashboard”
//  * - Hover “physics” (tilt) cards in Ecosystem
//  * - Contact form simulation with sending/sent states
//  */

// export default function App() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const scrollToId = (id) => {
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
//     setMobileOpen(false);
//   };

//   useEffect(() => {
//     const onScroll = () => setIsScrolled(window.scrollY > 12);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     // close mobile menu on ESC
//     const onKey = (e) => {
//       if (e.key === "Escape") setMobileOpen(false);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   const navLinks = useMemo(
//     () => [
//       { id: "regintel", label: "RegIntel 360" },
//       { id: "solutions", label: "Solutions" },
//       { id: "philosophy", label: "Philosophy" },
//       { id: "academy", label: "Academy" },
//       { id: "contact", label: "Contact Us" },
//     ],
//     []
//   );

//   return (
//     <div className="appRoot">
//       <StyleTag />

//       <header className={`nav ${isScrolled ? "navSolid" : "navGlass"}`}>
//         <div className="container navInner">
//           <button
//             className="brand"
//             onClick={() => scrollToId("top")}
//             aria-label="Go to top"
//           >
//             <span className="brandIcon">
//               <Leaf size={18} />
//             </span>
//             <span className="brandText">
//               GreenAI <span className="brandSub">Services</span>
//             </span>
//           </button>

//           <nav className="navLinks" aria-label="Primary">
//             {navLinks.map((l) => (
//               <button
//                 key={l.id}
//                 className="navLink"
//                 onClick={() => scrollToId(l.id)}
//               >
//                 {l.label}
//               </button>
//             ))}
//           </nav>

//           <div className="navCta">
//             <button className="btn btnGhost" onClick={() => scrollToId("regintel")}>
//               Discover RegIntel 360 <ArrowRight size={16} />
//             </button>

//             <button
//               className="iconBtn burger"
//               aria-label={mobileOpen ? "Close menu" : "Open menu"}
//               onClick={() => setMobileOpen((v) => !v)}
//             >
//               {mobileOpen ? <X size={18} /> : <Menu size={18} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu with animated height + opacity */}
//         <div className={`mobileMenu ${mobileOpen ? "open" : ""}`}>
//           <div className="container mobileMenuInner">
//             {navLinks.map((l) => (
//               <button
//                 key={l.id}
//                 className="mobileLink"
//                 onClick={() => scrollToId(l.id)}
//               >
//                 {l.label}
//               </button>
//             ))}
//             <button className="btn btnPrimary mobileCta" onClick={() => scrollToId("contact")}>
//               Talk to GreenAI <ArrowRight size={16} />
//             </button>
//           </div>
//         </div>
//       </header>

//       <main id="top">
//         <Hero onPrimary={() => scrollToId("regintel")} onSecondary={() => scrollToId("solutions")} />

//         <section id="philosophy" className="section">
//           <div className="container">
//             <div className="sectionHead">
//               <div className="kicker">
//                 <Sparkles size={16} />
//                 <span>Green Tech • Responsible AI</span>
//               </div>
//               <h2 className="h2">The Green AI Paradigm</h2>
//               <p className="muted">
//                 A conscious shift away from high-carbon, centralized “Red AI” toward edge-native,
//                 frugal, inclusive systems designed for real-world constraints.
//               </p>
//             </div>

//             <div className="compareGrid">
//               <div className="compareCard red">
//                 <div className="compareTop">
//                   <div className="compareIcon redIcon">
//                     <Cpu size={18} />
//                   </div>
//                   <div>
//                     <h3 className="h3">Red AI</h3>
//                     <p className="muted small">
//                       High compute, centralized, expensive to run at scale.
//                     </p>
//                   </div>
//                 </div>
//                 <ul className="bullets">
//                   <li>Massive data-center dependence</li>
//                   <li>High energy + carbon footprint</li>
//                   <li>Costly inferencing and recurring OPEX</li>
//                   <li>Often excludes low-resource languages & contexts</li>
//                 </ul>
//                 <div className="pillRow">
//                   <span className="pill pillRed">High carbon</span>
//                   <span className="pill pillRed">High cost</span>
//                   <span className="pill pillRed">Centralized</span>
//                 </div>
//               </div>

//               <div className="compareCard green elevated">
//                 <div className="compareGlow" aria-hidden="true" />
//                 <div className="compareTop">
//                   <div className="compareIcon greenIcon">
//                     <Leaf size={18} />
//                   </div>
//                   <div>
//                     <h3 className="h3">Green AI</h3>
//                     <p className="muted small">
//                       Right-sized, edge-native intelligence that’s low-energy and inclusive.
//                     </p>
//                   </div>
//                 </div>
//                 <ul className="bullets">
//                   <li>Edge-first: low latency, minimal connectivity dependency</li>
//                   <li>Privacy by design: keep data local wherever possible</li>
//                   <li>Multilingual and culturally grounded AI</li>
//                   <li>Sufficiency: use AI only where it adds real value</li>
//                 </ul>
//                 <div className="pillRow">
//                   <span className="pill pillGreen">Edge-native</span>
//                   <span className="pill pillGreen">Low-energy</span>
//                   <span className="pill pillGreen">Inclusive</span>
//                 </div>
//               </div>
//             </div>

//             <div className="miniCallout">
//               <div className="miniCalloutIcon">
//                 <Globe2 size={18} />
//               </div>
//               <div>
//                 <div className="miniTitle">Designed for Enterprise & Government in India</div>
//                 <div className="muted small">
//                   Modular deployments across cloud, on-prem, and hybrid—built for compliance, auditability,
//                   and multilingual access.
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section id="regintel" className="section sectionAlt">
//           <div className="container">
//             <div className="sectionHead row">
//               <div>
//                 <div className="kicker">
//                   <ShieldCheck size={16} />
//                   <span>RegIntel 360</span>
//                 </div>
//                 <h2 className="h2">Demonstrate Compliance Intelligence</h2>
//                 <p className="muted">
//                   An end-to-end ESG compliance operating system for SEBI’s BRSR / BRSR Core:
//                   workflow digitization, ERP + IoT integration, AI-assisted guidance, and audit-ready evidence trails.
//                 </p>
//               </div>

//               <div className="valueStatRow">
//                 <div className="valueStat">
//                   <div className="valueNum">70%</div>
//                   <div className="muted small">Time Reduction</div>
//                 </div>
//                 <div className="valueStat">
//                   <div className="valueNum">100%</div>
//                   <div className="muted small">Audit Readiness</div>
//                 </div>
//                 <div className="valueStat">
//                   <div className="valueNum">360°</div>
//                   <div className="muted small">Visibility</div>
//                 </div>
//               </div>
//             </div>

//             <RegIntelFeature />
//           </div>
//         </section>

//         <section id="solutions" className="section">
//           <div className="container">
//             <div className="sectionHead">
//               <div className="kicker">
//                 <Building2 size={16} />
//                 <span>Ecosystem</span>
//               </div>
//               <h2 className="h2">Products & Services</h2>
//               <p className="muted">
//                 Pre-built platforms + bespoke delivery—powered by a domain-first team and an inclusive “AI for Bharat” approach.
//               </p>
//             </div>

//             <div className="grid3">
//               <TiltCard
//                 title="VidhiLab"
//                 subtitle="Legal AI & Compliance"
//                 icon={<Scale size={18} />}
//                 tone="green"
//                 bullets={[
//                   "Multilingual legal advisory (voice + text)",
//                   "RAG-powered knowledge base with updates",
//                   "Tender + compliance workflows",
//                 ]}
//               />

//               <TiltCard
//                 title="CLiCS (CLiCS)"
//                 subtitle="Voice AI Stack for Indic Languages"
//                 icon={<Mic size={18} />}
//                 tone="green"
//                 bullets={[
//                   "Speech-to-text + translation + text-to-speech",
//                   "Real-time multilingual workflows",
//                   "Edge + cloud deployment options",
//                 ]}
//               />

//               <TiltCard
//                 title="GreenAI Granthana"
//                 subtitle="Digital Publishing & AI Textbooks"
//                 icon={<BookOpen size={18} />}
//                 tone="green"
//                 bullets={[
//                   "Kindle + print + audiobooks",
//                   "ISBN-backed knowledge assets",
//                   "QR-enabled immersive learning artifacts",
//                 ]}
//               />
//             </div>

//             <div className="subGrid">
//               <div className="glassCard">
//                 <div className="glassTop">
//                   <div className="glassIcon">
//                     <LineChart size={18} />
//                   </div>
//                   <div>
//                     <div className="glassTitle">Custom Industrial AI</div>
//                     <div className="muted small">
//                       Vision AI, monitoring, anomaly detection, and optimization for metal & mining, power, and manufacturing.
//                     </div>
//                   </div>
//                 </div>
//                 <div className="tagRow">
//                   <span className="tag">Edge deployment</span>
//                   <span className="tag">Real-time alerts</span>
//                   <span className="tag">Safety & compliance</span>
//                 </div>
//               </div>

//               <div className="glassCard">
//                 <div className="glassTop">
//                   <div className="glassIcon">
//                     <ShieldCheck size={18} />
//                   </div>
//                   <div>
//                     <div className="glassTitle">AI Consulting</div>
//                     <div className="muted small">
//                       Strategy → data engineering → pilots → enterprise rollout, with governance and secure integration.
//                     </div>
//                   </div>
//                 </div>
//                 <div className="tagRow">
//                   <span className="tag">Roadmaps</span>
//                   <span className="tag">Data insights</span>
//                   <span className="tag">Operational optimization</span>
//                 </div>
//               </div>
//             </div>

//             <div className="partners">
//               <div className="partnersTitle">Academic & Research Partnerships</div>
//               <div className="partnersRow">
//                 {[
//                   "Jadavpur University (SET)",
//                   "IIT Patna",
//                   "University of Calcutta",
//                   "IISER Kolkata",
//                   "Dhirubhai Ambani University",
//                   "IIIT Hyderabad",
//                 ].map((p) => (
//                   <span key={p} className="partnerPill">
//                     {p}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         <section id="academy" className="section academy">
//           <div className="container">
//             <div className="sectionHead row">
//               <div>
//                 <div className="kicker orange">
//                   <Sparkles size={16} />
//                   <span>GreenAI Academy</span>
//                 </div>
//                 <h2 className="h2">Industry-Certified Programs</h2>
//                 <p className="muted">
//                   Hybrid, application-focused upskilling—built with industry relevance and academic credibility
//                   through partnership with <strong>Jadavpur University</strong>.
//                 </p>
//               </div>

//               <button className="btn btnOrange" onClick={() => scrollToId("contact")}>
//                 Request a Cohort Proposal <ArrowRight size={16} />
//               </button>
//             </div>

//             <div className="grid4">
//               <AcademyCard
//                 title="Generative AI"
//                 icon={<Sparkles size={18} />}
//                 desc="LLMs, prompt engineering, RAG, and safe enterprise workflows."
//               />
//               <AcademyCard
//                 title="Industry 4.0 (IoT)"
//                 icon={<Globe2 size={18} />}
//                 desc="Sensor integration, telemetry, smart manufacturing and analytics."
//               />
//               <AcademyCard
//                 title="DevOps"
//                 icon={<ShieldCheck size={18} />}
//                 desc="Cloud + on-prem delivery pipelines, security, observability, governance."
//               />
//               <AcademyCard
//                 title="Full Stack"
//                 icon={<Cpu size={18} />}
//                 desc="Modern web engineering with AI-assisted development tooling."
//               />
//             </div>

//             <div className="academyNote">
//               <CheckCircle2 size={18} />
//               <div className="muted">
//                 Program design supports project-based learning, capstones, and cohort delivery for enterprises and institutions.
//               </div>
//             </div>
//           </div>
//         </section>

//         <footer id="contact" className="footer">
//           <div className="container footerGrid">
//             <div className="footerLeft">
//               <div className="footerBrand">
//                 <span className="brandIcon footerBrandIcon">
//                   <Leaf size={18} />
//                 </span>
//                 <div>
//                   <div className="footerTitle">GreenAI Services</div>
//                   <div className="muted small">Sustainable AI for Enterprise & Government</div>
//                 </div>
//               </div>

//               <div className="footerInfo">
//                 <div className="infoRow">
//                   <MapPin size={16} />
//                   <div>
//                     Crescent Tower, 7th Floor, Kolkata
//                     <div className="muted small">Registered office: 229 AJC Bose Road, Kolkata – 700020</div>
//                   </div>
//                 </div>

//                 <div className="infoRow">
//                   <Mail size={16} />
//                   <div>
//                     reach@greenai.services
//                     <div className="muted small">For sales: sales@greenai.services</div>
//                   </div>
//                 </div>

//                 <div className="infoRow">
//                   <Phone size={16} />
//                   <div>
//                     +91 89819 41888
//                     <div className="muted small">Business hours: Mon–Sat</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="grievance">
//                 <div className="grievTitle">Grievance Officer</div>
//                 <div className="muted small">Anish Banerjee</div>
//               </div>

//               <div className="copyright">
//                 Designed with <span className="heart">♥</span> in Kolkata.
//               </div>
//             </div>

//             <ContactForm />
//           </div>
//         </footer>
//       </main>
//     </div>
//   );
// }

// function StyleTag() {
//   return (
//     <style>{`
//       :root{
//         --forest:#2E7D32;
//         --deep:#0b3a1f;
//         --mint:#e8f4ea;
//         --ink:#0b1220;
//         --muted:#5d6b6a;
//         --line: rgba(15, 23, 42, 0.10);
//         --shadow: 0 18px 48px rgba(2,6,23,.12);
//         --shadow2: 0 10px 24px rgba(2,6,23,.10);
//         --glass: rgba(255,255,255,.58);
//         --glass2: rgba(255,255,255,.28);
//         --blur: blur(14px);
//         --orange:#E65100;
//         --orangeSoft: rgba(230,81,0,.10);
//         --radius: 18px;
//         --radius2: 24px;
//       }

//       *{ box-sizing:border-box; }
//       html{ scroll-behavior:smooth; }
//       body{
//         margin:0;
//         font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
//         color: var(--ink);
//         background:
//           radial-gradient(900px 600px at 10% -10%, rgba(46,125,50,.22), transparent 60%),
//           radial-gradient(800px 500px at 95% 0%, rgba(46,125,50,.16), transparent 55%),
//           radial-gradient(700px 600px at 50% 120%, rgba(230,81,0,.10), transparent 55%),
//           linear-gradient(180deg, #ffffff, #fbfdfb);
//       }

//       a{ color:inherit; text-decoration:none; }
//       button{ font-family:inherit; }

//       .appRoot{ min-height:100vh; }

//       .container{
//         width:min(1120px, calc(100% - 40px));
//         margin:0 auto;
//       }

//       /* Navbar */
//       .nav{
//         position:sticky;
//         top:0;
//         z-index:50;
//         transition: background .25s ease, box-shadow .25s ease, border-color .25s ease;
//         border-bottom: 1px solid transparent;
//         backdrop-filter: var(--blur);
//         -webkit-backdrop-filter: var(--blur);
//       }
//       .navGlass{
//         background: rgba(255,255,255,.06);
//       }
//       .navSolid{
//         background: rgba(255,255,255,.92);
//         border-bottom: 1px solid var(--line);
//         box-shadow: 0 10px 30px rgba(2,6,23,.08);
//       }
//       .navInner{
//         height:72px;
//         display:flex;
//         align-items:center;
//         justify-content:space-between;
//         gap:16px;
//       }

//       .brand{
//         display:flex;
//         align-items:center;
//         gap:10px;
//         border:0;
//         background:transparent;
//         cursor:pointer;
//         padding:8px 10px;
//         border-radius:12px;
//         transition: transform .15s ease, background .15s ease;
//       }
//       .brand:hover{ background: rgba(255,255,255,.10); transform: translateY(-1px); }
//       .brandIcon{
//         width:34px; height:34px;
//         display:grid; place-items:center;
//         border-radius:12px;
//         background: rgba(46,125,50,.12);
//         color: var(--forest);
//         border: 1px solid rgba(46,125,50,.18);
//       }
//       .brandText{
//         font-weight:800;
//         letter-spacing: .2px;
//       }
//       .brandSub{
//         font-weight:700;
//         color: var(--deep);
//         opacity:.92;
//       }

//       .navLinks{
//         display:flex;
//         gap:8px;
//         align-items:center;
//       }
//       .navLink{
//         border:0;
//         cursor:pointer;
//         background:transparent;
//         padding:10px 12px;
//         border-radius:12px;
//         color: rgba(11,18,32,.84);
//         transition: background .15s ease, transform .15s ease;
//         font-weight:650;
//         font-size:14px;
//       }
//       .navLink:hover{
//         background: rgba(255,255,255,.14);
//         transform: translateY(-1px);
//       }

//       .navCta{
//         display:flex;
//         gap:10px;
//         align-items:center;
//       }

//       .iconBtn{
//         width:40px; height:40px;
//         display:grid; place-items:center;
//         border-radius:12px;
//         border:1px solid rgba(15,23,42,.12);
//         background: rgba(255,255,255,.60);
//         cursor:pointer;
//         transition: transform .15s ease, background .15s ease;
//       }
//       .iconBtn:hover{ transform: translateY(-1px); background: rgba(255,255,255,.80); }

//       .burger{ display:none; }

//       .mobileMenu{
//         overflow:hidden;
//         max-height:0;
//         opacity:0;
//         transform: translateY(-6px);
//         transition: max-height .32s ease, opacity .22s ease, transform .22s ease;
//         border-top: 1px solid rgba(255,255,255,.12);
//       }
//       .mobileMenu.open{
//         max-height: 360px;
//         opacity:1;
//         transform: translateY(0);
//       }
//       .mobileMenuInner{
//         padding: 10px 0 18px;
//         display:flex;
//         flex-direction:column;
//         gap:8px;
//       }
//       .mobileLink{
//         text-align:left;
//         border:1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.70);
//         padding:12px 14px;
//         border-radius: 14px;
//         font-weight:700;
//         cursor:pointer;
//         transition: transform .15s ease, background .15s ease;
//       }
//       .mobileLink:hover{ transform: translateY(-1px); background: rgba(255,255,255,.88); }
//       .mobileCta{ margin-top:6px; }

//       /* Buttons */
//       .btn{
//         border:1px solid rgba(15,23,42,.12);
//         background: rgba(255,255,255,.78);
//         padding: 10px 14px;
//         border-radius: 14px;
//         display:inline-flex;
//         gap:10px;
//         align-items:center;
//         cursor:pointer;
//         font-weight:800;
//         color: rgba(11,18,32,.92);
//         transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
//         box-shadow: 0 10px 22px rgba(2,6,23,.08);
//       }
//       .btn:hover{ transform: translateY(-1px); box-shadow: 0 14px 30px rgba(2,6,23,.10); }

//       .btnPrimary{
//         background: linear-gradient(135deg, rgba(46,125,50,.96), rgba(11,58,31,.96));
//         border-color: rgba(46,125,50,.30);
//         color: #fff;
//         box-shadow: 0 18px 46px rgba(46,125,50,.22);
//       }
//       .btnPrimary:hover{ box-shadow: 0 24px 60px rgba(46,125,50,.28); }

//       .btnGhost{
//         background: rgba(255,255,255,.66);
//       }

//       .btnOrange{
//         background: linear-gradient(135deg, rgba(230,81,0,.98), rgba(180,56,0,.98));
//         border-color: rgba(230,81,0,.35);
//         color:#fff;
//         box-shadow: 0 18px 46px rgba(230,81,0,.22);
//       }

//       /* Hero */
//       .hero{
//         position:relative;
//         padding: 92px 0 44px;
//         overflow:hidden;
//       }
//       .heroOrbs{
//         position:absolute;
//         inset:0;
//         pointer-events:none;
//       }
//       .orb{
//         position:absolute;
//         width:520px; height:520px;
//         border-radius: 999px;
//         filter: blur(34px);
//         opacity:.45;
//         background: radial-gradient(circle at 30% 30%, rgba(46,125,50,.55), rgba(46,125,50,.04) 70%);
//       }
//       .orb.one{ left:-180px; top:-240px; }
//       .orb.two{
//         right:-220px; top:-180px;
//         background: radial-gradient(circle at 30% 30%, rgba(46,125,50,.38), rgba(46,125,50,.02) 70%);
//       }
//       .orb.three{
//         left: 35%;
//         bottom: -360px;
//         width:640px; height:640px;
//         background: radial-gradient(circle at 30% 30%, rgba(230,81,0,.22), rgba(230,81,0,.02) 70%);
//         opacity:.35;
//       }

//       .heroGrid{
//         display:grid;
//         grid-template-columns: 1.1fr .9fr;
//         gap: 28px;
//         align-items:center;
//       }

//       .kicker{
//         display:inline-flex;
//         align-items:center;
//         gap:10px;
//         padding: 8px 12px;
//         border-radius: 999px;
//         border:1px solid rgba(46,125,50,.18);
//         background: rgba(255,255,255,.52);
//         backdrop-filter: var(--blur);
//         -webkit-backdrop-filter: var(--blur);
//         color: var(--deep);
//         font-weight:800;
//         font-size: 13px;
//       }
//       .kicker.orange{
//         border-color: rgba(230,81,0,.25);
//         background: rgba(255,255,255,.62);
//         color: rgba(180,56,0,.96);
//       }

//       .h1{
//         font-size: clamp(34px, 4.2vw, 52px);
//         line-height: 1.06;
//         margin: 14px 0 12px;
//         letter-spacing: -0.7px;
//       }
//       .h2{
//         font-size: clamp(24px, 3vw, 36px);
//         margin: 0 0 10px;
//         letter-spacing: -0.4px;
//       }
//       .h3{
//         font-size: 18px;
//         margin: 0;
//         letter-spacing:-0.2px;
//       }

//       .muted{ color: var(--muted); }
//       .small{ font-size: 13px; }

//       .heroLead{
//         font-size: 16px;
//         line-height: 1.6;
//         margin: 0 0 18px;
//         max-width: 56ch;
//       }

//       .heroActions{
//         display:flex;
//         gap:12px;
//         flex-wrap:wrap;
//         align-items:center;
//       }

//       .badges{
//         display:flex;
//         gap:10px;
//         flex-wrap:wrap;
//         margin-top:18px;
//       }
//       .badge{
//         display:inline-flex;
//         gap:8px;
//         align-items:center;
//         padding: 8px 10px;
//         border-radius: 999px;
//         border:1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.56);
//         backdrop-filter: var(--blur);
//         -webkit-backdrop-filter: var(--blur);
//         font-weight:750;
//         font-size: 13px;
//       }
//       .badge .dot{
//         width:8px; height:8px;
//         border-radius: 50%;
//         background: var(--forest);
//         box-shadow: 0 0 0 4px rgba(46,125,50,.14);
//       }

//       .heroCard{
//         border-radius: var(--radius2);
//         border: 1px solid rgba(255,255,255,.22);
//         background: rgba(255,255,255,.52);
//         backdrop-filter: var(--blur);
//         -webkit-backdrop-filter: var(--blur);
//         box-shadow: var(--shadow);
//         padding: 18px;
//         position:relative;
//         overflow:hidden;
//       }
//       .heroCard::before{
//         content:"";
//         position:absolute;
//         inset:-2px;
//         background: radial-gradient(600px 280px at 20% 0%, rgba(46,125,50,.14), transparent 60%),
//                     radial-gradient(500px 240px at 90% 20%, rgba(230,81,0,.10), transparent 60%);
//         pointer-events:none;
//       }
//       .heroCardInner{ position:relative; }

//       .miniMetricRow{
//         display:grid;
//         grid-template-columns: repeat(3, 1fr);
//         gap:10px;
//         margin-top:12px;
//       }
//       .miniMetric{
//         border-radius: 16px;
//         border:1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.62);
//         padding: 12px;
//       }
//       .miniMetric .num{
//         font-weight:900;
//         font-size: 18px;
//         color: var(--deep);
//       }

//       /* Sections */
//       .section{ padding: 64px 0; }
//       .sectionAlt{
//         background:
//           radial-gradient(900px 700px at 10% 0%, rgba(46,125,50,.12), transparent 60%),
//           linear-gradient(180deg, rgba(232,244,234,.55), rgba(255,255,255,.70));
//         border-top: 1px solid rgba(15,23,42,.06);
//         border-bottom: 1px solid rgba(15,23,42,.06);
//       }
//       .sectionHead{
//         margin-bottom: 18px;
//         max-width: 78ch;
//       }
//       .sectionHead.row{
//         display:flex;
//         justify-content:space-between;
//         align-items:flex-end;
//         gap: 18px;
//         flex-wrap:wrap;
//       }

//       .compareGrid{
//         display:grid;
//         grid-template-columns: 1fr 1fr;
//         gap:16px;
//         margin-top: 16px;
//       }
//       .compareCard{
//         position:relative;
//         border-radius: var(--radius2);
//         border: 1px solid rgba(255,255,255,.22);
//         background: rgba(255,255,255,.58);
//         backdrop-filter: var(--blur);
//         -webkit-backdrop-filter: var(--blur);
//         box-shadow: var(--shadow2);
//         padding: 18px;
//         overflow:hidden;
//         transition: transform .18s ease, box-shadow .18s ease;
//       }
//       .compareCard:hover{ transform: translateY(-2px); box-shadow: var(--shadow); }

//       .compareCard.elevated{
//         transform: translateY(-6px);
//         border-color: rgba(46,125,50,.30);
//         box-shadow: 0 26px 70px rgba(46,125,50,.20);
//       }
//       .compareGlow{
//         position:absolute;
//         inset:-2px;
//         background:
//           radial-gradient(600px 340px at 20% 0%, rgba(46,125,50,.18), transparent 60%),
//           radial-gradient(500px 280px at 90% 30%, rgba(46,125,50,.10), transparent 60%);
//         pointer-events:none;
//         opacity:.9;
//       }
//       .compareTop{
//         display:flex;
//         gap:12px;
//         align-items:flex-start;
//         position:relative;
//       }
//       .compareIcon{
//         width:44px; height:44px;
//         border-radius: 16px;
//         display:grid; place-items:center;
//         border: 1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.62);
//       }
//       .greenIcon{ color: var(--forest); background: rgba(46,125,50,.10); border-color: rgba(46,125,50,.20); }
//       .redIcon{ color: #b42318; background: rgba(180,35,24,.08); border-color: rgba(180,35,24,.18); }

//       .bullets{
//         margin: 12px 0 0;
//         padding-left: 16px;
//         color: rgba(11,18,32,.86);
//       }
//       .bullets li{ margin: 8px 0; }

//       .pillRow{
//         display:flex;
//         gap:8px;
//         flex-wrap:wrap;
//         margin-top: 14px;
//         position:relative;
//       }
//       .pill{
//         font-size: 12px;
//         font-weight:800;
//         padding: 7px 10px;
//         border-radius: 999px;
//         border:1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.64);
//       }
//       .pillGreen{
//         border-color: rgba(46,125,50,.22);
//         background: rgba(46,125,50,.10);
//         color: var(--deep);
//       }
//       .pillRed{
//         border-color: rgba(180,35,24,.22);
//         background: rgba(180,35,24,.08);
//         color: #7a1d16;
//       }

//       .miniCallout{
//         margin-top: 16px;
//         border-radius: var(--radius2);
//         border: 1px solid rgba(46,125,50,.18);
//         background: rgba(255,255,255,.62);
//         backdrop-filter: var(--blur);
//         -webkit-backdrop-filter: var(--blur);
//         padding: 16px;
//         display:flex;
//         gap:12px;
//         align-items:flex-start;
//       }
//       .miniCalloutIcon{
//         width:44px; height:44px;
//         border-radius: 16px;
//         display:grid; place-items:center;
//         background: rgba(46,125,50,.12);
//         border:1px solid rgba(46,125,50,.20);
//         color: var(--forest);
//         flex:0 0 auto;
//       }
//       .miniTitle{ font-weight:900; margin-bottom:4px; }

//       /* RegIntel */
//       .valueStatRow{
//         display:flex;
//         gap:10px;
//         flex-wrap:wrap;
//       }
//       .valueStat{
//         border-radius: 16px;
//         border:1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.70);
//         padding: 10px 12px;
//         min-width: 120px;
//       }
//       .valueNum{
//         font-weight:950;
//         font-size: 20px;
//         color: var(--deep);
//       }

//       .regintelGrid{
//         display:grid;
//         grid-template-columns: 0.42fr 0.58fr;
//         gap: 16px;
//         align-items:stretch;
//         margin-top: 14px;
//       }

//       .featureList{
//         border-radius: var(--radius2);
//         border:1px solid rgba(255,255,255,.22);
//         background: rgba(255,255,255,.56);
//         backdrop-filter: var(--blur);
//         -webkit-backdrop-filter: var(--blur);
//         box-shadow: var(--shadow2);
//         padding: 14px;
//       }
//       .featureBtn{
//         width:100%;
//         text-align:left;
//         border-radius: 16px;
//         border: 1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.58);
//         padding: 12px;
//         cursor:pointer;
//         transition: transform .16s ease, background .16s ease, border-color .16s ease;
//         display:flex;
//         gap:12px;
//         align-items:flex-start;
//         margin-bottom: 10px;
//       }
//       .featureBtn:hover{ transform: translateY(-1px); background: rgba(255,255,255,.82); }
//       .featureBtn.active{
//         border-color: rgba(46,125,50,.28);
//         background: rgba(46,125,50,.10);
//       }

//       .featureIcon{
//         width:40px; height:40px;
//         border-radius: 16px;
//         display:grid; place-items:center;
//         border:1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.66);
//         color: var(--forest);
//         flex:0 0 auto;
//       }
//       .featureBtn.active .featureIcon{
//         background: rgba(255,255,255,.74);
//         border-color: rgba(46,125,50,.24);
//       }

//       .featureTitle{ font-weight:950; margin:0; }
//       .featureDesc{ margin: 4px 0 0; }

//       .laptop{
//         border-radius: 28px;
//         border: 1px solid rgba(255,255,255,.22);
//         background: rgba(255,255,255,.54);
//         backdrop-filter: var(--blur);
//         -webkit-backdrop-filter: var(--blur);
//         box-shadow: var(--shadow);
//         position:relative;
//         overflow:hidden;
//         padding: 16px;
//       }
//       .laptopTopbar{
//         display:flex;
//         align-items:center;
//         justify-content:space-between;
//         gap:10px;
//         padding: 4px 6px 10px;
//       }
//       .dots{
//         display:flex; gap:8px;
//       }
//       .dot{
//         width:10px; height:10px; border-radius:99px;
//         background: rgba(15,23,42,.16);
//       }
//       .dot.g{ background: rgba(46,125,50,.55); }
//       .dot.o{ background: rgba(230,81,0,.55); }

//       .screen{
//         border-radius: 20px;
//         border: 1px solid rgba(15,23,42,.10);
//         background:
//           radial-gradient(700px 240px at 20% 0%, rgba(46,125,50,.16), transparent 60%),
//           radial-gradient(500px 220px at 90% 40%, rgba(230,81,0,.10), transparent 65%),
//           rgba(255,255,255,.78);
//         min-height: 360px;
//         padding: 16px;
//         position:relative;
//         overflow:hidden;
//       }
//       .screenTitle{
//         display:flex;
//         justify-content:space-between;
//         align-items:center;
//         gap:12px;
//         margin-bottom: 10px;
//       }
//       .screenTitle h3{ margin:0; font-size: 16px; letter-spacing: -0.2px; }
//       .screenPills{ display:flex; gap:8px; flex-wrap:wrap; }

//       .chip{
//         font-size: 12px;
//         font-weight:850;
//         border:1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.66);
//         padding: 6px 10px;
//         border-radius: 999px;
//         display:inline-flex;
//         gap:8px;
//         align-items:center;
//       }

//       .screenGrid{
//         display:grid;
//         grid-template-columns: 1.2fr .8fr;
//         gap: 14px;
//         align-items:start;
//       }

//       .panel{
//         border-radius: 18px;
//         border:1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.74);
//         padding: 12px;
//       }
//       .panelTitle{
//         font-weight:950;
//         margin: 0 0 8px;
//         display:flex;
//         align-items:center;
//         gap:8px;
//       }

//       .kpiRow{
//         display:grid;
//         grid-template-columns: repeat(3, 1fr);
//         gap: 10px;
//         margin-top: 10px;
//       }
//       .kpi{
//         border-radius: 16px;
//         border:1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.76);
//         padding: 10px;
//       }
//       .kpi .kNum{ font-weight:950; color: var(--deep); }
//       .kpi .kLbl{ color: var(--muted); font-size: 12px; margin-top:4px; }

//       .alerts{
//         display:flex;
//         flex-direction:column;
//         gap:10px;
//       }
//       .alert{
//         border-radius: 16px;
//         border:1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.78);
//         padding: 10px;
//         display:flex;
//         gap:10px;
//         align-items:flex-start;
//       }
//       .alertIcon{
//         width:34px; height:34px;
//         border-radius: 14px;
//         display:grid; place-items:center;
//         border:1px solid rgba(230,81,0,.26);
//         background: rgba(230,81,0,.10);
//         color: var(--orange);
//         flex:0 0 auto;
//       }
//       .alertTitle{ font-weight:950; margin:0; }
//       .alertMeta{ margin-top:3px; }

//       .gaugeWrap{
//         display:flex;
//         align-items:center;
//         justify-content:space-between;
//         gap: 12px;
//       }
//       .gaugeStat{
//         display:flex; flex-direction:column; gap:6px;
//       }
//       .gaugeStat .label{ font-size:12px; color: var(--muted); font-weight:800; }
//       .gaugeStat .value{ font-weight:950; color: var(--deep); }

//       /* Solutions */
//       .grid3{
//         display:grid;
//         grid-template-columns: repeat(3, 1fr);
//         gap: 14px;
//         margin-top: 16px;
//       }
//       .tiltCard{
//         border-radius: var(--radius2);
//         border:1px solid rgba(255,255,255,.22);
//         background: rgba(255,255,255,.56);
//         backdrop-filter: var(--blur);
//         -webkit-backdrop-filter: var(--blur);
//         box-shadow: var(--shadow2);
//         padding: 16px;
//         position:relative;
//         overflow:hidden;
//         transform-style: preserve-3d;
//         transition: box-shadow .18s ease, transform .18s ease;
//       }
//       .tiltCard::before{
//         content:"";
//         position:absolute;
//         inset:-2px;
//         background: radial-gradient(600px 260px at 20% 0%, rgba(46,125,50,.14), transparent 60%);
//         opacity:.6;
//         pointer-events:none;
//       }
//       .tiltTop{
//         display:flex;
//         gap:12px;
//         align-items:flex-start;
//         position:relative;
//       }
//       .tiltIcon{
//         width:44px; height:44px;
//         border-radius: 16px;
//         display:grid; place-items:center;
//         border:1px solid rgba(46,125,50,.18);
//         background: rgba(46,125,50,.10);
//         color: var(--forest);
//         transition: background .18s ease, border-color .18s ease, transform .18s ease;
//         transform: translateZ(18px);
//       }
//       .tiltCard:hover .tiltIcon{
//         background: rgba(46,125,50,.18);
//         border-color: rgba(46,125,50,.28);
//       }
//       .tiltTitle{
//         font-weight:950;
//         margin:0;
//         transform: translateZ(16px);
//       }
//       .tiltSub{
//         margin-top:4px;
//         transform: translateZ(12px);
//       }
//       .tiltBullets{
//         margin: 12px 0 0;
//         padding-left: 16px;
//         position:relative;
//         transform: translateZ(10px);
//       }
//       .tiltBullets li{ margin: 8px 0; }

//       .subGrid{
//         display:grid;
//         grid-template-columns: 1fr 1fr;
//         gap: 14px;
//         margin-top: 14px;
//       }
//       .glassCard{
//         border-radius: var(--radius2);
//         border:1px solid rgba(255,255,255,.22);
//         background: rgba(255,255,255,.56);
//         backdrop-filter: var(--blur);
//         -webkit-backdrop-filter: var(--blur);
//         box-shadow: var(--shadow2);
//         padding: 16px;
//       }
//       .glassTop{ display:flex; gap:12px; align-items:flex-start; }
//       .glassIcon{
//         width:44px; height:44px;
//         border-radius: 16px;
//         display:grid; place-items:center;
//         border:1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.70);
//         color: var(--forest);
//       }
//       .glassTitle{ font-weight:950; margin-bottom:4px; }
//       .tagRow{ display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
//       .tag{
//         border-radius: 999px;
//         border:1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.70);
//         padding: 7px 10px;
//         font-weight:850;
//         font-size:12px;
//       }

//       .partners{
//         margin-top: 16px;
//         border-radius: var(--radius2);
//         border: 1px dashed rgba(46,125,50,.22);
//         background: rgba(255,255,255,.52);
//         padding: 14px;
//       }
//       .partnersTitle{ font-weight:950; margin-bottom:10px; }
//       .partnersRow{ display:flex; gap:8px; flex-wrap:wrap; }
//       .partnerPill{
//         padding: 7px 10px;
//         border-radius: 999px;
//         border:1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.70);
//         font-weight:850;
//         font-size:12px;
//       }

//       /* Academy */
//       .academy{
//         background:
//           radial-gradient(1000px 600px at 10% 0%, rgba(230,81,0,.14), transparent 60%),
//           radial-gradient(900px 600px at 90% 30%, rgba(46,125,50,.12), transparent 60%),
//           linear-gradient(180deg, rgba(255,245,238,.60), rgba(255,255,255,.92));
//         border-top: 1px solid rgba(15,23,42,.06);
//       }
//       .grid4{
//         display:grid;
//         grid-template-columns: repeat(4, 1fr);
//         gap: 12px;
//         margin-top: 14px;
//       }
//       .academyCard{
//         border-radius: var(--radius2);
//         border:1px solid rgba(255,255,255,.22);
//         background: rgba(255,255,255,.58);
//         backdrop-filter: var(--blur);
//         -webkit-backdrop-filter: var(--blur);
//         box-shadow: var(--shadow2);
//         padding: 14px;
//         transition: transform .18s ease, box-shadow .18s ease;
//       }
//       .academyCard:hover{ transform: translateY(-2px); box-shadow: var(--shadow); }
//       .academyIcon{
//         width:44px; height:44px;
//         border-radius: 16px;
//         display:grid; place-items:center;
//         border:1px solid rgba(230,81,0,.22);
//         background: rgba(230,81,0,.10);
//         color: var(--orange);
//         margin-bottom: 10px;
//       }
//       .academyTitle{ font-weight:950; margin:0 0 6px; }
//       .academyNote{
//         margin-top: 14px;
//         display:flex;
//         gap:10px;
//         align-items:flex-start;
//         padding: 12px 14px;
//         border-radius: var(--radius2);
//         border:1px solid rgba(230,81,0,.18);
//         background: rgba(255,255,255,.68);
//       }

//       /* Footer */
//       .footer{
//         background:
//           radial-gradient(900px 600px at 10% 0%, rgba(46,125,50,.16), transparent 60%),
//           linear-gradient(180deg, rgba(11,58,31,.06), rgba(255,255,255,.96));
//         border-top: 1px solid rgba(15,23,42,.06);
//         padding: 54px 0;
//       }
//       .footerGrid{
//         display:grid;
//         grid-template-columns: 1.05fr .95fr;
//         gap: 16px;
//         align-items:start;
//       }
//       .footerBrand{
//         display:flex;
//         gap:12px;
//         align-items:center;
//         margin-bottom: 14px;
//       }
//       .footerBrandIcon{
//         background: rgba(46,125,50,.14);
//         border-color: rgba(46,125,50,.22);
//       }
//       .footerTitle{
//         font-weight:950;
//         font-size: 16px;
//       }
//       .footerInfo{
//         display:flex;
//         flex-direction:column;
//         gap: 12px;
//         margin-top: 10px;
//       }
//       .infoRow{
//         display:flex;
//         gap:10px;
//         align-items:flex-start;
//         color: rgba(11,18,32,.88);
//       }
//       .grievance{
//         margin-top: 14px;
//         padding: 12px 14px;
//         border-radius: var(--radius2);
//         border:1px solid rgba(15,23,42,.10);
//         background: rgba(255,255,255,.70);
//       }
//       .grievTitle{ font-weight:950; margin-bottom:4px; }
//       .copyright{
//         margin-top: 14px;
//         color: rgba(11,18,32,.72);
//         font-weight:800;
//       }
//       .heart{ color: var(--orange); }

//       /* Contact form */
//       .formCard{
//         border-radius: var(--radius2);
//         border:1px solid rgba(255,255,255,.22);
//         background: rgba(255,255,255,.60);
//         backdrop-filter: var(--blur);
//         -webkit-backdrop-filter: var(--blur);
//         box-shadow: var(--shadow);
//         padding: 16px;
//       }
//       .formHead{
//         display:flex;
//         align-items:flex-start;
//         justify-content:space-between;
//         gap:12px;
//         margin-bottom: 12px;
//       }
//       .formTitle{ font-weight:950; margin:0; }
//       .formSub{ margin: 6px 0 0; }

//       .fieldRow{
//         display:grid;
//         grid-template-columns: 1fr 1fr;
//         gap:10px;
//       }
//       .field{
//         display:flex;
//         flex-direction:column;
//         gap:6px;
//         margin-bottom: 10px;
//       }
//       label{
//         font-size: 12px;
//         font-weight:900;
//         color: rgba(11,18,32,.84);
//       }
//       input, textarea{
//         border-radius: 14px;
//         border:1px solid rgba(15,23,42,.12);
//         background: rgba(255,255,255,.78);
//         padding: 10px 12px;
//         outline:none;
//         transition: border-color .15s ease, box-shadow .15s ease;
//         font-size: 14px;
//         color: rgba(11,18,32,.92);
//       }
//       textarea{ min-height: 104px; resize: vertical; }
//       input:focus, textarea:focus{
//         border-color: rgba(46,125,50,.35);
//         box-shadow: 0 0 0 4px rgba(46,125,50,.12);
//       }

//       .formActions{
//         display:flex;
//         justify-content:space-between;
//         align-items:center;
//         gap: 10px;
//         margin-top: 6px;
//         flex-wrap:wrap;
//       }
//       .status{
//         display:inline-flex;
//         align-items:center;
//         gap:8px;
//         font-weight:850;
//         color: rgba(11,18,32,.78);
//       }

//       /* Animations */
//       .animate-fade-in-up{
//         opacity:0;
//         transform: translateY(10px);
//         animation: fadeInUp .8s ease forwards;
//       }
//       .delay-1{ animation-delay: .06s; }
//       .delay-2{ animation-delay: .16s; }
//       .delay-3{ animation-delay: .26s; }
//       .delay-4{ animation-delay: .36s; }

//       @keyframes fadeInUp{
//         to{ opacity:1; transform: translateY(0); }
//       }

//       /* Responsive */
//       @media (max-width: 980px){
//         .heroGrid{ grid-template-columns: 1fr; }
//         .regintelGrid{ grid-template-columns: 1fr; }
//         .grid3{ grid-template-columns: 1fr; }
//         .subGrid{ grid-template-columns: 1fr; }
//         .grid4{ grid-template-columns: 1fr 1fr; }
//         .footerGrid{ grid-template-columns: 1fr; }
//         .navLinks{ display:none; }
//         .burger{ display:grid; }
//       }
//       @media (max-width: 520px){
//         .fieldRow{ grid-template-columns: 1fr; }
//         .grid4{ grid-template-columns: 1fr; }
//         .miniMetricRow{ grid-template-columns: 1fr; }
//         .kpiRow{ grid-template-columns: 1fr; }
//         .compareGrid{ grid-template-columns: 1fr; }
//       }
//     `}</style>
//   );
// }

// function Hero({ onPrimary, onSecondary }) {
//   return (
//     <section className="hero">
//       <div className="heroOrbs" aria-hidden="true">
//         <div className="orb one" />
//         <div className="orb two" />
//         <div className="orb three" />
//       </div>

//       <div className="container heroGrid">
//         <div>
//           <div className="kicker animate-fade-in-up delay-1">
//             <Leaf size={16} />
//             <span>Green AI • Edge-Native • Audit-Ready</span>
//           </div>

//           <h1 className="h1 animate-fade-in-up delay-2">
//             Sustainable AI for <span style={{ color: "var(--forest)" }}>Enterprise</span> &{" "}
//             <span style={{ color: "var(--deep)" }}>Government</span>
//           </h1>

//           <p className="heroLead muted animate-fade-in-up delay-3">
//             Build intelligent systems that reduce carbon footprints, respect privacy, and stay usable in
//             low-bandwidth realities—without sacrificing enterprise-grade security or compliance outcomes.
//           </p>

//           <div className="heroActions animate-fade-in-up delay-4">
//             <button className="btn btnPrimary" onClick={onPrimary}>
//               Discover RegIntel 360 <ArrowRight size={16} />
//             </button>
//             <button className="btn btnGhost" onClick={onSecondary}>
//               Explore Ecosystem <ArrowRight size={16} />
//             </button>
//           </div>

//           <div className="badges animate-fade-in-up delay-4" style={{ marginTop: 16 }}>
//             <span className="badge">
//               <span className="dot" /> Make in India
//             </span>
//             <span className="badge">
//               <span className="dot" /> Edge AI Native
//             </span>
//             <span className="badge">
//               <span className="dot" /> Sustainable Tech
//             </span>
//           </div>
//         </div>

//         <div className="heroCard animate-fade-in-up delay-3">
//           <div className="heroCardInner">
//             <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
//               <span className="brandIcon">
//                 <ShieldCheck size={18} />
//               </span>
//               <div>
//                 <div style={{ fontWeight: 950 }}>Transform your business with AI</div>
//                 <div className="muted small">
//                   Domain-specific products, custom solutions, and expert consulting.
//                 </div>
//               </div>
//             </div>

//             <div className="miniMetricRow">
//               <div className="miniMetric">
//                 <div className="num">ESG + RegTech</div>
//                 <div className="muted small">BRSR / BRSR Core compliance workflows</div>
//               </div>
//               <div className="miniMetric">
//                 <div className="num">Multilingual</div>
//                 <div className="muted small">Voice + text experiences for diverse users</div>
//               </div>
//               <div className="miniMetric">
//                 <div className="num">Flexible Deploy</div>
//                 <div className="muted small">Cloud, on-prem, and hybrid options</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function RegIntelFeature() {
//   const tabs = useMemo(
//     () => [
//       {
//         key: "esg",
//         title: "ESG Dashboard",
//         icon: <LineChart size={18} />,
//         desc:
//           "Multi-year trends, drill-down KPIs, and board-ready summaries—built for SEBI-aligned reporting cycles.",
//       },
//       {
//         key: "compliance",
//         title: "Compliance Monitor",
//         icon: <AlertTriangle size={18} />,
//         desc:
//           "Validation, anomaly detection, and evidence-first workflows to keep disclosures audit-defensible.",
//       },
//       {
//         key: "ops",
//         title: "Operations View",
//         icon: <Gauge size={18} />,
//         desc:
//           "IoT-connected monitoring for water, energy, emissions, and waste—turning telemetry into decisions.",
//       },
//     ],
//     []
//   );

//   const [active, setActive] = useState(tabs[0].key);

//   const activeTab = tabs.find((t) => t.key === active) || tabs[0];

//   return (
//     <div className="regintelGrid">
//       <div className="featureList">
//         {tabs.map((t) => (
//           <button
//             key={t.key}
//             className={`featureBtn ${t.key === active ? "active" : ""}`}
//             onClick={() => setActive(t.key)}
//           >
//             <div className="featureIcon">{t.icon}</div>
//             <div>
//               <p className="featureTitle">{t.title}</p>
//               <p className="muted small featureDesc">{t.desc}</p>
//             </div>
//           </button>
//         ))}

//         <div className="panel" style={{ marginTop: 8 }}>
//           <div className="panelTitle">
//             <ShieldCheck size={16} /> Core Modules
//           </div>
//           <div className="muted small">
//             BRSR/BRSR Core engine • Workflow roles (contributor/reviewer/approver) • ERP connectors • Supplier portal •
//             Sensor integration • Evidence locker & assurance pack
//           </div>
//         </div>
//       </div>

//       <div className="laptop" aria-live="polite">
//         <div className="laptopTopbar">
//           <div className="dots" aria-hidden="true">
//             <span className="dot" />
//             <span className="dot o" />
//             <span className="dot g" />
//           </div>
//           <div className="muted small" style={{ fontWeight: 900 }}>
//             RegIntel 360 — {activeTab.title}
//           </div>
//         </div>

//         <div className="screen">
//           {active === "esg" && <MockESG />}
//           {active === "compliance" && <MockCompliance />}
//           {active === "ops" && <MockOps />}
//         </div>
//       </div>
//     </div>
//   );
// }

// function MockESG() {
//   return (
//     <>
//       <div className="screenTitle">
//         <h3>ESG Trend Visualization</h3>
//         <div className="screenPills">
//           <span className="chip">
//             <ShieldCheck size={14} /> Audit Trail
//           </span>
//           <span className="chip">
//             <Sparkles size={14} /> AI Auto-Fill
//           </span>
//           <span className="chip">
//             <LineChart size={14} /> Benchmarking
//           </span>
//         </div>
//       </div>

//       <div className="screenGrid">
//         <div className="panel">
//           <div className="panelTitle">
//             <LineChart size={16} /> Multi-FY ESG Score Trend
//           </div>
//           <MiniLineChart />
//           <div className="muted small" style={{ marginTop: 8 }}>
//             Drill-down views with heatmaps, maturity indicators, and year-on-year narratives—ready for executive review.
//           </div>

//           <div className="kpiRow">
//             <div className="kpi">
//               <div className="kNum">70%</div>
//               <div className="kLbl">Time Reduction</div>
//             </div>
//             <div className="kpi">
//               <div className="kNum">100%</div>
//               <div className="kLbl">Audit Readiness</div>
//             </div>
//             <div className="kpi">
//               <div className="kNum">360°</div>
//               <div className="kLbl">Visibility</div>
//             </div>
//           </div>
//         </div>

//         <div className="panel">
//           <div className="panelTitle">
//             <ShieldCheck size={16} /> What’s happening now
//           </div>
//           <div className="muted small">
//             • Auto-mapped BRSR fields from PDFs/logs <br />
//             • Unit + YoY validation checks <br />
//             • Evidence locker exports for assurance
//           </div>

//           <div style={{ marginTop: 10 }}>
//             <StatusBar label="Section A completeness" value={86} />
//             <StatusBar label="Section B validation" value={74} />
//             <StatusBar label="Section C evidence linked" value={68} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function MockCompliance() {
//   return (
//     <>
//       <div className="screenTitle">
//         <h3>Validation & Auditability</h3>
//         <div className="screenPills">
//           <span className="chip">
//             <AlertTriangle size={14} /> Exception Alerts
//           </span>
//           <span className="chip">
//             <ShieldCheck size={14} /> Cross-Validation
//           </span>
//           <span className="chip">
//             <BookOpen size={14} /> Evidence Pack
//           </span>
//         </div>
//       </div>

//       <div className="screenGrid">
//         <div className="panel">
//           <div className="panelTitle">
//             <AlertTriangle size={16} /> Live Alerts
//           </div>

//           <div className="alerts">
//             <div className="alert">
//               <div className="alertIcon">
//                 <AlertTriangle size={16} />
//               </div>
//               <div>
//                 <p className="alertTitle">Missing evidence for waste disposal</p>
//                 <p className="muted small alertMeta">
//                   Indicator: Waste 처리 • FY: 2025–26 • Action: Upload disposal certificate
//                 </p>
//               </div>
//             </div>

//             <div className="alert">
//               <div className="alertIcon">
//                 <AlertTriangle size={16} />
//               </div>
//               <div>
//                 <p className="alertTitle">Outlier detected in energy consumption</p>
//                 <p className="muted small alertMeta">
//                   42% YoY change • Check units (kWh vs MWh) • Suggest review
//                 </p>
//               </div>
//             </div>

//             <div className="alert">
//               <div className="alertIcon">
//                 <AlertTriangle size={16} />
//               </div>
//               <div>
//                 <p className="alertTitle">Supplier portal responses incomplete</p>
//                 <p className="muted small alertMeta">
//                   11 suppliers pending • Auto-reminder scheduled
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="panel">
//           <div className="panelTitle">
//             <ShieldCheck size={16} /> Audit Mode Snapshot
//           </div>
//           <div className="muted small">
//             • Time-stamped logs for edits, approvals, and imports <br />
//             • Artifact storage linked to each KPI <br />
//             • One-click auditor export package
//           </div>

//           <div style={{ marginTop: 10 }}>
//             <StatusBar label="Disclosure deviations" value={12} tone="warn" />
//             <StatusBar label="Evidence coverage" value={71} tone="good" />
//             <StatusBar label="Ready for assurance" value={64} tone="good" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function MockOps() {
//   return (
//     <>
//       <div className="screenTitle">
//         <h3>Operations & Telemetry</h3>
//         <div className="screenPills">
//           <span className="chip">
//             <Globe2 size={14} /> IoT Streams
//           </span>
//           <span className="chip">
//             <Gauge size={14} /> Real-time KPIs
//           </span>
//           <span className="chip">
//             <ShieldCheck size={14} /> ERP Sync
//           </span>
//         </div>
//       </div>

//       <div className="screenGrid">
//         <div className="panel">
//           <div className="panelTitle">
//             <Gauge size={16} /> Emissions Health Gauge
//           </div>

//           <div className="gaugeWrap">
//             <MiniGauge value={63} />
//             <div className="gaugeStat">
//               <div>
//                 <div className="label">Carbon intensity</div>
//                 <div className="value">63 / 100</div>
//               </div>
//               <div>
//                 <div className="label">Status</div>
//                 <div className="value" style={{ color: "var(--deep)" }}>
//                   Stable
//                 </div>
//               </div>
//               <div>
//                 <div className="label">Recommendation</div>
//                 <div className="value" style={{ fontSize: 13 }}>
//                   Optimize energy + reduce peaks
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="muted small" style={{ marginTop: 10 }}>
//             Connect sensors to monitor water, energy, emissions, and waste—then auto-map telemetry into ESG disclosures.
//           </div>
//         </div>

//         <div className="panel">
//           <div className="panelTitle">
//             <LineChart size={16} /> Live Operational Signals
//           </div>

//           <div className="muted small" style={{ marginBottom: 10 }}>
//             Latest 24h snapshot
//           </div>

//           <StatusBar label="Water usage compliance" value={82} />
//           <StatusBar label="Energy efficiency" value={69} />
//           <StatusBar label="Waste segregation" value={58} tone="warn" />
//         </div>
//       </div>
//     </>
//   );
// }

// function MiniLineChart() {
//   // Simple inline SVG line chart with a “techy” look (no external libs)
//   const points = [
//     { x: 20, y: 92 },
//     { x: 80, y: 70 },
//     { x: 140, y: 76 },
//     { x: 200, y: 52 },
//     { x: 260, y: 60 },
//     { x: 320, y: 40 },
//     { x: 380, y: 46 },
//   ];

//   const d = points
//     .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
//     .join(" ");

//   return (
//     <svg width="100%" height="160" viewBox="0 0 420 160" role="img" aria-label="ESG trend chart">
//       <defs>
//         <linearGradient id="gLine" x1="0" y1="0" x2="1" y2="0">
//           <stop offset="0" stopColor="rgba(46,125,50,.85)" />
//           <stop offset="1" stopColor="rgba(11,58,31,.85)" />
//         </linearGradient>
//         <linearGradient id="gFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0" stopColor="rgba(46,125,50,.18)" />
//           <stop offset="1" stopColor="rgba(46,125,50,.02)" />
//         </linearGradient>
//       </defs>

//       {/* grid */}
//       {[20, 50, 80, 110, 140].map((y) => (
//         <line
//           key={y}
//           x1="12"
//           x2="408"
//           y1={y}
//           y2={y}
//           stroke="rgba(15,23,42,.08)"
//           strokeWidth="1"
//         />
//       ))}

//       {/* area */}
//       <path
//         d={`${d} L 380 148 L 20 148 Z`}
//         fill="url(#gFill)"
//         stroke="none"
//       />

//       {/* line */}
//       <path d={d} fill="none" stroke="url(#gLine)" strokeWidth="3" strokeLinecap="round" />

//       {/* points */}
//       {points.map((p, idx) => (
//         <circle
//           key={idx}
//           cx={p.x}
//           cy={p.y}
//           r="4.6"
//           fill="rgba(255,255,255,.95)"
//           stroke="rgba(46,125,50,.75)"
//           strokeWidth="2"
//         />
//       ))}

//       {/* x labels */}
//       {["FY22", "FY23", "FY24", "FY25", "FY26"].map((t, i) => (
//         <text
//           key={t}
//           x={30 + i * 85}
//           y="156"
//           fontSize="11"
//           fill="rgba(93,107,106,.9)"
//           fontWeight="700"
//         >
//           {t}
//         </text>
//       ))}
//     </svg>
//   );
// }

// function StatusBar({ label, value, tone }) {
//   const barColor =
//     tone === "warn"
//       ? "rgba(230,81,0,.82)"
//       : tone === "good"
//       ? "rgba(46,125,50,.82)"
//       : "rgba(11,58,31,.82)";

//   return (
//     <div style={{ marginBottom: 10 }}>
//       <div className="muted small" style={{ fontWeight: 900, marginBottom: 6 }}>
//         {label}
//       </div>
//       <div
//         style={{
//           height: 10,
//           borderRadius: 999,
//           background: "rgba(15,23,42,.08)",
//           overflow: "hidden",
//           border: "1px solid rgba(15,23,42,.08)",
//         }}
//       >
//         <div
//           style={{
//             width: `${Math.max(0, Math.min(100, value))}%`,
//             height: "100%",
//             background: barColor,
//             borderRadius: 999,
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// function MiniGauge({ value }) {
//   const v = Math.max(0, Math.min(100, value));
//   const radius = 56;
//   const stroke = 10;
//   const cx = 72;
//   const cy = 72;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference * (1 - v / 100);

//   return (
//     <svg width="144" height="144" viewBox="0 0 144 144" role="img" aria-label="Gauge">
//       <defs>
//         <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
//           <stop offset="0" stopColor="rgba(46,125,50,.88)" />
//           <stop offset="1" stopColor="rgba(230,81,0,.72)" />
//         </linearGradient>
//       </defs>
//       <circle
//         cx={cx}
//         cy={cy}
//         r={radius}
//         fill="none"
//         stroke="rgba(15,23,42,.10)"
//         strokeWidth={stroke}
//       />
//       <circle
//         cx={cx}
//         cy={cy}
//         r={radius}
//         fill="none"
//         stroke="url(#gaugeGrad)"
//         strokeWidth={stroke}
//         strokeLinecap="round"
//         strokeDasharray={`${circumference} ${circumference}`}
//         strokeDashoffset={offset}
//         transform={`rotate(-90 ${cx} ${cy})`}
//       />
//       <circle cx={cx} cy={cy} r="44" fill="rgba(255,255,255,.75)" stroke="rgba(15,23,42,.08)" />
//       <text
//         x={cx}
//         y={cy + 6}
//         textAnchor="middle"
//         fontSize="22"
//         fontWeight="950"
//         fill="rgba(11,58,31,.95)"
//       >
//         {v}
//       </text>
//       <text
//         x={cx}
//         y={cy + 26}
//         textAnchor="middle"
//         fontSize="11"
//         fontWeight="800"
//         fill="rgba(93,107,106,.9)"
//       >
//         Score
//       </text>
//     </svg>
//   );
// }

// function TiltCard({ title, subtitle, icon, bullets }) {
//   const ref = useRef(null);
//   const [style, setStyle] = useState({ transform: "translateY(0px) rotateX(0deg) rotateY(0deg)" });

//   const onMove = (e) => {
//     const el = ref.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     const x = e.clientX - rect.left; // 0..w
//     const y = e.clientY - rect.top; // 0..h
//     const px = (x / rect.width) * 2 - 1; // -1..1
//     const py = (y / rect.height) * 2 - 1; // -1..1
//     const tiltX = (-py * 6).toFixed(2);
//     const tiltY = (px * 7).toFixed(2);
//     setStyle({
//       transform: `translateY(-6px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
//     });
//   };

//   const onLeave = () => {
//     setStyle({ transform: "translateY(0px) rotateX(0deg) rotateY(0deg)" });
//   };

//   return (
//     <div
//       ref={ref}
//       className="tiltCard"
//       onMouseMove={onMove}
//       onMouseLeave={onLeave}
//       style={style}
//     >
//       <div className="tiltTop">
//         <div className="tiltIcon">{icon}</div>
//         <div>
//           <h3 className="tiltTitle">{title}</h3>
//           <div className="muted small tiltSub">{subtitle}</div>
//         </div>
//       </div>
//       <ul className="tiltBullets">
//         {bullets.map((b) => (
//           <li key={b}>{b}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function AcademyCard({ title, desc, icon }) {
//   return (
//     <div className="academyCard">
//       <div className="academyIcon">{icon}</div>
//       <h3 className="academyTitle">{title}</h3>
//       <div className="muted small">{desc}</div>
//     </div>
//   );
// }

// function ContactForm() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const [status, setStatus] = useState("idle"); // idle | sending | sent

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (status === "sending") return;

//     setStatus("sending");
//     // Simulate network delay
//     await new Promise((r) => setTimeout(r, 900));
//     setStatus("sent");
//     setName("");
//     setEmail("");
//     setMessage("");

//     // Return to idle after a bit
//     setTimeout(() => setStatus("idle"), 1800);
//   };

//   const btnText = status === "sending" ? "Sending..." : status === "sent" ? "Message Sent!" : "Send Message";

//   return (
//     <div className="formCard">
//       <div className="formHead">
//         <div>
//           <h3 className="formTitle">Contact Us</h3>
//           <p className="muted small formSub">
//             Tell us your use case—ESG compliance, multilingual AI, or industrial transformation.
//           </p>
//         </div>
//         <div className="brandIcon" aria-hidden="true">
//           <Mail size={18} />
//         </div>
//       </div>

//       <form onSubmit={onSubmit}>
//         <div className="fieldRow">
//           <div className="field">
//             <label htmlFor="name">Name</label>
//             <input
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Your name"
//               required
//               autoComplete="name"
//             />
//           </div>
//           <div className="field">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@company.com"
//               required
//               type="email"
//               autoComplete="email"
//             />
//           </div>
//         </div>

//         <div className="field">
//           <label htmlFor="msg">Message</label>
//           <textarea
//             id="msg"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="What would you like to build with GreenAI?"
//             required
//           />
//         </div>

//         <div className="formActions">
//           <button
//             className={`btn ${status === "sent" ? "btnGhost" : "btnPrimary"}`}
//             type="submit"
//           >
//             {btnText} <ArrowRight size={16} />
//           </button>

//           <div className="status" aria-live="polite">
//             {status === "sending" && (
//               <>
//                 <span className="brandIcon" style={{ width: 28, height: 28, borderRadius: 12 }}>
//                   <Sparkles size={16} />
//                 </span>
//                 Sending securely…
//               </>
//             )}
//             {status === "sent" && (
//               <>
//                 <span
//                   className="brandIcon"
//                   style={{
//                     width: 28,
//                     height: 28,
//                     borderRadius: 12,
//                     background: "rgba(46,125,50,.14)",
//                     borderColor: "rgba(46,125,50,.20)",
//                     color: "var(--forest)",
//                   }}
//                 >
//                   <CheckCircle2 size={16} />
//                 </span>
//                 Message Sent!
//               </>
//             )}
//             {status === "idle" && (
//               <>
//                 <span className="brandIcon" style={{ width: 28, height: 28, borderRadius: 12 }}>
//                   <ShieldCheck size={16} />
//                 </span>
//                 We reply within 1–2 business days.
//               </>
//             )}
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }


