import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Posts from "./pages/Posts";
import Nav from "./ui/Nav";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Nav navigate={navigate} />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer
        pauseOnHover={false}
        autoClose={3000}
        newestOnTop
        transition={Slide}
      />
    </>
  );
}

export default App;
