import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    addSubmission: (state, action) => {
      state.list.push(action.payload);
    },
    updateSubmission: (state, action) => {
      const index = state.list.findIndex(sub => sub.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteSubmission: (state, action) => {
      state.list = state.list.filter(sub => sub.id !== action.payload);
    },
  },
});

export const { addSubmission, updateSubmission, deleteSubmission } = submissionsSlice.actions;
export default submissionsSlice.reducer;
