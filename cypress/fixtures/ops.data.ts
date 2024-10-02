import {POJA_CONF_V3_6_2_DEFAULT_VALUES} from "../../src/operations/environments/poja-conf-form/v3_6_2/constant";
import {Token, User} from "@jcloudify-api/typescript-client";

export const it_yumeT023: User = {
  first_name: "Saiko",
  github_id: "96466759",
  id: "2bbbb136-be9a-4f01-b920-9b4fb3428f75",
  last_name: "Yume",
  plan_name: undefined,
  role: "USER",
  stripe_id: "cus_Qv2bxfgNKaq3UL",
  username: "YumeT023",
  email: "hei.hajatiana@gmail.com",
};

export const it_installation = {
  name: "jcloudify-ops-ci",
  id: "EqrA6SnWE-bwt1JZ77_nS",
};

export const it_pat: Token = {
  access_token: Cypress.env("JCLOUDIFY_TEST_USER_TOKEN"),
  refresh_token: "refresh_token",
  token_type: "bearer",
};

export const TARGET_APP_ID = Cypress.env("JCLOUDIFY_TEST_TARGET_APP_ID");

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
