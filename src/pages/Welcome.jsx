import MyNavbar from "../components/MyNavbar"
import {useNavigate} from "react-router-dom"
import {Typography} from "@material-tailwind/react";
import Header from "../components/Header";

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

    return (<>
            <div className="container m-auto flex-rows m-auto">
                <MyNavbar/>

                <div className="container mx-auto flex items-center justify-between text-blue-gray-900 px-4 py-2 lg:px-8 lg:py-4  max-w-screen-xl font-bold">

                    <h2>Welcome to Notes Exapnded and Enhanced Edition</h2>
                </div>
                <div className="flex justify-center">
                    <img
                        key="logo"
                        alt=""
                        className="h-100 w-100"
                        src={require('../images/icon.png')}/>
                </div>

            </div>
        </>
    )
}