import { useEffect } from "react";

const Dashboard = ({ setPage }) => {
  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setPage("login");
    }
  }, [setPage]);

  const goTo = (page) => {
    setPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setPage("home");
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul>
          <li onClick={() => goTo("home")}>Home</li>
          <li onClick={() => goTo("notes")}>My Notes</li>
          <li onClick={() => goTo("ask-ai")}>Ask AI 🤖</li>
          <li onClick={() => goTo("quizzes")}>Quizzes</li>
          <li className="logout" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <h1>Welcome back 👋</h1>
        <p className="subtitle">Here's your study overview</p>

        {/* Stats */}
        <div className="stats">
          <div className="stat-card">
            📄 Notes <br />
            <span>12</span>
          </div>
          <div className="stat-card">
            🤖 AI Questions <br />
            <span>48</span>
          </div>
          <div className="stat-card">
            📝 Quizzes <br />
            <span>6</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="actions">
          <button onClick={() => goTo("upload")}>Upload Notes</button>
          <button onClick={() => goTo("ask-ai")}>Ask AI 🤖</button>
          <button onClick={() => goTo("quizzes")}>Create Quiz</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
