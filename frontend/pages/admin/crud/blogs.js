import Layout from "../../../components/Layout"
import Admin from '../../../components/auth/Admin'
import BlogRead from '../../../components/crud/BlogRead'


const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container">
                    <div className="row">
                        <h2 className='col-md-12 py-5'>Manage Blogs</h2>
                        <div className="col-md-12">
                            <BlogRead />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}
export default Blog