import { testData } from "@/testing/test-data";

const user = testData.users[0];
const job = testData.jobs[0];
const jobData = {
  position: "Software Engineer",
  department: "Engineering",
  location: "London",
  info: "Lorem Ipsum",
};

describe('dashboard', () => {
  it('should authenticate into the dashboard', () => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.visit("http://localhost:3000/dashboard/jobs");
    cy.wait(500);
    cy.url().should("equal", "http://localhost:3000/auth/login?redirect=/dashboard/jobs");

    cy.get("form").within(() => {
      cy.get("input[name='email']").type(user.email);
      cy.get("input[name='password']").type(user.password);
      cy.root().submit();
    });

    cy.url().should("equal", "http://localhost:3000/dashboard/jobs");
    cy.get("h2").contains(/jobs/i).should("exist");
  });

  it('should navigate to and visit the job details page', () => {
    cy.get(`a[href='/dashboard/jobs/${ job.id }']`).click();

    cy.get("h2").contains(new RegExp(job.position, "i")).should("exist");
    cy.contains(new RegExp(job.info, "i")).should("exist");
  });

  it('should create a new job', () => {
    cy.go("back");
    cy.get("button").contains(/create job/i).click();
    cy.url().should("equal", "http://localhost:3000/dashboard/jobs/create");

    cy.get("form").within(() => {
      cy.get("input[name='position']").type(jobData.position);
      cy.get("input[name='department']").type(jobData.department);
      cy.get("input[name='location']").type(jobData.location);
      cy.get("textarea[name='info']").type(jobData.info);
      cy.root().submit();
    });

    cy.contains(/job created!/i).should("exist");
  });

  it('should log out from the dashboard', () => {
    cy.get("button").contains(/log out/i).click();
    cy.wait(500);
    cy.url().should("equal", "http://localhost:3000/auth/login");
  });
});
