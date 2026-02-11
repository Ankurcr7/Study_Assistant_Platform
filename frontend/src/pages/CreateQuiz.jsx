import { useState, useEffect } from "react";

const CreateQuiz = () => {
    const [topic, setTopic] = useState("");
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [checked, setChecked] = useState({});
    const [quizHistory, setQuizHistory] = useState([]);
    const [activeQuizIndex, setActiveQuizIndex] = useState(null);

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
        setSelectedAnswers({});
        setChecked({});

        try {
            const res = await fetch("http://localhost:5000/api/ai/generatequiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
            });

            const data = await res.json();
            const parsed = JSON.parse(data.answer);

            const newQuiz = {
                topic,
                questions: parsed.questions || [],
                date: new Date().toLocaleString()
            };

            setQuestions(newQuiz.questions);

            // Save to history
            setQuizHistory(prev => [newQuiz, ...prev]);
            setActiveQuizIndex(0);

        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    const handleLoadQuiz = (index) => {
        const quiz = quizHistory[index];

        setQuestions(quiz.questions || []);
        setTopic(quiz.topic || "");
        setActiveQuizIndex(index);

        setSelectedAnswers({});
        setChecked({});
    };


    const handleNewQuiz = () => {
        setTopic("");
        setQuestions([]);
        setSelectedAnswers({});
        setChecked({});
        setActiveQuizIndex(null);
    };

    useEffect(() => {
        fetch("http://localhost:5000/api/ai/quizhistory")
            .then(res => res.json())
            .then(data => {
                console.log("Quiz history from DB:", data);
                setQuizHistory(Array.isArray(data) ? data : []);
            })
            .catch(err => console.log(err));
    }, []);



    return (
        <div className="quiz-layout">

            {/* Sidebar */}
            <div className="quiz-sidebar">
                <button className="new-quiz-btn" onClick={handleNewQuiz}>
                    + New Quiz
                </button>

                <div className="quiz-history">
                    {quizHistory.map((quiz, index) => (
                        <div
                            key={quiz._id || index}
                            className={`history-item ${activeQuizIndex === index ? "active" : ""}`}
                            onClick={() => handleLoadQuiz(index)}
                        >
                            <h4>{quiz.topic}</h4>
                            <p>{quiz.questions?.length || 0} Questions</p>
                            <small>{new Date(quiz.createdAt).toLocaleString()}</small>
                        </div>
                    ))}
                </div>

            </div>

            {/* Main Content */}
            <div className="quiz-main">
                <h2>🤖 AI Quiz Generator</h2>

                <div className="quiz-input-section">
                    <input
                        className="input"
                        type="text"
                        placeholder="Enter topic..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />

                    <button onClick={handleGenerateQuiz} disabled={loading}>
                        {loading ? "Generating..." : "Generate Quiz"}
                    </button>
                </div>

                {Array.isArray(questions) && questions.length > 0 && (
                    <div className="quiz-list">
                        {questions.map((q, index) => {
                            const selected = selectedAnswers[index];
                            const checkData = checked[index];
                            const isChecked = !!checkData;

                            return (
                                <div key={index} className="quiz-question">
                                    <h4>Q{index + 1}. {q.question}</h4>

                                    {Array.isArray(q.options) &&
                                        q.options.map((opt, i) => {
                                            let optionClass = "option";

                                            if (isChecked) {
                                                if (opt === q.answer) {
                                                    optionClass += " correct";
                                                } else if (opt === selected) {
                                                    optionClass += " wrong";
                                                }
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
                                                    {opt}
                                                </label>
                                            );
                                        })}


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
                                        <div className="answer-feedback">
                                            {checkData.isCorrect ? (
                                                <p className="correct-text">✅ Correct!</p>
                                            ) : (
                                                <p className="wrong-text">
                                                    ❌ Wrong! Correct answer is: <strong>{checkData.correctAnswer}</strong>
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
