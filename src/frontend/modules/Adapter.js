import axios from 'axios';

let endpoint = 'http://localhost:8080';

if (process.env.NODE_ENV === 'production') {
  endpoint = 'https://votecracy.herokuapp.com';
}

export const getOfficials = async (address) => {
  return await axios.get(`${endpoint}/api/representatives/?address=${address}`);
};

export const getVoterInfo = async (address) => {
  return await axios.get(`${endpoint}/api/voter-info/?address=${address}`);
};

export const getGeocode = async (address) => {
  return await axios.get(`${endpoint}/api/geocode/?address=${address}`);
};
