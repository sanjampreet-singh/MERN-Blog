import Layout from "../../components/Layout"
import Private from '../../components/auth/Private'
import Link from 'next/link'

const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <h2 className='col-md-12 py-5'>User Dashboard</h2>
                        <div className="col-md-4">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link href="/user/crud/blog">
                                        <a>Create Blog</a>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link href="/user/crud/blogs">
                                        <a>Update/Delete Blog</a>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link href="/user/update">
                                        <a>Update Profile</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-8">
                            right
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    )
}
export default UserIndex