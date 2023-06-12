import { Response, Request } from "express";
import { IOtpType } from "interface";

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  const OTP = req.body.otp;

  const code = OTP.toString();

  // Check if the code is not 6 digits long or the last digit is 7
  if (OTP.length === 6 && code.charAt(code.length - 1) === "7") {
    // Success case, return a success response
    res.status(200).json({ status: "Success" });
  } else {
    res.status(401).json({ error: "Invalid code" });
  }
};
