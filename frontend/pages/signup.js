import Layout from "../components/Layout"
import SignupComponent from "../components/auth/SignupComponent"

const Signup = () => {
    return (
        <Layout>
            <h2 className="text-center text-muted py-5">Signup</h2>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <SignupComponent/>
                </div>
            </div>
        </Layout>
    )
}
export default Signup