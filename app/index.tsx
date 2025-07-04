import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function WelcomeScreen() {
  useEffect(() => {
    // Auto redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      router.replace("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    router.replace("/dashboard");
  };

  return (
    <View className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <StatusBar style="dark" />

      {/* Content */}
      <View className="flex-1 justify-center items-center px-8">
        {/* Logo */}
        <View className="mb-8">
          <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-4">
            <Text className="text-white text-4xl font-bold">I</Text>
          </View>
          <Text className="text-3xl font-bold text-gray-900 text-center">
            IndoorB
          </Text>
          <Text className="text-lg text-gray-600 text-center mt-2">
            Sports Booking Made Easy
          </Text>
        </View>

        {/* Features */}
        <View className="mb-12 space-y-4">
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-secondary rounded-full items-center justify-center mr-3">
              <Text className="text-white text-sm">📅</Text>
            </View>
            <Text className="text-gray-700">Book courts instantly</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-secondary rounded-full items-center justify-center mr-3">
              <Text className="text-white text-sm">👥</Text>
            </View>
            <Text className="text-gray-700">
              Connect with sports communities
            </Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-secondary rounded-full items-center justify-center mr-3">
              <Text className="text-white text-sm">🏆</Text>
            </View>
            <Text className="text-gray-700">
              Track your sporting activities
            </Text>
          </View>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          onPress={handleGetStarted}
          className="bg-primary px-8 py-4 rounded-2xl w-full"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Get Started
          </Text>
        </TouchableOpacity>

        <Text className="text-gray-500 text-sm text-center mt-4">
          Redirecting to dashboard in 3 seconds...
        </Text>
      </View>
    </View>
  );
}
