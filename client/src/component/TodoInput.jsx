import { useState } from "react";

function TodoInput() {
    const [todo, setTodo] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = { des: todo }

        try {
            await fetch('http://localhost:4400/todos', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
        } catch (e) {
            console.log(e);
        }
        setTodo('')
        window.location = '/'
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={todo}
                    onChange={e => setTodo(e.target.value)}
                />
                <button 
                    type="submit"
                >
                    submit
                </button>
            </form>
        </div>
    )
}

export default TodoInput;
