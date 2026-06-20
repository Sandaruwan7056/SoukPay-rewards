export interface UserProfile {
  id: string;
  email: string;
  name: string;
  push_token: string | null;
  created_at: string;
  pointsBalance: number;
}

export interface PointLedgerEntry {
  id: string;
  user_id: string;
  delta: number;
  reason: string;
  created_at: string;
}

export interface PaginatedTransactions {
  transactions: PointLedgerEntry[];
  total: number;
  page: number;
  limit: number;
}