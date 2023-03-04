import {MdDeleteForever} from 'react-icons/md';

const Note = ({id, title, text, createdAt, handleDeleteNote}) => {
    const parsedCreatedAt = new Date(createdAt);

    return (<div className="note m-1">
        <div className="note-title"> {title}</div>
        <div className="note-text">{text}</div>
        <div className="note-footer">
            <small className="float-left">{parsedCreatedAt.toLocaleString("en-GB")}</small>
            <MdDeleteForever
                onClick={() => handleDeleteNote(id)}
                className="delete-icon cursor-pointer float-right"
                size='1.3em'/>
        </div>
    </div>);
};

export default Note;