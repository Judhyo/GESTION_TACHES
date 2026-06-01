import axios from "axios";

const API_URL = "https://gestion-taches-61ze.onrender.com/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const cardApi = {
  createCard: async (formData) => {
    try {
      const response = await api.post("/card/", formData);
      return response;
    } catch {
      return { message: `Erreur lors de l'envoie du données` };
    }
  },
  readCard: async () => {
    try {
      const response = await api.get("/card/");
      return response.data;
    } catch {
      return null;
    }
  },
  updateCard: (id, formData) => {
    try {
      const response = api.put(`/card/${id}`, formData);
      return response;
    } catch {
      return null;
    }
  },
  deleteCard: async (id) => {
    try {
      const response = api.delete(`/card/${id}`);
      return response;
    } catch {
      return null;
    }
  },
};

export const columnApi = {
  createColumn: async (formData) => {
    try {
      const response = await api.post(`/column/`, formData);
      return response.data;
    } catch {
      throw Error("Erreur lors de la recupération de données");
    }
  },
  readColumn: async (id) => {
    try {
      const response = await api.get(`/column/${id}`);
      return response.data;
    } catch {
      throw Error("Erreur lors de la recupération de données");
    }
  },
  updateColumn: async (id, title) => {
    try {
      const response = await api.put(`/column/${id}`, title);
      return response.data;
    } catch {
      throw Error("Erreur lors de la recupération de données");
    }
  },
};

export const boardApi = {
  createBoard: async (formData) => {
    try {
      const response = await api.post(`/board/`, formData);
      return response.data;
    } catch {
      throw Error("Erreur lors de la recupération de données");
    }
  },
  readBoard: async (userId) => {
    try {
      const response = await api.get(`/board/${userId}`);
      return response.data;
    } catch {
      throw Error("Erreur lors de la recupération de données");
    }
  },
};
