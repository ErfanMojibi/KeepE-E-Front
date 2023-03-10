import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useRef, useState} from "react";
import {Avatar, Box, Input, List, ListItem, ListItemText} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';

import {DatePicker} from '@mui/x-date-pickers';
import deepCopy from "../util/util";
import AlarmOff from '@mui/icons-material/AlarmOff';
import DeleteForever from '@mui/icons-material/DeleteForever';

const DatePickerInsideInput = (props) => {
    const {inputProps, InputProps, ownerState, inputRef, error, ...other} = props;

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'bottom',
            padding: '0'
        }} ref={InputProps?.ref}>
            <input type="hidden" ref={inputRef} {...inputProps} {...other} />
        </Box>
    );
};

const CustomDatePicker = ({onChange}) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <DatePicker slots={{
                textField: DatePickerInsideInput,
            }}
                        open={isOpen}
                        onAccept={(newDate) => {
                            setOpen(false);
                            onChange(newDate);
                        }}
                        onClose={() => setOpen(false)}
                        onError={() => setOpen(false)}
            />
            <IconButton edge="end" onClick={() => setOpen(true)}>
                <EventIcon/>
            </IconButton>
        </>
    )
};

const afterDeadlineTextStyle = {
    color: "red"
}

const extractDeadlineText = (deadline) => {
    if (!deadline)
        return deadline;
    return "Due to " + new Date(deadline).toLocaleDateString("en-GB");
}

const deadlineReached = (deadline) => {
    if (!deadline)
        return false;
    return Date.parse(deadline) < Date.now();
}

export default function EditTodo({isOpen, id, title, tasks, onSave, onCancel}) {
    // Initialize states for editing
    const newTodoRef = useRef(null);
    const [currentTitle, setCurrentTitle] = useState(deepCopy(title));
    const [currentTasks, setCurrentTasks] = useState(deepCopy(tasks));
    // Initialize handlers
    const handleSave = () => {
        onSave(id, deepCopy(currentTitle), deepCopy(currentTasks));
    };
    const handleCancel = () => {
        onCancel();
        setCurrentTitle(deepCopy(title));
        setCurrentTasks(deepCopy(tasks));
    }
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

    const removeTodoItem = (index) => {
        setCurrentTasks(currentTasks.filter((item, i) => i !== index));
    };

    const changeDeadline = (index, date) => {
        setCurrentTasks(currentTasks.map((task, i) => {
            if (i !== index)
                return task;
            task.deadline = date;
            return task;
        }));
    }


    return (
        <Dialog PaperProps={{sx: {width: "100%"}}} onClose={() => onCancel()} open={isOpen}>
            <DialogTitle>{title}</DialogTitle>
            <List>
                {currentTasks.map((task, index) =>
                    <div className="flex flex-row items-center mr-3"
                         key={index}>
                        <ListItem>
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

                        <IconButton onClick={() => removeTodoItem(index)}>
                            <DeleteForever/>
                        </IconButton>

                        <IconButton disabled={!task.deadline} onClick={() => changeDeadline(index, undefined)}>
                            <AlarmOff/>
                        </IconButton>

                        <CustomDatePicker onChange={(newDate) => changeDeadline(index, newDate)}/>
                    </div>
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
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave} autoFocus>Save</Button>
            </DialogActions>
        </Dialog>
    )
}