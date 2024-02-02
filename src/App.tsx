import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}


function App() {

    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    const changeTaskStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(el => el.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }

    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    const removeTask = (taskId: string) => {
        tasks = tasks.filter(el => el.id !== taskId)
        setTasks(tasks)
    }

    const changeFilter = (value: FilterValuesType, todolistId:string) => {
      let todolist = todolists.find(el=> el.id === todolistId)
        if(todolist){
            todolist.filter = value
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForTodolist = tasks
                if (el.filter === "active") {
                    tasksForTodolist = tasks.filter(el => el.isDone)
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks.filter(el => !el.isDone)
                }
                return <Todolist title="My First Todo"
                                 task={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeTaskStatus}
                                 id={el.id}
                                 filter={el.filter}
                />
            })}

        </div>
    );
}

export default App;
