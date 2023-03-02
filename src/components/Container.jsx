export default function Container({children}) {
    return (<div className="container m-auto flex-rows m-auto">
        {children}
    </div>)
}