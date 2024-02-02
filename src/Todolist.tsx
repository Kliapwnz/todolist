import React from "react";

type TodolistType = {
    title: string
    task: TaskType[]
    removeTask:(taskId:number)=>void
}
type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}


export const Todolist = (props: TodolistType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map(el =>{
                    return (
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={()=>{props.removeTask(el.id)}}>X</button>
                    </li>
                    )}
                )}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}