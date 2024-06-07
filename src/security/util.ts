import {authProcess} from "@/providers";
import {gh} from "@/config/env";

export const makeRedirectURI = () => {
  const params = new URLSearchParams();
  params.set("client_id", gh.clientId!);
  params.set("redirect_uri", window.location.origin + "/auth/callback");
  return `https://github.com/login/oauth/authorize?${params.toString()}`;
};

export const getAuthProcessRedirectUri = () => {
  const process = authProcess.get();
  if (process === "signup") return "/auth/register";
  return "/";
};
