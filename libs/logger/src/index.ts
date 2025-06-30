import * as winston from 'winston';

const isDevelopment = process.env['NODE_ENV'] !== 'production';

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
};

winston.addColors(colors);

const developmentFormat = winston.format.combine(
  winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    ({ timestamp, level, message, service, ...meta }: any) => {
      const metaString = Object.keys(meta).length
        ? JSON.stringify(meta, null, 2)
        : '';
      return `[${timestamp}] [${
        service || 'APP'
      }] ${level}: ${message} ${metaString}`;
    }
  )
);

const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    level: isDevelopment ? 'debug' : 'info',
    format: isDevelopment ? developmentFormat : productionFormat,
  }),
];

if (!isDevelopment) {
  transports.push(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: productionFormat,
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: productionFormat,
    })
  );
}

const logger = winston.createLogger({
  level: isDevelopment ? 'debug' : 'info',
  format: productionFormat,
  transports,
  exitOnError: false,
});

export const createServiceLogger = (serviceName: string) => {
  return logger.child({ service: serviceName });
};

export const AppLogger = createServiceLogger('APP');

export default logger;
