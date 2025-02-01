import axios from 'axios';

const ORS_API_KEY = 'YOUR_ORS_API_KEY'; // Replace with your actual API key
const ORS_BASE_URL = 'https://api.openrouteservice.org';

const orsApi = axios.create({
  baseURL: ORS_BASE_URL,
  headers: {
    'Authorization': ORS_API_KEY,
    'Content-Type': 'application/json',
  },
});

export default orsApi;
