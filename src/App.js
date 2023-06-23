import React from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [task, setTask] = React.useState("");
  const [taskEdit, setTaskEdit] = React.useState(null);
  const [editText, setEditText] = React.useState("");

  React.useEffect(() =>{
    const loadedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(loadedTasks){
      setTasks(loadedTasks)
    }
  },[])

  React.useEffect(() =>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function handleSubmit(e) {
    e.preventDefault();

    const newTask = {
      id: new Date().getTime(),
      text: task,
      completed: false,
    };

    setTasks([...tasks].concat(newTask));
    setTask("");
  }

  function deleteTask(id) {
    if(window.confirm("Are You Sure want to Delete")){
      const updateTasks = [...tasks].filter((task) => task.id !== id);
      setTasks(updateTasks);
    }
    
  }

  function toggleComplete(id) {
    const updateTasks = [...tasks].map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });

    setTasks(updateTasks);
  }

  function editTask(id) {
    const updateTasks = [...tasks].map((task) => {
      if (task.id === id) {
        task.text = editText;
      }
      return task;
    });

    setTasks(updateTasks);
    setTaskEdit(null);
    setEditText("");
  }
  return (
    <div className="App">
      <h2>Task Manager</h2>
      <form onSubmit={handleSubmit} className="app-form">
        <input
          type="text"
          onChange={(e) => setTask(e.target.value)}
          value={task}
          placeholder="Enter the task"
        ></input>
        {task ? <button type="submit">Add Task</button> : ''}
      </form>
      {tasks.map((task) => (
        <div key={task.id} className="tasks-list">
          <input
            type="checkbox"
            onChange={() => toggleComplete(task.id)}
            checked={task.completed}
            className="task-checked"
          />
          {taskEdit === task.id ? (
            <input
              type="text"
              onChange={(e) => setEditText(e.target.value)}
              value={editText}
              placeholder="Edit Task"
            />
          ) : (
            <div>{task.text}</div>
          )}

          <button onClick={() => deleteTask(task.id)}>Delete</button>

          {taskEdit === task.id ? (
            <button onClick={() => editTask(task.id)}>Submit Edit</button>
          ) : (
            <button onClick={() => setTaskEdit(task.id)}>Edit Task</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
