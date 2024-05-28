import {authProcess} from "../../src/providers/cache";

/**
 * auth_process is directly set because we want to skip the real oauth process redirections and stuff
 */
describe("Auth", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  specify("Login", () => {
    cy.mockToken({
      access_token: "user1",
    });

    // cy.getByTestid("auth:register").click();
    authProcess.replace("login");
    cy.visit("/auth/callback");

    // TODO
  });

  specify("Register", () => {
    cy.mockToken({
      access_token: "user2",
    }).as("getToken");

    // cy.getByTestid("auth:register").click();
    authProcess.replace("signup");
    cy.visit("/auth/callback?code=***");

    cy.wait("@getToken");

    cy.contains("Complete your registration!");

    cy.getByName("first_name").type("example");
    cy.getByName("last_name").type("test");
    cy.getByTestid("complete-registration").click();
  });

  specify("Auth Failed", () => {
    // cy.getByTestid("auth:login").click();
    authProcess.replace("login");
    cy.visit("/auth/callback?code=***");

    cy.contains("Authentication Failed!");
    cy.contains(
      "The authentication process was not successful. The authorization code may have expired."
    );
    cy.getByTestid("return-to-login-page").click();

    cy.pathnameEq("/login");
  });
});
