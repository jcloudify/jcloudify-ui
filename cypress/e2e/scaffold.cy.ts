describe("Scaffold", () => {
  specify("lands on React Admin default", () => {
    cy.visit("/");
    cy.contains("Welcome to React-admin");
  });
});
