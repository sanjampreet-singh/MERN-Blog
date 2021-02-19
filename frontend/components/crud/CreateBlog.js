import { formatWithValidation } from 'next/dist/next-server/lib/utils'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
import { getCookie, isAuth } from '../../actions/auth'
import { create, getCategories } from '../../actions/category'
import { getTags } from '../../actions/tag'
import { createBlog } from '../../actions/blog'


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import '../../node_modules/react-quill/dist/quill.snow.css'
import { QuillModules, QuillFormats} from '../../helpers/quill'
const CreateBlog = ({ router }) => {
    const blogFromLS = () => {
        if (typeof window === 'undefined') {
            return false
        }
        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'))
        }
        else {
            return false
        }
    }
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])


    const [checked, setChecked] = useState([]) //categories
    const [checkedTag, setCheckedTag] = useState([]) //tags



    const [body, setBody] = useState(blogFromLS)
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: ''
    })

    const { error, sizeError, success, formData, title, hidePublishButton } = values

    const token = getCookie('token')


    useEffect(() => {
        setValues({ ...values, formData: new FormData() }),
            initCategories(),
            initTags()
    }, [router])

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }
            else {
                setCategories(data)
            }
        })
    }

    const initTags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }
            else {
                setTags(data)
            }
        })
    }
    const publishBlog = (e) => {
        e.preventDefault()
        //console.log('ready to publish blog')
        createBlog(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }
            else {
                setValues({ ...values, title: '', error: '', success: `A new blog titled ${data.title} is created` })
                setBody('')
                setCategories([])
                setTags([])
                initTags()
                initCategories()
            }
        })
    }

    const handleBody = e => {
        setBody(e)
        formData.set('body', e)
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e))
        }
    }

    const handleToggle = c => () => {
        setValues({ ...values, error: '' })
        //return index if found else -1
        const clickedCategory = checked.indexOf(c)
        const all = [...checked]
        if (clickedCategory === -1) {
            all.push(c)
        } else {
            all.splice(clickedCategory, 1)
        }
        //console.log(all)
        setChecked(all)
        formData.set('categories', all)
    }

    const showCategories = () => {
        return (
            categories && categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        )
    }
    const handleToggleTag = c => () => {
        setValues({ ...values, error: '' })
        //return index if found else -1
        const clickedTag = checkedTag.indexOf(c)
        const all = [...checkedTag]
        if (clickedTag === -1) {
            all.push(c)
        } else {
            all.splice(clickedTag, 1)
        }
        //    console.log(all)
        setCheckedTag(all)
        formData.set('tags', all)
    }
    const showTags = () => {
        return (
            tags && tags.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggleTag(t._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        )
    }
    const handleChange = name => e => {
        //console.log(e.target.value)
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value, formData, error: '' })
    }

    const showError = ()=> (
    <div className="alert alert-danger" style={{display:error?'':'none'}}>{error}</div>
    )

    const showSuccess = ()=> (
        <div className="alert alert-success" style={{display:success?'':'none'}}>{success}</div>
        )
    
    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" value={title} className='form-control' onChange={handleChange('title')} />
                </div>
                <div className="form-group">
                    <ReactQuill modules={QuillModules} formats={QuillFormats} value={body} placeholder='Write Something Amazing...' onChange={handleBody} />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Publish</button>
                </div>
            </form>
        )
    }

    return (
        <div className='row'>
            <div className="col-md-8">
                {createBlogForm()}
                {showError()}
                {showSuccess()}
            </div>
            <div className="col-md-4">
                <div className="form-group mb-2">
                    <h5>Featured Image</h5>

                    <label className="btn btn-outline-info">Upload featured Image
                    <input type="file" onChange={handleChange('photo')} type='file' accept='image/*' hidden />
                    </label>
                    <small className="text-muted"> Max Size 1mb</small>

                </div>
                
                <hr />
                <div>
                    <h5>Categories</h5>
                    <ul style={{ maxHeight: 200, overflowY: 'auto' }}>
                        {showCategories()}
                    </ul>
                </div>
                <hr />
                <div>
                    <h5>Tags</h5>
                    <ul style={{ maxHeight: 200, overflowY: 'auto' }}>
                        {showTags()}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default withRouter(CreateBlog)