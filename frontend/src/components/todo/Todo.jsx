import React, { useEffect, useState } from 'react'
import "./todo.css"
import TodoCard from './TodoCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Update from './Update'

let id = sessionStorage.getItem("id")

const Todo = () => {
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
    })
    const [todos, setTodos] = useState([])
    const [update, setUpdate] = useState({
        title: '',
        description: '',
    })

    const show = () => {
        document.getElementById("textarea").style.display = "block"
    }
    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value })
    }
    const submit = async (e) => {
        if (inputs.title === '' || inputs.description === '') {
            toast.error('Please fill in all fields')
        } else {
            if (id) {
                await axios.post(`${window.location.origin}/api/v2/addtodo`, { title: inputs.title, description: inputs.description, id: id }).then((res) => {
                    console.log(res)
                })
                setInputs({ title: "", description: "" })
                toast.success('Task added successfully');
            } else {
                setTodos([...todos, inputs])
                setInputs({ title: "", description: "" })
                toast.success('Task added successfully');
                toast.error('Task added successfully, but please sigin in');
            }

        }
    }
    const del = async(todoId) => {
       if (id) {
        await axios.delete(`${window.location.origin}/api/v2/deletetodo/${todoId}`, {data: {id: id}}).then((res)=>{
            toast.success("task is deleted successfully")
        })
       } else{
        toast.error("Please Signup")
       }
    }
    const dis = (value) => {
        document.getElementById("todo-update").style.display = value;
    }
    useEffect(()=>{
        if (id) {
            const fetch = async () =>{
                await axios.get(`${window.location.origin}/api/v2/gettodo/${id}`).then((res)=>{
                    setTodos(res.data.list)
                })
            }
            fetch()
        }
    },[])
    const toBeUpdate=(id)=>{
        setUpdate(todos[id])
    }
    return (
        <>
            <div className='todo'>
                <ToastContainer />
                <div className='todo-main container d-flex justify-content-center align-items-center flex-column my-4'>
                    <div className="d-flex flex-column todo-inputs-div w-50 p-1">
                        <input type="text" placeholder='title' className='my-2 p-2 todo-inputs' onClick={show} name='title' value={inputs.title} onChange={change} />
                        <textarea id='textarea' type="text" placeholder='description' className='p-2 todo-inputs' name='description' value={inputs.description} onChange={change} />
                    </div>
                    <div className="w-50 d-flex justify-content-end my-3">
                        <button className='home-btn px-2 py-1' onClick={submit}>Add</button>
                    </div>
                </div>
                <div className="todo-body">
                    <div className="container-fluid">
                        <div className="row">
                            {todos && todos.map((item, index) => (
                                <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                                    <TodoCard title={item.title} description={item.description} id={item._id} delTodo={del} display={dis} updateId= {index} toBeUpdate={toBeUpdate}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="todo-update" id='todo-update'>
                <div className="container update">
                    <Update display={dis} update={update}/>
                </div>
            </div>
        </>
    )
}

export default Todo
