import Note from "./Note";

export default function NoteList({notes}) {
    return (<div className="grid grid-flow-col auto-cols-max mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
        {
            notes.map((note) => <Note
                key={note.id}
                id={note.id}
                title={note.title}
                text={note.text}
                date={note.date}
            />)
        }
    </div>)
}