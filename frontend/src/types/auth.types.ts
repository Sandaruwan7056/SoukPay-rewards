export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type JwtPayload = {
  userId: string;
  iat: number;
  exp: number;
};

export type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    pointsBalance: number;
  } | null;
};
