import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Clock from './clock'

type Todo = {
  id: number
  title: string
  completed: boolean
  CreatedAt: string
  timeframe: number
}

export default function TodoApp() {
  const [add, setAdd] = useState("")
  const [del, setDel] = useState("")
  const [time, setTime] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const openPopup = () => {
    // Open a new browser window/tab (depending on browser settings)
    const popupWindow = window.open(
      `${window.location.origin}/popup`,    // URL to your popup route
      "MyPopup",                             // window name
      "width=600,height=400,top=125,left=350" // features: size & position
    );
    if (!popupWindow) {
      alert("Popup blocked. Please allow popups for this site.");
    }
  };


  async function addtodo() {
    console.log("Add button clicked with:", add, time)
    if (time.trim() === "" || Number(time) <= 0)
    {
      alert("Please set a valid deadline")
      return
    }
    else if (add.trim() === "" || isNaN(Number(add))==false)
    {
      alert("Task cannot be empty or a number")
      return
    }
    const res = await axios.post("http://localhost:5000/api/todos", {
      title: add,         // from input
      timeframe: Number(time)  // from input
    });
    const newTodo: Todo = res.data;
    // const newTodo: Todo = {
    //   id: Date.now(),
    //   text: add,
    //   completed: false,
    //   CreatedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    //   Timeframe: time
      
    // }
    setTodos([...todos, newTodo])
    setAdd("")
    setTime("")
    
  }
  function deletetodo(index: number) {
    if (isNaN(index) || index < 1 || index > todos.length) {
      alert("Please enter a valid task number to delete.");
      return;
    }
    setTodos(todos.filter((task, i) => {
      if(i===index-1) {
        
        alert(`Deleted: ${task.title}`)
        setDel("")
        setTime("")
        return false
      }
      return true
    }))
  
  }
  function completelist(index: number) {
    alert("Task Completed")
    setCompletedTodos([...completedTodos, todos[index]])
    setTodos(todos.filter((_, i) => i !== index))  
    }
  return (

    <div className="todo-app">
      <h1>Todo List</h1>
      <Clock />
      <div className="input-area">
        <input type="text" value={add} onChange={(e) => setAdd(e.target.value)} placeholder="Add a new task" onKeyDown={(e) => {
        if (e.key === "Enter") {
        addtodo(); // call your function
        }
         }}/>
        <input
          type="number"
          min="1"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="set deadline in hrs"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addtodo();
            }
          }}/>
        <button onClick={() => {addtodo()}}>Add</button>
      </div>
      <div className="delete-area">
        <input  type="number" value={del} min="1" placeholder="Enter Task Number to delete" onChange={(e) => setDel(e.target.value)} onKeyDown={(e) => {
    if (e.key === "Enter") {
      deletetodo(Number(del));
    }
  }}/>
        <button onClick={() => {
          if (del.trim() === "") {
            alert("Please enter a task number to delete");
            return;
          }
          deletetodo(Number(del))}}>Delete</button>

      </div>
      <div className="completed-area">
        <h2>Completed Todos</h2>
        <ul>
          {completedTodos.map((todo, index) => (
            <li key={todo.id}>
              {index + 1}. {todo.title} 
            </li>
          ))}
        </ul>
      </div>
      <div className="Ongoing-area">
        <h2>Ongoing Todos</h2>
        <ul>
          {todos.map((todo, index) => (
            <li key={todo.id}>
              {index + 1}. {todo.title} &nbsp;&nbsp;&nbsp; (Deadline: {todo.timeframe} hrs) &nbsp;&nbsp;
              <button onClick={()=>{
                openPopup()
                }}>edit time</button>
              <button onClick={() => completelist(Number(index))}>completed</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
