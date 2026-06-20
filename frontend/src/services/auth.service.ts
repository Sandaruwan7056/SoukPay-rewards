import api from "../lib/api";
import { LoginRequest, LoginResponse } from "../types/auth.types";

export const loginService  = async (data:LoginRequest):Promise<LoginResponse> =>{
    const response = await api.post("/auth/login",data);
    return response.data;
}
