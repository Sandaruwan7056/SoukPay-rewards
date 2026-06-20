import { useNetwork } from "@/src/hooks/useNetwork";
import { RewardItem } from "@/src/types/reward.types";
import { Lock } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const REWARD_IMAGES: Record<string, any> = {
  "vanguard timepiece": require("@/assets/images/rewards/vanguard-times.png"),
  "pro sound headphones": require("@/assets/images/rewards/pro-sound-headphones.png"),
  "first class upgrade": require("@/assets/images/rewards/first-class-upgrade.png"),
  "zen spa escape": require("@/assets/images/rewards/zen-spa-escape.png"),
};

interface RewardCardProps {
  reward: RewardItem;
  userBalance: number;
  onPress: () => void;
}

export function RewardCard({ reward, userBalance, onPress }: RewardCardProps) {
  const isAffordable = userBalance >= reward.points_cost;
  const { isOnline } = useNetwork();
  const canInteract = isAffordable && isOnline;

  const getRewardImageSource = () => {
    const normalizedName = reward.name?.toLowerCase().trim() || "";
    
    if (REWARD_IMAGES[normalizedName]) {
      return REWARD_IMAGES[normalizedName];
    }

    return require("@/assets/images/rewards/vanguard-times.png"); 
  };

  return (

    <View className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm mb-5 relative">
      
   
      <View className="w-full h-[256px] relative">
        <Image
          source={getRewardImageSource()}
          className={`w-full h-full ${!isAffordable ? "opacity-60" : ""}`}
          resizeMode="cover"
        />
        
        {!isAffordable && (
          <View className="absolute inset-0 bg-[#00003C66] items-center justify-center p-4 z-10">
            <View className="bg-white px-4 py-2 rounded-full flex-row items-center gap-x-1.5 shadow-md">
              <Lock size={14} color="#00003C" strokeWidth={2.5} />
              <Text className="text-[#00003C] font-inter-bold font-bold text-[12px] uppercase tracking-wider">
                Insufficient Points
              </Text>
            </View>
          </View>
        )}
      </View>

      <View className={`p-5 ${!isAffordable ? "opacity-60" : ""}`}>
        <View className="flex-row justify-between items-start gap-x-2">
          <Text className="text-[20px] font-manrope-bold font-extrabold text-[#00003C] flex-1">
            {reward.name}
          </Text>
          <View className="bg-[#FCD40033] px-2.5 py-1 rounded-md">
            <Text className="text-[#705D00] font-inter-bold text-[12px] uppercase">
              {reward.stock_remaining} Left
            </Text>
          </View>
        </View>

        <Text className="text-[14px] font-inter text-[#464653] mt-2 leading-relaxed" numberOfLines={2}>
          {reward.description}
        </Text>

        <View className="flex-row items-center justify-between border-t border-slate-50 mt-4 pt-4">
          <View>
            <Text className="text-[12px] font-inter text-[#767684] uppercase tracking-widest">Cost</Text>
            <Text className="text-[18px] font-manrope-bold font-extrabold text-[#00003C] mt-1">
              {reward.points_cost.toLocaleString()}{" "}pts
            </Text>
          </View>

          <TouchableOpacity
            onPress={onPress}
            disabled={!canInteract}
            className="px-6 py-3 rounded-full flex-row items-center bg-[#00003C] active:opacity-90"
          >
            <Text className="font-manrope-bold text-[14px] text-white">
              {!isOnline ? "Offline" : isAffordable ? "Claim Now" : "Locked"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}