import React from 'react';
import { NavLink, Link } from 'react-router-dom'

const Navbar = (props) => {
    // const link = {
    //     border: 'grey solid 1px',
    //     width:'100px',
    //     padding:'10px',
    //     margin: '0 6px 6px',
    //     textDecoration: 'none',
    //     color: 'white',
    //     background:'#3c6ae9',
    //   }
    
    //   const active = {
    //     background: "rgba(187, 189, 194, 0.664)",
    //     border: 'black solid 1px'
    //   }

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
                        <button className='button'>Signup</button>
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