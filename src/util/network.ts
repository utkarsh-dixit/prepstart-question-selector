import axios from "axios";
import url from "url";
import {serverName} from "../config/config";

axios.defaults.headers.common['Authorization'] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0OSwicm9sZSI6InN0YW5kYXJkIiwiaWF0IjoxNTczNTgwOTU2fQ.J39i1eckNQ01dQ4DKeidktirP2r5M1qqQ_sF6_DjfW0``;

// Send API Request and execute function in case of request fail.
export const requestAPICall = async (endpoint, payload) => {
    let result: any;
    const request = Object.entries(payload).length === 0 ? axios.get(url.resolve(serverName, endpoint)) : axios.post(url.resolve(serverName, endpoint), payload);
    await request
    .then((res) => {
        result = res;
    }).catch((err) => {
        alert("Your Internet is not on");
        throw err;
    });
    return result;
};
