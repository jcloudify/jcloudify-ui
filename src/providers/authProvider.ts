import {Configuration} from "@jcloudify-api/typescript-client";
import {authTokenCache, clearCaches, whoamiCache} from "@/providers/cache";
import {tokenProvider} from "@/providers";
import {PojaAuthProvider} from "./types";

export const authProvider: PojaAuthProvider = {
  login: () => {
    return Promise.resolve();
  },
  exchangeAuthToken: async (code) => {
    const token = await tokenProvider.getOne(code);
    // TODO: spec 'Token' typings is wrong
    authTokenCache.replace(token.data);
    return token;
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
    const token = authTokenCache.get();
    return new Configuration({
      baseOptions: {
        headers: {
          Authorization: `Bearer ${token?.access_token ?? ""}`,
        },
      },
    });
  },
};
