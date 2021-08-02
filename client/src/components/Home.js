import React from 'react'

const Home = (props) => {

    if (props.loggedIn){
        return (
            <div>
                <h1>Hello {props.user.name} Welcome to Karro !</h1>
                <br/>
                <p>Thank you for choosing Karro for your vehicle budgeting needs. To see all the cars you own, click on the “Your Vehicles” tab. From there you can also view all the expenses related to each car. If you want to see what other users are paying for their cars, click on the “Explore” tab, at the top.  Enjoy!</p>
                <br/>
            </div>
        )
    } else{
        return (
            <div>
                <h1 className='home'>Welcome to Karro!</h1>
                <p>Hello and welcome to Karro. We are a car expense and maintenance tracking app. When you sign-up, you can find your vehicle and start tracking your expenses. We also offer an “explore” feature that lets you search for a car and see the expenses other users have incurred. The “explore” feature is perfect for determining whether or not you’re overpaying for something. It’s FREE, so why not try us out?</p>
            </div>
        )
    }
}
export default Home;