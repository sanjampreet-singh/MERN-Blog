import Layout from "../components/Layout"
import SigninComponent from "../components/auth/SigninComponent"

const Signin = () =>  {
    return(
        <Layout>
            <h2 className="text-center text-muted py-5">Sign In</h2>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <SigninComponent/>
                </div>
            </div>
        </Layout>
    )
}
export default Signin