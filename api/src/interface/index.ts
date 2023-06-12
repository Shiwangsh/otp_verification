import { Request } from "express";

export interface IOtpType {
  digits: number[];
}

export interface IRequest extends Request {
  OTP?: IOtpType;
}
