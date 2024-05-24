import {authProcess} from "@/providers";

const {origin} = window.location;

const OAUTH_INITIALIZED_REDIRECT_SIGNUP_URI = origin + "/auth/register";

export const getAuthProcessRedirectUri = () => {
  const process = authProcess.get();
  if (process === "signup") return OAUTH_INITIALIZED_REDIRECT_SIGNUP_URI;
  return origin;
};
