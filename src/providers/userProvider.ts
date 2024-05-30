import {CreateUser, User} from "@jcloudify-api/typescript-client";
import {Dict, PojaDataProvider, ToRecord} from "./types";
import {unwrap, userApi} from "@/services/poja-api";

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
    const users = await unwrap(() => userApi().usersPost([user]));
    return users[0];
  },
  saveAll() {
    throw new Error("Function not implemented.");
  },
  delete(): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
