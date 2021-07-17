import React, { useState } from 'react'

const Login = ({loginUser}) => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch("/login",{
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
              username: username,
              password: password
          })
        })
        .then (resp => resp.json())
        .then (user =>  loginUser(user))
    }
    
    return (
        <div>
            <form className="sign-up" onSubmit={handleSubmit}>
                <label> Username:</label>
                <br/>
                <input type="text" id="username" value={username} onChange={(e) => setUserName(e.target.value)}></input>
                <br/>
                <br/>
                <label> Password:</label>
                <br/>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <br/>
                <input className="submit-button" type="submit"/>
            </form>
        </div>
    )
}

export default Login;