import { ValidationResult } from "./validationResult";

export function validIndex(n: string): ValidationResult<number> {
  let _n = Number(n);

  if (!Number.isNaN(_n) && _n >= 0) {
    return { ok: true, result: _n };
  }

  return { 
    ok: false,
    result: { code: 404, message: `${n} is not a valid index` }
  }
}