import Header from "../components/Header"
import LoginForm from "../components/LoginForm"
export default function LoginPage(){
    return(
        <>
            <Header
                heading="LoginForm to your account"
                paragraph="Don't have an account yet? "
                linkName="SignupForm"
                linkUrl="/signup"
            />
            <LoginForm />

        </>
    )
}