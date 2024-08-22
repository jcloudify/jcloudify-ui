import {app1_preprod_stacks, app1_prod_stacks} from "../fixtures/stack.mock";
import {app1} from "../fixtures/application.mock";
import {user1} from "../fixtures/user.mock";

describe("Stack", () => {
  beforeEach(() => {
    cy.fakeLogin(user1);
    cy.mockApiGet();
    cy.getByHref(`/applications`).click();
  });

  context("Read", () => {
    specify("List stacks for an environment", () => {
      cy.getByTestid(`show-${app1.id}-app`).click({force: true});
      cy.wait("@getApplications");
      cy.wait("@getEnvironments");

      cy.contains("Stacks").click();

      cy.muiSelect2("#env_id", "Prod");

      cy.wrap(app1_prod_stacks).each((stack) => {
        cy.contains((stack as any).name);
      });

      cy.muiSelect2("#env_id", "Preprod");

      cy.wrap(app1_preprod_stacks).each((stack) => {
        cy.contains((stack as any).name);
      });
    });
  });
});
