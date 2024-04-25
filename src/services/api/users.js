import api from "./axios";

export const getUserFollowedProducts = async () => {
  try {
    const response = await api.get("/users/interested/products");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getUserFollowedStores = async () => {
  try {
    const response = await api.get("/users/interested/stores");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
