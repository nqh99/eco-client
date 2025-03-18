import { LOG_LEVEL } from '@/constants/app';
import { LogLevel } from '@/constants/logging/level';

class Logger {
  private source: string;

  constructor(source: string) {
    this.source = source;
  }

  debug(message: string, data?: unknown) {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: unknown) {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: unknown) {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, data?: unknown) {
    this.log(LogLevel.ERROR, message, data);
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= Number(LOG_LEVEL);
  }

  private log(level: LogLevel, message: string, data?: unknown) {
    if (!this.shouldLog(level)) return;

    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      LogLevel,
      source: this.source,
      message,
      data: data ?? {},
      environment: typeof window === 'undefined' ? 'server' : 'client',
    };

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(JSON.stringify(logData));
        break;
      case LogLevel.INFO:
        console.info(JSON.stringify(logData));
        break;
      case LogLevel.WARN:
        console.warn(JSON.stringify(logData));
        break;
      case LogLevel.ERROR:
        console.error(JSON.stringify(logData));
        break;
    }
  }
}

export function createLogger(source: string) {
  return new Logger(source);
}
