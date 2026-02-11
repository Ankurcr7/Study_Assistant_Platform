import { useEffect, useState } from "react";

const AskAI = () => {
    const [prompt, setPrompt] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);

    // 🔹 Fetch chat history
    useEffect(() => {
        fetch("http://localhost:5000/api/ai/history")
            .then(res => res.json())
            .then(data => setHistory(data))
            .catch(err => console.log(err));
    }, []);

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

            const newChat = {
                prompt,
                answer: data.answer
            };

            setHistory(prev => [newChat, ...prev]);
            setSelectedChat(newChat);
            setAnswer(data.answer);

        } catch (err) {
            setAnswer("Something went wrong 😢");
        }

        setPrompt("");
        setLoading(false);
    };

    const loadChat = (chat) => {
        setSelectedChat(chat);
        setAnswer(chat.answer);
    };

    return (
        <div className="chatgpt-wrapper">

            {/* 🔹 Sidebar */}
            <div className="sidebar">
                <h3>Chat History</h3>

                <button
                    className="new-chat-btn"
                    onClick={() => {
                        setSelectedChat(null);
                        setAnswer("");
                    }}
                >
                    + New Chat
                </button>

                <div className="history-list">
                    {history.map((chat, index) => (
                        <button
                            key={index}
                            className="history-item"
                            onClick={() => loadChat(chat)}
                        >
                            {chat.prompt.length > 30
                                ? chat.prompt.substring(0, 30) + "..."
                                : chat.prompt}
                        </button>
                    ))}
                </div>
            </div>

            {/* 🔹 Main Chat Area */}
            <div className="chat-area">
                <div className="chat-header">
                    🤖 Ask AI
                </div>

                <div className="chat-body">
                    {selectedChat ? (
                        <>
                            <div className="message user">
                                {selectedChat.prompt}
                            </div>

                            <div className="message ai">
                                {selectedChat.answer}
                            </div>
                        </>
                    ) : (
                        <div className="welcome">
                            Ask a new question to start chatting!
                        </div>
                    )}

                    {loading && (
                        <div className="message ai">
                            Thinking...
                        </div>
                    )}
                </div>

                <div className="chat-input">
                    <textarea
                        placeholder="Type your question..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button onClick={handleAsk} disabled={loading}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AskAI;
