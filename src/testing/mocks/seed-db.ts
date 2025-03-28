import { db } from "@/testing/mocks/db";
import { testData } from "@/testing/test-data";

export const seedDb = () => {
  const userCount = db.user.count();
  if(userCount > 0){
    return;
  }

  testData.users.forEach(user => db.user.create(user));
  testData.organizations.forEach(organization => db.organization.create(organization));
  testData.jobs.forEach(job => db.job.create(job));
};
