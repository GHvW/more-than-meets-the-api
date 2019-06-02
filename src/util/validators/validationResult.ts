import { Result } from "../result";

export type ValidationError = 404;

interface ValidationErr {
  code: ValidationError;
  message: string;
}

export type ValidationResult<A> = Result<A, ValidationErr>;