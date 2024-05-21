import {Configuration} from "@jcloudify-api/typescript-client";
import {authTokenCache, clearCaches, whoamiCache} from "@/providers/cache";
import {PojaAuthProvider} from "./types";

export const authProvider: PojaAuthProvider = {
  login: (_params) => {
    /* oauth create-token stuff backend call */
    // params.code
    // authenticate
    // authTokenCache.cache()
    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  },
  logout: async () => {
    // sign out
    clearCaches();
  },
  checkAuth: () => {
    return Promise.resolve();
  },
  checkError: () => {
    return Promise.resolve();
  },
  getIdentity: whoamiCache.get()?.user,
  getPermissions: () => {
    return Promise.resolve([]);
  },
  getCachedWhoami: whoamiCache.get,
  getCachedAuthConf: () => {
    const tokens = authTokenCache.get();
    return new Configuration({
      baseOptions: {
        headers: {
          Authorization: `Bearer ${tokens?.accessToken ?? ""}`,
        },
      },
    });
  },
};
