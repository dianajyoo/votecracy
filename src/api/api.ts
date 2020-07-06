import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

const getAddress = (query: any) => {
  const address = query.toString() || '';
  return encodeURIComponent(address);
};

export const getOfficials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const address = getAddress(req.query.address);
  const URL = `https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${address}&key=${process.env.GOOGLE_CIVIC_INFO_API_KEY}`;

  try {
    const resp = await axios.get(URL);
    if (resp.data) return res.status(200).json({ result: resp.data });
  } catch (err) {
    console.log('GET /api/representatives failed', err);
    return res.status(500).json({ err });
  }
};

export const getVoterInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const address = getAddress(req.query.address);
  const URL = `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${address}&key=${process.env.GOOGLE_CIVIC_INFO_API_KEY}`;

  try {
    const resp = await axios.get(URL);
    if (resp.data) return res.status(200).json({ result: resp.data });
  } catch (err) {
    console.log('GET /api/voter-info failed', err);
    return res.status(500).json({ err });
  }
};

export const getGeocode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const address = getAddress(req.query.address);
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_GEOCODING_API_KEY}`;
  console.log('url', URL);

  try {
    const resp = await axios.get(URL);
    if (resp.data) return res.status(200).json({ result: resp.data });
  } catch (err) {
    console.log('GET /api/geocode failed', err);
    return res.status(500).json({ err });
  }
};
