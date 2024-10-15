import Login from "./components/Login.jsx"
import Register from "./components/Register.jsx"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home.jsx"
import { useState, useEffect } from "react"


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  // Use `useEffect` to load the user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user from localStorage
    }
  }, []); // Empty array ensures this runs only once when the app mounts

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/register"
            element={<Register user={user} setUser={setUser} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
