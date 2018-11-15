import winston from 'winston';
const { format, transports } = winston;
const { combine, simple, colorize } = format;

export default () => {
  winston.configure({
    transports: [new transports.Console()],
    format: combine(simple(), colorize()),
  });
};
