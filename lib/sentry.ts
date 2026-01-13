import * as Sentry from "@sentry/node";

let initialized = false;

export function initSentry() {
  if (initialized) return;
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return;

  Sentry.init({
    dsn,
    tracesSampleRate: 0.0, // set to 0 for now; adjust if you want performance traces
    environment: process.env.NODE_ENV || "development",
    // You can add release, serverName, etc. here
  });
  initialized = true;
}

export function captureException(
  err: unknown,
  extra?: Record<string, unknown>,
) {
  if (!initialized) return;
  Sentry.captureException(err as Error, {
    level: "error",
    extra,
  });
}

export function captureMessage(
  message: string,
  extra?: Record<string, unknown>,
) {
  if (!initialized) return;
  Sentry.captureMessage(message, {
    level: "info",
    extra,
  });
}
