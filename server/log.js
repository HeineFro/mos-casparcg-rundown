'use strict';

const winston = require('winston');
require('winston-daily-rotate-file');

const {format, transports} = require('winston');
const { timestamp, colorize, printf, errors } = format;
const { Console, File } = transports;
let LoggerConfig;

var transport = new winston.transports.DailyRotateFile({
    filename: 'log/CG-COM-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,

    maxFiles: '14d'
  });


let date = new Date();
let logName = '_Dato-' + date.getDate() + " kl-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
      
LoggerConfig = {
            transports: [
            new Console(),
            //new File({filename: `log/Cg-com${logName}.log`}),
            transport
        ],
        format: format.combine(
            //errors({ stack: true }),
            format.timestamp({
                format: 'MMM-DD-YYYY HH:mm:ss'
            }),
            
            colorize(),
            printf(({ level, message, timestamp, stack }) => {
              //  if (stack) {
                    // print log trace 
               //     return `${timestamp} ${level}: ${message} - ${stack}`;
              //  }
                return `${timestamp} ${level}: ${message}`;
            }),
        ),
        expressFormat: true, // Use the default Express/morgan request formatting
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: function (req, res) {
            return false;
        } // optional: allows to skip some log messages based on request and/or response
}
global.__logger = winston.createLogger(LoggerConfig);
