import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/auth.types";


export const saveSession = async (token: string) => {
    await SecureStore.setItemAsync("session_token", token);
}


export const clearSession = async () => {
    await SecureStore.deleteItemAsync("session_token");
}


export const getSession = async () => {
    const token = await SecureStore.getItemAsync("session_token");

    if (!token) {
        return null;
    }

    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp * 1000 < Date.now()) {
        await clearSession();
        return null;
    }
    return { token };
}