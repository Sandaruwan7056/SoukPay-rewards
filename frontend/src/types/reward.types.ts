
export type RewardCategory = 'LIFESTYLE' | 'TRAVEL' | 'ELECTRONICS' | 'VOUCHER' | 'EXPERIENCE';

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  points_cost: number;
  stock_remaining: number;
  is_active: boolean;
  type: RewardCategory; 
}

export interface ClaimRedemptionRequest {
  reward_id: string;
}

export interface ClaimRedemptionResponse {
  id: string;
  user_id: string;
  reward_id: string;
  points_cost: number;
  created_at: string;
  idempotency_key: string;
}