import axios from "axios";
import { getLoggedInUser } from "./AuthService";

const AUTH_REST_API_URL = "http://localhost:8080/api/member";

axios.interceptors.request.use(
  function (config) {
    // config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const saveMember = (data: any) =>
  axios.post(AUTH_REST_API_URL, data);

export const getAllMembers = () =>
  axios.get(AUTH_REST_API_URL);

export const getMemberById = (id:number) =>
axios.get(AUTH_REST_API_URL + "/" + id);

export const updateMember = (id: number, data:{}) =>
  axios.put(AUTH_REST_API_URL + "/update/" + id, data);

export const deleteMember = (id: number) =>
  axios.delete(AUTH_REST_API_URL + "/delete/" + id);

export const search = (name:string, email:string, phoneNumber: string) =>
  axios.get(AUTH_REST_API_URL + "/search?name=" + name + "&email=" + email + "&phoneNumber=" + phoneNumber);