import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type ActionsType = RemoveTaskActionType
   | AddTaskActionType
   | ChangeTaskStatus
   | changeTaskTitleActionType
   | AddTodolistActionType
   | RemoveTodolistActionType

const initialState: TasksStateType = {}
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export const tasksReducer = (state = initialState, action: ActionsType) => {
   switch (action.type) {
      case "REMOVE-TASK":
         return {
            ...state,
            [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
         }
      case "ADD-TASK":
         let task = {id: v1(), title: action.taskName, isDone: false}
         return {
            ...state,
            [action.todolistId]: [task, ...state[action.todolistId]]
         }
      case "CHANGE-TASK-STATUS":
         return {
            ...state,
            [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
               ...el,
               isDone: action.isDone
            } : el)
         }
      case "CHANGE-TASK-TITLE":
         return {
            ...state,
            [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
               ...el,
               title: action.title
            } : el)
         }
      case "ADD-TODOLIST":
         return {
            ...state,
            [action.todolistId]: []
         }
      case "REMOVE-TODOLIST":
         let copyState = state
         delete copyState[action.id]
         return copyState

      default:
         return state
   }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
   return {type: 'REMOVE-TASK', taskId, todolistId} as const
}

export const addTaskAC = (taskName: string, todolistId: string) => {
   return {type: 'ADD-TASK', taskName, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
   return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
   return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId} as const
}