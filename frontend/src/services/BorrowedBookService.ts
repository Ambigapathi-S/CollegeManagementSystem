import axios from "axios";
import { getLoggedInUser } from "./AuthService";

const AUTH_REST_API_URL = "http://localhost:8080/api/books";

axios.interceptors.request.use(
  function (config) {
    // config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const saveBorrowedBook = (data: any) =>
  axios.post(AUTH_REST_API_URL + "/borrow", data);

export const returnBorrowedBook = (id: number, data: {}) =>
  axios.put(AUTH_REST_API_URL + "/return/" + id, data);

export const getAllBorrowBookList = () => axios.get(AUTH_REST_API_URL);

export const getBorrowBookListById = (id: number) =>
  axios.get(AUTH_REST_API_URL + "/" + id);

export const getBorrowListByBookIDAndMemberID = (data: any) => axios.get(AUTH_REST_API_URL + "/filter", data);