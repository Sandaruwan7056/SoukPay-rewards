import { PointLedgerEntry } from "@/src/types/user.types";
import { Award, Gift, Landmark, RefreshCw } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { TransactionRowSkeleton } from "../common/Skeletons";


const ASSETS = {
  luxury: require("@/assets/images/dashboard/luxury.png"),
  bolt: require("@/assets/images/dashboard/bolt.png"),
  airways: require("@/assets/images/dashboard/airways.png"),
  maison: require("@/assets/images/dashboard/maison.png"),
  referral: require("@/assets/images/dashboard/referral.png"), 
};

const getMeta = (reason: string, delta: number) => {
  const r = reason.toLowerCase();

  const imgStyle = { width: 20, height: 20, resizeMode: "contain" as const };
  const iconColor = "#464653";

  if (r.includes("luxury")) {
    return { icon: <Image source={ASSETS.luxury} style={imgStyle} />, cat: "Luxury" };
  }
  if (r.includes("bolt rides")) {
    return { icon: <Image source={ASSETS.bolt} style={imgStyle} />, cat: "Transport" };
  }
  if (r.includes("global airways")) {
    return { icon: <Image source={ASSETS.airways} style={imgStyle} />, cat: "Travel" };
  }
  if (r.includes("maison bistro")) {
    return { icon: <Image source={ASSETS.maison} style={imgStyle} />, cat: "Dining" };
  }
  if (r.includes("referral")) {
    return { icon: <Image source={ASSETS.referral} style={imgStyle} />, cat: "Reward" };
  }


  if (r.includes("cashback")) {
    return { icon: <Gift size={20} color={iconColor} />, cat: "Cashback" };
  }
  if (r.includes("interest")) {
    return { icon: <Landmark size={20} color={iconColor} />, cat: "Interest" };
  }
  if (r.includes("transfer")) {
    return { icon: <RefreshCw size={20} color={iconColor} />, cat: "Transfer" };
  }


  return delta < 0
    ? { icon: <Award size={20} color={iconColor} />, cat: "Redemption" }
    : { icon: <Award size={20} color={iconColor} />, cat: "Activity" };
};

interface ActivityLogProps {
  transactions: PointLedgerEntry[];
  loading: boolean; 
}

export function ActivityLog({ transactions, loading }: ActivityLogProps) {
  return (
    <View className="gap-y-3">
      <View className="flex-row justify-between items-center px-1">
        <Text className="text-[24px] leading-8 tracking-tighter font-manrope-bold font-extrabold text-[#1B1B22]">Activity Log</Text>
        <TouchableOpacity>
          <Text className="text-[12px] font-inter-bold text-[#00003C] border-b-2 border-[#FCD400] uppercase">View All</Text>
        </TouchableOpacity>
      </View>
      <View className="gap-y-5">
        {loading ? (
          <>
            <TransactionRowSkeleton />
            <TransactionRowSkeleton />
            <TransactionRowSkeleton />
          </>
        ) : (
          transactions?.map((tx, index) => {
            const { icon, cat } = getMeta(tx.reason, tx.delta);
            return (
              <View key={`${tx.id}-${index}`} className="flex-row items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                <View className="flex-row items-center gap-3.5">
                  <View className="p-4 rounded-xl bg-[#EFECF6] items-center justify-center w-12 h-12">
                    {icon}
                  </View>
                  <View>
                    <Text className="font-manrope-bold font-bold text-[16px] text-[#1B1B22] max-w-[200px]" numberOfLines={1}>{tx.reason}</Text>
                    <Text className="text-[10px] font-inter text-[#464653] uppercase mt-2">
                      {new Date(tx.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })} • {cat}
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className={`font-manrope-bold font-extrabold text-[16px] ${tx.delta >= 0 ? "text-[#00003C]" : "text-[#BA1A1A]"}`}>
                    {tx.delta >= 0 ? `+${tx.delta.toLocaleString()}` : tx.delta.toLocaleString()}
                  </Text>
                  <Text className="text-[10px] font-inter font-semibold text-[#464653] uppercase">Points</Text>
                </View>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}