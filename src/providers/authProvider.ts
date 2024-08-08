import {Configuration} from "@jcloudify-api/typescript-client";
import {authTokenCache, clearCaches, whoamiCache} from "@/providers/cache";
import {PojaAuthProvider} from "@/providers/types";
import {securityApi, unwrap} from "@/services/poja-api";

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

async function whoami() {
  const doWhoami = async () => {
    const whoami = await unwrap(() => securityApi().whoami());
    return whoamiCache.replace(whoami);
  };
  try {
    await doWhoami();
  } catch {
    await refreshAuthToken();
    return doWhoami();
  }
}

export const authProvider: PojaAuthProvider = {
  login: () => Promise.resolve(),
  whoami,
  exchangeAuthCode: async (code) => {
    const token = await unwrap(() => securityApi().exchangeCode(code));
    // TODO: spec 'Token' typings is wrong
    return authTokenCache.replace(token);
  },
  logout: async () => {
    // sign out
    clearCaches();
  },
  checkAuth: async () => {
    await whoami();
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
