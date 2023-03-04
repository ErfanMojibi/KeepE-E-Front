import {MdDeleteForever} from 'react-icons/md';

const TodoItem = ({id, title, completedTasks, remainingTasks, createdAt, handleDeleteNote}) => {
    const parsedCreatedAt = new Date(createdAt);
    const totalTasks = completedTasks + remainingTasks;

    return (<div className="note m-1">
        <div className="font-bold">{title}</div>
        <div>Completed tasks: {completedTasks}/{totalTasks}</div>
        <div>Remaining tasks: {remainingTasks}/{totalTasks}</div>
        <div>
            <small className="float-left">{parsedCreatedAt.toLocaleString("en-GB")}</small>
            <MdDeleteForever
                onClick={() => handleDeleteNote(id)}
                className="cursor-pointer float-right"
                size='1.3em'/>
        </div>
    </div>);
};

export default TodoItem;