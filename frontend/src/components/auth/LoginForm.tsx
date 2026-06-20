import { ArrowRight, Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react-native';
import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
    loading: boolean;
    insets: { top: number; bottom: number };
}

export function LoginForm({ onSubmit, loading, insets }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const inlineShadow = Platform.select({
        ios: {
            shadowColor: "#1B1B22",
            shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.06,
            shadowRadius: 40,
        },
        android: {
            elevation: 20,
        },
    });


    return (
        <View className="flex-1 bg-[#FBF8FF]" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-evenly', paddingHorizontal: 16 }} bounces={false}>

                    <View className="bg-[#F8F7FC] rounded-3xl p-8 w-full max-w-md mx-auto" style={inlineShadow}>
                        <View className="items-start mb-8">
                            <Text className="text-[30px] font-manrope-bold font-extrabold text-[#02022E]">Welcome Back </Text>
                            <Text className="text-[16px] font-inter text-[#464653] mt-2 font-semibold">Access your editorial vault</Text>
                        </View>

                        <View className="flex gap-12">

                            <View>
                                <Text className="text-[12px] font-bold font-inter text-[#464653] uppercase mb-2">Email Address</Text>
                                <TextInput
                                    className="w-full bg-[#E4E1EB] text-[#767684] px-4 py-4 rounded-xl"
                                    placeholder="name@institution.com"
                                    placeholderTextColor="#8F8DA0"
                                    value={email}
                                    onChangeText={setEmail}
                                    editable={!loading}
                                />
                            </View>

                            <View>
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text className="text-[12px]  font-bold font-inter text-[#464653] uppercase">Security Key</Text>
                                    <TouchableOpacity disabled={loading}><Text className="text-sm font-inter font-bold text-[#000080]">Forgot?</Text></TouchableOpacity>
                                </View>
                                <View className="relative justify-center">
                                    <TextInput
                                        className="w-full bg-[#E4E1EB] text-[#464653fa] pl-4 pr-12 py-4 rounded-xl"
                                        secureTextEntry={!showPassword}
                                        value={password}
                                        placeholder="*************"
                                        onChangeText={setPassword}
                                        editable={!loading}
                                    />
                                    <TouchableOpacity className="absolute right-4" onPress={() => setShowPassword(!showPassword)} disabled={loading}>
                                        {showPassword ? <EyeOff size={20} color="#464653" /> : <Eye size={20} color="#464653" />}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                        <TouchableOpacity
                            onPress={() => onSubmit(email, password)}
                            className="w-full bg-[#00003C] flex-row justify-center items-center py-6 rounded-full mt-8"
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFFFFF" size="small" />
                            ) : (
                                <>
                                    <Text className="text-white font-manrope-bold  text-[16px] mr-2">Enter The Vault</Text>
                                    <ArrowRight size={18} color="#FCD400" strokeWidth={3} />
                                </>
                            )}
                        </TouchableOpacity>

                        <View className="flex-row font-inter-bold justify-center items-center mt-10">
                            <Text className="text-[14px] font-semibold  text-[#464653]">
                                New to the ecosystem?{' '}
                            </Text>
                            <TouchableOpacity onPress={() => console.log("Requesting access...")}>
                                <Text className="text-[14px] font-semibold  text-[#00003C]">
                                    Request Access
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View className="flex flex-row items-center justify-center  mt-10 gap-4">
                            <Text className="font-semibold flex  text-[12px] text-[#9c9ca3]"><Lock color="#9c9ca3" size={12} /> AES 256</Text>
                            <Text className="font-semibold flex  text-[12px] text-[#9c9ca3]"><ShieldCheck size={12} color="#9c9ca3" /> SIPC PROTECTED</Text>
                        </View>

                    </View>

                    <View className="items-center mt-8 gap-2">
                        <Text className="text-[12px] tracking-wider font-inter text-center text-[#46465399] uppercase font-semibold">
                            © {new Date().getFullYear()} Soukpay Institutional. All Rights Reserved.
                        </Text>
                        <View className="flex-row   justify-center gap-4">
                            <TouchableOpacity><Text className="text-[12px] font-bold font-inter text-[#46465399] uppercase tracking-widest">Privacy</Text></TouchableOpacity>
                            <TouchableOpacity><Text className="text-[12px] font-bold font-inter text-[#46465399] uppercase tracking-widest">Compliance</Text></TouchableOpacity>
                            <TouchableOpacity><Text className="text-[12px] font-bold font-inter text-[#46465399] uppercase tracking-widest">Support</Text></TouchableOpacity>
                        </View>
                    </View>


                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}