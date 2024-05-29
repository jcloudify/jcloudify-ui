import {Token} from "@/services/poja-api";
import {Configuration} from "@jcloudify-api/typescript-client";
import {AuthProvider, Identifier, RaRecord} from "react-admin";

export type Dict<V> = Record<string, V>;

export interface PojaDataProvider<R extends RaRecord<Identifier>> {
  getList: (
    page: number,
    perPage: number,
    filter?: Dict<any>,
    meta?: Dict<any>
  ) => Promise<Array<R>>;
  getOne: (id: Identifier, meta?: Dict<any>) => Promise<R>;
  save: (resource: R, meta?: Dict<any>) => Promise<R>;
  saveAll: (resources: R[], meta?: Dict<any>) => Promise<R[]>;
  delete: (id: Identifier) => Promise<R>;
}

export interface PojaAuthProvider extends AuthProvider {
  exchangeAuthToken: (code: string) => Promise<Token>;
  getCachedAuthConf: () => Configuration;
  getCachedWhoami: () => object | null /* api::User::Whoami */;
}
