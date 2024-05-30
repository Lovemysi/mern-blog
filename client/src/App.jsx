import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SignUp from "./pages/SignUp";
import Header from "./conponents/Header";
import Footer from "./conponents/Footer";
import PrivateRotue from "./conponents/PrivateRotue";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRotue />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
