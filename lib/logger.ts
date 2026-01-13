/* Lightweight structured logger wrapper. Using a small wrapper around console so it's easy to replace with pino/winston later. */

import { initSentry, captureException, captureMessage } from "@/lib/sentry";

initSentry();

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => {
    if (meta) {
      console.info(message, JSON.stringify(meta));
      // forward to Sentry as an info message
      captureMessage(message, meta);
    } else {
      console.info(message);
      captureMessage(message);
    }
  },
  warn: (message: string, meta?: Record<string, unknown>) => {
    if (meta) {
      console.warn(message, JSON.stringify(meta));
      captureMessage(message, { level: 'warning', ...(meta || {}) });
    } else {
      console.warn(message);
      captureMessage(message, { level: 'warning' });
    }
  },
  error: (message: string, meta?: Record<string, unknown>) => {
    if (meta) {
      console.error(message, JSON.stringify(meta));
      captureException(new Error(typeof message === 'string' ? message : 'Error'), meta);
    } else {
      console.error(message);
      captureException(new Error(typeof message === 'string' ? message : 'Error'));
    }
  },
  debug: (message: string, meta?: Record<string, unknown>) => {
    if (process.env.NODE_ENV !== "production") {
      if (meta) {
        console.debug(message, JSON.stringify(meta));
      } else {
        console.debug(message);
      }
    }
  },
};
