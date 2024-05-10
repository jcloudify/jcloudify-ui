import {PojaAuthProvider} from "./types";

export const authProvider: PojaAuthProvider = {
  login: () => {
    return Promise.resolve();
  },
  logout: () => {
    return Promise.resolve();
  },
  checkAuth: () => {
    return Promise.resolve();
  },
  checkError: () => {
    return Promise.resolve();
  },
  getIdentity: () => {
    return Promise.resolve({} as any);
  },
  getPermissions: () => {
    return Promise.resolve([]);
  },
  getCachedWhoami: () => {
    return {} as any;
  },
  getCachedAuthConf: () => {
    return {} as any;
  },
};
