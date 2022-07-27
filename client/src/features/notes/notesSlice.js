import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import notesService from './notesService'

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//* create async thunk to accept actions and a function which returns promise and action type based on that promise

// Create new note
export const createNote = createAsyncThunk(
  'notes/create',
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await notesService.createNote(noteData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get notes
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      
      return await notesService.getNotes(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete notes
export const deleteNote = createAsyncThunk(
  'notes/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await notesService.deleteNote(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//creating slice to combined reducer and action

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes.push(action.payload)
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes = action.payload
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes = state.goals.filter(
          (note) => note._id !== action.payload.id
        )
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer
