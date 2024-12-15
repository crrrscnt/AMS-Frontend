import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface ObjectSearchesState {
  objectsearch: string
}

// Define the initial state using that type
const initialState: ObjectSearchesState = {
  objectsearch: '',
}

const searchSlice = createSlice({
  name: 'objectsearches',
  initialState,
  reducers: {
    setObjectSearch: (state, action: PayloadAction<string>) => {
      console.log('setObjectSearch');
      state.objectsearch = action.payload;
    },
  },
})

export const {setObjectSearch} = searchSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectObject = (state: RootState) => state.objectsearches.objectsearch

export default searchSlice.reducer