import { toast } from "react-toastify";

export function successToast(message) {
    toast.success(message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // style the progress bar
        progressStyle: {
            background: "#00d587",
        },
    });
}
export function errToast(message) {
    toast.error(message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // style the progress bar
        progressStyle: {
            background: "#d50000",
        },
    });
}

