import notesReducer from "./notes";
import usersReducer from "./users";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  users: usersReducer,
  notes: notesReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
