import React from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";

export function QuickActions() {
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
    <View className="flex-row gap-6 justify-center mx-auto w-full">
      <TouchableOpacity className="flex-1 p-6 max-w-[160px] bg-white  rounded-[12px] border border-slate-100 items-start active:scale-95" style={inlineShadow}>
        <View className="p-3 bg-[#0000801A] rounded-full items-center justify-center w-12 h-12 mb-3">
          <Image
            source={require("@/assets/images/dashboard/transferPoints.png")}
            accessibilityLabel="Transfer Points"
          />
        </View>
        <Text className="font-manrope-bold font-bold text-[18px] text-[#1B1B22]">Transfer Points</Text>
        <Text className="text-[12px] font-inter text-[#464653] mt-0.5">Send to partners</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-1 bg-[#F5F2FC]  max-w-[160px] p-6 rounded-[12px]  border border-slate-100 items-start  active:scale-95 style={inlineShadow}">
        <View className="p-3 bg-[#FCD40033] rounded-full items-center justify-center w-12 h-12 mb-3">
          <Image
            source={require("@/assets/images/dashboard/savings.png")}
            accessibilityLabel="Transfer Points"
          />
        </View>
        <Text className="font-manrope-bold font-bold text-[18px] text-[#1B1B22]">Boost Earnings</Text>
        <Text className="text-[12px] font-inter text-[#464653] mt-0.5">Active multipliers</Text>
      </TouchableOpacity>
    </View>
  );
}