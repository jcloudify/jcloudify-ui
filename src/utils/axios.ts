import {isAxiosError} from "axios";

export const getErrorMessage = <T extends {}>(
  error: T,
  fallback = "An error has occured"
) => {
  let message;

  if (isAxiosError(error)) {
    message = error?.response?.data?.message;
  }

  if (!message && "message" in error) {
    message = error.message;
  }

  return message || fallback;
};

export const extractApiError = (error: any) => {
  if (isAxiosError(error)) {
    const {response} = error;
    return {
      ...response?.data,
      status: response?.status,
    };
  }
  return error;
};
