import {MdDeleteForever} from 'react-icons/md';

const trimString = (str) => {
    const trimSize = 50;
    return str.length > trimSize ? str.substring(0, trimSize - 1) + "..." : str;
}

const Note = ({id, title, text, createdAt, handleDeleteNote}) => {
    const parsedCreatedAt = new Date(createdAt);

    return (<div className="note m-1">
        <div className="font-bold">{title}</div>
        <div>{trimString(text)}</div>
        <div>
            <small className="float-left">{parsedCreatedAt.toLocaleString("en-GB")}</small>
            <MdDeleteForever
                onClick={() => handleDeleteNote(id)}
                className="cursor-pointer float-right"
                size='1.3em'/>
        </div>
    </div>);
};

export default Note;