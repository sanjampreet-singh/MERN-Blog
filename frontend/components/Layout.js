import Header from "./Header"

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="container-fluid">
                {children}
            </div>
            {/* <p>footer</p> */}
        </div>
    )
}

export default Layout;