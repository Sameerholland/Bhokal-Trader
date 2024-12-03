import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../src/Components/Login";
import Sidebar from "../src/Components/Sidebar";
import AddCourse from "./Components/ManageBatches";
import AddVideo from "./Components/ManageVideos";
import AddUser from "../src/Components/Userdetails";
import Header from "./Components/Header";
import Footer from "./Components/Fotter";
import Course from "./Components/Course";
import Users from "./Components/Users";
import DashboardOverview from "./Components/Dashboard";
import { useSelector } from "react-redux";
import { islogged } from "./Features/Auth/AuthSlice";
import Videos from "./Components/subComponet/Videos";

const App = () => {
  const isLoggedIn = useSelector(islogged);

  return (
    <Router>
      <div>
        {isLoggedIn && <Header />}
        {isLoggedIn && <Sidebar />}
        <div className="content">
          <Routes>
            {/* If not logged in, show login page */}
            {!isLoggedIn ? (
              <Route path="/" element={<LoginPage />} />
            ) : (
              <>
                {/* If logged in, show the dashboard and other routes */}
                <Route path="/" element={<DashboardOverview />} />
                <Route path="/dashboard/add-course" element={<AddCourse />} />
                <Route path="/dashboard/add-video" element={<AddVideo />} />
                <Route path="/dashboard/add-users" element={<AddUser />} />
                <Route path="/dashboard/courses" element={<Course />} />
                <Route path="/dashboard/students" element={<Users />} />
                <Route path="/dashboard/courses/videos" element={<Videos />} />
              </>
            )}
          </Routes>
        </div>
        {isLoggedIn && <Footer />}
      </div>
    </Router>
  );
};

export default App;
