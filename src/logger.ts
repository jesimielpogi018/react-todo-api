import { createLogger, format, transports, type LoggerOptions } from "winston";

const infoLoggerConfig: LoggerOptions = {
  level: "info",
  format: format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({ filename: ".log/error.log", level: "error" }),
  ]
};

const infoLogger = createLogger(infoLoggerConfig);

export { infoLogger };
