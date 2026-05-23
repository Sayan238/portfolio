import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaYoutube, FaExternalLinkAlt, FaVideo, FaMobileAlt } from 'react-icons/fa';
import ComicCard from './ComicCard';
import '../styles/YouTubeFeed.css';

const videosData = {
    long: [
        {
            id: 'tTMUJ2WkfZo',
            title: 'DIY ESP32 Robot Car | Mobile Control Dashboard',
            description: 'Step-by-step demonstration of building an ESP32 robot car equipped with custom motor control and wireless steering dashboards.',
            issuer: 'Electronics & Robotics',
            color: 'var(--comic-blue)'
        },
        {
            id: 'h9oOby0gYXQ',
            title: 'ESP32 WiFi LED Dashboard Project | Control LEDs via Web Browser',
            description: 'Learn how to set up a local web server on your ESP32 board to turn LEDs on and off wireless from any browser.',
            issuer: 'IoT & Web Server',
            color: 'var(--comic-yellow)'
        }
    ],
    shorts: [
        {
            id: 'Qwi2z2oqsb8',
            title: 'ESP32 WiFi LED Dashboard Demo',
            description: 'A quick 60-second walkthrough showcasing the wireless dashboard speed and interface responsiveness.',
            issuer: 'IoT Showcase',
            color: 'var(--comic-red)'
        },
        {
            id: 'BnUvZzeB1rXdLRee', // The user gave Hag_2bDEbiM and BnUvZzeB1rXdLRee (the latter from the URL ?si= parameter or direct link. Let's look: the URL was https://youtube.com/shorts/Hag_2bDEbiM?si=BnUvZzeB1rXdLRee, so the ID is Hag_2bDEbiM!)
            id_real: 'Hag_2bDEbiM',
            title: 'DIY ESP32 Robot Car Demo',
            description: 'Quick demonstration of the remote dashboard steering of the ESP32 robotic chassis.',
            issuer: 'Robotics Demo',
            color: 'var(--comic-blue)'
        }
    ]
};

// Fix the actual ID mapping for the second Short
videosData.shorts[1].id = 'Hag_2bDEbiM';

const YouTubeFeed = () => {
    const [activeTab, setActiveTab] = useState('long');

    return (
        <section id="youtube" className="section youtube-section">
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
                        My <span className="text-comic">YouTube</span> Feed
                    </motion.h2>
                </div>

                {/* YouTube Channel CTA Card */}
                <motion.div 
                    className="youtube-channel-card-wrapper"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', duration: 0.8 }}
                >
                    <ComicCard className="youtube-channel-card" style={{ borderColor: 'var(--comic-red)' }}>
                        <div className="yt-card-content">
                            <div className="yt-info-left">
                                <div className="yt-play-icon-box">
                                    <FaYoutube className="yt-icon" />
                                </div>
                                <div className="yt-meta">
                                    <h3 className="yt-channel-name">@entroSa_tech</h3>
                                    <p className="yt-channel-desc">DIY Electronics, Robotics Tutorials, & IoT Development Projects</p>
                                </div>
                            </div>
                            <a 
                                href="https://www.youtube.com/@entroSa_tech" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="yt-subscribe-btn"
                            >
                                Visit Channel <FaExternalLinkAlt style={{ marginLeft: '8px', fontSize: '0.9rem' }} />
                            </a>
                        </div>
                    </ComicCard>
                </motion.div>

                {/* Tab Switcher */}
                <div className="youtube-tabs-container">
                    <button 
                        className={`youtube-tab-btn ${activeTab === 'long' ? 'active' : ''}`}
                        onClick={() => setActiveTab('long')}
                    >
                        <FaVideo className="tab-icon" /> Long Videos
                    </button>
                    <button 
                        className={`youtube-tab-btn ${activeTab === 'shorts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('shorts')}
                    >
                        <FaMobileAlt className="tab-icon" /> Shorts
                    </button>
                </div>

                {/* Video Grid Section */}
                <div className="youtube-video-grid-wrapper" data-lenis-prevent>
                    <AnimatePresence mode="wait">
                        {activeTab === 'long' ? (
                            <motion.div 
                                key="long-videos"
                                className="yt-video-grid long"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {videosData.long.map((video) => (
                                    <ComicCard key={video.id} className="yt-video-card" style={{ borderColor: video.color }}>
                                        <div className="yt-player-container">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${video.id}`}
                                                title={video.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="yt-iframe"
                                            />
                                        </div>
                                        <div className="yt-video-details">
                                            <span className="yt-tag" style={{ background: video.color }}>{video.issuer}</span>
                                            <h4 className="yt-video-title">{video.title}</h4>
                                            <p className="yt-video-description">{video.description}</p>
                                        </div>
                                    </ComicCard>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="shorts-videos"
                                className="yt-video-grid shorts"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {videosData.shorts.map((video) => (
                                    <ComicCard key={video.id} className="yt-video-card short-card" style={{ borderColor: video.color }}>
                                        <div className="yt-player-container shorts-player">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${video.id}`}
                                                title={video.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="yt-iframe"
                                            />
                                        </div>
                                        <div className="yt-video-details">
                                            <span className="yt-tag" style={{ background: video.color }}>{video.issuer}</span>
                                            <h4 className="yt-video-title">{video.title}</h4>
                                            <p className="yt-video-description">{video.description}</p>
                                        </div>
                                    </ComicCard>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default YouTubeFeed;
