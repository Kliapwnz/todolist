import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

type ActionsType =
   RemoveTodolistActionType
   | AddTodolistActionType
   | ChangeTodolistTitleActionType
   | ChangeTodolistFilterActionType
export type RemoveTodolistActionType = {
   type: 'REMOVE-TODOLIST',
   id: string
}
export type AddTodolistActionType = {
   type: 'ADD-TODOLIST',
   title: string
   todolistId: string
}
export type ChangeTodolistTitleActionType = {
   type: 'CHANGE-TODOLIST-TITLE',
   id: string,
   title: string
}
export type ChangeTodolistFilterActionType = {
   type: 'CHANGE-TODOLIST-FILTER',
   id: string,
   filter: FilterValuesType
}
let initialState: Array<TodolistsType> = []

export const todolistsReducer = (state = initialState, action: ActionsType): Array<TodolistsType> => {
   switch (action.type) {
      case 'REMOVE-TODOLIST': {
         return state.filter(el => el.id !== action.id)
      }
      case 'ADD-TODOLIST' : {
         let newTodolist: TodolistsType = {id: action.todolistId, title: action.title, filter: "all"}
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
         return state
   }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
   return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
   return {type: "ADD-TODOLIST", title, todolistId: v1()}
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
   return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
   return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}