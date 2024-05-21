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

export interface LoginParams {
  code: string;
}

export interface PojaAuthProvider extends AuthProvider {
  login: (params: LoginParams) => ReturnType<AuthProvider["login"]>;
  getCachedAuthConf: () => object /* openapi::Configuration */;
  getCachedWhoami: () => object | null /* api::User::Whoami */;
}
