import React from 'react';
import { NavLink, Link } from 'react-router-dom'

const Navbar = (props) => {

    if (props.loggedIn){
        return (
            <div className='nav-container'>
                <h2 className='logo'>KARRO</h2>
                <br/>
                <div className='nav'>
                    <NavLink to='/' className="nav-link">Home</NavLink>
                    <NavLink to="/cars" className="nav-link">Your Vehicles</NavLink>
                    <NavLink to="/cars/all" className="nav-link">Explore What Others Pay</NavLink>
                    <button className="logout-button" onClick={props.logoutUser}>Logout</button>
                </div>
                <br/>
                <br/>
            </div>
        )
    } else{
        return (
            <div className='nav-container'>
                <h2 className='logo'>KARRO</h2>
                <br/>
                <div className='nav'>
                    <Link to="/signup" >
                        <button className='button'>Sign up</button>
                    </Link>
                    <Link to="/login" >
                        <button className='button'>Login</button>
                    </Link>
                </div>
                <br/>
                <br/>
            </div>
        )
    }
}

export default Navbar;