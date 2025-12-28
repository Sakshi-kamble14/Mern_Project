import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { registerUser } from '../services/userService'
import { toast } from 'react-toastify'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const navigate = useNavigate()

    const signup = async () => {
        if (name == '')
            toast.warn('name must be entered')
        else if (email == '')
            toast.warn('email must be entered')
        else if (password == '')
            toast.warn('password must be entered')
        else if (mobile == '')
            toast.warn('mobile must be entered')
        else {
            const result = await registerUser(name, email, password, mobile)
            if (result.status == 'success') {
                navigate('/')
                toast.success('user registered successfully')
            } else
                toast.error(result.error)
        }
    }
    return (
        <div className='container w-50'>
            <div class=" mt-3 mb-3">
                <label for="inputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName" placeholder="Enter name" onChange={e => setName(e.target.value)} required />
            </div>

            <div class="mb-3">
                <label for="inputEmail" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label for="inputPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPassword" placeholder="Enter password" onChange={e => setPassword(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label for="inputMobile" className="form-label">Mobile</label>
                <input type="tel" className="form-control" id="inputMobile" placeholder="Enter Mobile number" onChange={e => setMobile(e.target.value)} required />
            </div>


            <div className="mb-3">
                <button className="btn btn-success" onClick={signup}>Signup</button>
            </div>

            <div>
                Already have an account? then to login <Link to='/' >Click Here</Link>
            </div>
        </div>
    )
}

export default Register
