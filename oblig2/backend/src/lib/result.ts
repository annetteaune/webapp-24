import { Result } from "../features/projects/types/types";

export class ResultHandler {
  static success<T>(data: T): Result<T> {
    return {
      success: true,
      data,
    };
  }

  static failure(error: string, code: string): Result<never> {
    return {
      success: false,
      error,
      code,
    };
  }
}
