import React, {ChangeEvent, KeyboardEventHandler, useState} from "react";
import {FilterValuesType} from "./App";

type TodolistType = {
    title: string
    task: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}
type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


export const Todolist = (props: TodolistType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    let addTaskHandler = () => {
        if (title.trim() !== "") {
            props.addTask(title)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    let onEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
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
                            <li key={el.id} className={el.isDone ? "is-done" : ""}>
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
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={allButtonHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={activeButtonHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={completedButtonHandler}>Completed
                </button>
            </div>
        </div>
    )
}