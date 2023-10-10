import axios from "axios";
const BASE_URL = 'http://localhost:8080';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization',
        "Access-Control-Allow-Origin": '*',

    }
})