import {useEffect, useState} from "react";
import axios from "../api/axios";
import TodoItem from "./Todo";
import handleAxiosError from "../api/errors";
import {useNavigate} from "react-router-dom";
import NewTodo from "./NewTodo";
import {CircularProgress} from "@mui/material";

export default function TodoList() {
    const [todos, setTodos] = useState(null);
    const navigation = useNavigate();
    const handleAPIError = (err) => {
        handleAxiosError(err, navigation);
    }

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
            setTodos(gotTodos);
        }
        // Get notes
        fetchNotes().catch(handleAPIError);
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
        deleteTodo().catch(handleAPIError);
    };

    /**
     * Must be called when we want to edit a task
     * @param id {number} The id of the todolist to edit
     * @param title {string} The title
     * @param tasks {Array} List of tasks
     */
    const onTodoEdit = (id, title, tasks) => {
        const editTodo = async () => {
            // Send the request to server
            await axios.patch("todos/todo", JSON.stringify({
                    id: id, title: title, tasks: tasks,
                }),
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
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
        editTodo().catch(handleAPIError);
    };

    const addTodoList = (title) => {
        const addTodo = async () => {
            // Send the request to server
            const addResult = (await axios.post("todos/todo",
                JSON.stringify({
                    title: title,
                }),
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                })).data;
            setTodos([...todos, addResult]);
        };
        addTodo().catch(handleAPIError);
    }

    return (
        <>
            {
                todos ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto max-w-screen-xl px-4 lg:px-8 lg:py-4">
                        {
                            todos.map((todo) => <TodoItem
                                key={todo.id}
                                id={todo.id}
                                title={todo.title}
                                tasks={todo.tasks ?? []}
                                createdAt={todo.created_at}
                                handleDeleteTodo={onTodoDelete}
                                handleEditTodo={onTodoEdit}
                            />)
                        }
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                        <CircularProgress/>
                        <p>Loading...</p>
                    </div>
                )
            }
            {
                todos && <NewTodo addTodoList={addTodoList}/>
            }
        </>
    )
}