import api from './axios';

export const getStoreCategories = async () => {
  try {
    const response = await api.get('/categories/stores');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const processStoreCategories = async (categories) => {
  try {
    const response = await api.patch('/categories/stores', { categories });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
