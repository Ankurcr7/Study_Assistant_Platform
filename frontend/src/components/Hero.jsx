import { useState } from "react";

const Hero = () => {
  const [message, setMessage] = useState("");

  return (
    <section className="hero">
      <h1>Your Personal AI Study Assistant</h1>
      <p>Study smarter with AI-powered notes, quizzes & answers 🚀</p>
      <button onClick={() => setMessage("Welcome! Start learning with AI 🤖")}>
        Get Started
      </button>
      {message && <p className="message">{message}</p>}
    </section>
  );
};

export default Hero;
