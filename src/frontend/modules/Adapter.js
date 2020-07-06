import axios from 'axios';

export const getOfficials = async (address) => {
  return await axios.get(
    `http://localhost:8080/api/representatives/?address=${address}`
  );
};

export const getVoterInfo = async (address) => {
  return await axios.get(
    `http://localhost:8080/api/voter-info/?address=${address}`
  );
};

export const getGeocode = async (address) => {
  return await axios.get(
    `http://localhost:8080/api/geocode/?address=${address}`
  );
};
