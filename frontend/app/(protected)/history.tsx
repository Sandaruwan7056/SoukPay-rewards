import { TransactionRowSkeleton } from "@/src/components/common/Skeletons";
import { HistoryHeaderCard } from "@/src/components/history/HistoryHeaderCard";
import { MilestoneCard } from "@/src/components/history/MilestoneCard";
import { TransactionItemRow } from "@/src/components/history/TransactionItemRow";
import { useCountUpAnimation } from "@/src/hooks/useCountUpAnimation";
import { dashboardService } from "@/src/services/dashboard.service";
import { useAppSelector } from "@/src/store/hooks";
import { PointLedgerEntry } from "@/src/types/user.types";
import { useFocusEffect } from "expo-router";
import { Search } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { FlatList, Image, RefreshControl, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HistoryScreen() {
  const user = useAppSelector((state: any) => state.auth.user);
  const rawBalance = user?.pointsBalance ?? 0;
  const displayBalance = useCountUpAnimation(rawBalance);

  const [transactions, setTransactions] = useState<PointLedgerEntry[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const LIMIT = 10;

  const fetchHistoryData = useCallback(async (targetPage: number, isRefreshing = false) => {
    try {
      const newEntries = await dashboardService.getTransactions(targetPage, LIMIT);
      if (newEntries.length < LIMIT) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setTransactions(prev => isRefreshing ? newEntries : [...prev, ...newEntries]);
    } catch (error) {
      console.error("Failed fetching ledger history payload:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      fetchHistoryData(1, true);
    }, [fetchHistoryData])
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setHasMore(true);
    setPage(1);
    fetchHistoryData(1, true);
  }, [fetchHistoryData]);

  const handleLoadMore = () => {
    if (loadingMore || !hasMore || loading) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    fetchHistoryData(nextPage, false);
  };

  return (
    <View className="flex-1 bg-[#FBF8FF] px-6 pt-2">
      <FlatList
        data={loading ? (Array.from({ length: 6 }) as unknown as PointLedgerEntry[]) : transactions}
        keyExtractor={(item, index) => item?.id ? `${item.id}-${index}` : `skeleton-${index}`}
        renderItem={({ item }) => loading ? <TransactionRowSkeleton /> : <TransactionItemRow entry={item} />}
        ListHeaderComponent={() => (
          <View className="gap-y-6 mb-4">
            <HistoryHeaderCard balance={displayBalance} isUpdating={refreshing || loadingMore} />
            <View className="flex-row gap-x-3 mt-10 items-center">
              <View className="flex-1 flex-row bg-[#E4E1EB] items-center px-4 py-4 rounded-full">
                <Search size={20} color="#767684" />
                <TextInput
                  placeholder="Search History"
                  placeholderTextColor="#767684"
                  className="flex-1 ml-3 text-[#767684] font-inter font-medium text-[14px] py-2"
                />
              </View>
              <TouchableOpacity
                className="w-14 h-14 bg-[#E4E1EB] rounded-full items-center justify-center active:opacity-70"
              >
                <Image
                  source={require("@/assets/images/history/filter.png")}
                  className="w-5 h-5"
                  resizeMode="contain"
                  accessibilityLabel="Filters"
                />
              </TouchableOpacity>
            </View>

            <View className="flex flex-row items-center mb-8 justify-between">
              <Text className="text-[20px] font-manrope-bold font-extrabold text-[#1B1B22] leading-6 tracking-[-0.5px] mt-2">
                Recent Activity
              </Text>
              <Text className="text-[12px] font-inter text-[#767684] leading-4  mt-2 tracking-[1.2px] uppercase">
                November 2023
              </Text>
            </View>

          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#00003C" />
        }
        ListFooterComponent={() => {
          if (loading) return null;
          if (!hasMore) {
            return (
              <View className="py-8 flex gap-6 items-center">
                <MilestoneCard />
                <Text className="text-xs font-inter font-semibold tracking-widest text-slate-400 uppercase text-center">
                  All entries loaded
                </Text>
              </View>
            );
          }
          return loadingMore ? (
            <View className="py-6">
              <TransactionRowSkeleton />
            </View>
          ) : null;
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}