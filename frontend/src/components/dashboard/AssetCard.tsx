import { useCountUpAnimation } from "@/src/hooks/useCountUpAnimation";
import { router } from "expo-router";
import { Star } from "lucide-react-native";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

export function AssetCard({ balance }: { balance: number }) {
  const displayBalance = useCountUpAnimation(balance);

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
    <View className="w-full rounded-3xl p-8 shadow-xl bg-[#00003C]" style={inlineShadow}>
      <Text className="text-[#FFE16D] font-inter-bold font-semibold leading-4  text-[12px] tracking-[2.4px] uppercase">
        Current Assets
      </Text>
      <View className="mt-2 mb-4">
        <Text className="text-[48px] font-manrope-bold font-extrabold leading-[48px] tracking-[-2.4px] text-white">
          {displayBalance.toLocaleString()}
        </Text>
        <Text className="text-[#E4E1EBCC] text-[16px] leading-6 tracking-normal font-inter font-medium mt-1">
          Vault Points Available
        </Text>
      </View>
      <View className="flex-row items-center justify-between mt-4">
        <View className="flex-row">
          <View className="w-8 h-8 rounded-full bg-[#E4E1EB] items-center justify-center border-2 border-[#00003C] z-10">
            <Text className="font-inter-bold text-xs text-[#00003C]">S</Text>
          </View>
          <View className="w-8 h-8 rounded-full bg-[#FCD400] items-center justify-center border-2 border-[#00003C] -ml-2 z-20">
            <Star fill="#00003C" size={12} />
          </View>
        </View>
        <TouchableOpacity className="bg-[#FCD400] px-5 py-3 rounded-full active:opacity-90" onPress={() => router.replace("/rewards")}>
          <Text className="text-[#6E5C00] font-manrope font-bold  text-[15px] ">Redeem Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}