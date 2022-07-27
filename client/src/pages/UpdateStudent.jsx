import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { updateStudent, reset } from '../features/auth/authSlice'
import Spinner from '../Components/Spinner'

function UpdateStudent() {
  const [formData, setFormData] = useState({
    firtName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    mobile:'',
  })

  const {firstName, lastName, email, dateOfBirth, mobile} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/update')
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

      const userData = {
        firstName,
        lastName,
        email,
        dateOfBirth,
        mobile
      }

      dispatch(updateStudent(userData))
    
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    
      <section className='heading'>
        <h4>
          <FaUser /> Update
        </h4>
        <h5>You can update your personal details here</h5>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
        
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='firstName'
              name='firstName'
              value={firstName}
              placeholder='Enter new first name'
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
              placeholder='Enter new last name'
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
              placeholder='Enter new email'
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
              placeholder='Enter new date of birth'
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
              placeholder='Enter new mobile number'
              onChange={onChange}
            />
          </div>
          
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Update
            </button>
          </div>
        </form>
      </section>
    </>
  )
  }

export default UpdateStudent
