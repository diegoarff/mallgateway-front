import api from "./axios";

export const getStores = async () => {
  try {
    const response = await api.get("/stores");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
