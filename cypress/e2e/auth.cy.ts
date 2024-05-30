import {authProcess} from "../../src/providers/cache";
import {jcloudify} from "../support/util";

/**
 * auth_process is directly set because we want to skip the real oauth process redirections and stuff
 */
describe("Auth", () => {
  const AUTH_CALLBACK_ROUTE = "/auth/callback?code=anycode";

  specify("Login", () => {
    cy.mockToken({
      access_token: "user1",
    });

    // cy.getByTestid("auth:register").click();
    // authProcess.replace("login");
    // cy.visit("/auth/callback");

    // TODO
  });

  specify("Register", () => {
    cy.mockToken({
      access_token: "user2",
    }).as("exchangeCode");
    cy.intercept(jcloudify("/whoami"), {
      user: {},
    });

    // cy.getByTestid("auth:register").click();
    authProcess.replace("signup");
    cy.visit(AUTH_CALLBACK_ROUTE);

    cy.contains("Authenticating...");
    cy.contains(
      "We're verifying your identity. This should only take a few seconds."
    );

    cy.wait("@exchangeCode");

    cy.contains("Complete your registration!");

    cy.getByName("first_name").type("example");
    cy.getByName("last_name").type("test");
    cy.getByTestid("complete-registration").click();
  });

  specify("Auth Failed", () => {
    cy.intercept(jcloudify("/token?code=*"), (req) => {
      req.reply({
        statusCode: 400,
      });
    });

    // cy.getByTestid("auth:login").click();
    authProcess.replace("login");
    cy.visit(AUTH_CALLBACK_ROUTE);

    cy.contains("Authenticating...");
    cy.contains(
      "We're verifying your identity. This should only take a few seconds."
    );

    cy.contains("Authentication Failed!");
    cy.contains(
      "The authentication process was not successful. The authorization code may have expired."
    );
    cy.getByTestid("return-to-login-page").click();

    cy.pathnameEq("/login");
  });
});
