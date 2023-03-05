import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Container from './Container';

export default function NewNoteButton() {
  return (
    <div className="fixed bottom-24 w-10/12 max-w-5xl flex flex-row-reverse">
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
}
