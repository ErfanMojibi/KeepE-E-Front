import './App.css';


import AllRoutes from "./Routes/AllRoutes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    console.log("hello marg");
    return (
        <div>
            <div>
                <AllRoutes/>
                <ToastContainer/>
            </div>
        </div>
    );
}

export default App;