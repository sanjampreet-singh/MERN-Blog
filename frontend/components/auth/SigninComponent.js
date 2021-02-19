import Router from 'next/router'
import { useState, useEffect } from 'react'
import { signin, authenticate, isAuth } from '../../actions/auth'

const SigninComponent = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true,
        loading: false,
    })

    const { email, password, error, loading, message, showForm } = values

    useEffect(()=>{
        isAuth() && Router.push('/')
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({ ...values, loading: true, error: false })
        const user = { email, password }
        signin(user)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    //save user ifo to cookie
                    //save user info to loc storg
                    //authenticate user
                    authenticate(data,()=>{
                        if(isAuth() && isAuth().role === 1){
                            Router.push('/admin')
                        }
                        else if(isAuth()){
                            Router.push('/user')
                        }
                    })
                }
            })

        //console.table({name, email, password, error, loading, message, showForm})
    }

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value })
    }




    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '')
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '')
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '')



    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="Password" />
                </div>
                <div>
                    <button className="btn btn-primary" type="submit">Sign In</button>
                </div>
            </form>
        )
    }
    return <div>
        {showError()}
        {showLoading()}
        {showMessage()}
        {showForm && signinForm()}
    </div>
}

export default SigninComponent