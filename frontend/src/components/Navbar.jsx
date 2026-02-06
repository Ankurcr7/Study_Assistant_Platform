const Navbar = ({ setPage }) => {
    return (
      <nav className="navbar">
        <h2 onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
          AI Study Assistant
        </h2>
        <ul>
          <li onClick={() => setPage("home")}>Home</li>
          <li onClick={() => setPage("login")}>Login</li>
          <li onClick={() => setPage("register")}>Register</li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;
  