import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBarHelper} from "./AppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithReducer() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'KLIApwnz', filter: 'all'},
        {id: todolistID2, title: 'I try to learn JS', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    const changeTaskStatus = (id: string, isDone: boolean, todolistID: string) => {
        dispatchToTasks(changeTaskStatusAC(id, isDone, todolistID))
    }

    const addTask = (title: string, todolistID: string) => {
        dispatchToTasks(addTaskAC(title, todolistID))
    }

    const removeTask = (taskId: string, todolistID: string) => {
        dispatchToTasks(removeTaskAC(taskId, todolistID))
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatchToTodolists(ChangeTodolistFilterAC(todolistId, value))
    }
    const removeTodolist = (id: string) => {
        let deleteTodo = RemoveTodolistAC(id)
        dispatchToTodolists(deleteTodo)
        dispatchToTasks(deleteTodo)
    }
    const addTodolist = (title: string) => {
        let newTodo = AddTodolistAC(title)
        dispatchToTodolists(newTodo)
        dispatchToTasks(newTodo)

    }
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todolistId))
    }
    const updateTodolist = (todolistId: string, title: string) => {
        dispatchToTodolists(ChangeTodolistTitleAC(todolistId, title))
    }

    return (
        <div className="App">
            <AppBarHelper/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {
                        let allTodolistsTasks = tasks[el.id]
                        let tasksForTodolist = allTodolistsTasks
                        if (el.filter === "active") {
                            tasksForTodolist = allTodolistsTasks.filter(el => el.isDone)
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = allTodolistsTasks.filter(el => !el.isDone)
                        }
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist title={el.title}
                                          removeTask={removeTask}
                                          task={tasksForTodolist}
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


