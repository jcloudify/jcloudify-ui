import {authProcess} from "@/providers";

export const getAuthProcessRedirectUri = () => {
  const process = authProcess.get();
  if (process === "signup") return "/auth/register";
  return "/";
};
