import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('index.ejs');
});

router.get('/my-polling-location', (req: Request, res: Response) => {
  res.render('modules/polling.ejs');
});

router.get('/representatives', (req: Request, res: Response) => {
  res.render('modules/representatives.ejs');
});

router.get('/elections', (req: Request, res: Response) => {
  res.render('modules/elections.ejs');
});

router.get('/vote', (req: Request, res: Response) => {
  res.render('modules/vote.ejs');
});

export default router;
