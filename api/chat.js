export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages, userMessage, systemInstruction, provider } = req.body;

    // Read keys from environment
    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    const grokKey = process.env.GROK_API_KEY;

    try {
        if (provider === 'groq') {
            if (!groqKey) {
                return res.status(400).json({ error: 'Groq API Key is not configured on Vercel.' });
            }

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${groqKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        { role: 'system', content: systemInstruction },
                        ...messages,
                        { role: 'user', content: userMessage }
                    ],
                    temperature: 0.7,
                    max_tokens: 512
                })
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                return res.status(response.status).json({ error: err.error?.message || 'Groq API error' });
            }

            const data = await response.json();
            return res.status(200).json({ content: data.choices[0].message.content });

        } else if (provider === 'grok') {
            if (!grokKey) {
                return res.status(400).json({ error: 'Grok (xAI) API Key is not configured on Vercel.' });
            }

            const response = await fetch('https://api.x.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${grokKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'grok-beta',
                    messages: [
                        { role: 'system', content: systemInstruction },
                        ...messages,
                        { role: 'user', content: userMessage }
                    ],
                    temperature: 0.7,
                    max_tokens: 512
                })
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                return res.status(response.status).json({ error: err.error?.message || 'Grok API error' });
            }

            const data = await response.json();
            return res.status(200).json({ content: data.choices[0].message.content });

        } else if (provider === 'gemini') {
            if (!geminiKey) {
                return res.status(400).json({ error: 'Gemini API Key is not configured on Vercel.' });
            }

            // Call Gemini via REST API instead of needing full SDK setup in lambda context
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
            
            // Format history for Gemini
            // user -> user, assistant -> model
            const geminiContents = [
                ...messages.map(m => ({
                    role: m.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: m.content }]
                })),
                {
                    role: 'user',
                    parts: [{ text: userMessage }]
                }
            ];

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: geminiContents,
                    systemInstruction: {
                        parts: [{ text: systemInstruction }]
                    },
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 512
                    }
                })
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                return res.status(response.status).json({ error: err.error?.message || 'Gemini API error' });
            }

            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
            return res.status(200).json({ content: textResponse });

        } else {
            return res.status(400).json({ error: 'Invalid provider selected.' });
        }
    } catch (error) {
        console.error("Vercel Serverless Function Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
