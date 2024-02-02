import React, {ChangeEvent, KeyboardEventHandler, useState} from "react";
import {FilterValuesType} from "./App";

type TodolistType = {
    title: string
    task: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
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
    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    let onEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }
    let allButtonHandler = () => {
        props.changeFilter("all")
    }
    let activeButtonHandler = () => {
        props.changeFilter("active")
    }
    let completedButtonHandler = () => {
        props.changeFilter("completed")
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onEnterHandler}
                />
                <button onClick={addTaskHandler}>+
                </button>
            </div>
            <ul>
                {props.task.map(el => {
                        let onChangeBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(el.id, newIsDoneValue)
                        }
                        let removeTaskHandler = () => {
                            props.removeTask(el.id)
                        }
                        return (
                            <li key={el.id}>
                                <input type="checkbox" checked={el.isDone} onChange={onChangeBoxHandler}/>
                                <span>{el.title}</span>
                                <button onClick={removeTaskHandler}>X
                                </button>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <button onClick={allButtonHandler}>All
                </button>
                <button onClick={activeButtonHandler}>Active
                </button>
                <button onClick={completedButtonHandler}>Completed
                </button>
            </div>
        </div>
    )
}