import { testData } from "@/testing/test-data";

const organization = testData.organizations[0];
const job = testData.jobs[0];

describe('public application flow', () => {
  it('should display the organization public page', () => {
    cy.visit(`http://localhost:3000/organizations/${ organization.id }`);

    cy.get("h2").contains(new RegExp(organization.name, "i")).should("exist");
    cy.get("h2").contains(new RegExp(organization.email, "i")).should("exist");
    cy.get("h2").contains(new RegExp(organization.phone, "i")).should("exist");
    cy.contains(new RegExp(organization.info, "i")).should("exist");
  });

  it('should navigate to and display the public job details page', () => {
    cy.get("[data-testid='jobs-list']").should("exist");
    cy.get(`a[href='/organizations/${ organization.id }/jobs/${ job.id }']`).click();

    cy.get("h2").contains(new RegExp(job.position, "i")).should("exist");
    cy.contains(new RegExp(job.info, "i")).should("exist");
  });
});
