import {Configuration} from "@jcloudify-api/typescript-client";
import {authTokenCache, clearCaches, whoamiCache} from "@/providers/cache";
import {REDIRECTION_URL} from "@/utils/constant";
import {PojaAuthProvider} from "./types";

export const authProvider: PojaAuthProvider = {
  login: async ({code}) => {
    // TODO: replace with poja api client
    // TODO: test
    try {
      const data = await fetch("http://localhost:8080/create-token", {
        method: "POST",
        body: JSON.stringify({
          code,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      authTokenCache.cache({
        accessToken: data.access_token,
        refreshToken: "",
      });

      return REDIRECTION_URL;
    } catch {
      return false;
    }
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
