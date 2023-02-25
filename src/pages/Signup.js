import Header from "../components/Header";
import SignupForm from "../components/SignupForm";

export default function SignupPage(){
    return(
        <>
            <Header
                heading="Signup to create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/"
            />
            <SignupForm/>
        </>
    )
}