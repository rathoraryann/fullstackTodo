import React, { useState } from 'react'
import HeaderComp from './HeaderComp'
import "./signup.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { authAction } from '../../store';
import { useDispatch } from 'react-redux';

const Signin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  })

  const submit= async()=>{
    const user = await axios.post(`${window.location.origin}/api/v1/signin`, inputs)
    if (user.data.message === 'User not found' || user.data.message === "Wrong Password") return;
    sessionStorage.setItem("id", user.data.user._id)
    dispatch(authAction.login())
    navigate('/todo')
  }

  return (
    <div className='signup'>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 column column-left d-flex justify-content-center align-items-center">
            <HeaderComp first={"Sign"} second={"in"} />
          </div>
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className='d-flex flex-column w-100 p-5'>
              <input
                name='email'
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                type="email"
                className='p-2 my-3 input-signup'
                placeholder='enter your email' />
              <input
                name='password'
                value={inputs.password}
                onChange={(e)=>setInputs({...inputs, password: e.target.value})}
                type="password"
                className='p-2 my-3 input-signup'
                placeholder='enter your password' />
              <button className='btn-signup' onClick={submit}>Signup</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
