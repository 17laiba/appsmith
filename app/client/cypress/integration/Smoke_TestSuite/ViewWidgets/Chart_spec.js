const commonlocators = require("../../../locators/commonlocators.json");
const viewWidgetsPage = require("../../../locators/ViewWidgets.json");

describe("Chart Widget Functionality", function() {
  it("Chart Widget Functionality", function() {
    cy.NavigateToViewWidgets();
    cy.get(viewWidgetsPage.chartWidget)
      .first()
      .trigger("mouseover");
    cy.get(viewWidgetsPage.chartWidget)
      .children(commonlocators.editicon)
      .first()
      .click({ force: true });
    //Checking the edit props for Chart and also the properties of Chart widget
    cy.testCodeMirror("App Sign Up");
    cy.get(viewWidgetsPage.chartSelectChartType)
      .find(".bp3-button")
      .click({ force: true })
      .get("ul.bp3-menu")
      .children()
      .contains("Bar Chart")
      .click();
    cy.get(viewWidgetsPage.chartSelectChartType)
      .find(".bp3-button > .bp3-button-text")
      .should("have.text", "Bar Chart");
    cy.get(commonlocators.editPropCrossButton).click();
  });
});
