
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiErrorResponse } from './api-error-response';

// Shape of HttpException.getResponse() when it's an object (e.g. ValidationPipe sends message as string[]).
interface HttpExceptionResponse {
  message?: string | string[];
  error?: string;
}

interface ErrorDescription {
  error: string;
  code: string;
  message: string;
  errors?: string[];
}

function isHttpExceptionResponse(value: unknown): value is HttpExceptionResponse {
  return typeof value === 'object' && value !== null;
}

// 'NOT_FOUND' → 'Not Found'
function statusText(status: number): string {
  const key = HttpStatus[status] ?? 'INTERNAL_SERVER_ERROR';
  return key
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  private readonly logger = new Logger(CatchEverythingFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const { error, code, message, errors } = this.describe(exception, httpStatus);

    const responseBody: ApiErrorResponse = {
      statusCode: httpStatus,
      error,
      code,
      message,
      ...(errors ? { details: { errors } } : {}),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private describe(exception: unknown, httpStatus: number): ErrorDescription {
    if (!(exception instanceof HttpException)) {
      this.logger.error('Unhandled exception', exception instanceof Error ? exception.stack : String(exception));
      return {
        error: statusText(httpStatus),
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      };
    }

    const code = HttpStatus[httpStatus] ?? 'HTTP_ERROR';
    const response = exception.getResponse();

    if (!isHttpExceptionResponse(response)) {
      return { error: statusText(httpStatus), code, message: String(response) };
    }

    const error = response.error ?? statusText(httpStatus);

    // ValidationPipe: one message per failed field → generic message + list in details.errors
    if (Array.isArray(response.message)) {
      return { error, code: 'VALIDATION_FAILED', message: 'The request contains invalid fields', errors: response.message };
    }

    return { error, code, message: response.message ?? exception.message };
  }
}
