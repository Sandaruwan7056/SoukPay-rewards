import { ActivityLog } from "@/src/components/dashboard/ActivityLog";
import { AssetCard } from "@/src/components/dashboard/AssetCard";
import { PromoBanner } from "@/src/components/dashboard/PromoBanner";
import { QuickActions } from "@/src/components/dashboard/QuickActions";
import { updateUserProfile } from "@/src/features/auth/authSlice";
import { dashboardService } from "@/src/services/dashboard.service";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { PointLedgerEntry } from "@/src/types/user.types";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";

export default function DashboardScreen() {
  const user = useAppSelector((state: any) => state.auth.user);
  const token = useAppSelector((state: any) => state.auth.token); 
  const dispatch = useAppDispatch();

  const [transactions, setTransactions] = useState<PointLedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = useCallback(async () => {
    if (!token) return; 
    try {
      const [userData, transactionArray] = await Promise.all([
        dashboardService.getMe(),
        dashboardService.getTransactions(1, 5),
      ]);

      dispatch(updateUserProfile(userData));
      setTransactions(transactionArray);
    } catch (error) {
      console.error("Dashboard screen loading error:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch ,token]);

  useFocusEffect(
    useCallback(() => {
      if (!token) return;
      if (transactions.length === 0) {
        setLoading(true);
      }
      loadDashboardData();
    }, [loadDashboardData, transactions.length ,token])
  );

  return (
    <ScrollView
      className="flex-1 bg-[#FBF8FF] px-6 pt-8"
      contentContainerStyle={{ paddingBottom: 110 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-y-12">
        <AssetCard balance={user?.pointsBalance ?? 0} />
        <QuickActions />
        <ActivityLog transactions={transactions} loading={loading} />
        <PromoBanner />
      </View>
    </ScrollView>
  );
}