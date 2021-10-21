import React, { useState } from "react";

function TodoList() {

    const initialState = [
        {
            task: 'Learn vue.js',
            isCompleted: false
        },
        {
            task: 'Learn React Hook',
            isCompleted: false
        },
        {
            task: 'Learn Gatsby.js',
            isCompleted: false
        },
    ]

    const [todos, setTodo] = useState(initialState);
    const [task, setTask] = useState('')

    const handleNewTask = (event) => {
        setTask(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()//ページのリロードを妨げる
        if(task === '') return
        setTodo(todos => [...todos,{ task, isCompleted:false}])
        setTask('')
    }

    const handleRemoveTask = (index) => {
        const newTodos = [...todos]
        newTodos.splice(index, 1)//index番目を1つ削除
        //filterを使った削除
        //const newTodos = [...todos].filter((todo, todoIndex) => todoIndex !== index);
        setTodo(newTodos)
    }

    const handleUpdateTask = (index) => {
        let newTodos = todos.map((todo, todoIndex) => {
            if(todoIndex === index){
                todo.isCompleted = !todo.isCompleted
            }
            return todo;
        })
        setTodo(newTodos);
    }
    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={ handleSubmit }>
            Add Task: <input value={ task } placeholder="Add New Task" onChange={handleNewTask} />    
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index} style={todo.isCompleted === true ? {textDecorationLine: 'line-through'}:{}}>{todo.task} <span onClick={ () => handleRemoveTask(index)}>X</span>
                    <sapn onClick={() => handleUpdateTask(index)}>更新</sapn></li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;