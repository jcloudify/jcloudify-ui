export const jcloudify = (tail: string) =>
  (
    Cypress.env("JCLOUDIFY_API_URL") || "https://api.preprod.jcloudify.com"
  ).concat(tail);

export const putRecordOnEditor = (
  name: string,
  record: Record<string, string>
) => {
  cy.wrap(Object.entries(record)).each(([key, value], idx) => {
    cy.getByTestid(`AddAnother${name}`).click();
    cy.getByName(`${name}.${idx}.key`).type(key as any);
    cy.getByName(`${name}.${idx}.value`).type(value as any);
  });
};

export const putStringArray = (name: string, strings: string[]) => {
  cy.wrap(strings).each((string, idx) => {
    cy.getByTestid(`AddAnother${name}`).click();
    cy.getByName(`${name}.${idx}.value`).type(string as any);
    cy.wait(250);
  });
};
