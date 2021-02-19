import Layout from "../../../components/Layout"
import Admin from '../../../components/auth/Admin'
import Category from '../../../components/crud/Category'

import Tag from '../../../components/crud/Tag'

const CategoryTag = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <h2 className='col-md-12 py-5'>Manage Tags</h2>
                        <div className="col-md-5">
                            <Tag />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}
export default CategoryTag