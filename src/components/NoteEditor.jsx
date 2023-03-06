import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import { TextField } from "@mui/material";

export default function NoteEditor({
  isOpen,
  id,
  title,
  text,
  onSave,
  onCancel,
}) {
  // Initialize states for editing
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentText, setCurrentText] = useState(text);
  // Initialize handlers
  const handleSave = () => {
    onSave(id, currentTitle, currentText);
  };

  const handleCancel = () => {
    onCancel();
    setCurrentTitle(title);
    setCurrentText(text);
  };

  return (
    <Dialog
      PaperProps={{ sx: { width: "100%" } }}
      onClose={onCancel}
      open={isOpen}
    >
      <DialogTitle>{title}</DialogTitle>
      <TextField
        defaultValue={text}
        fullWidth
        onChange={(event) => setCurrentText(event.target.value)}
      />
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
