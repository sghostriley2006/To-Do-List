import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const getTasks = async () => {
    try {
      const query = await fetch("http://localhost:6767/tasks");
      const res = await query.json();
      console.log(res);
      setTasks(res);
    } catch {
      console.log("Could not get tasks from database.")
    }
  }

  const addTask = async () => {
    try {
      if(task.trim() == "") return;
      const t = { task };
      const response = await fetch(`http://localhost:6767/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(t)
        }
      );
      const createdTask = await response.json();
      setTasks([...tasks, createdTask]);
      setTask("");
    } catch {
      console.log("Could not add task to database.")
    }
  }

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:6767/tasks/${id}`,
        {method: "DELETE"}
      );
      setTasks(tasks.filter(t => t.id !== id));
    } catch {
      console.log(`Could not delete task with id ${id} from database.`)
    }
  }

  const handleEnter = (e) => {
    if(e.key == 'Enter') addTask();
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getTasks();
  }, []);

  return (
    <div className='h-screen w-screen'>
      <div className='flex justify-center items-center h-screen w-screen flex-col gap-16 flex-none'>
      <span className="text-rotate text-5xl leading-[2] max-lg:text-3xl max-md:text-2xl">
        <span className='justify-items-center'>
          <span>Welcome to your favorite modern To-Do-List</span>
          <span>Organize your activity</span>
          <span>Become more productive</span>
        </span>
      </span>
      <div className='flex gap-16 items-center w-3/5'>
        <input onKeyDown={handleEnter} type="text" className="input outline-none input-xl w-full" placeholder="Enter your task" onChange={(e) => setTask(e.target.value)} value={task} />
        <button className="btn btn-success btn-xl" onClick={() => addTask()}>Add Task</button>
      </div>
      <div className='flex flex-col gap-8'>
        {tasks.map((t) => {
          return (
            <div key={t.id} className="flex items-center justify-between w-full gap-64 p-2">
              <h1 className='text-3xl max-md:text-xl'>{t.task}</h1>
              <button className="btn btn-error" onClick={() => deleteTask(t.id)}>Delete Task</button>
            </div>
          )
        })}
      </div>
     </div>
    </div>
  )
}

export default App;