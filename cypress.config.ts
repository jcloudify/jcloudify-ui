import {defineConfig} from "cypress";

import "dotenv/config";

export default defineConfig({
  viewportWidth: 1366,
  viewportHeight: 768,
  projectId: "q7vvqw",
  env: {
    codeCoverage: {
      exclude: ["cypress/**/*"],
    },
    CYPRESS_JCLOUDIFY_TEST_USER_TOKEN:
      process.env.CYPRESS_JCLOUDIFY_TEST_USER_TOKEN,
  },
  e2e: {
    setupNodeEvents(_on, config) {
      // require("@cypress/code-coverage/task")(on, config);
      return config;
    },
    baseUrl: "http://localhost:5173/",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "src/**/*.cy.{ts,tsx,js,jsx}",
    setupNodeEvents(_on, config) {
      // require("@cypress/code-coverage/task")(on, config);
      return config;
    },
  },
});
