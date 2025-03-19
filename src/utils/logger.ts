// References: https://blog.arcjet.com/structured-logging-in-json-for-next-js/
// References: https://www.dataset.com/blog/the-10-commandments-of-logging/

import pino, { Logger } from 'pino';
import { LOG_LEVEL } from '@/constants/app';

export const logger: Logger =
  process.env['NODE_ENV'] === 'production'
    ? pino({ level: LOG_LEVEL })
    : pino({
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
        level: LOG_LEVEL,
      });
