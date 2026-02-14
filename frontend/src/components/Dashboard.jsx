import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ setPage }) => {
  const [stats, setStats] = useState({
    notes: 0,
    aiQuestions: 0,
    quizzes: 0,
  });

  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      setPage("login");
      return;
    }

    if (user) {
      setUserName(user.name || user.username || "Student");
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats({
          notes: res.data.notes || 0,
          aiQuestions: res.data.aiQuestions || 0,
          quizzes: res.data.quizzes || 0,
        });

      } catch (err) {
        console.error("Error fetching stats:", err);

        if (err.response?.status === 401) {
          handleLogout();
        }

      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const goTo = (page) => {
    setPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setPage("home");
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <ul>
          <li onClick={() => goTo("home")}>🏠 Home</li>
          <li onClick={() => goTo("notes")}>📄 My Notes</li>
          <li onClick={() => goTo("upload")}>⬆ Upload Notes</li>
          <li onClick={() => goTo("ask-ai")}>🤖 Ask AI</li>
          <li onClick={() => goTo("quizzes")}>📝 Quizzes</li>
          <li className="logout" onClick={handleLogout}>
            🚪 Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <h1>Welcome back, {userName} 👋</h1>
        <p className="subtitle">Here's your study overview</p>

        {/* Stats */}
        <div className="stats">
          <div className="stat-card">
            📄 Notes
            <span>{stats.notes}</span>
          </div>

          <div className="stat-card">
            🤖 AI Questions
            <span>{stats.aiQuestions}</span>
          </div>

          <div className="stat-card">
            📝 Quizzes
            <span>{stats.quizzes}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="actions">
          <button onClick={() => goTo("upload")}>
            Upload Notes
          </button>

          <button onClick={() => goTo("ask-ai")}>
            Ask AI 🤖
          </button>

          <button onClick={() => goTo("quizzes")}>
            Create Quiz
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
