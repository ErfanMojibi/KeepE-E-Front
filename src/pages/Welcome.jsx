import MyNavbar from "../components/MyNavbar"
import {useNavigate} from "react-router-dom"
import Container from "../components/Container";

export default function WelcomePage() {
    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem("access_token")
    return (<>
            <Container>
                <MyNavbar/>
                <div className="flex flex-col content-center m-auto px-4 py-2 lg:px-8 lg:py-4  max-w-screen-xl">
                    <div
                        className="mx-auto text-blue-gray-900 font-bold text-2xl	">
                        <h1>Welcome to Notes Expanded and Enhanced Edition</h1>
                    </div>
                    <div className="mx-auto flex flex-row my-2">
                        <div className="mx-2">
                            <img
                                key="notes-logo"
                                alt=""
                                width="100"
                                src={require('../images/notes.png')}/>
                            <div className="mx-auto text-blue-900 cursor-pointer text-center"
                                 onClick={() => isLoggedIn ? navigate('/notes') : navigate('/login')}>
                                My Notes
                            </div>
                        </div>
                        <div className="mx-2">
                            <img
                                key="todo-logo"
                                alt=""
                                width="100"
                                src={require('../images/todo.png')}/>
                            <div className="mx-auto text-blue-900 cursor-pointer text-center"
                                 onClick={() => isLoggedIn ? navigate('/todos') : navigate('/login')}>
                                My Todos
                            </div>
                        </div>
                    </div>
                    {/*<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by SBTS2018 - Flaticon</a>*/}
                </div>
            </Container>
        </>
    )
}