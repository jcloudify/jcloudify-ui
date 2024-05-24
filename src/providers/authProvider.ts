import {Configuration} from "@jcloudify-api/typescript-client";
import {authTokenCache, clearCaches, whoamiCache} from "@/providers/cache";
import {REDIRECTION_URL} from "@/utils/constant";
import {tokenProvider} from "@/providers";
import {PojaAuthProvider} from "./types";

export const authProvider: PojaAuthProvider = {
  login: async ({code}) => {
    const token = await tokenProvider.getOne(code);
    // TODO: spec 'Token' typings is wrong
    authTokenCache.replace((token as any).data);
    return REDIRECTION_URL;
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
