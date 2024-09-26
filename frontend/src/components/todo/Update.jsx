import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';


const Update = ({ display, update }) => {
  const [inputs, setInputs] = useState({
    title: '',
    description: ''
  })

  useEffect(() => {
    if (update) {
      setInputs({
        title: update.title || '',
        description: update.description || ''
      })
    }
  }, [update])

  const submit = async() =>{
    await axios.put(`${window.location.origin}/api/v2/updatetodo/${update._id}`, {title: inputs.title, description: inputs.description}).then((res)=>{
      toast.success("Updated")
    })
    display('none')
  }
  return (
    <div className='py-5 d-flex justify-content-center align-items-start flex-column update'>
      <h3>Update todo</h3>
      <input
        value={inputs.title}
        onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
        type="text"
        className='todo-inputs my-4 w-100 p-3' />
      <textarea
        value={inputs.description}
        onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
        type="text"
        className='todo-inputs w-100 p-3' />
      <div>
        <button className='btn btn-dark my-4 ' onClick={submit}>Update</button>
        <button className='btn btn-danger my-4 mx-3' onClick={() => display("none")}>Close</button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Update
