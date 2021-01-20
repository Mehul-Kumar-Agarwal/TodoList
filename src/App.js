import React,{ useState, useEffect } from 'react';
import './App.css';
//importing components
import Form from './components/Form';
import TodoList from './components/TodoList';


function App() {

  const [inputText,setInputText]=useState("");
  const [todos,setTodos]=useState([]);
  const [status,setStatus]=useState("all");
  const [filteredTodos,setfilteredTodos]=useState([]);

  

  //functions and events
  const filterHandler=()=>{
    switch(status){
      case "completed":setfilteredTodos(todos.filter(todo => todo.completed === true));
                        break;
      case "uncompleted":setfilteredTodos(todos.filter(todo => todo.completed === false));
                        break;
      default:setfilteredTodos(todos)
              break;
    }
  };

   //save to local
   const saveLocal=()=>{
      localStorage.setItem('todos',JSON.stringify(todos));
  }
  const getLocal=()=>{
    if(localStorage.getItem('todos')===null){
      localStorage.setItem('todos',JSON.stringify([]))
    }
    else{
      let todolocal=JSON.parse(localStorage.getItem('todos'));
      setTodos(todolocal);
    }
  };

  //Run only Once
  useEffect(()=>{getLocal();},[]);
  
  useEffect(()=>{
    filterHandler();
    saveLocal();
  },[todos,status]);

 


  return (
    <div className="App">
      <header>
        <h1>To-do List</h1>
    </header>
    <Form  
      todos={todos} 
      setTodos={setTodos} 
      inputText={inputText} 
      setInputText={setInputText} 
      setStatus={setStatus}
    />
    <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos}/>
    </div>
  );
}

export default App;
