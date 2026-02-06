const Dashboard = ({ setPage }) => {
    return (
      <div className="dashboard">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li>Dashboard</li>
            <li>My Notes</li>
            <li>Ask AI</li>
            <li>Quizzes</li>
            <li onClick={() => setPage("home")} className="logout">
              Logout
            </li>
          </ul>
        </aside>
  
        {/* Main Content */}
        <main className="dashboard-content">
          <h1>Welcome back 👋</h1>
          <p className="subtitle">Heres your study overview</p>
  
          {/* Stats */}
          <div className="stats">
            <div className="stat-card">📄 Notes<br /><span>12</span></div>
            <div className="stat-card">🤖 AI Questions<br /><span>48</span></div>
            <div className="stat-card">📝 Quizzes<br /><span>6</span></div>
            <div className="stat-card">⏱ Study Hours<br /><span>24h</span></div>
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
  