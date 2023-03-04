import './App.css';


import AllRoutes from "./Routes/AllRoutes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'

function App() {
    console.log("hello marg");
    return (
        <div>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <AllRoutes/>
                    <ToastContainer/>
                </LocalizationProvider>
            </div>
        </div>
    );
}

export default App;