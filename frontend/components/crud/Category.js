import { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { isAuth, getCookie } from '../../actions/auth'
import { create, getCategories, removeCategory } from '../../actions/category'



const Category = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload:false
    })

    const { name, error, success, categories, removed, reload } = values
    const token = getCookie('token')

    useEffect(() => {
        loadCategories()
    }, [reload])

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) console.log(data.error)
            else setValues({ ...values, categories: data })
        })
    }

    const showCategories = () =>{
        return categories.map((c, i)=>{
        return <button title="Double Click to Delete" onDoubleClick={()=> deleteConfirm(c.slug)} className="btn btn-outline-primary mx-1 mt-3" key={i}>{c.name}</button>
        })
    }
    
    const deleteConfirm = slug=>{
        let answer = window.confirm('Are you sure you wanna delete this category')
        if(answer) deleteCategory(slug)
    }

    const deleteCategory = slug=>{
        //console.log('delete',slug)
        removeCategory(slug,token).then(data=>{
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
            return <p className="text-success">Category Created</p>
        }
    }

    const showError = () =>{
        if(error){
            return <p className="text-danger">Category Already Exists</p>
        }
    }

    const showRemoved = () =>{
        if(removed){
            return <p className="text-danger">Category Removed</p>
        }
    }

    const newCategoryForm = () => (
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
        {newCategoryForm()}
            {showCategories()}
        </div>
    </Fragment>
}

export default Category