import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../Css/Sidebar.css';  // Import the CSS for the sidebar styles

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Toggle button with aria-expanded for accessibility */}
      <button
        onClick={toggleSidebar}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
        className="sidebar-toggle-button"
      >
        {isOpen ? "Close" : "Menu"}
      </button>
      
      {/* Sidebar itself */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <Link to="/dashboard/add-course" onClick={() => setIsOpen(false)}>Add Course</Link>
        <Link to="/dashboard/add-video" onClick={() => setIsOpen(false)}>Add Video</Link>
        <Link to="/dashboard/add-users" onClick={() => setIsOpen(false)}>Add Student</Link>
        <Link to="/dashboard/courses" onClick={() => setIsOpen(false)}>All Courses</Link>
        <Link to="/dashboard/students" onClick={() => setIsOpen(false)}>All Students</Link>
      </div>
    </div>
  );
};

export default Sidebar;
