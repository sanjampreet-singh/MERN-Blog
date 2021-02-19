import { formatWithValidation } from 'next/dist/next-server/lib/utils'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import { getCookie, isAuth } from '../../actions/auth'
import { list, removeBlog } from '../../actions/blog'
import moment from 'moment'

const BlogRead = () => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState('')
    const token = getCookie('token')

    useEffect(() => {
        loadBlogs()
    }, [])
    const loadBlogs = () => {
        list().then(data => {
            if (data.error) console.log(data.error)
            else setBlogs(data)
        })
    }

    const showUpdateButton = blog =>{
        if(isAuth() && isAuth().role === 0)
        return (
            <Link href={`/user/crud/blog/${blog.slug}`}>
                <a className="btn btn-sm ml-3 btn-warning">Update</a>
            </Link>
        )
        else if(isAuth() && isAuth().role===1){
            return(
                <Link href={`/admin/crud/${blog.slug}`}>
                    <a className="btn ml-3 btn-sm btn-warning">
                        Update
                    </a>
                </Link>
            )
        }
    }

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div key={i} className='pb-5'>
                    <h3>{blog.title}</h3>
                    <p className="mark">Written By {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}</p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(blog.slug)}>Delete</button>
                    {showUpdateButton(blog)}
                </div>
            )
        })
    }
    const deleteBlog = slug => {
        removeBlog(slug, token).then(data => {
            if (data.error) console.log(data.error)
            else {
                setMessage(data.message)
                loadBlogs()
            }
        })
    }

    let deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you wanna delete Blog')
        if (answer) {
            deleteBlog(slug)
        }
    }
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    {message && <div className="alert alert-swarning">{message}</div>}
                    {showAllBlogs()}
                </div>
            </div>
        </>
    )
}

export default BlogRead