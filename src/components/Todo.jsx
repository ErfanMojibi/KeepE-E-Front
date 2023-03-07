import {MdDeleteForever, MdEdit} from 'react-icons/md';
import {useState} from "react";
import EditTodo from "./EditTodo";

const countTasks = (todo) => {
    // On empty list just return zero for both of them
    if (!todo) return {completedTasks: 0, remainingTasks: 0};
    // Otherwise count items which match completed tasks
    const completedTasks = todo.filter(item => item.done).length;
    return {completedTasks: completedTasks, remainingTasks: todo.length - completedTasks};
};

const TodoItem = ({id, title, tasks, createdAt, handleDeleteTodo, handleEditTodo}) => {
    const parsedCreatedAt = new Date(createdAt);
    const {completedTasks, remainingTasks} = countTasks(tasks);
    const totalTasks = completedTasks + remainingTasks;

    // Make stuff ready for edit dialog
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const handleSave = (id, title, tasks) => {
        setEditDialogOpen(false);
        handleEditTodo(id, title, tasks);
    }

    // Main component
    return (<>
        <div className="note m-1">
            <div className="font-bold">{title}</div>
            <div>Completed tasks: {completedTasks}/{totalTasks}</div>
            <div>Remaining tasks: {remainingTasks}/{totalTasks}</div>
            <div>
                <small className="float-left">{parsedCreatedAt.toLocaleString("en-GB")}</small>
                <MdDeleteForever
                    onClick={() => handleDeleteTodo(id)}
                    className="cursor-pointer float-right"
                    size='1.3em'/>
                <MdEdit
                    onClick={() => setEditDialogOpen(true)}
                    className="cursor-pointer float-right"
                    size='1.3em'/>
            </div>
        </div>
        <EditTodo
            id={id}
            title={title}
            tasks={tasks}
            isOpen={editDialogOpen}
            onCancel={() => setEditDialogOpen(false)}
            onSave={handleSave}/>
    </>);
};

export default TodoItem;