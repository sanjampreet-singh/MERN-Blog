import { formatWithValidation } from 'next/dist/next-server/lib/utils'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
import { getCookie, isAuth } from '../../actions/auth'
import { create, getCategories } from '../../actions/category'
import { getTags } from '../../actions/tag'
import { singleBlog, updateBlog } from '../../actions/blog'
import {API} from '../../config'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import '../../node_modules/react-quill/dist/quill.snow.css'
import { QuillModules, QuillFormats } from '../../helpers/quill'


const BlogUpdate = ({ router }) => {

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])


    const [checked, setChecked] = useState([]) //categories
    const [checkedTag, setCheckedTag] = useState([]) //tags


    const [body, setBody] = useState('')
    const [values, setValues] = useState({
        error: '',
        success: '',
        formData: '',
        title: '',
        body: ''
    })

    const { error, success, formData, title } = values
    const token = getCookie('token')

    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
        initBlog()
        initCategories()
        initTags()
    }, [router])

    
    const initBlog = () => {
        if (router.query.slug) {
            singleBlog(router.query.slug).then(data => {
                if (data.error) console.log(data.error)
                else {
                    setValues({ ...values, title: data.title })
                    setBody(data.body)
                    setCategoriesArray(data.categories)
                    setTagsArray(data.tags)
                }
            })
        }
    }

    const setCategoriesArray = blogCategories =>{
        let ca = []
        blogCategories.map((c,i)=>{
            ca.push(c._id)
        })
        setChecked(ca)
    }

    const setTagsArray = blogTags =>{
        let ta = []
        blogTags.map((t,i)=>{
            ta.push(t._id)
        })
        setCheckedTag(ta)
    }

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

    
    const findOutTag = t=>{
        const result = checkedTag.indexOf(t)
        if(result !== -1){
            return true
        }
        else{
            return false
        }
    }

    const showTags = () => {
        return (
            tags && tags.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggleTag(t._id)} checked={findOutTag(t._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        )
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

    const findOutCategory = c=>{
        const result = checked.indexOf(c)
        if(result !== -1){
            return true
        }
        else{
            return false
        }
    }

    const showCategories = () => {
        return (
            categories && categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} checked={findOutCategory(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        )
    }

    const handleBody = e => {
        setBody(e)
        formData.set('body', e)
    }

    const editBlog = (e) => {
        e.preventDefault()
        updateBlog(formData, token, router.query.slug).then(data =>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values, success:`Blog title "${data.title}" is successfully updated`})
                if(isAuth() && isAuth().role===1){
                    Router.replace(`/admin`)
                }
                else if(isAuth() && isAuth().role===0){
                    //Router.replace(`/user/crud/${router.query.slug}`)
                    Router.replace(`/user`)
                }
            }
        })
    }

    const handleChange = name => e => {
        //console.log(e.target.value)
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value, formData, error: '' })
    }

    const updateBlogForm = () => {
        return (
            <form onSubmit={editBlog}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" value={title} className='form-control' onChange={handleChange('title')} />
                </div>
                <div className="form-group">
                    <ReactQuill modules={QuillModules} formats={QuillFormats} value={body} placeholder='Write Something Amazing...' onChange={handleBody} />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        )
    }


    const showError = ()=> (
         <div className="alert alert-danger" style={{display:error?'':'none'}}>
            {error}
        </div>
    )

    const showSuccess = ()=>{
        return <div className="alert alert-success" style={{display:success?'':'none'}}>
            {success}
        </div>
    }

    return (
        <div className='row'>
            <div className="col-md-8">
                {updateBlogForm()}
                <div className="mt-3">
                {showSuccess()}
                {showError()}
                </div>
                {
                    body && <img src={`${API}/blog/photo/${router.query.slug}`} alt={title} style={{height:200, maxWidth:'100%'}} className='my-3'/>
                }
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

export default withRouter(BlogUpdate)