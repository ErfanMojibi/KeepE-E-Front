import MyNavbar  from "../components/MyNavbar"
import { useNavigate } from "react-router-dom"

const pages = [
    {
        title: 'login',
        path: '/login'
    },
    {
        title: 'signup',
        path:'/signup'
    }
]
export default function WelcomePage(){
    const navigate = useNavigate()

    return (
        <MyNavbar/>
      )
}