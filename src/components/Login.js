import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({email:"", password:""});
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlMWQ4Njk5MmJhNzJiZDJhNjNhNTdkIn0sImlhdCI6MTY3NTc1NTIwMH0.qCZn7kgv75weClWzG3GlQ3RflPPILb0YWnW6-yrJaWk"
      },
      body: JSON.stringify({email:credentials.email, password:credentials.password})
    });
    const json = await response.json()
    console.log(json)  
    if(json.success){
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      history.push('/')
      props.showAlert(" Logged in successfully","success");
    }
    else {
      props.showAlert(" Invalid Credentials","danger");
    }
  }
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }
  return (
    <div className='mt-3'>
      <h2>Login to Continue to iNotebook</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange}/>
      </div>
      <button type="submit" className="btn btn-primary" >Submit</button>
    </form>
    </div>
  )
}

export default Login
