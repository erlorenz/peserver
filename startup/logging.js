const { createLogger, format, transports } = require('winston');

export default createLogger({
  level: 'debug',
  format: format.combine(format.colorize(), format.simple()),
  transports: [new transports.Console()],
});
