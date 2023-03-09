import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import {useRef, useState} from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

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

    return <>
        <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 xl:bottom-24 xl:right-24 flex flex-row-reverse">
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => setIsDialogOpen(true)}
            >
                <AddIcon/>
            </Fab>
        </div>
        <AddTodoDialog
            isOpen={isDialogOpen}
            cancelCallback={() => setIsDialogOpen(false)}
            addCallback={addHandler}/>
    </>
}