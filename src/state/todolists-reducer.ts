import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id:string,
    title:string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id:string,
    filter: FilterValuesType
}
// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistsType>, action: ActionsType): Array<TodolistsType> => {
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
        case 'CHANGE-TODOLIST-FILTER' : {
            let todo = state.find(el => el.id === action.id)
            if (todo) {
                todo.filter = action.filter
            }

            return [...state]
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}
