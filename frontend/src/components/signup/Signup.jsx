import React, { useState } from 'react'
import "./signup.css"
import HeaderComp from './HeaderComp'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    username: '',
    password: '',
  })

  const change = (e) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(`${window.location.origin}/api/v1/register`, inputs).then((res) => {
      console.log(res);
      console.log(res.data);
      console.log(res.data.message);
      setInputs({
        email: '',
        username: '',
        password: '',
      })
      if (res.data.message === "User created successfully") {
        navigate('/signin')        
      }
    })
  }


  return (
    <div className='signup'>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className='d-flex flex-column w-100 p-5'>
              <input
                name='email'
                value={inputs.email}
                onChange={change}
                type="email"
                className='p-2 my-3 input-signup'
                placeholder='enter your email' />
              <input
                name='username'
                value={inputs.username}
                onChange={change}
                type="username"
                className='p-2 my-3 input-signup'
                placeholder='enter your username' />
              <input
                name='password'
                value={inputs.password}
                onChange={change}
                type="password"
                className='p-2 my-3 input-signup'
                placeholder='enter your password' />
              <button className='btn-signup' onClick={submit}>Signup</button>
            </div>
          </div>
          <div className="col-lg-4 column column-left d-flex justify-content-center align-items-center">
            <HeaderComp first={"Sign"} second={"Up"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
