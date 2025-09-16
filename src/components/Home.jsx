import Navbar from './Navbar'
import Footer from './Footer'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash } from "react-icons/fa"; 

import "./Home.css"

const Home = () => {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(id)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(id)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />

      <div className="home">

        <div className="main">
          <div className="submit">
            <input placeholder='What do you need to do?' onChange={handleChange} value={todo} type="text" />
            <button className='submit-button' disabled={todo.length <= 3} onClick={handleAdd}>Add</button>
          </div>
          <div className="container">
            <h3>Your ToDo's</h3>

            <div className="todos">
              {todos.length === 0 && <div className='empty'> No Todos to Display</div>}
              {todos.map(item => {

                return <div key={item.id} className="todo">
                  <div className="checkbox">
                    <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} />
                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  </div>
                  <div className='button'>
                    <button className="todo-button" onClick={(e) => { handleEdit(e, item.id) }}>
                      <FaEdit color="green" size={20} className="btn-icon" /></button>
                    <button className="todo-button" onClick={(e) => { handleDelete(e, item.id) }}>
                      <FaTrash color="brown" size={20} className="btn-icon" /></button>
                  </div>
                </div>
              })}

            </div>
          </div>
        </div>


      </div>

      <Footer />
    </>
  )
}

export default Home


