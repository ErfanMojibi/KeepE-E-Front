import MyNavbar from "../components/MyNavbar"
import {useNavigate} from "react-router-dom"
import {Button, Typography} from "@material-tailwind/react";
import Header from "../components/Header";
import Container from "../components/Container";

const pages = [
    {
        title: 'login',
        path: '/login'
    },
    {
        title: 'signup',
        path: '/signup'
    }
]
export default function WelcomePage() {
    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem("access_token")
    const username = localStorage.getItem("username")
    return (<>
            <Container>
                <MyNavbar/>
                <div className="flex flex-col content-center m-auto px-4 py-2 lg:px-8 lg:py-4  max-w-screen-xl">
                    <div
                        className="mx-auto text-blue-gray-900  font-bold">
                        <h2>Welcome to Notes Exapnded and Enhanced Edition</h2>
                    </div>
                    <div className="mx-auto">
                        <img
                            key="logo"
                            alt=""
                            className="h-50 w-50"
                            src={require('../images/icon.png')}/>
                    </div>
                    <div className="mx-auto text-blue-900 cursor-pointer"
                            onClick={() => isLoggedIn ? navigate('/notes') : navigate('/login')}><span>My Notes</span></div>
                </div>
            </Container>
        </>
    )
}