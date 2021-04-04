import axios from "axios";
import { BaseUrl } from './baseUrls'
import { history } from './history'
import * as ACTIONS from '../actions/authAction'
import { store } from '../store'

// Alter defaults after instance has been created
const authAxios = axios.create({
    baseURL: BaseUrl
});


// Add a request interceptor
authAxios.interceptors.request.use(
    config => {
        const token = (localStorage.getItem('kyrio')) !== undefined && (localStorage.getItem('kyrio')) !== null ? localStorage.getItem('kyrio') : '';
        if (token) {
            config.headers['kyrioToken'] = token;
        } else {
            delete axios.defaults.headers.common["kyrioToken"];

        }
        return config;
    },
    error => {
        Promise.reject(error)
    });



//Add a response interceptor

authAxios.interceptors.response.use((response) => {
    return response
}, function (error) {
    if (error.response.status === 401) {
        localStorage.removeItem("kyrio");
        localStorage.removeItem("endDate");
        localStorage.removeItem("startDate");
        localStorage.removeItem("persist:primary");
        store.dispatch(ACTIONS.Logout())
        return Promise.reject(error);
    }
    return Promise.reject(error);
});
export default authAxios