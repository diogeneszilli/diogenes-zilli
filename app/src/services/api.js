import axios from "axios";

const baseUrl = process.env.REACT_APP_GITHUB_API;
const username = process.env.REACT_APP_AUTH_USERNAME;
const password = process.env.REACT_APP_AUTH_PASSWORD;

const api = axios.create({ 
    baseURL: baseUrl,
    auth: {
        username: username,
        password: password
    } 
});

export default api;