import { PointLedgerEntry } from "@/src/types/user.types";
import {
  Award,
  Car,
  Gift,
  Plane,
  RefreshCw,
  ShoppingBag,
  Users,
  Utensils,
  Wallet
} from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

const getRowMeta = (reason: string, delta: number) => {
  const r = reason.toLowerCase();
  const isEarn = delta >= 0;
  const size = 20;

  const dynamicColor = isEarn ? "#FCD400" : "#EF4444";
  const dynamicBg = isEarn ? "#FCD4001A" : "#EF444415";

  let statusText = isEarn ? "EARNED" : "REDEEMED";
  let bg = dynamicBg; 


  let icon = <Award size={size} color={dynamicColor} />;


  if (r.includes("luxury")) {
    icon = <ShoppingBag size={size} color={dynamicColor} />;
  } else if (r.includes("bolt rides")) {
    icon = <Car size={size} color={dynamicColor} />;
  } else if (r.includes("global airways")) {
    icon = <Plane size={size} color={dynamicColor} />;
  } else if (r.includes("maison bistro")) {
    icon = <Utensils size={size} color={dynamicColor} />;
  } else if (r.includes("referral")) {
    icon = <Users size={size} color={dynamicColor} />;
  } 

  else if (r.includes("cashback")) {
    icon = <Gift size={size} color={dynamicColor} />;
  } else if (r.includes("interest")) {
    icon = <Wallet size={size} color={dynamicColor} />;
  } else if (r.includes("transfer")) {
    icon = <RefreshCw size={size} color={dynamicColor} />;
  }

  return { icon, bg, statusText };
};

export function TransactionItemRow({ entry }: { entry: PointLedgerEntry }) {
  const isEarn = entry.delta >= 0;
  const { icon, bg, statusText } = getRowMeta(entry.reason, entry.delta);

  const formattedDate = new Date(entry.created_at)
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase();

  return (
    <View className="flex-row items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-2.5">
      <View className="flex-row items-center gap-3.5 flex-1 pr-2">
        <View 
          style={{ backgroundColor: bg }} 
          className="p-4 rounded-full items-center justify-center w-12 h-12"
        >
          {icon}
        </View>
        <View className="flex-1">
          <Text className="font-manrope-bold font-bold text-[16px] text-[#1B1B22] max-w-[200px]" numberOfLines={1}>
            {entry.reason}
          </Text>
          <Text className="text-[10px] font-inter text-[#464653] uppercase mt-2">
            Vault System • {formattedDate}
          </Text>
        </View>
      </View>

      <View className="items-end min-w-[75px]">
        <Text className={`font-manrope-bold font-extrabold text-[16px] ${isEarn ? "text-[#2E7D32]" : "text-[#BA1A1A]"}`}>
          {isEarn ? `+$${entry.delta.toFixed(2)}` : `-$${Math.abs(entry.delta).toFixed(2)}`}
        </Text>
        <Text className="text-[10px] font-inter font-semibold text-[#464653] uppercase">
          {statusText}
        </Text>
      </View>
    </View>
  );
}