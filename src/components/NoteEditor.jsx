import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    TextField,
} from "@mui/material";
import {useState} from "react";
import "../index.css";

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
            PaperProps={{sx: {width: "100%"}}}
            onClose={onCancel}
            open={isOpen}
        >
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    defaultValue={title}
                    type="text"
                    fullWidth
                    variant="standard"
                    placeholder="Note title"
                    onChange={(event) => setCurrentTitle(event.target.value)}
                    className="note-title"
                    autoComplete="none"
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    defaultValue={text}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setCurrentText(event.target.value)}
                    multiline
                    minRows={2}
                    placeholder="Note body"
                    maxRows={Infinity}
                    autoComplete="none"
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
