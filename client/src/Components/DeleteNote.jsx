import { useDispatch } from 'react-redux'
import { deleteNote } from '../features/notes/notesSlice'

function DeleteNote({ note }) {
  const dispatch = useDispatch()

  return (
    <div className='note'>
      <div>{new Date(note.createdAt).toLocaleString('en-US')}</div>
        <h2>{note.title}</h2>
        <h4>{note.description}</h4>
      <button onClick={() => dispatch(deleteNote(note._id))} className='close'>
        Delete
      </button>
    </div>
  )
}

export default DeleteNote