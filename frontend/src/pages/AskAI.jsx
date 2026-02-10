import { useState } from "react";

const AskAI = () => {
    const [prompt, setPrompt] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        setAnswer("");

        try {
            const res = await fetch("http://localhost:5000/api/ai/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await res.json();
            setAnswer(data.answer);
        } catch (err) {
            setAnswer("Something went wrong 😢");
        }

        setLoading(false);
    };

    const TypingDots = () => {
        return (
            <span className="typing-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </span>
        );
    };


    return (
        <div className="ai-wrapper">
            <div className="ai-card">
                <h2>🤖 Ask AI</h2>
                <p className="subtitle">
                    Ask anything. Get instant, smart answers.
                </p>

                <textarea
                    placeholder="Type your question here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />

                <button onClick={handleAsk} disabled={loading}>
                    {loading ? <TypingDots /> : "Ask AI"}
                </button>


                {answer && (
                    <div className="response">
                        <h4>AI Response</h4>
                        <p>{answer}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AskAI;
