import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../Components/Spinner'
import  Navbar  from '../Components/adminComponent/NavBar';

function Register() {

  //page for register students

  const [formData, setFormData] = useState({
    id: '',
    firtName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    mobile:'',
    accountType: '',
    password: '',
    password2: '',
  })

  const { id, firstName, lastName, email, dateOfBirth, mobile, accountType, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords not match')
    } else {
      const userData = {
        id,
        firstName,
        lastName,
        email,
        dateOfBirth,
        mobile,
        accountType,
        password,
      }

      dispatch(register(userData))
    }
  }
  if (isSuccess) {
    navigate('/admin')
  }

  if (isLoading) {
    return <Spinner />
  }



  return (


    <div>
      
    <Navbar/>
      <section className='heading'>
        <h4>
          <FaUser /> Register
        </h4>
        <h5>You can create an student account here</h5>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
        
        <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='id'
              name='id'
              value={id}
              placeholder='Enter student ID'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='firstName'
              name='firstName'
              value={firstName}
              placeholder='Enter student first name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='lastName'
              name='lastName'
              value={lastName}
              placeholder='Enter student last name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter student email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='date'
              className='form-control'
              id='dateOfBirth'
              name='dateOfBirth'
              value={dateOfBirth}
              placeholder='Enter student date of birth'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='mobile'
              name='mobile'
              value={mobile}
              placeholder='Enter student mobile number'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='accountType'
              name='accountType'
              value={accountType}
              placeholder='Enter student account type.'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Register
