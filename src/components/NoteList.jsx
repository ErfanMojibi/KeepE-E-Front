import Note from "./Note";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import NewNote from "./NewNote";

export default function NoteList() {
  const [notes, setNotes] = useState(null);

  // Load notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      const gotNotes = (
        await axios.get("notes/notes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
      ).data;
      console.log("notes got:", gotNotes);
      setNotes(gotNotes);
    };
    // Get notes
    fetchNotes().catch(console.error);
  }, []);

  /**
   * Deletes a note by its id.
   * @param id {number} The id to delete its note
   */
  const onNoteDelete = (id) => {
    const deleteNote = async () => {
      await axios.delete(`/notes/note?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setNotes(notes.filter((note) => note.id !== id));
    };
    deleteNote().catch(console.error);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto max-w-screen-xl px-4 lg:px-8 lg:py-4">
      {
        // Existing notes
        notes == null ? ( // not yet loaded
          <p>Loading...</p>
        ) : (
          notes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              text={note.text}
              createdAt={note.created_at}
              handleDeleteNote={onNoteDelete}
            />
          ))
        )
      }
      {
        // If notes are loaded display new note
        notes && <NewNote />
      }
    </div>
  );
}
