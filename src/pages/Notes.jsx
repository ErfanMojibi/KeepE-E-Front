import MyNavbar from "../components/MyNavbar";
import Container from "../components/Container";
import NoteList from "../components/NoteList";

const notes = [{
    id:"1",
    title:"my_note",
    text:"my_text",
    date: "11111",

}]
export default function MainPage() {
    return (<Container>
        <MyNavbar/>
        <NoteList notes={notes}/>
    </Container>)
}