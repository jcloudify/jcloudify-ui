import {HttpError} from "react-admin";
import {isAxiosError} from "axios";
import {stripSuffix} from "@/utils/str";

export const make_error_map_from_400_bad_request = (errorMessage: string) => {
  const messages = errorMessage
    .split(/\.\s/)
    .filter((m) => !!m)
    .map((m) => stripSuffix(m, ".") + ".")
    .map((m) => {
      const splitted = m.split(" ");
      const source = splitted[0];
      return [source, splitted.slice(1).join(" ")];
    });
  return Object.fromEntries(messages);
};

export const ra_handle_400_bad_request = (error: any): never => {
  if (isAxiosError(error)) {
    if (error.response?.status === 400) {
      throw new HttpError(error.response?.data.message, 400);
    }
  }
  throw error;
};
