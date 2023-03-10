import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useState } from "react";
import NoteEditor from "./NoteEditor";

const trimString = (str) => {
  const trimSize = 50;
  return str.length > trimSize ? str.substring(0, trimSize - 1) + "..." : str;
};

const Note = ({
  id,
  title,
  text,
  createdAt,
  handleDeleteNote,
  handleEditNote,
}) => {
  const parsedCreatedAt = new Date(createdAt);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const handleSave = (id, title, text) => {
    setEditDialogOpen(false);
    handleEditNote(id, title, text);
  };

  return (
    <>
      <div className="note m-1">
        <div className="font-bold">{title}</div>
        <div>{trimString(text)}</div>
        <div>
          <small className="float-left">
            {parsedCreatedAt.toLocaleString("en-GB")}
          </small>
          <MdDeleteForever
            onClick={() => handleDeleteNote(id)}
            className="cursor-pointer float-right"
            size="1.3em"
          />
          <MdEdit
            onClick={() => setEditDialogOpen(true)}
            className="cursor-pointer float-right"
            size="1.3em"
          />
        </div>
      </div>
      <NoteEditor
        id={id}
        title={title}
        text={text}
        isOpen={editDialogOpen}
        onCancel={() => setEditDialogOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default Note;
