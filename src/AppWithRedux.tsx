import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBarHelper} from "./AppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
   AddTodolistAC,
   ChangeTodolistFilterAC,
   ChangeTodolistTitleAC,
   RemoveTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistsType = {
   id: string,
   title: string,
   filter: FilterValuesType
}
export type TasksStateType = {
   [key: string]: Array<TaskType>
}

export function AppWithRedux() {
   console.log("app")

   let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)

   let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

   const dispatch = useDispatch()

   const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistID: string) => {
      dispatch(changeTaskStatusAC(id, isDone, todolistID))
   }, [dispatch])

   const addTask = useCallback((title: string, todolistID: string) => {
      dispatch(addTaskAC(title, todolistID))
   }, [dispatch])

   const removeTask = useCallback((taskId: string, todolistID: string) => {
      dispatch(removeTaskAC(taskId, todolistID))
   }, [dispatch])

   const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
      dispatch(ChangeTodolistFilterAC(todolistId, value))
   }, [dispatch])

   const removeTodolist = useCallback((id: string) => {
      dispatch(RemoveTodolistAC(id))
   }, [dispatch])

   const addTodolist = useCallback((title: string) => {
      dispatch(AddTodolistAC(title))
   }, [dispatch])

   const updateTask = useCallback((todolistId: string, taskId: string, title: string) => {
      dispatch(changeTaskTitleAC(taskId, title, todolistId))
   }, [dispatch])
   const updateTodolist = useCallback((todolistId: string, title: string) => {
      dispatch(ChangeTodolistTitleAC(todolistId, title))
   }, [dispatch])

   return (
      <div className="App">
         <AppBarHelper/>
         <Container fixed>
            <Grid container style={{padding: '20px'}}>
               <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
               {todolists.map(el => {
                  return <Grid item>
                     <Paper style={{padding: '10px'}}>
                        <Todolist title={el.title}
                                  removeTask={removeTask}
                                  task={tasks[el.id]}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}
                                  id={el.id}
                                  filter={el.filter}
                                  removeTodolist={removeTodolist}
                                  updateTask={updateTask}
                                  updateTodolist={updateTodolist}
                        />
                     </Paper>
                  </Grid>
               })}
            </Grid>
         </Container>
      </div>
   );
}


