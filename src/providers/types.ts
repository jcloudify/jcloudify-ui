import {
  Token,
  Configuration,
  Whoami,
  PagedResponse as _PagedResponse,
} from "@jcloudify-api/typescript-client";
import {AuthProvider, RaRecord} from "react-admin";

export type Dict<V> = Record<string, V>;

export interface PojaDataProvider<R extends RaRecord<string>> {
  getList: (
    page: number,
    perPage: number,
    filter?: Dict<any>,
    meta?: Dict<any>
  ) => Promise<PagedResponse<R>>;
  getOne: (id: string, meta?: Dict<any>) => Promise<R>;
  save: (resource: R, meta?: Dict<any>) => Promise<R>;
  saveAll: (resources: R[], meta?: Dict<any>) => Promise<R[]>;
  delete: (id: string, meta?: Dict<any>) => Promise<R>;
  deleteMany: (resources: R[], meta?: Dict<any>) => Promise<R[]>;
}

export interface PojaAuthProvider extends AuthProvider {
  exchangeAuthCode: (code: string) => Promise<ToRecord<Token>>;
  getCachedAuthConf: () => Configuration;
  getCachedWhoami: () => Whoami | null;
  whoami: () => Promise<Whoami>;
}

export interface PagedResponse<T> extends _PagedResponse {
  data: T[];
}

export type ToRecord<T extends object> = T & {
  id: string;
};
