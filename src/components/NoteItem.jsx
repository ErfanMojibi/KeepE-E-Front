import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useState } from "react";
import NoteEditor from "./NoteEditor";

const NoteItem = ({
  id,
  title,
  text,
  createdAt,
  handleDeleteNote,
  handleEditNote,
}) => {
  const parsedCreatedAt = new Date(createdAt);
  // Make stuff ready for edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleSave = (id, title, text) => {
    setEditDialogOpen(false);
    handleEditNote(id, title, text);
  };

  // Main component
  return (
    <>
      <div className="note m-1">
        <div className="font-bold">{title}</div>
        <div>{text}</div>
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

export default NoteItem;
