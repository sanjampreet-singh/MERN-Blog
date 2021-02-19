import { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { isAuth, getCookie } from '../../actions/auth'
import { create, getTags, removeTag } from '../../actions/tag'



const Tag = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload:false
    })

    const { name, error, success, tags, removed, reload } = values
    const token = getCookie('token')

    useEffect(() => {
        loadTags()
    }, [reload])

    const loadTags = () => {
        getTags().then(data => {
            if (data.error) console.log(data.error)
            else setValues({ ...values, tags: data })
        })
    }

    const showTags = () =>{
        return tags.map((c, i)=>{
        return <button title="Double Click to Delete" onDoubleClick={()=> deleteConfirm(c.slug)} className="btn btn-outline-primary mx-1 mt-3" key={i}>{c.name}</button>
        })
    }
    
    const deleteConfirm = slug=>{
        let answer = window.confirm('Are you sure you wanna delete this tag')
        if(answer) deleteTag(slug)
    }

    const deleteTag = slug=>{
        //console.log('delete',slug)
        removeTag(slug,token).then(data=>{
            if(data.error) console.log(data.error)
            else {
                setValues({ ...values, error: false, success: false, name: '', reload : !reload, removed: true })
            }
        })
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        create({ name }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false, removed: false })
            }
            else {
                setValues({ ...values, error: false, success: true, name: '', reload : !reload, removed: false })
            }
        })
    }

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: false })
    }

    const showSuccess = () =>{
        if(success){
            return <p className="text-success">Tag Created</p>
        }
    }

    const showError = () =>{
        if(error){
            return <p className="text-danger">Tag Already Exists</p>
        }
    }

    const showRemoved = () =>{
        if(removed){
            return <p className="text-danger">Tag Removed</p>
        }
    }

    const newTagForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className='text-muted'>Name</label>
                <input type="text" onChange={handleChange} value={name} className="form-control" required />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">Create</button>

            </div>
        </form>
    )
    return <Fragment>
        {showSuccess() }
        {showError()}
        {showRemoved()}
        
        <div onMouseMove={()=>(setValues({ ...values, error: false, success: false, removed: false }))}>
        {newTagForm()}
            {showTags()}
        </div>
    </Fragment>
}

export default Tag