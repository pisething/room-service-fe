import { HttpParams } from "@angular/common/http";

/**
 * Converts an object of key-value pairs into Angular HttpParams.
 * Skips null, undefined, and empty string values.
 * Handles arrays by appending each value separately.
 */
export function buildParams<T extends object>(input?: T): HttpParams {
  // Start with empty params
  let params = new HttpParams();

  // If no input provided, return empty params
  if (!input) {
    return params;
  }

  // Loop through each property of the input object
  for (const [key, value] of Object.entries(input)) {
    // Skip if value is null, undefined, or an empty string
    if (value == null || value === '') {
      continue;
    }

    // If the value is an array, add each item separately
    if (Array.isArray(value)) {
      for (const item of value) {
        params = params.append(key, String(item));
      }
    } else {
      // Otherwise, add the single value
      params = params.set(key, String(value));
    }
  }

  return params;
}