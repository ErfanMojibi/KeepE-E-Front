export default function handleAxiosError(err, navigate) {
    console.error(err);
    if (err.response.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        navigate('/login')
    }
}