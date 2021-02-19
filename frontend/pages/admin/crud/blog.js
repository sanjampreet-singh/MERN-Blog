import Layout from "../../../components/Layout"
import Admin from '../../../components/auth/Admin'
import CreateBlog from '../../../components/crud/CreateBlog'



const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <h2 className='col-md-12 py-5'>Create new Blog</h2>
                        <div className="col-md-12">
                            <CreateBlog />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}
export default Blog