import {EnvironmentType as EnvironmentTypeEnum} from "@jcloudify-api/typescript-client";
import {user1} from "../fixtures/user.mock";
import {app1, app2} from "../fixtures/application.mock";
import {stripPrefix} from "../../src/utils/str";
import {user1_installations} from "../fixtures/installation.mock";
import {jcloudify} from "../support/util";

// TODO: separate app, environment and deployment tests

describe("Application", () => {
  beforeEach(() => {
    cy.fakeLogin(user1);
    cy.mockApiGet();
    cy.getByHref(`/applications`).click();
  });

  context("list", () => {
    it("show all apps", () => {
      cy.wait("@getApplications");

      cy.getByTestid(`applications-${app1.id}`).contains(app1.name!);
      cy.getByTestid(`applications-${app1.id}`).contains(
        stripPrefix(app1.repositoryUrl!, "https://github.com/")
      );

      cy.getByTestid(`applications-${app2.id}`).contains(app2.name!);
      cy.getByTestid(`applications-${app2.id}`).contains(
        stripPrefix(app2.repositoryUrl!, "https://github.com/")
      );
    });
  });

  context("create", () => {
    specify("Create new application", () => {
      cy.intercept(
        "GET",
        jcloudify(`/users/${user1.id}/applications/*`),
        app1
      ).as("getApplication");

      cy.intercept(
        "PUT",
        jcloudify(`/users/${user1.id}/applications`),
        (req) => {
          const toCreate = req.body.data[0];
          const {name, github_repository, user_id} = toCreate;
          expect({name, github_repository, user_id}).to.deep.eq({
            user_id: user1.id,
            name: app1.name,
            github_repository: {
              installation_id: user1_installations[0].id,
              name: app1.name,
              description: app1.name,
              is_private: false,
            },
          });
          return req.reply({
            ...req,
            statusCode: 201,
          });
        }
      ).as("createNewApp");

      cy.intercept(
        "PUT",
        jcloudify(`/users/${user1.id}/applications/*/environments`),
        (req) => {
          const [environmentToCreate] = req.body.data;
          expect(environmentToCreate.environment_type).to.eq(
            EnvironmentTypeEnum.PREPROD
          );
          return req.reply({...req, statusCode: 201});
        }
      ).as("createPreprodEnvironment");

      cy.intercept(
        "PUT",
        jcloudify(`/users/${user1.id}/applications/*/environments/*/config`),
        (req) => {
          const pojaConf = req.body;
          expect(pojaConf.general.app_name).to.eq(app1.name);
          return req.reply({...req, statusCode: 201});
        }
      ).as("createPreprodEnvironmentConfig");

      cy.get('[href="/applications/create/new"]').click();

      cy.wait("@getUserInstallations");

      cy.getByName("name").type(app1.name!);

      cy.muiSelect(
        "[data-testid='select-installation-id']",
        "user1_installation_1"
      );

      cy.get("[name='github_repository.name']").type(app1.name!);
      cy.get("[name='github_repository.description']").type(app1.name!);

      cy.get("[aria-label='Save']").click();
      cy.wait("@createNewApp");

      cy.wait("@getApplication");
      cy.contains("Setting up the Preprod environment");
      cy.wait("@createPreprodEnvironment");
      cy.wait("@createPreprodEnvironmentConfig");

      cy.contains("Preprod environment created successfully");
    });

    specify("Displays server side 400 error on incorrect payload", () => {
      cy.intercept(
        "PUT",
        jcloudify(`/users/${user1.id}/applications`),
        (req) => {
          return req.reply({
            body: {
              message: `Application with name=${app1.name} already exists`,
              type: "400 BAD_REQUEST",
            },
            statusCode: 400,
          });
        }
      ).as("createNewApp");

      cy.get('[href="/applications/create/new"]').click();

      cy.wait("@getUserInstallations");

      cy.getByName("name").type(app1.name!);

      cy.muiSelect(
        "[data-testid='select-installation-id']",
        "user1_installation_1"
      );

      cy.get("[name='github_repository.name']").type(app1.name!);
      cy.get("[name='github_repository.description']").type(app1.name!);

      cy.get("[aria-label='Save']").click();
      cy.wait("@createNewApp");

      cy.contains(`Application with name=${app1.name} already exists`);
    });
  });
});
