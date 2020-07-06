import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import index from './routes/index';
import { getOfficials, getVoterInfo, getGeocode } from './api/api';

const app = express();
const port = 8080;

export class HTTPError extends Error {
  status?: number;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// View engine setup
app.set('views', path.join(__dirname, '../', 'views'));
app.set('view engine', 'ejs');

// Set path for static assets
app.use(express.static(path.join(__dirname, '../', 'public')));

// Routes
app.use('/', index);
app.use('/api/representatives/*', getOfficials);
app.use('/api/voter-info/*', getVoterInfo);
app.use('/api/geocode/*', getGeocode);

// Catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  const err = new HTTPError('Not Found');
  err.status = 400;
  next(err);
});

// Error handler
app.use(function (err: HTTPError, req: Request, res: Response) {
  // Render the error page
  res.status(err.status || 500);
  res.render('error', { status: err.status, message: err.message });
});

app.listen(port, () => {
  console.log(`Server up at port ${port}`);
});

export default app;
