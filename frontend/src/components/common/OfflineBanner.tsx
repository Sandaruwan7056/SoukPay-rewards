import { WifiOff, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface OfflineBannerProps {
  isOnline: boolean;
}

export function OfflineBanner({ isOnline }: OfflineBannerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setIsOpen(true); 
    } else {
      setIsOpen(false);
    }
  }, [isOnline]);

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >

      <View className="flex-1 bg-black/40 items-center justify-center px-6">

        <View className="w-full max-w-sm bg-white rounded-2xl p-6 items-center shadow-xl border border-neutral-100 relative">
          

          <TouchableOpacity 
            onPress={() => setIsOpen(false)}
            activeOpacity={0.7}
            className="absolute top-4 right-4 p-1 rounded-full bg-neutral-50 active:bg-neutral-100"
          >
            <X size={18} color="#6B7280" strokeWidth={2.5} />
          </TouchableOpacity>
          

          <View className="w-12 h-12 bg-rose-50 rounded-full items-center justify-center mb-4 mt-2">
            <WifiOff size={24} color="#E11D48" strokeWidth={2} />
          </View>
          
          <Text className="text-neutral-900 font-manrope-bold font-bold text-lg text-center mb-2">
            Connection Lost
          </Text>
          
          <Text className="text-neutral-500 font-inter-regular text-sm text-center leading-relaxed">
            You are currently offline. Please check your internet settings. Actions inside the app are restricted.
          </Text>
          
        </View>
        
      </View>
    </Modal>
  );
}