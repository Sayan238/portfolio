import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaTimes, FaPaperPlane, FaCog } from 'react-icons/fa';
import { GoogleGenerativeAI } from '@google/generative-ai';
import '../styles/ChatBot.css';

const SYSTEM_INSTRUCTION = `
You are the personal AI Assistant for Sayan Barman, representing him to visitors of his portfolio website.
Answer questions about Sayan Barman professionally, concisely, and with a friendly tone.

Here are the details about Sayan Barman:
- Name: Sayan Barman
- Contact Email: sayanbarman30062005@gmail.com
- Contact Phone: +91 9395639289
- Location: West Bengal, India
- GitHub: https://github.com/Sayan238
- Education: Pursuing Bachelor of Technology (B.Tech) in Computer Science and Engineering (CSE) specializing in Artificial Intelligence and Machine Learning (AI & ML) at KIIT University, Bhubaneswar (Graduation year: 2028, current period: 2024-2028).
- Role: AI & Robotics Developer.
- Core Technical Skills:
  - Frontend: React.js, Next.js, Vite, HTML5, CSS3, Tailwind CSS, Javascript, Framer Motion
  - Backend/Languages: Python, C++, Node.js
  - Hardware/Robotics: Arduino, PID control systems, IoT, NodeMCU, ESP8266, sensor integration.
- Key Projects:
  1. PhysiqueAI: Full-stack developer. Built an AI fitness web app using React, Vite, CSS, and AI to provide workout tracking and pose evaluation.
  2. AI Voice Assistant: Python-based assistant using speech-to-text, natural language processing (using OpenAI API), and text-to-speech to perform automated tasks.
  3. Interactive 3D Portfolio: Developed this modern portfolio with high-performance 3D components, smooth scroll-snapping, detailed certifications overlay, and responsive mobile styling.
  4. Buro Bird: A highly engaging web-based interactive game built on React.
  5. Smart Home Automation: IoT project using NodeMCU, Blynk cloud, ESP8266, and Arduino C++ to control home appliances remotely.
  6. Line Following Robot: Built an autonomous robot with PID controls for precision path-tracking.
- Certifications:
  1. Introduction to Generative AI Studio (Google Cloud)
  2. Line Follower Event Participation (Kshitij 2026, IIT Kharagpur)
  3. Software Engineering Job Simulation (JPMorgan Chase & Co. via Forage)
  4. Programming with Python 3.X (Simplilearn SkillUp)
  5. Generative AI Mastermind (Outskill)

Rules for your answers:
1. Speak in the third person about Sayan (e.g., "Sayan built...", "He is studying...").
2. Be brief (1-3 sentences per answer when possible, keep details digestible).
3. If a visitor asks something not answered by the facts above, say: "I don't have that information about Sayan yet, but you can contact him directly at sayanbarman30062005@gmail.com or use the contact form at the bottom of the page!"
4. Keep the tone friendly, helpful, and optimistic. Do not invent any facts about Sayan.
`;

const getMockResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    if (msg.includes('project') || msg.includes('build') || msg.includes('work') || msg.includes('develop')) {
        return "Sayan has built several projects: PhysiqueAI (an AI fitness app), an AI Voice Assistant in Python, an IoT Smart Home Automation system, and an autonomous Line Following Robot!";
    }
    if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('reach') || msg.includes('hire')) {
        return "You can reach Sayan via email at sayanbarman30062005@gmail.com, call him at +91 9395639289, or check his GitHub at github.com/Sayan238.";
    }
    if (msg.includes('skill') || msg.includes('language') || msg.includes('tech') || msg.includes('code')) {
        return "Sayan is highly skilled in React, Next.js, Python, C++, Arduino/IoT development, and responsive CSS design.";
    }
    if (msg.includes('certif') || msg.includes('course') || msg.includes('credential')) {
        return "Sayan holds certifications from Google Cloud (Generative AI Studio), JPMorgan Chase (Software Engineering), IIT Kharagpur (Line Follower event), and Simplilearn (Python).";
    }
    if (msg.includes('education') || msg.includes('college') || msg.includes('study') || msg.includes('university') || msg.includes('kiit')) {
        return "Sayan is currently pursuing his B.Tech in CSE (spec. AI & ML) at KIIT University (Batch of 2024 - 2028).";
    }
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('greetings')) {
        return "Hello! I am Sayan's AI Assistant. Ask me anything about his skills, projects, certifications, or education!";
    }
    return "That is a great question! Sayan is an AI & Robotics enthusiast pursuing B.Tech in CSE (AI/ML) at KIIT. For specific queries, feel free to email him at sayanbarman30062005@gmail.com.";
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Hi! I am Sayan's AI Assistant. Ask me anything about his projects, skills, or certifications!" }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    // Form inputs for local storage
    const [storedGroqKey, setStoredGroqKey] = useState(localStorage.getItem('sayan_groq_key') || '');
    const [storedGeminiKey, setStoredGeminiKey] = useState(localStorage.getItem('sayan_gemini_key') || '');
    const [storedGrokKey, setStoredGrokKey] = useState(localStorage.getItem('sayan_grok_key') || '');

    const messagesEndRef = useRef(null);
    
    // API Keys configuration (env files or local storage override)
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || storedGeminiKey;
    const groqKey = import.meta.env.VITE_GROQ_API_KEY || storedGroqKey;
    const grokKey = import.meta.env.VITE_GROK_API_KEY || storedGrokKey;
    
    const hasApiKey = geminiKey || groqKey || grokKey;

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoading]);

    // Check if API key is present, if not add system notice once
    useEffect(() => {
        if (isOpen && !hasApiKey && messages.length === 1) {
            setMessages(prev => [
                ...prev,
                { sender: 'system', text: "Notice: Bot running in offline mode. Click the gear icon at the top to add your API Key for full dynamic AI response." }
            ]);
        }
    }, [isOpen, hasApiKey]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            let responseText = '';
            
            if (groqKey) {
                // Call Groq API via OpenAI-compatible endpoint
                const chatHistory = messages
                    .filter(m => m.sender === 'user' || m.sender === 'bot')
                    .map(m => ({
                        role: m.sender === 'user' ? 'user' : 'assistant',
                        content: m.text
                    }));

                const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${groqKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'llama-3.3-70b-versatile',
                        messages: [
                            { role: 'system', content: SYSTEM_INSTRUCTION },
                            ...chatHistory,
                            { role: 'user', content: userMessage }
                        ],
                        temperature: 0.7,
                        max_tokens: 512
                    })
                });

                if (!response.ok) {
                    const err = await response.json().catch(() => ({}));
                    throw new Error(err.error?.message || `HTTP ${response.status}`);
                }

                const data = await response.json();
                responseText = data.choices[0].message.content;

            } else if (grokKey) {
                // Call Grok (xAI) API via OpenAI-compatible endpoint
                const chatHistory = messages
                    .filter(m => m.sender === 'user' || m.sender === 'bot')
                    .map(m => ({
                        role: m.sender === 'user' ? 'user' : 'assistant',
                        content: m.text
                    }));

                const response = await fetch('https://api.x.ai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${grokKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'grok-beta',
                        messages: [
                            { role: 'system', content: SYSTEM_INSTRUCTION },
                            ...chatHistory,
                            { role: 'user', content: userMessage }
                        ],
                        temperature: 0.7,
                        max_tokens: 512
                    })
                });

                if (!response.ok) {
                    const err = await response.json().catch(() => ({}));
                    throw new Error(err.error?.message || `HTTP ${response.status}`);
                }

                const data = await response.json();
                responseText = data.choices[0].message.content;

            } else if (geminiKey) {
                // Call Gemini API via SDK
                const genAI = new GoogleGenerativeAI(geminiKey);
                const model = genAI.getGenerativeModel({
                    model: "gemini-1.5-flash",
                    systemInstruction: SYSTEM_INSTRUCTION
                });

                const chatHistory = messages
                    .filter(m => m.sender === 'user' || m.sender === 'bot')
                    .map(m => ({
                        role: m.sender === 'user' ? 'user' : 'model',
                        parts: [{ text: m.text }]
                    }));

                const chat = model.startChat({
                    history: chatHistory
                });

                const result = await chat.sendMessage(userMessage);
                responseText = await result.response.text();
            } else {
                // No local keys, attempt to fetch from Vercel Serverless Function Proxy (/api/chat)
                try {
                    const chatHistory = messages
                        .filter(m => m.sender === 'user' || m.sender === 'bot')
                        .map(m => ({
                            role: m.sender === 'user' ? 'user' : 'assistant',
                            content: m.text
                        }));

                    const response = await fetch('/api/chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            provider: 'groq',
                            systemInstruction: SYSTEM_INSTRUCTION,
                            messages: chatHistory,
                            userMessage: userMessage
                        })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        responseText = data.content;
                    } else {
                        // Proxy returned error (e.g. backend key is not configured yet)
                        console.warn("Backend proxy returned error, falling back to mock responses.");
                        responseText = getMockResponse(userMessage);
                    }
                } catch (proxyError) {
                    // Backend proxy is unreachable (e.g. on local Vite dev or GitHub Pages)
                    console.warn("Backend proxy unreachable, falling back to mock responses:", proxyError);
                    responseText = getMockResponse(userMessage);
                }
            }

            setMessages(prev => [...prev, { sender: 'bot', text: responseText }]);
        } catch (err) {
            console.error("ChatBot Error:", err);
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: "I ran into a connection glitch. Feel free to ask another question, or reach Sayan directly at sayanbarman30062005@gmail.com!" }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const saveSettings = () => {
        localStorage.setItem('sayan_groq_key', storedGroqKey.trim());
        localStorage.setItem('sayan_gemini_key', storedGeminiKey.trim());
        localStorage.setItem('sayan_grok_key', storedGrokKey.trim());
        setShowSettings(false);
        setMessages(prev => [
            ...prev,
            { sender: 'system', text: "API keys updated! You can start chatting with Sayan.AI now." }
        ]);
    };

    const clearSettings = () => {
        localStorage.removeItem('sayan_groq_key');
        localStorage.removeItem('sayan_gemini_key');
        localStorage.removeItem('sayan_grok_key');
        setStoredGroqKey('');
        setStoredGeminiKey('');
        setStoredGrokKey('');
        setShowSettings(false);
        setMessages(prev => [
            ...prev,
            { sender: 'system', text: "API keys cleared. The bot is running in offline mode." }
        ]);
    };

    return (
        <>
            {/* Toggle Button */}
            <button 
                className="chatbot-toggle" 
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open AI Assistant Chat"
            >
                {isOpen ? <FaTimes /> : <FaCommentDots />}
            </button>

            {/* Chat Widget Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-container"
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        {/* Header */}
                        <div className="chatbot-header">
                            <h3 className="chatbot-title">Sayan.AI</h3>
                            <div className="chatbot-header-actions">
                                <button 
                                    className={`chatbot-settings-btn ${showSettings ? 'active' : ''}`}
                                    onClick={() => setShowSettings(!showSettings)} 
                                    aria-label="AI Settings"
                                >
                                    <FaCog />
                                </button>
                                <button className="chatbot-close-btn" onClick={() => setIsOpen(false)} aria-label="Close Chat">
                                    <FaTimes />
                                </button>
                            </div>
                        </div>

                        {/* Settings Overlay panel */}
                        <AnimatePresence>
                            {showSettings && (
                                <motion.div 
                                    className="chatbot-settings-panel"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <h4>API Credentials</h4>
                                    <p className="settings-help">Keys are saved locally in your browser and are never uploaded to any third-party server except the chosen AI endpoint.</p>
                                    
                                    <div className="settings-field">
                                        <label>Groq API Key (Option 2):</label>
                                        <input 
                                            type="password" 
                                            value={storedGroqKey} 
                                            onChange={(e) => setStoredGroqKey(e.target.value)} 
                                            placeholder="gsk_..."
                                        />
                                    </div>
                                    
                                    <div className="settings-field">
                                        <label>Gemini API Key (Option 1):</label>
                                        <input 
                                            type="password" 
                                            value={storedGeminiKey} 
                                            onChange={(e) => setStoredGeminiKey(e.target.value)} 
                                            placeholder="AIzaSy..."
                                        />
                                    </div>

                                    <div className="settings-field">
                                        <label>Grok API Key (Option 3):</label>
                                        <input 
                                            type="password" 
                                            value={storedGrokKey} 
                                            onChange={(e) => setStoredGrokKey(e.target.value)} 
                                            placeholder="xai-..."
                                        />
                                    </div>

                                    <div className="settings-actions">
                                        <button onClick={saveSettings} className="settings-save-btn">Save</button>
                                        <button onClick={clearSettings} className="settings-clear-btn">Clear</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Messages panel */}
                        <div className="chatbot-messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={`chatbot-message ${msg.sender}`}>
                                    {msg.text}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="chatbot-message bot">
                                    <div className="chatbot-typing">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input footer form */}
                        <form className="chatbot-input-form" onSubmit={handleSend}>
                            <input
                                type="text"
                                className="chatbot-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about Sayan..."
                                disabled={isLoading}
                            />
                            <button 
                                type="submit" 
                                className="chatbot-send-btn" 
                                disabled={!input.trim() || isLoading}
                                aria-label="Send message"
                            >
                                <FaPaperPlane />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
