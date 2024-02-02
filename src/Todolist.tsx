import React, {useState} from "react";
import {FilterValuesType} from "./App";

type TodolistType = {
    title: string
    task: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title:string) => void
}
type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


export const Todolist = (props: TodolistType) => {
    let [title, setTitle] = useState("")

    let addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={(e)=>{setTitle(e.currentTarget.value)}}
                       onKeyPress={(e)=>{
                           if(e.key === "Enter"){
                               addTaskHandler()
                           }
                       }}
                />
                <button onClick={addTaskHandler}>+
                </button>
            </div>
            <ul>
                {props.task.map(el => {
                        return (
                            <li key={el.id}>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                                <button onClick={() => {
                                    props.removeTask(el.id)
                                }}>X
                                </button>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter("all")
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter("active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter("completed")
                }}>Completed
                </button>
            </div>
        </div>
    )
}