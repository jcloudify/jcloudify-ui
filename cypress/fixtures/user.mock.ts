import {faker as m} from "@faker-js/faker/locale/en";
import {User, UserRoleEnum} from "@jcloudify-api/typescript-client";
import {nanoid} from "nanoid";

export const user1: User & {token: string} = {
  id: "user1",
  username: "user1",
  email: m.internet.email(),
  role: UserRoleEnum.USER,
  github_id: nanoid(),
  first_name: m.person.firstName(),
  last_name: m.person.lastName(),
  avatar: m.image.avatarGitHub(),
  token: nanoid(),
  stripe_id: "customerId",
};
