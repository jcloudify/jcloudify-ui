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

      cy.get('[href="/applications/create/new"]').click();

      cy.wait("@getUserInstallations");

      cy.getByName("name").type(app1.name!);

      cy.muiSelect2("[data-testid='select-installation-id']", "user1");

      cy.get("[name='github_repository.name']").type(app1.name!);
      cy.get("[name='github_repository.description']").type(app1.name!);

      cy.get("[aria-label='Save']").click();
      cy.wait("@createNewApp");

      cy.pathnameEq("/applications");
    });
  });
});
