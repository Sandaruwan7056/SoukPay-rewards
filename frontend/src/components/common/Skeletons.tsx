import React, { useEffect, useRef } from "react";
import { Animated, DimensionValue, View, ViewStyle } from "react-native";

interface SkeletonProps {
  width?: DimensionValue; 
  height: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
}

export function GenericSkeleton({ width = "100%", height, borderRadius = 12, style }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 600, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { width, height, borderRadius, backgroundColor: "#EAE7EE" } as any,
        style,
        { opacity },
      ]}
    />
  );
}

export function TransactionRowSkeleton() {
  return (
    <View className="flex-row items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-2.5">
      <View className="flex-row items-center gap-3.5 flex-1 pr-2">
        <GenericSkeleton width={44} height={44} borderRadius={14} />
        <View className="gap-y-2 flex-1">
          <GenericSkeleton width="75%" height={14} />
          <GenericSkeleton width="45%" height={10} />
        </View>
      </View>
      <View className="items-end gap-y-1 min-w-[65px]">
        <GenericSkeleton width={55} height={16} />
        <GenericSkeleton width={35} height={8} />
      </View>
    </View>
  );
}

export function RewardCardSkeleton() {
  return (
    <View className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm mb-5">
      <GenericSkeleton height={192} borderRadius={0} />
      <View className="p-5 gap-y-3">
        <View className="flex-row justify-between items-center">
          <GenericSkeleton width="60%" height={22} />
          <GenericSkeleton width={60} height={18} borderRadius={6} />
        </View>
        <GenericSkeleton width="90%" height={14} />
        <GenericSkeleton width="50%" height={14} />
        <View className="flex-row items-center justify-between border-t border-slate-50 pt-4 mt-1">
          <View className="gap-y-1">
            <GenericSkeleton width={30} height={8} />
            <GenericSkeleton width={85} height={18} />
          </View>
          <GenericSkeleton width={100} height={40} borderRadius={12} />
        </View>
      </View>
    </View>
  );
}