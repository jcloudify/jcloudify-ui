import {user1} from "../fixtures/user.mock";
import {jcloudify} from "../support/util";

/**
 * auth_process is directly set because we want to skip the real oauth process redirections and stuff
 */
describe("Auth", () => {
  const AUTH_CALLBACK_ROUTE = "/auth/callback?code=anycode";

  beforeEach(() => {
    cy.mockApiGet();
  });

  specify("Login", () => {
    cy.fakeLogin(user1);

    cy.getByTestid("user_menu").click();
    cy.contains(user1.username!);
    cy.contains(user1.email!);
    cy.contains(user1.role!);
  });

  specify("Register (success)", () => {
    cy.mockToken({
      access_token: user1.token,
    }).as("exchangeCode");

    cy.intercept("POST", jcloudify("/users"), (req) => {
      const [user] = req.body.data;
      expect(user).to.deep.eq({
        first_name: user1.first_name,
        last_name: user1.last_name,
        email: user1.email,
        token: user1.token,
      });
      req.reply({
        statusCode: 201,
        body: req.body,
      });
    }).as("register");

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
    cy.getByName("email").type(user1.email!);
    cy.getByTestid("complete-registration").click();

    cy.wait("@register");

    cy.intercept("GET", jcloudify("/whoami"), {
      user: user1,
    }).as("whoami");

    // TODO: userMenu
    cy.contains("Applications");
  });

  specify("Register (failure)", () => {
    cy.mockToken({
      access_token: user1.token,
    }).as("exchangeCode");

    cy.intercept("POST", jcloudify("/users"), (req) => {
      const [user] = req.body.data;
      expect(user).to.deep.eq({
        first_name: user1.first_name,
        last_name: user1.last_name,
        email: user1.email,
        token: user1.token,
      });
      req.reply({
        statusCode: 400,
        body: {
          type: "BadRequest",
          message: "This mail address is already used by another account",
        },
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
    cy.getByName("email").type(user1.email!);
    cy.getByTestid("complete-registration").click();

    cy.contains("This mail address is already used by another account");
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
