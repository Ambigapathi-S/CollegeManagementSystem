import axios from "axios";
import { getLoggedInUser } from "./AuthService";

const AUTH_REST_API_URL = "http://localhost:8080/api/book";

axios.interceptors.request.use(
  function (config) {
    // config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const saveBook = (data: any) =>
  axios.post(AUTH_REST_API_URL, data);

export const getAllBooks = () =>
  axios.get(AUTH_REST_API_URL);

export const getBookById = (id:number) =>
axios.get(AUTH_REST_API_URL + "/" + id);

export const updateBook = (id: number, data:{}) =>
  axios.put(AUTH_REST_API_URL + "/update/" + id, data);

export const deleteBook = (id: number) =>
  axios.delete(AUTH_REST_API_URL + "/delete/" + id);

export const search = (title: string, author: string, isbn: string, genre: string, publication_date: string, copies_available: number) =>
    axios.get(AUTH_REST_API_URL + "/search?title=" + title + "&author=" + author + "&isbn=" + isbn + "&genre=" + genre + "&publication_date=" + publication_date + "&copies_available=" + copies_available);