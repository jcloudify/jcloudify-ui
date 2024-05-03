import {Identifier, RaRecord} from "react-admin";

export type Dict<V> = Record<string, V>;

export interface PojaDataProvider<R extends RaRecord<Identifier>> {
  getList: (
    page: number,
    perPage: number,
    filter?: Dict<any>,
    meta?: Dict<any>
  ) => Promise<Array<R>>;
  getOne: (id: Identifier, meta?: Dict<any>) => Promise<R>;
  save: (resources: any, meta?: Dict<any>) => Promise<R>;
  delete: (id: Identifier) => Promise<R>;
}
