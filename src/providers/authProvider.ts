import {Configuration} from "@jcloudify-api/typescript-client";
import {authTokenCache, clearCaches, whoamiCache} from "@/providers/cache";
import {PojaAuthProvider} from "@/providers/types";
import {securityApi, unwrap} from "@/services/poja-api";

/** API **/
async function refreshAuthToken() {
  const refreshToken = authTokenCache.get()?.refresh_token;
  const token = await unwrap(() =>
    securityApi().refreshToken({
      refresh_token: refreshToken,
    })
  );

  // TODO: spec 'Token' typings is wrong
  authTokenCache.replace(token);
  return Promise.resolve();
}

export const authProvider: PojaAuthProvider = {
  async login(code) {
    const token = await unwrap(() => securityApi().exchangeCode(code));
    // TODO: spec 'Token' typings is wrong
    return authTokenCache.replace(token);
  },
  async whoami() {
    const whoami = await unwrap(() => securityApi().whoami());
    return whoamiCache.replace(whoami);
  },
  async logout() {
    // sign out
    clearCaches();
  },
  async checkAuth() {
    try {
      await this.whoami();
    } catch (e) {
      await refreshAuthToken();
      await this.whoami().catch(this.checkError);
    }
  },
  checkError: async (error) => {
    console.log("check_error", error);
    if (false) {
    }
    return Promise.resolve();
  },
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
