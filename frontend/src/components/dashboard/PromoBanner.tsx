import { ArrowRight } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function PromoBanner() {
  return (
    <View className="bg-[#EAE7F0] rounded-3xl overflow-hidden shadow-sm mb-6">
      <View className="p-8">
        <View className="bg-[#00003C] px-2 py-1 rounded-md self-start mb-3">
          <Text className="text-[10px]  font-inter-bold font-semibold tracking-widest text-[#FCD400] uppercase">
            Platinum Exclusive
          </Text>
        </View>
        <Text className="text-[32px] font-manrope-bold font-extrabold text-[#00003C] tracking-[-0.75px] leading-[30px] max-w-[85%]">
          Unlock the Safari Collection.
        </Text>
        <Text className="text-[14px] font-inter  text-[#464653] mt-4 leading-relaxed">
          Use 5,000 points to access curated travel experiences across Sub-Saharan Africa.
        </Text>
        <TouchableOpacity className="flex-row items-center gap-2 mt-4">
          <Text className="text-[#00003C] font-manrope-bold font-bold text-[16px]">Explore Collection</Text>
          <ArrowRight size={16} color="#00003C" strokeWidth={3.5} />
        </TouchableOpacity>
      </View>
      <View className="w-full h-[200px]">
        <Image
          source={require("@/assets/images/dashboard/safari.png")}
          className="w-full h-full object-contain opacity-90"
          accessibilityLabel="Unlock the safari collection"
        />
      </View>
    </View>
  );
}