import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SignUp from "./pages/SignUp";
import CreatePost from "./pages/CreatePost";
import Header from "./conponents/Header";
import Footer from "./conponents/Footer";
import PrivateRotue from "./conponents/PrivateRotue";
import OnlyAdminPrivateRoute from "./conponents/OnlyAdminPrivateRoute";
import UpdatePost from "./pages/UpdatePost";
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
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/update-post/:postId" element={<UpdatePost />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
