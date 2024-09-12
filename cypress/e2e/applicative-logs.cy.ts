import {LogStreamEvent} from "@jcloudify-api/typescript-client";
import {app1_prod_env_compute_stack_resources} from "../fixtures/compute-stack-resource.mock";
import {app1_prod_env_frontal_function_log_group1_stream1_events} from "../fixtures/log-stream-event.mock";
import {app1} from "../fixtures/application.mock";
import {user1} from "../fixtures/user.mock";

describe.skip("Applicative logs", () => {
  beforeEach(() => {
    cy.fakeLogin(user1);
    cy.mockApiGet();
    cy.getByHref(`/applications`).click();

    cy.getByTestid(`show-${app1.id}-app`).click({force: true});
    cy.wait("@getApplications");
    cy.wait("@getEnvironments");
  });

  // TODO: specific test for log_groups, log_streams, log_events if needed

  specify("(*) Read a function log stream events", () => {
    cy.contains("Logs").click();
    cy.wait("@getEnvironments");
    cy.muiSelect("[data-testid='filter-env']", "prod_env");
    cy.wait("@getComputeStackResources");

    cy.getByTestid(
      `csr-${app1_prod_env_compute_stack_resources[0].id}`
    ).click();
    // click on a function (frontal, worker_1, worker_2)
    cy.contains("Frontal function").click();

    cy.wait("@getLogGroups");

    // click on a log group
    cy.contains(
      "/aws/lambda/prod-compute-jcloudify-void-FrontalFunction-JosBWwKstZzU"
    ).click();

    cy.wait("@getLogStreams");

    // click on a log stream;
    cy.contains("2024/09/05/[1]e83a5f621f914f158bb35c3bb5ddec1d").click();

    cy.wait("@getLogStreamEvents");

    cy.wrap(app1_prod_env_frontal_function_log_group1_stream1_events).each(
      (logStream: LogStreamEvent, idx) => {
        cy.get(`.MuiTableBody-root > :nth-child(${idx + 1})`).contains(
          logStream.message!
        );
      }
    );
  });
});
