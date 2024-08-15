// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import {Token, User} from "@jcloudify-api/typescript-client";
import "./commands";

import "@cypress/code-coverage/support";

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestid<Subject>(testid: string): Chainable<Subject>;
      pathnameEq(to: string): Chainable;
      getByHref<Subject>(href: string): Chainable<Subject>;
      getByName<Subject>(name: string): Chainable<Subject>;

      muiSelect(selector: string, value: string): Chainable;
      muiSelect2(formControl: string, optionText: string): Chainable;
      muiClear(selector: string): Chainable;

      /**
       * JCloudify mocking
       */
      mockToken: (token: Token) => Chainable;
      mockApiGet: () => Chainable;
      fakeLogin: (user: User & {token: string}) => Chainable;
    }
  }
}
