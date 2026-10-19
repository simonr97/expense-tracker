// Shape of every error response the API sends (PrismaErrorCatch and CatchEverythingFilter).
export interface ApiErrorResponse {
  statusCode: number;
  error: string;
  code: string;
  message: string;
  details?: {
    resource?: string;
    field?: string;
    errors?: string[];
  };
}
