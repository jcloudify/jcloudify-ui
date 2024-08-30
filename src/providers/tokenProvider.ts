import {Token} from "@jcloudify-api/typescript-client";
import {securityApi, unwrap} from "@/services/poja-api";
import {PojaDataProvider, ToRecord} from "./types";

export const tokenProvider: PojaDataProvider<ToRecord<Token>> = {
  getList() {
    throw new Error("Function not implemented.");
  },
  async getOne(code): Promise<any> {
    return unwrap(() => securityApi().exchangeCode(code as string));
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
  deleteMany() {
    throw new Error("Function not implemented.");
  },
};
