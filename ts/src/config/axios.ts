import axios from 'axios';
const BASE_URL: string = 'http://localhost:3000';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;