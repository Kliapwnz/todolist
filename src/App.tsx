import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    let [tasks, setTasks] = useState ( [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskId:number) => {
        tasks = tasks.filter(el => el.id !== taskId)
        setTasks(tasks)
    }
    return (
        <div className="App">
            <Todolist title="My First Todo"
                      task={tasks}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
