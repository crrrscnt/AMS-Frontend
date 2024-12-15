import { configureStore } from '@reduxjs/toolkit';
import objectSearchesReducer from './toolkitSlice'

export const store = configureStore({
  reducer: {
    objectsearches: objectSearchesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {objectsearches: objectSearchesState}
export type AppDispatch = typeof store.dispatch