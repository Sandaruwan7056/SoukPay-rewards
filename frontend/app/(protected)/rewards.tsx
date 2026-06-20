import { RewardCardSkeleton } from "@/src/components/common/Skeletons";
import { RedemptionModal } from "@/src/components/reward/RedemptionModal";
import { RewardCard } from "@/src/components/reward/RewardCard";
import { useCountUpAnimation } from "@/src/hooks/useCountUpAnimation";
import { rewardService } from "@/src/services/rewards.service";
import { useAppSelector } from "@/src/store/hooks";
import { RewardItem } from "@/src/types/reward.types";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function RewardsScreen() {
  const user = useAppSelector((state: any) => state.auth.user);
  const rawBalance = user?.pointsBalance ?? 0;
  const displayBalance = useCountUpAnimation(rawBalance);
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const syncMarketplaceState = useCallback(async () => {
    try {
      const rewardsList = await rewardService.getRewards();
      setRewards(rewardsList);
    } catch (error: any) {
      console.error("Marketplace loading pipeline failure:", error);
      Toast.show({ type: "error", text1: "Failed syncing balance data stores." });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);


  useFocusEffect(
    useCallback(() => {
      if (rewards.length === 0) {
        setLoading(true);
      }
      syncMarketplaceState();
    }, [syncMarketplaceState, rewards.length])
  );

  const handleCardPress = (reward: RewardItem) => {
    setSelectedReward(reward);
    setModalVisible(true);
  };

  return (
    <View className="flex-1 bg-[#FBF8FF] px-6 pt-8">
      <FlatList
        data={loading && rewards.length === 0 ? (Array.from({ length: 3 }) as RewardItem[]) : rewards}
        keyExtractor={(item, index) => item?.id ? item.id : `reward-skeleton-${index}`}
        renderItem={({ item }) =>
          loading && rewards.length === 0 ? (
            <RewardCardSkeleton />
          ) : (
            <RewardCard reward={item} userBalance={displayBalance} onPress={() => handleCardPress(item)} />
          )
        }
        ListHeaderComponent={() => (
          <View className="mb-16">
            <Text className="text-[#464653] font-inter font-medium text-[12px] leading-4 tracking-[1.2px] uppercase">
              Available Balance
            </Text>
            <View className="flex-row items-center my-4">
              <Text className="text-[48px] leading-[48px] tracking-[-1.2px] font-manrope-bold font-extrabold text-[#00003C]">
                {displayBalance.toLocaleString()}
              </Text>
              <View className="w-8 h-8  items-center justify-center ml-2.5">
                <Image
                  source={require("@/assets/images/rewards/start.png")}
                  className="w-full h-full"
                  accessibilityLabel="balance"
                />
              </View>
            </View>
            <View className="flex-row gap-x-2 mt-2">
              <View className="bg-[#FFE16D] px-4 py-2 rounded-full">
                <Text className="text-[#221B00] font-inter-bold text-[12px] uppercase tracking-wider">Elite Tier</Text>
              </View>
              <View className="bg-[#EAE7F0] px-4 py-2 rounded-full">
                <Text className="text-[#464653] font-inter-bold text-[12px] uppercase tracking-wider">Expires in 12d</Text>
              </View>
            </View>

            <View className="flex-row gap-x-4 mt-16">
              <View className="bg-[#00003C] px-4 py-3 rounded-full">
                <Text className="text-[#ffffff] font-inter-bold text-[14px] uppercase tracking-wider">All Rewards</Text>
              </View>
              <View className="bg-[#F5F2FC] px-4 py-3 rounded-full">
                <Text className="text-[#464653] font-inter-bold text-[14px] uppercase tracking-wider">Lifestyle</Text>
              </View>
              <View className="bg-[#F5F2FC] px-4 py-3 rounded-full">
                <Text className="text-[#464653] font-inter-bold text-[14px] uppercase tracking-wider">Travel</Text>
              </View>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); syncMarketplaceState(); }} tintColor="#00003C" />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <RedemptionModal
        visible={modalVisible}
        reward={selectedReward}
        onClose={() => { setModalVisible(false); setSelectedReward(null); }}
        onSuccess={() => {
          setModalVisible(false);
          setSelectedReward(null);
          syncMarketplaceState();
        }}
      />
    </View>
  );
}