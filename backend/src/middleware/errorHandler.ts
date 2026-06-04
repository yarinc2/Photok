import { Request, Response, NextFunction } from 'express';
import { isAxiosError } from 'axios';

const PASSTHROUGH_STATUSES = new Set([400, 401, 403, 404, 429]);

const STATUS_CODES: Record<number, string> = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  429: 'RATE_LIMITED',
  502: 'UPSTREAM_ERROR',
  503: 'UPSTREAM_ERROR',
};

const STATUS_MESSAGES: Record<number, string> = {
  400: 'Bad request.',
  401: 'Unauthorized.',
  403: 'Access forbidden. Check your API key.',
  404: 'Resource not found.',
  429: 'Too many requests. Rate limited.',
  502: 'Upstream service returned an error.',
  503: 'Upstream service is unreachable.',
};

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(err);

  if (isAxiosError(err)) {
    if (err.response) {
      const upstream = err.response.status;
      const status = PASSTHROUGH_STATUSES.has(upstream) ? upstream : 502;
      return res.status(status).json({
        error: STATUS_MESSAGES[status],
        code: STATUS_CODES[status],
      });
    }
    return res.status(503).json({
      error: STATUS_MESSAGES[503],
      code: STATUS_CODES[503],
    });
  }

  const message = err instanceof Error ? err.message : 'Internal server error';
  res.status(500).json({ error: message, code: 'INTERNAL_ERROR' });
}
