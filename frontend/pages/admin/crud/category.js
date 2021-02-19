import Layout from "../../../components/Layout"
import Admin from '../../../components/auth/Admin'
import Category from '../../../components/crud/Category'

const CategoryPage = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <h2 className='col-md-12 py-5'>Manage Categories</h2>
                        <div className="col-md-5">
                            <Category />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}
export default CategoryPage