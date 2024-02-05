import React, {ChangeEvent, KeyboardEventHandler, useState} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistType = {
    title: string
    task: TaskType[]
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistID: string) => void
    id: string
    filter: FilterValuesType
    removeTodolist: (id: string) => void

}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


export const Todolist = (props: TodolistType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    let allButtonHandler = () => {
        props.changeFilter("all", props.id)
    }
    let activeButtonHandler = () => {
        props.changeFilter("active", props.id)
    }
    let completedButtonHandler = () => {
        props.changeFilter("completed", props.id)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={() => {
                props.removeTodolist(props.id)
            }}>X
            </button>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {props.task.map(el => {
                        let onChangeBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(el.id, newIsDoneValue, props.id)
                        }
                        let removeTaskHandler = () => {
                            props.removeTask(el.id, props.id)
                        }
                        return (
                            <li key={el.id} className={el.isDone ? "is-done" : ""}>
                                <input type="checkbox" checked={el.isDone} onChange={onChangeBoxHandler}/>
                                <EditableSpan title={el.title}/>
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