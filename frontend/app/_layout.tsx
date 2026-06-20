import { OfflineBanner } from "@/src/components/common/OfflineBanner";
import { setCredentials } from "@/src/features/auth/authSlice";
import { useNetwork } from "@/src/hooks/useNetwork";
import { useAppDispatch } from "@/src/store/hooks";
import { store } from "@/src/store/store";
import { getSession } from "@/src/utils/token";
import { Inter_400Regular, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import { Manrope_400Regular, Manrope_700Bold } from "@expo-google-fonts/manrope";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import "./../global.css";

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const router = useRouter();
  const { isOnline } = useNetwork();
  const dispatch = useAppDispatch(); 

  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": Inter_400Regular,
    "Inter-Bold": Inter_700Bold,
    "Manrope-Regular": Manrope_400Regular,
    "Manrope-Bold": Manrope_700Bold,
  });

  const [isAppReady, setIsAppReady] = useState(false);
  const [session, setSession] = useState<null | { token: string }>(null);

  useEffect(() => {
    async function initializeApp() {
      if (!fontsLoaded && !fontError) return;

      try {
        const currentSession = await getSession();
        if (currentSession) {
          dispatch(setCredentials({ token: currentSession.token }));
        }
        setSession(currentSession);
      } catch (e) {
        console.warn("Failed to restore session storage token:", e);
      } finally {
        setIsAppReady(true);
        await SplashScreen.hideAsync();
      }
    }

    initializeApp();
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (!isAppReady) return;

    if (session) {
      router.replace("/(protected)");
    } else {
      router.replace("/(auth)/login");
    }
  }, [isAppReady, session]);

  if (!isAppReady) {
    return null;
  }

  return (
    <View className="flex-1 bg-[#FBF8FF]">
      <Stack screenOptions={{ headerShown: false }} />
      <OfflineBanner isOnline={isOnline} />
    </View>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
}