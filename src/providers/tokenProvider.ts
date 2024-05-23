import {securityApi, Token} from "@/services/poja-api";
import {PojaDataProvider} from "./types";

export const tokenProvider: PojaDataProvider<Required<Token>> = {
  getList() {
    throw new Error("Function not implemented.");
  },
  getOne(code): Promise<any> {
    return securityApi().exchangeCode(code as string);
  },
  save(): Promise<any> {
    throw new Error("Function not implemented.");
  },
  saveAll(): Promise<any[]> {
    throw new Error("Function not implemented.");
  },
  delete(): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
