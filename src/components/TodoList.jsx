import {useEffect, useState} from "react";
import axios from "../api/axios";
import TodoItem from "./Todo";

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
        const deleteTodo = async () => {
            await axios.delete(`/todos/todo?id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            setTodos(todos.filter(todo => todo.id !== id));
        }
        deleteTodo().catch(console.error);
    };

    /**
     * Must be called when we want to edit a task
     * @param id {number} The id of the todolist to edit
     * @param title {string} The title
     * @param tasks {Array} List of tasks
     */
    const onTodoEdit = (id, title, tasks) => {
        const editTodo = async () => {
            // TODO: send the request to server

            // Edit locally
            setTodos(todos.map(todo => {
                // Ignore not matching todos
                if (todo.id !== id)
                    return todo;
                // Otherwise mutate it
                todo.title = title;
                todo.tasks = tasks;
                return todo;
            }));
        };
        editTodo().catch(console.error);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto max-w-screen-xl px-4 lg:px-8 lg:py-4">
            { // Existing notes
                todos == null ? // not yet loaded
                    <p>Loading...</p> :
                    todos.map((todo) => {
                        return <TodoItem
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            tasks={todo.tasks ?? []}
                            createdAt={todo.created_at}
                            handleDeleteTodo={onTodoDelete}
                            handleEditTodo={onTodoEdit}
                        />
                    })
            }
            {
                // If notes are loaded display new TodoItem
                //todos && <NewTodo/>
            }
        </div>)
}