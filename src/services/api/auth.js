import api from "./axios";

export const register = async (data) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const login = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const changePassword = async (data) => {
  try {
    const response = await api.post("/auth/change-password", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
