import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useRef, useState} from "react";
import {Avatar, Input, List, ListItem, ListItemText} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';

const afterDeadlineTextStyle = {
    color: "red"
}

const extractDeadlineText = (deadline) => {
    if (!deadline)
        return deadline;
    return "Due to " + new Date(deadline).toLocaleString("en-GB");
}

const deadlineReached = (deadline) => {
    if (!deadline)
        return false;
    return Date.parse(deadline) < Date.now();
}

export default function EditTodo({isOpen, id, title, tasks, onSave, onCancel}) {
    // Initialize states for editing
    const newTodoRef = useRef(null);
    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentTasks, setCurrentTasks] = useState(tasks);
    // Initialize handlers
    const handleSave = () => {
        // TODO: fill this
    };
    const toggleDoneStatus = (index) => {
        setCurrentTasks(currentTasks.map((task, i) => {
            if (i !== index)
                return task;
            task.done = !task.done;
            return task;
        }));
    }
    const addTodoItem = (todoText) => {
        if (todoText === "") // no empty todoitem!
            return;
        setCurrentTasks([...currentTasks, {text: todoText, done: false}]);
        newTodoRef.current.value = "";
    };

    return (
        <Dialog PaperProps={{sx: {width: "100%"}}} onClose={() => onCancel()} open={isOpen}>
            <DialogTitle>{title}</DialogTitle>
            <List>
                {currentTasks.map((task, index) =>
                    <ListItem key={index}>
                        <Avatar
                            style={Object.assign({cursor: "pointer"}, task.done ? {backgroundColor: "#81C784"} : {})}
                            onClick={() => toggleDoneStatus(index)}>
                            {task.done && <DoneIcon/>}
                        </Avatar>
                        <ListItemText
                            sx={{paddingX: "10px"}}
                            primary={task.text}
                            secondary={extractDeadlineText(task.deadline)}
                            secondaryTypographyProps={(deadlineReached(task.deadline) && !task.done) ? {style: afterDeadlineTextStyle} : undefined}/>
                    </ListItem>
                )}
                {
                    <ListItem>
                        <Avatar
                            style={{cursor: "pointer", backgroundColor: "#81C784"}}
                            onClick={() => {
                                addTodoItem(newTodoRef.current.value);
                            }}>
                            <AddIcon/>
                        </Avatar>
                        <Input
                            style={{width: "100%", marginLeft: "10px"}}
                            placeholder="New todo"
                            inputRef={newTodoRef}/>
                    </ListItem>
                }
            </List>
            <DialogActions>
                <Button onClick={() => onCancel()}>Cancel</Button>
                <Button onClick={handleSave} autoFocus>Save</Button>
            </DialogActions>
        </Dialog>
    )
}