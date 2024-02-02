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
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    const changeTaskStatus = (id: string, isDone: boolean, todolistID:string) => {
       let todolistTasks = tasks[todolistID]
        let task = todolistTasks.find(el=> el.id === id)
        if(task){
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const addTask = (title: string, todolistID: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = [task, ...todolistTasks]
        setTasks({...tasks})

    }

    const removeTask = (taskId: string, todolistID: string) => {
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = todolistTasks.filter(el => el.id !== todolistID)
        setTasks({...tasks})
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(el => el.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">
            {todolists.map(el => {
                let allTodolistsTasks = tasks[el.id]
                let tasksForTodolist = allTodolistsTasks
                if (el.filter === "active") {
                    tasksForTodolist = allTodolistsTasks.filter(el => el.isDone)
                }
                if (el.filter === "completed") {
                    tasksForTodolist = allTodolistsTasks.filter(el => !el.isDone)
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
