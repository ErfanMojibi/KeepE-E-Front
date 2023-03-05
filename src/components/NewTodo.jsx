import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import {useRef, useState} from "react";
import {MdAdd} from "react-icons/md";

const AddTodoDialog = ({isOpen, cancelCallback, addCallback}) => {
    const titleTextbox = useRef();
    const handleClose = () => {
        titleTextbox.current.value = "";
        cancelCallback();
    }
    const handleAdd = () => {
        if (titleTextbox.current.value === "")
            return;
        addCallback(titleTextbox.current.value);
        titleTextbox.current.value = "";
    }

    return <Dialog PaperProps={{sx: {width: "100%"}}} open={isOpen} onClose={handleClose}>
        <DialogTitle>Add New Todo List</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="New todo title"
                type="text"
                fullWidth
                variant="standard"
                inputRef={titleTextbox}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
    </Dialog>
}

export default function NewTodo({addTodoList}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const addHandler = (title) => {
        setIsDialogOpen(false);
        addTodoList(title);
    }

    return <div className="note-new m-1 cursor-pointer" onClick={() => setIsDialogOpen(true)}>
        <MdAdd className="m-auto h-full" size='1.3em'/>
        <AddTodoDialog
            isOpen={isDialogOpen}
            cancelCallback={() => setIsDialogOpen(false)}
            addCallback={addHandler}/>
    </div>
}