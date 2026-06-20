import { deductPoints } from "@/src/features/auth/authSlice";
import { rewardService } from "@/src/services/rewards.service";
import { RewardItem } from "@/src/types/reward.types";
import { ShieldCheck, Sparkles, X } from "lucide-react-native";
import React, { useState } from "react";
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

interface RedemptionModalProps {
  visible: boolean;
  reward: RewardItem | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function RedemptionModal({ visible, reward, onClose, onSuccess }: RedemptionModalProps) {
  const dispatch = useDispatch(); 
  const [submitting, setSubmitting] = useState<boolean>(false);

  if (!reward) return null;

  const handleRedeemConfirmation = async () => {
    try {
      setSubmitting(true);
      const uniqueIdempotencyKey = `idemp-${reward.id}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      await rewardService.redeemReward(reward.id, uniqueIdempotencyKey);
      
      
      dispatch(deductPoints(reward.points_cost));

      Toast.show({
        type: "success",
        text1: "Redemption Successful!",
        text2: `${reward.name} is now registered in your ledger vault.`,
      });
      
      onSuccess();
    } catch (error: any) {
      console.error("Post execution claim processing crash handler:", error);
      Toast.show({
        type: "error",
        text1: "Redemption Failed",
        text2: error.response?.data?.message || error.message || "An error occurred",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View className="flex-1 bg-slate-950/60 justify-end">
        <View className="bg-white rounded-t-[32px] p-6 pb-10 border-t border-slate-100 shadow-2xl">
          <View className="flex-row justify-between items-center mb-6">
            <View className="p-2.5 bg-amber-50 rounded-xl">
              <Sparkles size={20} color="#d97706" />
            </View>
            <TouchableOpacity onPress={onClose} disabled={submitting} className="p-2 bg-slate-50 rounded-full">
              <X size={16} color="#464653" />
            </TouchableOpacity>
          </View>

          <Text className="text-[10px] font-inter-bold tracking-widest text-slate-400 uppercase">Confirm Order Choice</Text>
          <Text className="text-2xl font-manrope-bold font-extrabold text-[#00003C] mt-1">{reward.name}</Text>
          <Text className="text-sm font-inter text-slate-500 mt-2 leading-relaxed">
            You are about to authorize an expenditure of <Text className="font-bold text-[#00003C]">{reward.points_cost.toLocaleString()} points</Text>. This deduction cannot be reversed.
          </Text>

          <View className="bg-slate-50 p-4 rounded-2xl flex-row items-center gap-x-2 mt-5 mb-6">
            <ShieldCheck size={16} color="#94a3b8" />
            <Text className="text-[11px] font-inter font-medium text-slate-400">Transaction secured with AES-256 Network Key verification.</Text>
          </View>

          <TouchableOpacity onPress={handleRedeemConfirmation} disabled={submitting} className="w-full bg-[#00003C] h-14 rounded-full items-center justify-center shadow-lg active:opacity-90">
            {submitting ? <ActivityIndicator color="#FFFFFF" size="small" /> : <Text className="text-white font-manrope-bold font-bold text-base">Confirm & Redeem</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}