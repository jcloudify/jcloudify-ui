export const jcloudify = (tail: string) =>
  "https://api.preprod.jcloudify.com".concat(tail);

export const putRecordOnEditor = (name: string, record: Record<string, string>) => {
  const entries = Object.entries(record);
  entries
    .forEach(([key, value], idx) => {
      cy.getByName(`${name}.${idx}.key`).type(key);
      cy.getByName(`${name}.${idx}.value`).type(value);
      if (idx < entries.length) {
        cy.getByTestid(`AddAnother${name}`).click();
      }
    })
}
