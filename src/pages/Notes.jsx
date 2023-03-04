import MyNavbar from "../components/MyNavbar";
import Container from "../components/Container";
import NoteList from "../components/NoteList";

export default function NotesPage() {
    return (<Container>
        <MyNavbar/>
        <NoteList/>
    </Container>)
}