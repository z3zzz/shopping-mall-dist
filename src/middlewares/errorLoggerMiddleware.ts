import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

function errorLoggerMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const current_datetime = new Date();

  const dateFormatted =
    current_datetime.getFullYear() +
    '-' +
    (current_datetime.getMonth() + 1) +
    '-' +
    current_datetime.getDate() +
    ' ' +
    current_datetime.getHours() +
    ':' +
    current_datetime.getMinutes() +
    ':' +
    current_datetime.getSeconds();

  const method = req.method;
  const url = req.url;
  const status = res.statusCode;
  const errorContent = error.stack;

  const log = `[${dateFormatted}] ${method}:${url} ${status}`;

  console.log(log);
  console.log(errorContent);

  fs.appendFile('request.log', log + '\n' + errorContent + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
}

export { errorLoggerMiddleware };
