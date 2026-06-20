import { LoginForm } from "@/src/components/auth/LoginForm";
import { setCredentials } from "@/src/features/auth/authSlice";
import { saveSession } from "@/src/utils/token";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { loginService } from "../../src/services/auth.service";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (email: string, password: string) => {
    if (!email || !email.includes("@") || !password) {
      Toast.show({ type: "error", text1: "Please provide valid credentials" });
      return;
    }

    try {
      setLoading(true);
      const response = await loginService({ email, password });
      await saveSession(response.token);
      dispatch(setCredentials({ token: response.token }));
      
      Toast.show({ type: "success", text1: "Login successful" });
      router.replace("/(protected)");
    } catch (error: any) {
      console.log("LOGIN ERROR:", error.response?.data);
      Toast.show({ type: "error", text1: error.response?.data.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm 
      onSubmit={handleLoginSubmit} 
      loading={loading} 
      insets={insets} 
    />
  );
}