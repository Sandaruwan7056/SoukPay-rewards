import api from "../lib/api";
import { RewardItem } from "../types/reward.types";

export const rewardService = {

  getRewards: async (): Promise<RewardItem[]> => {
    const response = await api.get("/rewards");
    return response.data;
  },

  redeemReward: async (id: string, idempotencyKey: string): Promise<any> => {
    const response = await api.post(
      `/rewards/${id}/redeem`, 
      {}, 
      {
        headers: {
          "x-idempotency-key": idempotencyKey, 
        },
      }
    );
    return response.data;
  },
};