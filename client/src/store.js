import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import noteReducer from './features/notes/notesSlice'

//configure store is for provide configurations and defaults
//* connects slice reducers , middleware and thunk

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer,
  },
})
