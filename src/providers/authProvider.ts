import {Configuration} from "@jcloudify-api/typescript-client";
import {authTokenCache, clearCaches, whoamiCache} from "@/providers/cache";
import {tokenProvider} from "@/providers";
import {PojaAuthProvider} from "@/providers/types";
import {securityApi, unwrap} from "@/services/poja-api";

export const whoami = async () => {};

export const authProvider: PojaAuthProvider = {
  login: () => Promise.resolve(),
  whoami: async () => {
    const whoami = await unwrap(() => securityApi().whoami());
    return whoamiCache.replace(whoami);
  },
  exchangeAuthCode: async (code) => {
    const token = await tokenProvider.getOne(code);
    // TODO: spec 'Token' typings is wrong
    return authTokenCache.replace(token);
  },
  logout: async () => {
    // sign out
    clearCaches();
  },
  checkAuth: () => {
    if (whoamiCache.isPresent()) return Promise.resolve();
    return Promise.reject();
  },
  checkError: () => Promise.resolve(),
  getIdentity: () => Promise.resolve({id: "dummy"}),
  getPermissions: () => Promise.resolve([]),
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
