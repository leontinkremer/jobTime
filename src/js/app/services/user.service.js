import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },

  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    return data;
  },
  update: async (payload) => {
    // console.log("update: async (payload) => {");
    // console.log("userEndpoint", userEndpoint);
    // console.log("payload from update async", payload);
    // console.log("payload", payload);
    let dataToSync = {
      notes: payload.notes,
    };
    const { data } = await httpService.patch(
      userEndpoint + payload.auth.userId,
      dataToSync
    );
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndpoint + localStorageService.getUserId()
    );
    return data;
  },
};
export default userService;
