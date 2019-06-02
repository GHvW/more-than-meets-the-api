import { ValidationResult } from "./validationResult";

export function isAlpha(s: string): ValidationResult<string> {
  const regex = /[A-Z]+$/i;
  if (!regex.test(s)) {
    return { ok: true, result: s };
  }
  return { 
    ok: false, 
    result: { 
      code: 404,
      message: `Invalid string: is not composed solely of alphabetic characters`
    }
  };
}