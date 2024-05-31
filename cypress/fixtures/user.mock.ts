import {faker as m} from "@faker-js/faker/locale/en";
import {User, UserRoleEnum} from "@jcloudify-api/typescript-client";
import {nanoid} from "nanoid";

export const user1: User = {
  id: "user1",
  username: m.internet.userName(),
  email: m.internet.email(),
  role: UserRoleEnum.USER,
  plan: undefined,
  github_id: nanoid(),
  first_name: m.person.firstName(),
  last_name: m.person.lastName(),
  token: nanoid(),
};
