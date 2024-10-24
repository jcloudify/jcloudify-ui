import {CreateUser, User} from "@jcloudify-api/typescript-client";
import {Dict, PojaDataProvider, ToRecord} from "./types";
import {unwrap, userApi} from "@/services/poja-api";
import {whoamiCache} from ".";

export interface UserProvider extends PojaDataProvider<ToRecord<User>> {
  save(user: CreateUser, meta?: Dict<any>): Promise<ToRecord<User>>;
}

export const userProvider: UserProvider = {
  getList() {
    throw new Error("Function not implemented.");
  },
  getOne() {
    throw new Error("Function not implemented.");
  },
  async save(user) {
    const users = (
      await unwrap(() =>
        userApi().createUser({
          data: [user],
        })
      )
    ).data;
    const created = users![0];
    whoamiCache.replace({
      user: created,
    });
    return created as ToRecord<User>;
  },
  saveAll() {
    throw new Error("Function not implemented.");
  },
  delete(): Promise<any> {
    throw new Error("Function not implemented.");
  },
  deleteMany(): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
