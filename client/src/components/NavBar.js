import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = (props) => {
    
    if (props.loggedIn){
        return (
            <div>
                <h1>Hello {props.user.username}</h1>
                <button className="logout-button" onClick={props.logoutUser}>Logout</button>
                <br/>
                {/* <Link to="/expenses">
                    <button className="button">View all expenses</button>
                </Link> */}
                <hr/>
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