import { TrendingUp } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

interface HeaderCardProps {
  balance: number;
  isUpdating: boolean;
}

export function HistoryHeaderCard({ balance, isUpdating }: HeaderCardProps) {
  return (
    <View className="w-full gap-y-2">
      <View className="flex-row justify-center items-center gap-x-2">
        <Text className="text-[10px] font-inter  tracking-widest text-slate-400 uppercase text-center">
          {isUpdating && " < RefreshCcw /> Updating Ledger..."}
        </Text>
      </View>

      <View className="w-full bg-[#00003C] mt-2 rounded-3xl p-6 shadow-xl">
        <Text className="text-[#FFFFFF99] font-inter  text-[10px] leading-[15px] tracking-[2px] uppercase">
          Portfolio Value
        </Text>

        <View className="flex-row items-baseline mt-2">
          <Text className="text-[#FCD400] text-[20px] font-manrope-bold font-extrabold mr-2">$</Text>
          <Text className="text-[36px] font-manrope-bold leading-[40px] font-extrabold tracking-[-0.9px] text-white">
            {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>

        <View className="bg-white/10 px-2.5 py-1.5 rounded-full self-start flex-row items-center gap-x-1 mt-6">
          <TrendingUp size={12} color="#FCD400" strokeWidth={2.5} />
          <Text className="text-white font-inter font text-[12px]">
            {" "}+12.4%
          </Text>
        </View>
      </View>
    </View>
  );
}