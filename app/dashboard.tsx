import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Popular", active: true },
    { name: "Futsal", active: false },
    { name: "Cricket", active: false },
    { name: "Badminton", active: false },
  ];

  const venues = [
    {
      id: 1,
      name: "Kanzul Sport Complex",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=200&fit=crop",
      rating: 4.5,
      reviews: 1240,
      address: "6315 N. Warana Road Thihariya",
      prices: ["LKR.1300/h", "LKR.700/h", "LKR.900/h"],
    },
    {
      id: 2,
      name: "Ahmd Sport",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
      rating: 4.5,
      reviews: 856,
      address: "7009 Forest Avenue, Boston, MA 02119",
      prices: ["LKR.1300/h", "LKR.500/h", "LKR.1900/h"],
    },
  ];

  const newsItems = [
    {
      id: 1,
      title: "Local Cricket Tournament Starts This Weekend",
      excerpt:
        "Inter-district cricket tournament featuring 16 teams from across Colombo region.",
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=300&h=180&fit=crop",
      category: "Cricket",
      timestamp: "2 hours ago",
      venue: "Multiple Venues",
      isLive: false,
    },
    {
      id: 2,
      title: "New Badminton Courts Open at SportZone",
      excerpt:
        "State-of-the-art facilities with professional lighting now available for booking.",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=180&fit=crop",
      category: "Badminton",
      timestamp: "4 hours ago",
      venue: "SportZone Complex",
      isLive: false,
    },
    {
      id: 3,
      title: "Live: Football Championship Final",
      excerpt:
        "Thunder FC vs Lightning United - Championship final now streaming live.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=180&fit=crop",
      category: "Football",
      timestamp: "Live",
      venue: "National Stadium",
      isLive: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="light" backgroundColor="#4827EC" />

      {/* Header */}
      <View className="bg-primary p-4">
        <View className="flex-row items-center justify-between">
          {/* Left Column - Logo */}
          <View className="flex-row items-center gap-2">
            <View className="w-8 h-8 bg-white rounded-full items-center justify-center">
              <Text className="text-primary text-lg font-bold">I</Text>
            </View>
            <Text className="text-white text-lg font-semibold">IndoorB</Text>
          </View>

          {/* Right Column - Message and Notification Buttons */}
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => router.push("/messages")}
              className="bg-white/20 p-2 rounded-lg"
            >
              <Ionicons name="chatbubble-outline" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/notifications")}
              className="bg-white/20 p-2 rounded-lg relative"
            >
              <Ionicons name="notifications-outline" size={20} color="white" />
              <View className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full items-center justify-center">
                <Text className="text-white text-xs">3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-20">
          {/* Search */}
          <View className="relative -mt-6 mb-6">
            <View className="bg-white rounded-2xl shadow-sm border p-4">
              <View className="relative">
                <Ionicons
                  name="search"
                  size={20}
                  color="#4827EC"
                  style={{ position: "absolute", left: 12, top: 12, zIndex: 1 }}
                />
                <TextInput
                  placeholder="Search Complex, Sports etc"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="pl-12 pr-12 h-12 border border-gray-200 rounded-xl text-base"
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 8, top: 8 }}
                  className="p-2"
                >
                  <Ionicons name="options-outline" size={20} color="#4827EC" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
            contentContainerStyle={{ paddingHorizontal: 0 }}
          >
            <View className="flex-row gap-2">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.name}
                  className={`px-4 py-2 rounded-full ${
                    category.active
                      ? "bg-green-100 border border-secondary"
                      : "bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      category.active ? "text-secondary" : "text-gray-700"
                    }`}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Nearby Section */}
          <View className="mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-gray-900">
                Nearby
              </Text>
              <TouchableOpacity onPress={() => router.push("/search")}>
                <Text className="text-sm text-secondary font-medium">
                  See all
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
            >
              <View className="flex-row gap-4">
                {venues.concat(venues).map((venue, index) => (
                  <TouchableOpacity
                    key={`${venue.id}-${index}`}
                    onPress={() => router.push(`/venue/${venue.id}`)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border w-72"
                  >
                    <View className="relative">
                      <Image
                        source={{ uri: venue.image }}
                        className="w-full h-48"
                        resizeMode="cover"
                      />
                      <TouchableOpacity className="absolute top-3 right-3 bg-black/20 p-2 rounded-full">
                        <Ionicons
                          name="heart-outline"
                          size={16}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>

                    <View className="p-4">
                      <View className="flex-row items-center gap-2 mb-2">
                        <Ionicons name="star" size={16} color="#FFC107" />
                        <Text className="text-sm font-medium">
                          {venue.rating}
                        </Text>
                        <Text className="text-xs text-gray-500">
                          ({venue.reviews.toLocaleString()} reviews)
                        </Text>
                      </View>

                      <Text className="font-semibold text-gray-900 mb-1">
                        {venue.name}
                      </Text>
                      <Text className="text-xs text-gray-500 mb-3">
                        {venue.address}
                      </Text>

                      <View className="flex-row items-center gap-4 mb-4">
                        {venue.prices.map((price, index) => (
                          <Text key={index} className="text-xs text-gray-700">
                            {price}
                          </Text>
                        ))}
                      </View>

                      <TouchableOpacity
                        onPress={() => router.push(`/venue/${venue.id}`)}
                        className="bg-green-50 border border-secondary/20 p-3 rounded-xl"
                      >
                        <Text className="text-secondary text-center font-medium">
                          Check Availability
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Recent Sports News */}
          <View className="mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold text-gray-900">
                Recent Sports News
              </Text>
              <TouchableOpacity onPress={() => router.push("/feed")}>
                <Text className="text-sm text-primary font-medium">
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
            >
              <View className="flex-row gap-4">
                {newsItems.map((news) => (
                  <TouchableOpacity
                    key={news.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border w-72"
                  >
                    <View className="relative">
                      <Image
                        source={{ uri: news.image }}
                        className="w-full h-36"
                        resizeMode="cover"
                      />
                      {news.isLive && (
                        <View className="absolute top-3 left-3 bg-red-500 px-2 py-1 rounded-full flex-row items-center">
                          <View className="w-2 h-2 bg-white rounded-full mr-1" />
                          <Text className="text-white text-xs font-bold">
                            LIVE
                          </Text>
                        </View>
                      )}
                      <View className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded">
                        <Text className="text-white text-xs">
                          {news.category}
                        </Text>
                      </View>
                    </View>

                    <View className="p-4">
                      <Text
                        className="font-semibold text-gray-900 text-sm mb-2"
                        numberOfLines={2}
                      >
                        {news.title}
                      </Text>
                      <Text
                        className="text-xs text-gray-600 mb-3"
                        numberOfLines={2}
                      >
                        {news.excerpt}
                      </Text>

                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-1">
                          <Ionicons
                            name="location-outline"
                            size={12}
                            color="#6B7280"
                          />
                          <Text
                            className="text-xs text-gray-500"
                            numberOfLines={1}
                          >
                            {news.venue}
                          </Text>
                        </View>
                        <Text
                          className={`text-xs ${news.isLive ? "text-red-500 font-medium" : "text-gray-500"}`}
                        >
                          {news.timestamp}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Quick Actions */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Quick Actions
            </Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => router.push("/feed")}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4"
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                    <Text className="text-lg">📰</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-semibold text-sm">
                      Sports Feed
                    </Text>
                    <Text className="text-white/90 text-xs">
                      Latest updates & news
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/booking-history")}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4"
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                    <Ionicons name="calendar-outline" size={20} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-semibold text-sm">
                      My Bookings
                    </Text>
                    <Text className="text-white/90 text-xs">
                      View your activity
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-primary p-4">
        <View className="flex-row items-center justify-around">
          <TouchableOpacity
            onPress={() => router.push("/booking-history")}
            className="items-center"
          >
            <Ionicons name="calendar-outline" size={24} color="white" />
            <Text className="text-white text-xs mt-1">History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/feed")}
            className="items-center"
          >
            <Ionicons name="list-outline" size={24} color="white" />
            <Text className="text-white text-xs mt-1">Feed</Text>
          </TouchableOpacity>
          <View className="items-center">
            <TouchableOpacity
              onPress={() => router.push("/dashboard")}
              className="bg-white rounded-full p-3"
            >
              <Ionicons name="home" size={24} color="#4827EC" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/search")}
            className="items-center"
          >
            <Ionicons name="search-outline" size={24} color="white" />
            <Text className="text-white text-xs mt-1">Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            className="items-center"
          >
            <Ionicons name="person-outline" size={24} color="white" />
            <Text className="text-white text-xs mt-1">Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
