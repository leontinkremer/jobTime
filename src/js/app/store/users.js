import { createAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import getTimestamp from "../utils/date.getTimestamp";
import { generetaAuthError } from "../utils/generateAuthError";
import getRandomInt from "../utils/getRandomInt";
import history from "../utils/history";
import { PATH_CLIPBOARD } from "../utils/paths";

const timestamp = Number(getTimestamp());

const initialState = localStorageService.getAccessToken()
  ? {
      notes: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      hasStartedLoggingIn: false,
      isLoggedIn: true,
      dataLoaded: false,
      isSynced: true,
      lastSync: timestamp,
    }
  : {
      notes: null,
      isLoading: false,
      error: null,
      auth: null,
      hasStartedLoggingIn: false,
      isLoggedIn: false,
      dataLoaded: false,
      isSynced: true,
      lastSync: timestamp,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.notes = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
      state.lastSync = timestamp;
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      // state.auth = action.payload;
      state.auth = action.payload;
      state.isLoggedIn = true;
      state.lastSync = timestamp;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      state.notes = action.payload;
      // state.notes.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.notes = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    localNoteUpdated: (state, action) => {
      state.notes[state.notes.findIndex((u) => u.id === action.payload.id)] =
        action.payload;
    },
    userLocalUpdateSucessfull: (state, action) => {
      state.notes[state.notes.findIndex((u) => u.id === action.payload.id)] =
        action.payload;
      state.isSynced = false;
    },
    // editing
    favoriteLocalUpdateSucessfull: (state, action) => {
      console.log("action.payload", action.payload);
      if (action.payload.favorite === true) {
        state.notes[
          state.notes.findIndex((u) => u.id === action.payload.id)
        ].favorite = false;
        state.isSynced = false;
      }
      if (action.payload.favorite === false) {
        state.notes[
          state.notes.findIndex((u) => u.id === action.payload.id)
        ].favorite = true;
        state.isSynced = false;
      }
    },
    // check userUpdateSuccessed
    userUpdateSucceeded: (state, action) => {
      state.notes[state.notes.findIndex((u) => u.id === action.payload.id)] =
        action.payload;
      state.isSynced = true;
      state.lastSync = timestamp;
    },
    authRequested: (state) => {
      state.hasStartedLoggingIn = true;
      state.error = null;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFiled,
  authRequestFailed,
  authRequestSuccess,
  userCreated,
  userLoggedOut,
  localNoteUpdated,
  userLocalUpdateSucessfull,
  favoriteLocalUpdateSucessfull,
  userUpdateSucceeded,
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed ");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const login =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      console.log("redirect", redirect);
      const data = await authService.login({ email, password });
      console.log("data", data);
      dispatch(authRequestSuccess({ userId: data.localId, notes: data.notes }));
      localStorageService.setToken(data);
      history.push(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generetaAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password });
      localStorageService.setToken(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
      // console.log("bis dahin erfolgreich1");
      dispatch(
        createUser({
          _id: data.localId,
          email,

          /*
          rate: getRandomInt(1, 5),
          completedMeetings: getRandomInt(0, 200),
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
            */
          ...rest,
        })
      );
      // console.log("bis dahin erfolgreich2");
    } catch (error) {
      dispatch(authRequestFailed(error.message));
      // console.log("bis dahin erfolgreich3");
    }
  };
export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  console.log("successfull logout 1");
  dispatch(userLoggedOut());
  console.log("successfull logout 2");
  history.push("/");
  console.log("successfull logout 3");
};

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);

      dispatch(userCreated(content));

      history.push(PATH_CLIPBOARD);
    } catch (error) {
      dispatch(createUserFailed(error.message));
    }
  };
}
export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.getCurrentUser();
    dispatch(usersReceived(content.notes));
  } catch (error) {
    dispatch(usersRequestFiled(error.message));
  }
};

export const updateNoteLocally = (payload) => async (dispatch) => {
  dispatch(localNoteUpdated(payload));
  console.log("payload", payload);
};
export const updateUserLocally = (payload) => async (dispatch) => {
  console.log("payload", payload);
  dispatch(userLocalUpdateSucessfull(payload));
  dispatch(updateUser(payload));
};

export const updateUserNoteFavoriteSettings = (payload) => async (dispatch) => {
  console.log("payload.favorite", payload.favorite);
  console.log("payload", payload);
  // dispatch(favoriteLocalUpdateSucessfull(payload));
};

export const updateUser = (payload) => async (dispatch) => {
  console.log("payload", payload);
  dispatch(userUpdateRequested(payload));
  try {
    console.log("successfull_1");
    // next line does not work
    const { content } = await userService.update(payload);
    console.log("successfull_2");
    dispatch(userUpdateSucceeded(content));
    console.log("successfull_3");
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

/*

export const updateUser = (payload) => async (dispatch) => {
  console.log("payload", payload);
  dispatch(userUpdateRequested(payload));
  try {
    console.log("successfull_1");
    // next line does not work
    const { content } = await userService.update(payload);
    console.log("successfull_2");
    dispatch(userUpdateSuccessed(content));
    console.log("successfull_3");
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

*/

export const getUsersList = () => (state) => state.users.notes;
export const getCurrentUserData = () => (state) => {
  return state.users.notes
    ? state.users.notes.find((u) => u._id === state.users.auth.userId)
    : null;
};
export const getUserById = (userId) => (state) => {
  if (state.users.notes) {
    return state.users.notes.find((u) => u._id === userId);
  }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getUsersNotes = () => (state) => state.users.notes;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthErrors = () => (state) => state.users.error;
export const getHasStartedLoggingIn = () => (state) =>
  state.users.hasStartedLoggingIn;
export const getUsers = () => (state) => state.users;
export const getIsSynced = () => (state) => state.users.isSynced;
export const getLastSync = () => (state) => state.users.lastSync;
export default usersReducer;
