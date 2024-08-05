import React, { useState, useEffect } from 'react';

const API_BASE = "https";

export const Home = () => {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch("")      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error:", err));
  }

  const completeTodo = async id => {
    const data = await fetch( id)
      .then(res => res.json());

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      }

      return todo;
    }));
  }

  const deleteTodo = async id => {
    const data = await fetch(`${id}`, {
      method: "DELETE"
    }).then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }

  const addTodo = async () => {
    const data = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newTodo
      })
    }).then(res => res.json());

    setTodos([...todos, data]);
    setPopupActive(false);
    setNewTodo("");
  }

  return (
    <div className='app min-h-screen bg-dark-alt text-light p-8'>
      <h1 className="text-4xl font-bold mb-8 text-light-alt">Welcome to our todo application</h1>
      <h4 className="text-lg text-light-alt uppercase font-bold mb-4 text-center">These are your todos</h4>

      <div className="todos grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos.length > 0 ? todos.map(todo => (
          <div className={`todo bg-dark p-4 rounded-xl flex items-center transition-opacity cursor-pointer 
          mb-12 ${todo.complete ? "opacity-70" : ""}`} key={todo._id} onClick={() => completeTodo(todo._id)}>
            <div className={`checkbox w-5 h-5 mr-4 rounded-full transition-colors 
            ${todo.complete ? "bg-gradient-to-b from-primary to-secondary" : "bg-dark-alt"}`}></div>
            <div className={`text text-xl ${todo.complete ? "line-through" : ""}`}>{todo.text}</div>
            <div className="delete_todo absolute top-1/2 right-2 transform -translate-y-1/2 
            font-bold w-6 h-6 text-light bg-red-700 rounded-full flex items-center justify-center" 
            onClick={() => deleteTodo(todo._id)}>
                x
            </div>
          </div>
        )) : (
          <p className="text-sm text-light-alt font-bold mb-4">You currently have no todos</p>
        )}
      </div>
      <div className="addPopup fixed bottom-24 right-8 flex items-center justify-center w-16 h-16 rounded-full 
      text-4xl font-extrabold bg-gradient-to-br from-primary to-secondary text-light cursor-pointer" 
      onClick={() => setPopupActive(true)}>
             +
      </div>
      {popupActive && (
        <div className='popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-light p-8 rounded-xl shadow-lg'>
          <div className='closePopup absolute top-4 right-4 w-5 h-5 text-xl font-bold bg-dark text-light 
          rounded-full flex items-center justify-center cursor-pointer' onClick={() => setPopupActive(false)}>x</div>
          <div className='content'>

            <h3 className="text-dark mb-4 font-bold uppercase">Create A Todo</h3>
            <input 
            type='text' 
            className='add-todo-input text-black appearance-none border-none outline-none bg-white 
            p-4 rounded-xl shadow-lg w-full text-xl mb-4' 
            onChange={e => setNewTodo(e.target.value)} value={newTodo} />

            <button className='button p-4 rounded-full bg-gradient-to-r from-primary to-secondary
             text-white font-bold uppercase text-lg' onClick={addTodo}>
                Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
