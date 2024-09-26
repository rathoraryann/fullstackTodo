import React from 'react'
import "./todo.css"
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCard = ({ title, description, id, delTodo, display, updateId, toBeUpdate}) => {
  return (
    <div className='p-3 todo-card'>
      <div>
        <h5>{title}</h5>
        <p className='todo-card-p'>{description.split("", 72)}...</p>
      </div>
      <div className='d-flex justify-content-around '>
        <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1' onClick={()=>{
          toBeUpdate(updateId)
          display("block")}}>
          <GrDocumentUpdate className='card-icons' />Update
        </div>
        <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger' onClick={()=>delTodo(id)}>
          <MdDelete className='card-icons del' />Delete
        </div>
      </div>
    </div>
  )
}

export default TodoCard
