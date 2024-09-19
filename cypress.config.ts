import {createRequire} from "module";
import {defineConfig} from "cypress";

const require = createRequire(import.meta.url);

export default defineConfig({
  viewportWidth: 1366,
  viewportHeight: 768,
  projectId: "q7vvqw",
  env: {
    codeCoverage: {
      exclude: ["cypress/**/*"],
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
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
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
  },
});
