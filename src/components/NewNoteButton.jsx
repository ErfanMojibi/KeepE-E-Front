import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useRef, useState } from "react";

const AddNoteDialog = ({ isOpen, cancelCallback, addCallback }) => {
  const titleTextbox = useRef();
  const textTextbox = useRef();
  const handleClose = () => {
    titleTextbox.current.value = "";
    textTextbox.current.value = "";
    cancelCallback();
  };
  const handleAdd = () => {
    if (titleTextbox.current.value === "") return;
    addCallback(titleTextbox.current.value, textTextbox.current.value);
    titleTextbox.current.value = "";
    textTextbox.current.value = "";
  };

  return (
    <Dialog
      PaperProps={{ sx: { width: "100%" } }}
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle>Add new note</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="New note title"
          type="text"
          fullWidth
          variant="standard"
          inputRef={titleTextbox}
        />
        <TextField
          autoFocus
          margin="dense"
          label="New note text"
          type="text"
          fullWidth
          variant="standard"
          inputRef={textTextbox}
          multiline
          minRows={2}
          maxRows={Infinity}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default function NewNoteButton({ handleCreateNote }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const addHandler = (title, text) => {
    setIsDialogOpen(false);
    handleCreateNote(title, text);
  };

  return (
    <>
      <div className="fixed bottom-24 w-10/12 max-w-5xl flex flex-row-reverse">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setIsDialogOpen(true)}
        >
          <AddIcon />
        </Fab>
      </div>
      <AddNoteDialog
        isOpen={isDialogOpen}
        cancelCallback={() => setIsDialogOpen(false)}
        addCallback={addHandler}
      />
    </>
  );
}
