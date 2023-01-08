import { AxiosError } from "axios";

export const submitAxiosError = (err: any): string => {
  if (err instanceof AxiosError) {
    const message: string = err?.response?.data?.message;
    return message;
  } else {
    return err;
  }
};
