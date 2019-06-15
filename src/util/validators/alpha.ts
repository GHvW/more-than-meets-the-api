import { ValidationResult } from "./validationResult";

export function alpha(s: string): ValidationResult<string> {
  const uppercased = s.toUpperCase();
  const regex = /[A-Z]+$/i;

  if (!regex.test(uppercased)) {
    return { ok: true, result: uppercased };
  }
  
  return { 
    ok: false, 
    result: { 
      code: 404,
      message: `Invalid string: is not composed solely of alphabetic characters`
    }
  };
}