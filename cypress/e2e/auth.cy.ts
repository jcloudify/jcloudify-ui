import {user1} from "../fixtures/user.mock";
import {jcloudify} from "../support/util";

/**
 * auth_process is directly set because we want to skip the real oauth process redirections and stuff
 */
describe("Auth", () => {
  const AUTH_CALLBACK_ROUTE = "/auth/callback?code=anycode";

  specify("Login", () => {
    cy.fakeLogin(user1);

    cy.getByTestid("user_menu").click();
    cy.contains(user1.username!);
    cy.contains(user1.email!);
    cy.contains(user1.role!);
  });

  specify("Register", () => {
    cy.mockToken({
      access_token: user1.token,
    }).as("exchangeCode");

    cy.intercept("POST", jcloudify("/users"), (req) => {
      const [user] = req.body;
      expect(user).to.deep.eq({
        first_name: user1.first_name,
        last_name: user1.last_name,
        token: user1.token,
      });
      req.reply({
        statusCode: 201,
        body: req.body,
      });
    });

    // cy.getByTestid("auth:register").click();
    localStorage.setItem("auth_process", "signup");
    cy.visit(AUTH_CALLBACK_ROUTE);

    cy.contains("Authenticating...");
    cy.contains(
      "We're verifying your identity. This should only take a few seconds."
    );

    cy.wait("@exchangeCode");

    cy.contains("Complete your registration!");

    cy.getByName("first_name").type(user1.first_name!);
    cy.getByName("last_name").type(user1.last_name!);
    cy.getByTestid("complete-registration").click();

    // TODO: userMenu
    cy.contains("Applications");
  });

  specify("Auth Failed", () => {
    cy.intercept(jcloudify("/token?code=*"), (req) => {
      req.reply({
        statusCode: 400,
      });
    });

    // cy.getByTestid("auth:login").click();
    localStorage.setItem("auth_process", "login");
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
