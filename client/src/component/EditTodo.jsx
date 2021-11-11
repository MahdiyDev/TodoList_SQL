import { useState } from "react";
import './EditTodo.css'

let todoId

function EditTodo({ id, todo }) {
    const [value, setValue] = useState('')

    const editTodoForm = async (e) => {
        try {
            await fetch(`http://192.168.0.104:4400/todos/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({des: value})
            })
        } catch (e) {
            console.log(e);
        }
    }
    
    const editTodo = async (e) => {
        const forms = document.getElementsByClassName('form')
        todoId = e.target.id

        for (let i = 0; i < forms.length; i++) {
            if (forms[i].id == todoId) forms[i].classList.toggle('open')
        }
    }

    return (
        <>
            <form onSubmit={editTodoForm} id={id} className="form" >
                <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
            </form>
            <button id={id} onClick={editTodo}>edit</button>
        </>
    )
}

export default EditTodo;
