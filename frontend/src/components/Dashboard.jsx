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
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul>
          <li onClick={() => goTo("home")}>Home</li>
          <li>My Notes</li>
          <li>Ask AI</li>
          <li>Quizzes</li>
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
          <div className="stat-card">
            ⏱ Study Hours <br />
            <span>24h</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="actions">
          <button>Upload Notes</button>
          <button>Ask AI</button>
          <button>Create Quiz</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
