import React from 'react'
import { Link } from 'react-router-dom'

const Home = (props) => {

    if (props.loggedIn){
        return (
            <div>
                <h1>Hello {props.user.name} welcom to Karro !</h1>
                <br/>
                <p>Add information about the website here</p>
                <br/>
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