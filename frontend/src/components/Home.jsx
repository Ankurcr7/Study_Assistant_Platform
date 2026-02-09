const Home = ({ setPage, isLoggedIn }) => {
  return (
    <section className="home">
      <div className="home-content">
        <span className="badge">🚀 AI Powered Learning</span>

        <h1>
          Your Smart <span>AI Study Assistant</span>
        </h1>

        <p>
          Upload notes, ask questions, generate quizzes, and manage your study
          materials — all powered by Artificial Intelligence.
        </p>

        <div className="home-buttons">

          {isLoggedIn && (<button className="primary" onClick={() => setPage("dashboard")}>
            Get Started
          </button>)}
          

          {/* ✅ HIDDEN when logged in */}
          {!isLoggedIn && (
            <>
            <button className="primary" onClick={() => setPage("register")}>
            Get Started
          </button>
            <button
              className="secondary"
              onClick={() => setPage("login")}
            >
              Login
            </button>
            </>
            
          )}
        </div>
      </div>

      <div className="home-cards">
        <div className="info-card">📄 Smart Notes</div>
        <div className="info-card">🤖 AI Q&A</div>
        <div className="info-card">📝 Auto Quizzes</div>
        <div className="info-card">☁️ Cloud Sync</div>
      </div>
    </section>
  );
};

export default Home;
