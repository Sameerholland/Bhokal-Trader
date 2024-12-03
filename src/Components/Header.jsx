import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar" style={{display:'flex' , justifyContent:'center'}}>
     <Link to='/' style={{color:'white',textDecoration:'none'}}> Admin Dashboard</Link>
    </div>
  );
};

export default Header;
