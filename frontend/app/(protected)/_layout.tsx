import { logout } from "@/src/features/auth/authSlice";
import { clearSession } from "@/src/utils/token";
import { Tabs, useRouter } from "expo-router";
import { Bell, Gift, History, Home } from "lucide-react-native";
import React from "react";
import { Alert, Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function ProtectedLayout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out of The Vault?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await clearSession();
            dispatch(logout());
            router.replace("/(auth)/login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const inlineShadow = Platform.select({
    ios: {
      shadowColor: "#1B1B22",
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.06,
      shadowRadius: 40,
    },
    android: {
      elevation: 20,
    },
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        header: () => (
          <SafeAreaView 
            edges={["top"]} 
            style={inlineShadow} 
            className="bg-white"
          >
            <View className="flex-row items-center justify-between px-6 pb-4 pt-2 bg-white">
              <View className="flex-row items-center gap-3">
                

                <TouchableOpacity 
                  onPress={handleLogout}
                  activeOpacity={0.7}
                  className="w-10 h-10 rounded-full border-2 border-[#FCD400] items-center justify-center overflow-hidden"
                >
                  <Image
                    source={require("@/assets/images/dashboard/user.png")} 
                    className="w-full h-full"
                    accessibilityLabel="user icon"
                  />
                </TouchableOpacity>

                <View>
                  <Text className="text-[12px] tracking-wider font-inter text-[#464653] font-medium uppercase">
                    Welcome Back
                  </Text>
                  <Text className="text-[18px] font-manrope-bold font-extrabold text-[#00003C]">
                    The Vault
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="relative p-2 rounded-full active:bg-slate-50">
                <Bell size={24} color="#02022E" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        ),
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: Platform.OS === "ios" ? 88 : 85, 
          borderTopWidth: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingTop: Platform.OS === "ios" ? 12 : 20,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          ...inlineShadow,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View className="w-full h-[60px] items-center justify-center">
              <View className={`items-center justify-center px-4 py-2 rounded-[32px] min-w-[95px] ${focused ? "bg-[#FCD400]" : ""}`}>
                <Home size={22} color={focused ? "#00003C" : color} strokeWidth={2.5} />
                <Text 
                  numberOfLines={1} 
                  className={`text-[10px] font-inter-bold font-bold uppercase tracking-widest mt-0.5 ${focused ? "text-[#00003C]" : "text-[#94A3B8]"}`}
                >
                  Home
                </Text>
              </View>
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <View className="w-full h-[60px] items-center justify-center">
              <View className={`items-center justify-center px-4 py-2 rounded-[32px] min-w-[95px] ${focused ? "bg-[#FCD400]" : ""}`}>
                <History size={22} color={focused ? "#00003C" : color} strokeWidth={2.5} />
                <Text 
                  numberOfLines={1}
                  className={`text-[10px] font-inter-bold font-bold uppercase tracking-widest mt-0.5 ${focused ? "text-[#00003C]" : "text-[#94A3B8]"}`}
                >
                  History
                </Text>
              </View>
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ color, focused }) => (
            <View className="w-full h-[60px] items-center justify-center">
              <View className={`items-center justify-center px-4 py-2 rounded-[32px] min-w-[95px] ${focused ? "bg-[#FCD400]" : ""}`}>
                <Gift size={22} color={focused ? "#00003C" : color} strokeWidth={2.5} />
                <Text 
                  numberOfLines={1}
                  className={`text-[10px] font-inter-bold font-bold uppercase tracking-widest mt-0.5 ${focused ? "text-[#00003C]" : "text-[#94A3B8]"}`}
                >
                  Rewards
                </Text>
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}