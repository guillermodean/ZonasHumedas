import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // Set the log level according to your needs
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // Output logs to the console
    new winston.transports.File({ filename: 'logs/combined.log' }), // Output logs to a file
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Output error logs to a file
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }), // Output warn logs to a file



  ]
});

export default logger;
