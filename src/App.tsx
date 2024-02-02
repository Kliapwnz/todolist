import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]
    return (
        <div className="App">
            <Todolist title="My First Todo" task={tasks1}/>
        </div>
    );
}

export default App;
