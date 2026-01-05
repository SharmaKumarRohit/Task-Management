import axios from "axios";
import { BASE_URL } from "../constant";

export const getTodos = (searchQuery) =>
  axios.get(`${BASE_URL}/todos?search=${searchQuery}`);

export const getSingleTodo = (id) => axios.get(`${BASE_URL}/todos/${id}`);

export const addTodo = (todo) => axios.post(`${BASE_URL}/todos`, todo);

export const toggleTodo = (id) => axios.put(`${BASE_URL}/todos/toggle/${id}`);

export const updateTodo = (id, data) =>
  axios.put(`${BASE_URL}/todos/${id}`, data);

export const deleteTodo = (id) => axios.delete(`${BASE_URL}/todos/${id}`);
