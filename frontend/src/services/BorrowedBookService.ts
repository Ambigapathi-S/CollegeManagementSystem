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
  axios.put(AUTH_REST_API_URL + "/borrow/" + id, data);

export const getAllBorrowBookList = () => axios.get(AUTH_REST_API_URL);

export const getBorrowBookListById = (id: number) =>
  axios.get(AUTH_REST_API_URL + "/" + id);

export const getBorrowListByBookIDAndMemberID = (
  book_id: number,
  member_id: number
) =>
  axios.get(
    AUTH_REST_API_URL + "/filter?book_id=" + book_id + "&member_id=" + member_id
  );

export const getAllBorrowBookListByStatus = (status: string) =>
  axios.get(AUTH_REST_API_URL + "/find?status=" + status);
