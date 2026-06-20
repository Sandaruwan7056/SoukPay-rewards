import React from "react";
import { Image, Text, View } from "react-native";


export function MilestoneCard() {
    return (
        <View className="w-full bg-[#C6C5D533] rounded-3xl p-6 flex-row items-center justify-between border border-[#EBE9F0]">

            <View className="flex-1 pr-4">

                <View className="bg-[#FCD400] px-2.5 py-1 rounded-md self-start mb-3">
                    <Text className="text-[11px] font-inter-bold font-extrabold tracking-wider uppercase text-[#00003C]">
                        Milestone Reached
                    </Text>
                </View>


                <View className="py-3">
                    <Text className="text-[18px] font-manrope-bold font-extrabold text-[#1B1B22] leading-7">
                        Referral Platinum Bonus
                    </Text>
                    <Text className="text-[14px] font-inter font-medium text-[#767684] mt-1">
                        5 users successfully onboarded
                    </Text>
                </View>


                <Text className="text-[24px] font-manrope-bold font-extrabold text-[#2E7D32] mt-4">
                    + $500.00
                </Text>
            </View>


            <View className="w-[72px] h-[72px] absolute right-2 top-4 ">
               <Image
                source={require("@/assets/images/history/star.png")}
                className="w-full h-full"
                accessibilityLabel="Referral platinum bonus"
               />

            </View>
        </View>
    );
}