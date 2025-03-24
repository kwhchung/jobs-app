import DashboardCreateJobPage from "@/pages/dashboard/jobs/create";
import {
  appRender,
  screen,
  userEvent,
  waitFor,
} from "@/testing/test-utils";

const jobData = {
  position: "Software Engineer",
  location: "London",
  department: "Engineering",
  info: "Lorem Ipsum",
};

const router = {
  push: jest.fn(),
};

jest.mock("next/router", () => ({
  useRouter: () => router,
}));

describe('Dashboard Create Job Page', () => {
  it("should create a new job", async () => {
    appRender(<DashboardCreateJobPage />);

    const positionInput = screen.getByLabelText(/position/i, {
      selector: "input",
    });
    const locationInput = screen.getByLabelText(/location/i, {
      selector: "input",
    });
    const departmentInput = screen.getByLabelText(/department/i, {
      selector: "input",
    });
    const infoInput = screen.getByLabelText(/info/i, {
      selector: "textarea",
    });
    const submitButton = screen.getByText(/create/i, {
      selector: "button",
    });

    await userEvent.type(positionInput, jobData.position);
    await userEvent.type(locationInput, jobData.location);
    await userEvent.type(departmentInput, jobData.department);
    await userEvent.type(infoInput, jobData.info);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/job created!/i)).toBeInTheDocument();
    });
  });
});
