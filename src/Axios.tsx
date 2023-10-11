import axios from "axios";
const BASE_URL = 'https://ailaptopbe-production.up.railway.app';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization',
        "Access-Control-Allow-Origin": '*',

    }
})