import { useState } from 'react'
type Todo = {
  id: number
  text: string
  completed: boolean
  CreatedAt: string
  Timeframe: string
}

export default function TodoApp() {
  const [add, setAdd] = useState("")
  const [del, setDel] = useState("")
  const [time, setTime] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
  function addtodo() {
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
    const newTodo: Todo = {
      id: Date.now(),
      text: add,
      completed: false,
      CreatedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      Timeframe: time
      
    }
    setTodos([...todos, newTodo])
    setAdd("")
    setTime("")
  }
  function Toedit(index: number) {
    
      }
  function deletetodo(index: number) {
    if (isNaN(index) || index < 1 || index > todos.length) {
      alert("Please enter a valid task number to delete.");
      return;
    }
    setTodos(todos.filter((task, i) => {
      if(i===index-1) {
        
        alert(`Deleted: ${task.text}`)
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
          placeholder="set deadline"
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
              {index + 1}. {todo.text} 
            </li>
          ))}
        </ul>
      </div>
      <div className="Ongoing-area">
        <h2>Ongoing Todos</h2>
        <ul>
          {todos.map((todo, index) => (
            <li key={todo.id}>
              {index + 1}. {todo.text}
              <button onClick={()=>{
                window.open("/popup", "_blank", "width=600,height=400,align=center,top=100,left=300");
                Toedit(Number(index))}}>edit time</button>
              <button onClick={() => completelist(Number(index))}>completed</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
