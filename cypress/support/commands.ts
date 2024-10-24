/// <reference types="cypress" />

import {
  app1_envs,
  app2_envs,
  preprod_env,
  preprod_env2,
  prod_env,
} from "../fixtures/environment.mock";
import {user1} from "../fixtures/user.mock";
import {app1, app2, app3, apps} from "../fixtures/application.mock";
import {user1_installations} from "../fixtures/installation.mock";
import {
  app1_prod_stacks,
  app1_preprod_stacks,
  app2_prod_stacks,
  app2_preprod_stacks,
  stack_events,
  stack_outputs_with_apiUrl,
} from "../fixtures/stack.mock";
import {
  depl1_prod_env_conf1,
  preprod_env2_conf1,
  preprod_env_conf1,
  prod_env_conf1,
} from "../fixtures/config.mock";
import {pojaVersions} from "../fixtures/poja-version.mock";
import {app1_prod_env_compute_stack_resources} from "../fixtures/compute-stack-resource.mock";
import {
  app1_prod_env_frontal_function_log_groups,
  app1_prod_env_worker1_function_log_groups,
} from "../fixtures/log-group.mock";
import {app1_prod_env_frontal_function_log_group1_streams} from "../fixtures/log-stream.mock";
import {app1_prod_env_frontal_function_log_group1_stream1_events} from "../fixtures/log-stream-event.mock";
import {depl1, depls} from "../fixtures//deployment.mock";
import {jcloudify} from "./util";
import {isDateBetween} from "../../src/utils/date";
import {
  app1_billing_info,
  prod_billing_info,
  preprod_billing_info,
  billingInfo,
} from "../fixtures/billing-info.mock";
import {paymentDetails} from "../fixtures/billing.mock";

Cypress.Commands.add("getByTestid", <Subject = any>(id: string) => {
  return cy.get<Subject>(`[data-testid='${id}']`);
});

Cypress.Commands.add("pathnameEq", (to) => {
  cy.window()
    .its("location")
    .should(({pathname}) => {
      expect(pathname).to.eq(to);
    });
});

Cypress.Commands.add("getByHref", <Subject = any>(href: string) => {
  return cy.get<Subject>(`[href='${href}']`);
});

Cypress.Commands.add("getByName", <Subject = any>(name: string) => {
  return cy.get<Subject>(`[name='${name}']`);
});

Cypress.Commands.add("muiSelect", (selector, value) => {
  cy.get(selector + " [role='combobox']").click({force: true});
  cy.get(`[data-value="${value}"]`).click();
});

Cypress.Commands.add("muiSelect2", (formControl, optionText) => {
  const selector = formControl + " [role='combobox']";
  cy.get(selector).click({force: true});
  cy.get(formControl).contains(optionText).click({force: true});
});

Cypress.Commands.add("muiClear", (selector) => {
  cy.get(selector).click({force: true});
  cy.get('[aria-label="Clear value"]').click();
});

Cypress.Commands.add("mockToken", (token) => {
  return cy.intercept("GET", jcloudify("/token?code=*"), token);
});

Cypress.Commands.add("mockApiGet", () => {
  cy.intercept(
    "GET",
    jcloudify(`/users/*/applications/${app1.id}/billing?startTime=*&endTime=*`),
    app1_billing_info
  ).as("getAppBillingInfo");

  cy.intercept(
    "GET",
    jcloudify(`/users/*/applications/${app3.id}/billing?startTime=*&endTime=*`),
    []
  ).as("getAppBillingInfo");

  cy.intercept(
    "GET",
    jcloudify(
      `/users/*/applications/${app1.id}/environments/${prod_env.id}/billing?startTime=*&endTime=*`
    ),
    prod_billing_info
  ).as("getEnvBillingInfo");
  cy.intercept(
    "GET",
    jcloudify(
      `/users/*/applications/${app1.id}/environments/${preprod_env.id}/billing?startTime=*&endTime=*`
    ),
    preprod_billing_info
  ).as("getEnvBillingInfo");
  cy.intercept(
    "GET",
    jcloudify(
      `/users/*/applications/${app2.id}/environments/${preprod_env2.id}/billing?startTime=*&endTime=*`
    ),
    preprod_billing_info
  ).as("getEnvBillingInfo");

  cy.intercept(
    "GET",
    jcloudify(`/users/*/billing?startTime=*&endTime=*`),
    billingInfo
  ).as("getBillingInfo");
  cy.intercept("GET", jcloudify(`/users/*/payment-details`), paymentDetails).as(
    "getPaymentDetails"
  );

  cy.intercept("GET", jcloudify(`/users/*/applications?page=*&page_size=*`), {
    data: apps,
  }).as("getApplications");

  cy.intercept("GET", jcloudify(`/users/*/applications/${app1.id}`), app1).as(
    "getApplication"
  );
  cy.intercept("GET", jcloudify(`/users/*/applications/${app2.id}`), app2).as(
    "getApplication"
  );
  cy.intercept("GET", jcloudify(`/users/*/applications/${app3.id}`), app3).as(
    "getApplication"
  );

  cy.intercept(
    "GET",
    jcloudify(`/users/*/applications/${app1.id}/environments`),
    {
      data: app1_envs,
    }
  ).as("getEnvironments");
  cy.intercept(
    "GET",
    jcloudify(`/users/*/applications/${app2.id}/environments`),
    {
      data: app2_envs,
    }
  ).as("getEnvironments");
  cy.intercept(
    "GET",
    jcloudify(`/users/*/applications/${app3.id}/environments`),
    {
      data: [],
    }
  ).as("getEnvironments");
  cy.intercept(
    "GET",
    jcloudify(`/users/*/applications/${app1.id}/environments/prod_env`),
    prod_env
  ).as("getEnvironmentById");
  cy.intercept(
    "GET",
    jcloudify(`/users/*/applications/${app1.id}/environments/preprod_env`),
    preprod_env
  ).as("getEnvironmentById");
  cy.intercept(
    "GET",
    jcloudify(`/users/*/applications/${app2.id}/environments/preprod_env2`),
    preprod_env2
  ).as("getEnvironmentById");

  cy.intercept(
    "GET",
    jcloudify(`/users/*/applications/${app1.id}/environments/prod_env/config`),
    prod_env_conf1
  ).as("getEnvironmentConfig");
  cy.intercept(
    "GET",
    jcloudify(
      `/users/*/applications/${app1.id}/environments/preprod_env/config`
    ),
    preprod_env_conf1
  ).as("getEnvironmentConfig");
  cy.intercept(
    "GET",
    jcloudify(
      `/users/*/applications/${app2.id}/environments/preprod_env2/config`
    ),
    preprod_env2_conf1
  ).as("getEnvironmentConfig");

  cy.intercept("GET", jcloudify(`/users/${user1.id}/installations`), {
    data: user1_installations,
  }).as("getUserInstallations");

  cy.intercept(
    "GET",
    jcloudify(
      `/users/${user1.id}/applications/${app1.id}/environments/${prod_env.id}/stacks?page=*&page_size=*`
    ),
    {
      data: app1_prod_stacks,
    }
  ).as("getEnvironmentStacks");

  cy.intercept(
    "GET",
    jcloudify(
      `/users/${user1.id}/applications/${app1.id}/environments/${preprod_env.id}/stacks?page=*&page_size=*`
    ),
    {
      data: app1_preprod_stacks,
    }
  ).as("getEnvironmentStacks");

  cy.intercept(
    "GET",
    jcloudify(
      `/users/${user1.id}/applications/${app2.id}/environments/*/stacks?page=*&page_size=*`
    ),
    {
      data: app2_preprod_stacks,
    }
  ).as("getEnvironmentStacks");

  cy.intercept(
    "GET",
    jcloudify(
      `/users/${user1.id}/applications/*/environments/*/stacks/*/events?page=*&page_size=*`
    ),
    {
      data: stack_events,
    }
  ).as("getEnvironmentStackEvents");

  cy.intercept(
    "GET",
    jcloudify(
      `/users/${user1.id}/applications/${app1.id}/environments/*/stacks/*/outputs?page=*&page_size=*`
    ),
    {
      data: stack_outputs_with_apiUrl,
    }
  ).as("getEnvironmentStackOutputs");

  cy.intercept(
    "GET",
    jcloudify(
      `/users/${user1.id}/applications/${app2.id}/environments/*/stacks/*/outputs?page=*&page_size=*`
    ),
    {
      data: stack_outputs_with_apiUrl,
    }
  ).as("getEnvironmentStackOutputs");

  cy.intercept("GET", jcloudify(`/poja-versions`), {
    data: pojaVersions,
  }).as("getPojaVersions");

  cy.intercept(
    "GET",
    jcloudify(
      `/users/${user1.id}/applications/${app1.id}/environments/${prod_env.id}/computeStackResources?page=*&page_size=*`
    ),
    {
      data: app1_prod_env_compute_stack_resources,
    }
  ).as("getComputeStackResources");

  cy.intercept(
    "GET",
    jcloudify(
      `/users/${user1.id}/applications/${app1.id}/environments/${prod_env.id}/functions/${app1_prod_env_compute_stack_resources[0].frontal_function_name}/logGroups?page=*&page_size=*`
    ),
    {
      data: app1_prod_env_frontal_function_log_groups,
    }
  ).as("getLogGroups");
  cy.intercept(
    "GET",
    jcloudify(
      `/users/${user1.id}/applications/${app1.id}/environments/${prod_env.id}/functions/${app1_prod_env_compute_stack_resources[0].worker_1_function_name}/logGroups?page=*&page_size=*`
    ),
    {
      data: app1_prod_env_worker1_function_log_groups,
    }
  ).as("getLogGroups");

  cy.intercept(
    "GET",
    jcloudify(
      `/users/${user1.id}/applications/${app1.id}/environments/${
        prod_env.id
      }/functions/${
        app1_prod_env_compute_stack_resources[0].frontal_function_name
      }/logStreams?logGroupName=${encodeURIComponent(
        app1_prod_env_frontal_function_log_groups[0].name
      )}&page=*&page_size=*`
    ),
    {
      data: app1_prod_env_frontal_function_log_group1_streams,
    }
  ).as("getLogStreams");

  cy.intercept(
    "GET",
    jcloudify(
      `/users/${user1.id}/applications/${app1.id}/environments/${
        prod_env.id
      }/functions/${
        app1_prod_env_compute_stack_resources[0].frontal_function_name
      }/logStreamEvents?logGroupName=${encodeURIComponent(
        app1_prod_env_frontal_function_log_groups[0].name
      )}&logStreamName=${encodeURIComponent(
        app1_prod_env_frontal_function_log_group1_streams[0].name
      )}&page=*&page_size=*`
    ),
    {
      data: app1_prod_env_frontal_function_log_group1_stream1_events,
    }
  ).as("getLogStreamEvents");

  cy.intercept(
    jcloudify(`/users/${user1.id}/applications/*/deployments*`),
    (req) => {
      const {query} = req;
      const {environmentType, startDatetime, endDatetime} = query;
      const data = depls.filter(
        (depl) =>
          (!environmentType ||
            environmentType ===
              depl.github_meta?.commit?.branch?.toUpperCase()) &&
          (!(startDatetime || endDatetime) ||
            isDateBetween(
              depl.creation_datetime!,
              startDatetime ? new Date(startDatetime) : undefined,
              endDatetime ? new Date(endDatetime) : new Date(),
              "incl"
            ))
      );
      req.reply({
        body: {
          data,
        },
      });
    }
  ).as("getDeployments");

  cy.intercept(
    jcloudify(
      `/users/${user1.id}/applications/${app1.id}/deployments/${depl1.id}`
    ),
    depl1
  ).as("getDeploymentById");

  cy.intercept(
    jcloudify(
      `/users/${user1.id}/applications/${app1.id}/deployments/${depl1.id}/config`
    ),
    depl1_prod_env_conf1
  ).as("getDeploymentConfig");
});

Cypress.Commands.add("fakeLogin", (user) => {
  // Clicking the login button initiates the GitHub OAuth login challenge.
  // To avoid this, directly set the auth_process to handle the login and proceed to the code exchange and whoami steps.
  localStorage.setItem("auth_process", "login");
  cy.mockToken({
    access_token: user.token,
    token_type: "bearer",
  });

  cy.intercept("GET", jcloudify("/whoami"), {
    user,
  }).as("whoami");

  cy.visit("/auth/callback?code=fakecode");
});

Cypress.Commands.add("withToken", (token) => {
  localStorage.setItem("auth_tokens", JSON.stringify(token));
});
