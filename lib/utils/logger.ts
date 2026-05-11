export interface LogLevel {
  ERROR: number;
  WARN: number;
  INFO: number;
  DEBUG: number;
}

export const LOG_LEVELS: LogLevel = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

export class Logger {
  private level: number;

  constructor(level: keyof LogLevel = 'INFO') {
    this.level = LOG_LEVELS[level];
  }

  error(message: string, error?: any): void {
    if (this.level >= LOG_LEVELS.ERROR) {
      console.error(`[ERROR] ${message}`, error);
    }
  }

  warn(message: string): void {
    if (this.level >= LOG_LEVELS.WARN) {
      console.warn(`[WARN] ${message}`);
    }
  }

  info(message: string): void {
    if (this.level >= LOG_LEVELS.INFO) {
      console.info(`[INFO] ${message}`);
    }
  }

  debug(message: string): void {
    if (this.level >= LOG_LEVELS.DEBUG) {
      console.debug(`[DEBUG] ${message}`);
    }
  }
}