import { MdDeleteForever } from 'react-icons/md';

const Note = ({id, title, text, date, handleDeleteNote}) => {
    
    return (<div className="note">
        <div className="note-title"> {title}</div>
        <div className="note-text">{text}</div>
        <div className="note-footer">
            <small>{date}</small>
            
            <MdDeleteForever 
            onClick={() => handleDeleteNote(id)} 
            className="delete-icon"
            size='1.3em'/>
        </div>
    </div>);
};

export default Note;