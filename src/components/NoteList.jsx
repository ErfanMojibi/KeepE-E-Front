import Note from "./Note";
import {useEffect, useState} from "react";
import axios from "../api/axios";
import NewNoteButton from "./NewNoteButton";
import {CircularProgress} from "@mui/material";

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

    /**
     * Must be called when we want to edit a note text or title
     * @param id {number} The id of the note item to edit
     * @param title {string} The title
     * @param text {string} The text of the note
     */
    const onNoteEdit = (id, title, text) => {
        const editNote = async () => {
            // Send the request to server
            await axios.patch(
                "notes/note",
                JSON.stringify({
                    id,
                    title,
                    text,
                }),
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            // Edit locally
            setNotes(
                notes.map((note) => {
                    // Ignore not matching notes
                    if (note.id !== id) return note;
                    // Otherwise mutate it
                    note.title = title;
                    note.text = text;
                    return note;
                })
            );
        };
        editNote().catch(console.error);
    };

    /**
     * Must be called when we create a note
     * @param title {string} The title
     * @param text {string} The text of the note
     */
    const onNoteCreate = (title, text) => {
        const addNote = async () => {
            // Send the request to server
            const addResult = (
                await axios.post(
                    "notes/note",
                    JSON.stringify({
                        title,
                        text,
                    }),
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                    }
                )
            ).data;
            setNotes([...notes, addResult]);
        };
        addNote().catch(console.error);
    };

    return (
        <>
            {
                notes ? (
                    <div
                        className="grid grid-cols-1 pb-24 md:grid-cols-2 lg:grid-cols-4 mx-auto max-w-screen-xl px-4 lg:px-8 lg:py-4">
                        {
                            notes.map((note) => <Note
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                text={note.text}
                                createdAt={note.created_at}
                                handleDeleteNote={onNoteDelete}
                                handleEditNote={onNoteEdit}
                            />)
                        }
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                        <CircularProgress/>
                        <p>Loading...</p>
                    </div>
                )
            }
            {
                notes && <NewNoteButton handleCreateNote={onNoteCreate}/>
            }
        </>
    )
}
