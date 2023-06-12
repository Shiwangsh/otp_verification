/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import OTPVerificationField from "../components/OTPVerificationField";

test("On initial render focus on the first input box", () => {
  render(<OTPVerificationField />);
  screen.debug();
});
