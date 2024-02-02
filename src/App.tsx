import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [filter, setFilter] = useState<FilterValuesType>("all")
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    const removeTask = (taskId: string) => {
        tasks = tasks.filter(el => el.id !== taskId)
        setTasks(tasks)
    }

    const changeFilter = (value: FilterValuesType) => {
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
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
