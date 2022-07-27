import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NoteForm from '../Components/NoteForm'
import DeleteNote from '../Components/DeleteNote'
import Spinner from '../Components/Spinner'
import { getNotes, reset } from '../features/notes/notesSlice'

function Dashboard() {

  //*Students dashboard is a page for adding and display added notes

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { notes, isLoading, isError, message } = useSelector(
    (state) => state.notes
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getNotes())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (

    <>
      <section className='heading'>
        
        <h1>Welcome {user && user.name}</h1>
        <p>Notes Library</p>
        
      </section>

      <NoteForm />

      <section className='content'>
        {notes.length > 0 ? (
          <div className='notes'>
            {notes.map((note) => (
              <DeleteNote key={note._id} 
              note={note} />
            ))}
          </div>
        ) : (
          <h4 className="text-white">You have not any notes in your library.</h4>
        )}
      </section>
    </>
  )
}

export default Dashboard
