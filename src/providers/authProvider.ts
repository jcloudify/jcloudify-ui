import {PojaAuthProvider} from "./types";

export const authProvider: PojaAuthProvider = {
  login: () => {
    throw new Error("Function not implemented");
  },
  logout: () => {
    throw new Error("Function not implemented");
  },
  checkAuth: () => {
    throw new Error("Function not implemented");
  },
  checkError: () => {
    throw new Error("Function not implemented");
  },
  getIdentity: () => {
    throw new Error("Function not implemented");
  },
  getPermissions: () => {
    throw new Error("Function not implemented");
  },
  getCachedWhoami: () => {
    throw new Error("Function not implemented");
  },
  getCachedAuthConf: () => {
    throw new Error("Function not implemented");
  },
};
