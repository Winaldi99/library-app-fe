import axios from "axios";

const API_BASE_URL = "https://final-library-app-be.vercel.app";

export const bookAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/books`),
  getById: (id: string) => axios.get(`${API_BASE_URL}/books/${id}`),
  create: (data: any) => axios.post(`${API_BASE_URL}/books`, data),
  update: (id: string, data: any) =>
    axios.put(`${API_BASE_URL}/books/${id}`, data),
  delete: (id: string) => axios.delete(`${API_BASE_URL}/books/${id}`),
  toggleFavorite: (id: string) =>
    axios.patch(`${API_BASE_URL}/books/${id}/favorite`)
};

export const categoryAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/categories`),
  create: (data: any) => axios.post(`${API_BASE_URL}/categories`, data),
  delete: (id: string) => axios.delete(`${API_BASE_URL}/categories/${id}`)
};
