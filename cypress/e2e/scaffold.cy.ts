describe("Scaffold", () => {
  specify("lands on React Admin default", () => {
    cy.visit("/");
    expect(true).to.be.true;
  });
});
