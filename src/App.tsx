import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [filter, setFilter] = useState<FilterValuesType>("all")
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskId: number) => {
        tasks = tasks.filter(el => el.id !== taskId)
        setTasks(tasks)
    }

    const changeFilter = (value:FilterValuesType) => {
        setFilter(value)
    }
    let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter(el => el.isDone)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(el => !el.isDone)
    }

    return (
        <div className="App">
            <Todolist title="My First Todo"
                      task={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
