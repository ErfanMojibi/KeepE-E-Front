import Container from "../components/Container";
import MyNavbar from "../components/MyNavbar";
import TodoList from "../components/TodoList";

export default function TodosPage() {
    return (<Container>
        <MyNavbar/>
        <TodoList/>
    </Container>)
}