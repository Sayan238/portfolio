import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ComicCard from './ComicCard';
import '../styles/Certifications.css';

// Importing local images
import googleImg from '../assets/google (2).jpg';
import iitkgpImg from '../assets/iitkgp.jpg';
import jpmorganImg from '../assets/JPMORGAN_CHASE_SDE_CERTIFICATE_page-0001.jpg';
import pythonImg from '../assets/python.jpg';
import outskillImg from '../assets/outskill.jpg';

const certificationsData = [
    { 
        image: googleImg, 
        title: 'Introduction to Generative AI Studio',
        issuer: 'Google Cloud',
        description: 'Completed a foundational course on Generative AI concepts and tools using Google Cloud technologies, gaining knowledge in AI workflows, prompt-based systems, and modern AI applications.',
        color: "var(--comic-yellow)"
    },
    { 
        image: iitkgpImg, 
        title: 'Line Follower Event Participation',
        issuer: 'Kshitij IIT Kharagpur',
        description: 'Participated in the Line Follower robotics event at Kshitij 2026, IIT Kharagpur, enhancing practical skills in robotics, problem-solving, and autonomous system design.',
        color: "var(--comic-blue)"
    },
    { 
        image: jpmorganImg, 
        title: 'Software Engineering Job Simulation',
        issuer: 'JPMorgan Chase & Co. (Forage)',
        description: 'Completed a virtual software engineering job simulation, working on real-world development tasks including API integration, Kafka integration, and backend system concepts.',
        color: "var(--comic-red)"
    },
    { 
        image: pythonImg, 
        title: 'Programming with Python 3.X',
        issuer: 'Simplilearn SkillUp',
        description: 'Successfully completed a Python programming course covering core programming fundamentals, problem-solving techniques, and application development using Python 3.x.',
        color: "var(--comic-yellow)"
    },
    { 
        image: outskillImg, 
        title: 'Generative AI Mastermind',
        issuer: 'Outskill',
        description: 'Completed an advanced learning program focused on Generative AI, exploring AI tools, modern workflows, and practical applications of artificial intelligence technologies.',
        color: "var(--comic-blue)"
    }
];

const TiltCard = ({ cert, onClick }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick(cert)}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="cert-tilt-wrapper"
        >
            <ComicCard className="professional-cert-card" style={{ borderColor: cert.color, transform: "translateZ(0px)" }}>
                <div className="cert-image-container" style={{ transform: "translateZ(40px)" }}>
                    <img src={cert.image} alt={cert.title} className="cert-image" />
                    
                    {/* Dynamic Glare Effect Overlay */}
                    <motion.div 
                        className="cert-glare"
                        style={{
                            background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)",
                            x: useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "100%"]),
                            y: useTransform(mouseYSpring, [-0.5, 0.5], ["-100%", "100%"])
                        }}
                    />
                </div>
                <div className="cert-content" style={{ transform: "translateZ(30px)" }}>
                    <h3 className="cert-title">{cert.title}</h3>
                    <p className="cert-issuer" style={{ color: cert.color, marginBottom: 0 }}>{cert.issuer}</p>
                    <div className="cert-click-hint">Click for details</div>
                </div>
            </ComicCard>
        </motion.div>
    );
};

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = direction === 'left' ? -300 : 300;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedCert) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [selectedCert]);

    return (
        <section id="certifications" className="section certifications-section" style={{ zIndex: selectedCert ? 99999 : 2 }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', overflow: 'hidden' }}>
                    <motion.h2
                        className="section-title animate-pop"
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', bounce: 0.6, duration: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        style={{ width: '100%' }}
                    >
                        My <span className="text-comic">Certifications</span>
                    </motion.h2>
                </div>

                {/* Scroll Wrapper to position absolute arrows */}
                <div className="cert-scroll-wrapper" style={{ position: 'relative', width: '100%' }}>
                    {/* Scroll Buttons - Left & Right */}
                    <button className="cert-scroll-btn prev" onClick={() => scroll('left')} aria-label="Scroll left">
                        <FaChevronLeft />
                    </button>
                    <button className="cert-scroll-btn next" onClick={() => scroll('right')} aria-label="Scroll right">
                        <FaChevronRight />
                    </button>

                    {/* Horizontal Scrolling Container */}
                    <div className="cert-horizontal-scroll" ref={scrollContainerRef}>
                        {certificationsData.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ delay: index * 0.1, type: 'spring', bounce: 0.4, duration: 0.8 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="cert-card-container"
                            >
                                <TiltCard cert={cert} onClick={setSelectedCert} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for Details */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div 
                        className="cert-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div 
                            className="cert-modal-content"
                            initial={{ y: 50, opacity: 0, scale: 0.9, rotate: -2 }}
                            animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ y: 50, opacity: 0, scale: 0.9, rotate: 2 }}
                            transition={{ type: 'spring', bounce: 0.4 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{ border: `var(--border-thick) solid ${selectedCert.color}` }}
                        >
                            <button className="cert-modal-close" onClick={() => setSelectedCert(null)}>
                                <FaTimes />
                            </button>
                            
                            <div className="cert-modal-image-container">
                                <img src={selectedCert.image} alt={selectedCert.title} className="cert-modal-image" />
                            </div>
                            
                            <div className="cert-modal-details">
                                <h2 className="cert-modal-title">{selectedCert.title}</h2>
                                <h3 className="cert-modal-issuer" style={{ color: selectedCert.color }}>{selectedCert.issuer}</h3>
                                <p className="cert-modal-description">{selectedCert.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certifications;
