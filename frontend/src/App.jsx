import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import UploadNotes from "./pages/UploadNotes";
import MyNotes from "./pages/MyNotes";
import AskAI from "./pages/AskAI";
import CreateQuiz from "./pages/CreateQuiz";

function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <>
      <Navbar setPage={setPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn} />
      {page === "home" && <Home setPage={setPage} isLoggedIn={isLoggedIn} />}
      {page === "login" && <Login setPage={setPage} setIsLoggedIn={setIsLoggedIn} />}
      {page === "register" && <Register setPage={setPage} />}
      {page === "dashboard" && <Dashboard setPage={setPage} />}
      {page === "upload" && <UploadNotes />}
      {page === "notes" && <MyNotes />}
      {page === "ask-ai" && <AskAI/>}
      {page === "quizzes" && <CreateQuiz/>}
    </>
  );
}

export default App;
