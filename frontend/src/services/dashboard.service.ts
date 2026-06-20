import api from "../lib/api";
import { PointLedgerEntry, UserProfile } from "../types/user.types";

export const dashboardService = {
  getMe: async (): Promise<UserProfile & { pointsBalance: number }> => {
    const response = await api.get("users/me");
    return {
      ...response.data.user,
      pointsBalance: response.data.balance 
    };
  },

  getTransactions: async (page = 1, limit =10): Promise<PointLedgerEntry[]> => {
    const response = await api.get(`users/me/transactions?page=${page}&limit=${limit}`);
    return response.data; 
  }
};