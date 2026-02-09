import { useState } from "react";

const Navbar = ({ setPage, isLoggedIn, setIsLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false); // ✅ THIS IS THE KEY
    setPage("home");
    setMenuOpen(false);
  };

  const goTo = (page) => {
    setPage(page);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <h2 onClick={() => goTo("home")}>AI Study Assistant</h2>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span />
        <span />
        <span />
      </div>

      <ul className={menuOpen ? "nav-links open" : "nav-links"}>
        {!isLoggedIn ? (
          <>
            <li onClick={() => goTo("home")}>Home</li>
            <li onClick={() => goTo("login")}>Login</li>
            <li onClick={() => goTo("register")}>Register</li>
          </>
        ) : (
          <>
            <li onClick={() => goTo("dashboard")}>Dashboard</li>
            <li className="logout" onClick={handleLogout}>
              Logout
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
