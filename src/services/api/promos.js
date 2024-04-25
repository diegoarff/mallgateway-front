import { useAuthStore } from "../../stores/auth";
import { ROLES } from "../../utils/constants";
import api from "./axios";

export const getPromos = async (params) => {
  try {
    const response = await api.get("/promos", { params });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getPromosFromFollowed = async (params) => {
  try {
    const user = await useAuthStore.getState().user;
    if (user?.role === ROLES.GUEST) return { results: [] };

    const response = await api.get("/promos/followed", { params });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getPromo = async (promoId) => {
  try {
    const response = await api.get(`/promos/${promoId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createPromo = async (promo) => {
  try {
    const response = await api.post("/promos", promo);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updatePromo = async (promoId, promo) => {
  try {
    const response = await api.put(`/promos/${promoId}`, promo);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deletePromo = async (promoId) => {
  try {
    const response = await api.delete(`/promos/${promoId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const handlePromoActive = async (promoId) => {
  try {
    const response = await api.post(`/promos/${promoId}/active`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
