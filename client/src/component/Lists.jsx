import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

function Lists() {
    const [todo, setTodo] = useState('')

    const getTodo = async () => {
        try {
            const response = await fetch("http://localhost:4400/todos")
            setTodo(await response.json())
        } catch (e) {
            console.log(e);
        }        
    }

    const deleteTodo = async (e) => {
        const todoId = e.target.id

        await fetch(`http://localhost:4400/todos/${todoId}`, {
            method: "delete"
        })

        window.location = '/'
    }


    useEffect(() => {
        getTodo()
    },[])

    return (
        <div>
            <ul>
                {todo ? todo.map(t => {
                    return (
                        <li key={t.id} >
                            {t.des_todo}
                            <EditTodo id={t.id} todo={todo} />
                            <button id={t.id} onClick={deleteTodo}>delete</button>
                        </li>
                    )
                }) : []}
            </ul>
        </div>
    )
}

export default Lists;
