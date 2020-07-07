import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('index');
});

router.get('/my-polling-location', (req: Request, res: Response) => {
  res.render('modules/polling');
});

router.get('/representatives', (req: Request, res: Response) => {
  res.render('modules/representatives');
});

router.get('/elections', (req: Request, res: Response) => {
  res.render('modules/elections');
});

router.get('/vote', (req: Request, res: Response) => {
  res.render('modules/vote');
});

export default router;
