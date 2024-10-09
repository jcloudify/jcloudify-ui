import {POJA_CONF_V3_6_2_DEFAULT_VALUES} from "../../src/operations/environments/poja-conf-form/v3_6_2/constant";
import {Token, User} from "@jcloudify-api/typescript-client";

export const it_yumeT023: User = {
  id: "43273876-21ee-409b-b342-3b8d0b5b5b54",
  username: "YumeT023",
  email: "yumii.saiko@gmail.com",
  role: "USER",
  github_id: "96466759",
  avatar: "https://avatars.githubusercontent.com/u/96466759?v=4",
  first_name: "Saiko",
  last_name: "Yume",
  stripe_id: "cus_QzgUdoC3r49cga",
};

export const it_installation = {
  name: "jcloudify-ops-ci",
  id: "nWa4GHZU3SDVJ-GuDcuEK",
};

export const it_pat: Token = {
  access_token: Cypress.env("JCLOUDIFY_TEST_USER_TOKEN"),
  refresh_token: "refresh_token",
  token_type: "bearer",
};

export const TARGET_APP_ID = (
  Cypress.env("JCLOUDIFY_TEST_TARGET_APP_ID") || ""
).replaceAll("_", "");

export const it_app = {
  id: TARGET_APP_ID,
  name: `jcloudify-${TARGET_APP_ID}`,
  repo: {
    name: `jcloudify-${TARGET_APP_ID}`,
    description: "jc-ops operationalization",
    installation_id: it_installation.id,
    is_private: false,
  },
};

export const it_environment_config = {
  ...POJA_CONF_V3_6_2_DEFAULT_VALUES,
  general: {
    ...POJA_CONF_V3_6_2_DEFAULT_VALUES.general,
    package_full_name: "com.ops.jcloudify",
  },
};
