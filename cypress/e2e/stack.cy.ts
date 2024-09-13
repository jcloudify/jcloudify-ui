import {
  app1_preprod_stacks,
  app1_prod_stack_events,
  app1_prod_stack_outputs,
  app1_prod_stacks,
} from "../fixtures/stack.mock";
import {app1} from "../fixtures/application.mock";
import {user1} from "../fixtures/user.mock";

describe.skip("Stack", () => {
  beforeEach(() => {
    cy.fakeLogin(user1);
    cy.mockApiGet();
    cy.getByHref(`/applications`).click();

    cy.getByTestid(`show-${app1.id}-app`).click({force: true});
    cy.wait("@getApplications");
    cy.wait("@getEnvironments");

    cy.contains("Deployments").click();
  });

  context("Read", () => {
    specify("List stacks for an environment", () => {
      cy.muiSelect("[data-testid='filter-env']", "prod_env");

      cy.wait("@getEnvironmentStacks");
      cy.wrap(app1_prod_stacks).each((stack) => {
        cy.contains((stack as any).name);
      });

      cy.muiSelect2("[data-testid='filter-env']", "Preprod");

      cy.wait("@getEnvironmentStacks");
      cy.wrap(app1_preprod_stacks).each((stack) => {
        cy.contains((stack as any).name);
      });
    });

    specify("List events for a stack", () => {
      cy.muiSelect("[data-testid='filter-env']", "prod_env");
      cy.wait("@getEnvironmentStacks");

      cy.get(`.MuiTableBody-root > :nth-child(1)`).click(); // app1_prod_stacks[0]
      cy.contains("Events").click();

      cy.wait("@getEnvironmentStackEvents");

      cy.wrap(app1_prod_stack_events).each((event: any, idx) => {
        cy.get(`.MuiTableBody-root > :nth-child(${idx + 1})`).contains(
          event.logical_resource_id
        );
        cy.get(`.MuiTableBody-root > :nth-child(${idx + 1})`).contains(
          event.resource_type
        );
        cy.get(`.MuiTableBody-root > :nth-child(${idx + 1})`).contains(
          event.resource_status
        );
        if (event.status_message) {
          cy.get(`.MuiTableBody-root > :nth-child(${idx + 1})`).contains(
            event.status_message
          );
        }
      });
    });

    specify("List outputs for a stack", () => {
      cy.muiSelect("[data-testid='filter-env']", "prod_env");
      cy.wait("@getEnvironmentStacks");

      cy.get(`.MuiTableBody-root > :nth-child(1)`).click(); // app1_prod_stacks[0]
      cy.contains("Outputs").click();

      cy.wait("@getEnvironmentStackOutputs");

      cy.wrap(app1_prod_stack_outputs).each((output: any, idx) => {
        cy.get(`.MuiTableBody-root > :nth-child(${idx + 1})`).contains(
          output.key
        );
        cy.get(`.MuiTableBody-root > :nth-child(${idx + 1})`).contains(
          output.value
        );
        cy.get(`.MuiTableBody-root > :nth-child(${idx + 1})`).contains(
          output.description
        );
      });
    });
  });
});
