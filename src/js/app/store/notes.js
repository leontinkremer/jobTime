import { createAction, createSlice } from "@reduxjs/toolkit";
import { filterVariables } from "../config.json";

const { ALL_NOTES, ARCHIVED_NOTES, CURRENT_NOTES, FAVORED_NOTES, OLD_NOTES } =
  filterVariables;
const initialState = {
  filterBy: ALL_NOTES,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    filterChanged: (state, action) => {
      state.filterBy = action.payload;
    },
  },
});

const { reducer: notesReducer, actions } = notesSlice;
const { filterChanged } = actions;

export const changeFilter = (payload) => (dispatch) => {
  dispatch(filterChanged(payload));
};

export const getFilterBy = () => (state) => state.notes.filterBy;
export default notesReducer;
