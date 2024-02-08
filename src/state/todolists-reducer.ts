import {TodolistsType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST' : {
            let newTodolistId = v1()
            let newTodolist: TodolistsType = {id: newTodolistId, title: action.title, filter: "all"}
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}
