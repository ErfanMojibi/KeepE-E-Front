import {useEffect, useState} from "react";
import axios from "../api/axios";
import TodoItem from "./Todo";

const countTasks = (todo) => {
    // On empty list just return zero for both of them
    if (!todo)
        return {completedTasks: 0, remainingTasks: 0};
    // Otherwise count items which match completed tasks
    const completedTasks = todo.filter(item => item.done).length;
    return {completedTasks: completedTasks, remainingTasks: todo.length - completedTasks};
};

export default function TodoList() {
    const [todos, setTodos] = useState(null);

    // Load notes from backend
    useEffect(() => {
        const fetchNotes = async () => {
            const gotTodos = (await axios.get(
                "todos/todos", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            )).data;
            console.log(gotTodos);
            setTodos(gotTodos);
        }
        // Get notes
        fetchNotes().catch(console.error);
    }, []);

    /**
     * Deletes a todolist by its id.
     * @param id {number} The id to delete its todolist
     */
    const onTodoDelete = (id) => {
        const deleteNote = async () => {
            await axios.delete(`/todos/todo?id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            setTodos(setTodos.filter(todo => todo.id !== id));
        }
        deleteNote().catch(console.error);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto max-w-screen-xl px-4 lg:px-8 lg:py-4">
            { // Existing notes
                todos == null ? // not yet loaded
                    <p>Loading...</p> :
                    todos.map((todo) => {
                        const {completedTasks, remainingTasks} = countTasks(todo.tasks);
                        return <TodoItem
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            completedTasks={completedTasks}
                            remainingTasks={remainingTasks}
                            createdAt={todo.created_at}
                            handleDeleteNote={onTodoDelete}
                        />
                    })
            }
            {
                // If notes are loaded display new TodoItem
                //notes && ...
            }
        </div>)
}