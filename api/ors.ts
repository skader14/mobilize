import axios from 'axios';

const ORS_API_KEY = '5b3ce3597851110001cf62486bc28679438e4b5586738071de93cc4d'; // Replace with your actual API key
const ORS_BASE_URL = 'https://api.openrouteservice.org';

const orsApi = axios.create({
  baseURL: ORS_BASE_URL,
  headers: {
    'Authorization': ORS_API_KEY,
    'Content-Type': 'application/json',
  },
});

export default orsApi;
