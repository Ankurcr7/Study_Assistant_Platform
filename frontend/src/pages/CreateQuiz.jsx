import { useState } from "react";

const CreateQuiz = () => {
    const [topic, setTopic] = useState("");
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [checked, setChecked] = useState({});

    const handleSelect = (qIndex, option) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [qIndex]: option,
        }));
    };
    const handleCheck = (qIndex, correctAnswer) => {
        setChecked(prev => ({
            ...prev,
            [qIndex]: {
                isCorrect: selectedAnswers[qIndex] === correctAnswer,
                correctAnswer
            }
        }));
    };



    const handleGenerateQuiz = async () => {
        if (!topic.trim()) return;

        setLoading(true);
        setQuestions([]);

        try {
            const res = await fetch("http://localhost:5000/api/ai/generatequiz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ topic }),
            });

            const data = await res.json();
            const parsed = JSON.parse(data.answer);
            setQuestions(parsed.questions || []);
        } catch (err) {
            console.error(err);
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
        <div className="quiz-wrapper">
            <div className="quiz-card">
                <h2>🤖 AI-generated questions</h2>
                <p className="subtitle">
                    Enter a topic and let AI create a quiz for you
                </p>

                <input
                className="input"
                    type="text"
                    placeholder="e.g. JavaScript, DBMS, Operating System"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />

                <button onClick={handleGenerateQuiz} disabled={loading}>
                    {loading ? <TypingDots /> : "Generate Quiz"}
                </button>

                {questions.length > 0 && (
                    <div className="quiz-list">
                        {questions.map((q, index) => {
                            const selected = selectedAnswers[index];
                            const checkData = checked[index];
                            const isChecked = !!checkData;

                            return (
                                <div key={index} className="quiz-question">
                                    <h4>Q{index + 1}. {q.question}</h4>

                                    <div className="options">
                                        {q.options.map((opt, i) => {
                                            let optionClass = "option";

                                            if (isChecked) {
                                                if (opt === q.answer) optionClass += " correct";
                                                else if (opt === selected) optionClass += " wrong";
                                            }

                                            return (
                                                <label key={i} className={optionClass}>
                                                    <input
                                                        type="radio"
                                                        name={`question-${index}`}
                                                        value={opt}
                                                        disabled={isChecked}
                                                        checked={selected === opt}
                                                        onChange={() => handleSelect(index, opt)}
                                                    />
                                                    <span>{opt}</span>
                                                </label>
                                            );
                                        })}
                                    </div>

                                    {!isChecked && (
                                        <button
                                            className="check-btn"
                                            disabled={!selected}
                                            onClick={() => handleCheck(index, q.answer)}
                                        >
                                            Check Answer
                                        </button>
                                    )}

                                    {isChecked && (
                                        <div className="result-box">
                                            <p className={checkData.isCorrect ? "correct-text" : "wrong-text"}>
                                                {checkData.isCorrect ? "✅ Correct Answer" : "❌ Wrong Answer"}
                                            </p>
                                            {!checkData.isCorrect && (
                                                <p className="correct-answer">
                                                    Correct Answer: <strong>{checkData.correctAnswer}</strong>
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}


            </div>
        </div>
    );
};

export default CreateQuiz;
