import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from 'generated/prisma/client';
import { ApiErrorResponse } from './api-error-response';

interface PrismaErrorMapping {
  http: 409 | 404 | 400;
  code: string;
  message: string;
  error: string;
}

const prismaErrors = {
  P2002: {
    http: 409,
    code: 'RESOURCE_ALREADY_EXISTS',
    message: 'A record with the same unique value already exists',
    error: 'Conflict'
  },
  P2025: {
    http: 404,
    code: 'RESOURCE_NOT_FOUND',
    message: 'The requested record was not found',
    error: 'Not Found'
  },
  P2003: {
    http: 409,
    code: 'RELATED_RESOURCE_CONFLICT',
    message: 'The operation conflicts with a related record',
    error: 'Conflict'
  },
  P2000: {
    http: 400,
    code: 'VALUE_TOO_LONG',
    message: 'A provided value exceeds the allowed length',
    error: 'Bad Request'
  },
} satisfies Record<string, PrismaErrorMapping>;

type PrismaErrorCode = keyof typeof prismaErrors;

// Shape of error.cause sent by @prisma/adapter-pg. All optional: each error carries a different combination.
interface DriverAdapterCause {
  kind?: string;
  table?: string;
  constraint?: { index?: string };
}

function isDriverAdapterCause(value: unknown): value is DriverAdapterCause {
  return typeof value === 'object' && value !== null;
}

function isMappedCode(code: string): code is PrismaErrorCode {
  return Object.hasOwn(prismaErrors, code);
}

function getDriverAdapterCause(e: Prisma.PrismaClientKnownRequestError): DriverAdapterCause | undefined {
  const adapterError = e.meta?.driverAdapterError;
  if (!(adapterError instanceof Error)) return undefined;
  return isDriverAdapterCause(adapterError.cause) ? adapterError.cause : undefined;
}

function getModelName(e: Prisma.PrismaClientKnownRequestError): string | undefined {
  const modelName = e.meta?.modelName;
  return typeof modelName === 'string' ? modelName : undefined;
}

// Prisma's default unique index name is `<Table>_<field>_key` (e.g. Merchant_name_key → name).
// The index name is only used here to derive the field; it never reaches the client.
function getUniqueField(cause: DriverAdapterCause | undefined): string | undefined {
  const index = cause?.constraint?.index;
  const table = cause?.table;
  if (!index || !table) return undefined;

  const prefix = `${table}_`;
  const suffix = '_key';
  if (!index.startsWith(prefix) || !index.endsWith(suffix)) return undefined;

  // Fields are camelCase, so an underscore in what's left means a composite index
  // (e.g. Merchant_userId_name_key → "userId_name"), which isn't a single field.
  const field = index.slice(prefix.length, -suffix.length);
  return field && !field.includes('_') ? field : undefined;
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaErrorCatch implements ExceptionFilter {
  private readonly logger = new Logger(PrismaErrorCatch.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(e: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    if (!isMappedCode(e.code)) {
      this.logger.error(`Unmapped Prisma error ${e.code}`, e.stack);
      const internalError: ApiErrorResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      };
      httpAdapter.reply(ctx.getResponse(), internalError, HttpStatus.INTERNAL_SERVER_ERROR);
      return;
    }

    // Mapped errors are expected (duplicate name, missing record...) but still worth a trace.
    this.logger.warn(`Prisma error ${e.code}: ${e.message}`);

    const error = prismaErrors[e.code];
    const resource = getModelName(e);
    const field = getUniqueField(getDriverAdapterCause(e));

    const responseBody: ApiErrorResponse = {
      statusCode: error.http,
      error: error.error,
      code: error.code,
      message: error.message,
      ...(resource || field ? { details: { resource, field } } : {}),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, error.http);
  }
}
