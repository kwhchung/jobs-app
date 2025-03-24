import LoginPage from "@/pages/auth/login";
import {
  appRender,
  screen,
  userEvent,
  waitFor
} from "@/testing/test-utils";

const credentials = {
  email: "user1@test.com",
  password: "password",
};
const router = {
  replace: jest.fn(),
  query: {},
};

jest.mock("next/router", () => ({
  useRouter: () => router,
}));

describe('Login Page', () => {
  it("should login the user into the dashboard", async () => {
    appRender(<LoginPage />);

    const emailInput = screen.getByLabelText(/email/i, {
      selector: "input",
    });
    const passwordInput = screen.getByLabelText(/password/i, {
      selector: "input",
    });
    const submitButton = screen.getByText(/log in/i, {
      selector: "button",
    });

    await userEvent.type(emailInput, credentials.email);
    await userEvent.type(passwordInput, credentials.password);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith("/dashboard/jobs");
    });
  });
});
