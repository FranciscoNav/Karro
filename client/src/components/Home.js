import React from 'react'
import { Link } from 'react-router-dom'

const Home = (props) => {

    const handletest = (props)=>{
        console.log(props)
    }

    if (props.loggedIn){
        return (
            <div>
                <h1>Hello {props.user.name}</h1>
                <br/>
                <Link to="/cars">
                    <button className="button">View Vehicles</button>
                </Link>
                <br/>
                <br/>
                <button className="test" onClick={handletest}>test -home</button>
            </div>
        )
    } else{
        return (
            <div>
                <h1 className='home'>Welcome to Karro! [HOME but not loggin in view]</h1>
                <p>This is information about the home/landing page things will be added here later</p>
            </div>
        )
    }

}
export default Home;