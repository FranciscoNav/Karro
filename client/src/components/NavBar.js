import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom'

const Navbar = (props) => {
 
    if (props.loggedIn){
        return (
            <div>
                <br/>
                <button className="logout-button" onClick={props.logoutUser}>Logout -Nav</button>
            </div>
        )
    } else{
        return (
            <div>
                <br/>
                <Link to="/signup">
                    <button className="login-button">Signup</button>
                </Link>
                <br/>
                <Link to="/login">
                    <button className="login-button">Login</button>
                </Link>
            </div>
        )
    }
}

export default Navbar;