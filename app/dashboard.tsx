import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  StyleSheet,
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#4827EC" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          {/* Left Column - Logo */}
          <View style={styles.logoSection}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoText}>I</Text>
            </View>
            <Text style={styles.logoTitle}>IndoorB</Text>
          </View>

          {/* Right Column - Message and Notification Buttons */}
          <View style={styles.headerButtons}>
            <TouchableOpacity
              onPress={() => router.push("/messages")}
              style={styles.headerButton}
            >
              <Ionicons name="chatbubble-outline" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/notifications")}
              style={[styles.headerButton, styles.notificationButton]}
            >
              <Ionicons name="notifications-outline" size={20} color="white" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Search */}
          <View style={styles.searchContainer}>
            <View style={styles.searchCard}>
              <View style={styles.searchInputContainer}>
                <Ionicons
                  name="search"
                  size={20}
                  color="#4827EC"
                  style={styles.searchIcon}
                />
                <TextInput
                  placeholder="Search Complex, Sports etc"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={styles.searchInput}
                />
                <TouchableOpacity style={styles.filterButton}>
                  <Ionicons name="options-outline" size={20} color="#4827EC" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.name}
                style={[
                  styles.categoryButton,
                  category.active && styles.activeCategoryButton,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category.active && styles.activeCategoryText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Nearby Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Nearby</Text>
              <TouchableOpacity onPress={() => router.push("/search")}>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.venuesContent}
            >
              {venues.concat(venues).map((venue, index) => (
                <TouchableOpacity
                  key={`${venue.id}-${index}`}
                  onPress={() => router.push(`/venue/${venue.id}`)}
                  style={styles.venueCard}
                >
                  <View style={styles.venueImageContainer}>
                    <Image
                      source={{ uri: venue.image }}
                      style={styles.venueImage}
                      resizeMode="cover"
                    />
                    <TouchableOpacity style={styles.heartButton}>
                      <Ionicons name="heart-outline" size={16} color="white" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.venueInfo}>
                    <View style={styles.venueRating}>
                      <Ionicons name="star" size={16} color="#FFC107" />
                      <Text style={styles.ratingText}>{venue.rating}</Text>
                      <Text style={styles.reviewText}>
                        ({venue.reviews.toLocaleString()} reviews)
                      </Text>
                    </View>

                    <Text style={styles.venueName}>{venue.name}</Text>
                    <Text style={styles.venueAddress}>{venue.address}</Text>

                    <View style={styles.venuePrices}>
                      {venue.prices.map((price, index) => (
                        <Text key={index} style={styles.priceText}>
                          {price}
                        </Text>
                      ))}
                    </View>

                    <TouchableOpacity
                      onPress={() => router.push(`/venue/${venue.id}`)}
                      style={styles.checkAvailabilityButton}
                    >
                      <Text style={styles.checkAvailabilityText}>
                        Check Availability
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity
                onPress={() => router.push("/feed")}
                style={[styles.quickActionButton, styles.feedButton]}
              >
                <View style={styles.quickActionContent}>
                  <View style={styles.quickActionIcon}>
                    <Text style={styles.quickActionEmoji}>📰</Text>
                  </View>
                  <View style={styles.quickActionTextContainer}>
                    <Text style={styles.quickActionTitle}>Sports Feed</Text>
                    <Text style={styles.quickActionSubtitle}>
                      Latest updates & news
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/booking-history")}
                style={[styles.quickActionButton, styles.bookingButton]}
              >
                <View style={styles.quickActionContent}>
                  <View style={styles.quickActionIcon}>
                    <Ionicons name="calendar-outline" size={20} color="white" />
                  </View>
                  <View style={styles.quickActionTextContainer}>
                    <Text style={styles.quickActionTitle}>My Bookings</Text>
                    <Text style={styles.quickActionSubtitle}>
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
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => router.push("/booking-history")}
          style={styles.navItem}
        >
          <Ionicons name="calendar-outline" size={24} color="white" />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/feed")}
          style={styles.navItem}
        >
          <Ionicons name="list-outline" size={24} color="white" />
          <Text style={styles.navText}>Feed</Text>
        </TouchableOpacity>
        <View style={styles.navItem}>
          <TouchableOpacity
            onPress={() => router.push("/dashboard")}
            style={styles.homeButton}
          >
            <Ionicons name="home" size={24} color="#4827EC" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/search")}
          style={styles.navItem}
        >
          <Ionicons name="search-outline" size={24} color="white" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/profile")}
          style={styles.navItem}
        >
          <Ionicons name="person-outline" size={24} color="white" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#4827EC",
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#4827EC",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 8,
  },
  notificationButton: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#ef4444",
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  searchContainer: {
    marginTop: -24,
    marginBottom: 24,
  },
  searchCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInputContainer: {
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: 12,
    top: 12,
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: 48,
    paddingRight: 48,
    height: 48,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    fontSize: 16,
  },
  filterButton: {
    position: "absolute",
    right: 8,
    top: 8,
    padding: 8,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: "#dcfce7",
    borderColor: "#1DBF73",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  activeCategoryText: {
    color: "#1DBF73",
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1DBF73",
  },
  venuesContent: {
    paddingRight: 16,
  },
  venueCard: {
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    width: 288,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  venueImageContainer: {
    position: "relative",
  },
  venueImage: {
    width: "100%",
    height: 192,
  },
  heartButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 8,
    borderRadius: 20,
  },
  venueInfo: {
    padding: 16,
  },
  venueRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "500",
  },
  reviewText: {
    fontSize: 12,
    color: "#6b7280",
  },
  venueName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  venueAddress: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 12,
  },
  venuePrices: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  priceText: {
    fontSize: 12,
    color: "#374151",
  },
  checkAvailabilityButton: {
    backgroundColor: "#dcfce7",
    borderWidth: 1,
    borderColor: "rgba(29,191,115,0.2)",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  checkAvailabilityText: {
    color: "#1DBF73",
    fontWeight: "500",
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
  },
  feedButton: {
    backgroundColor: "#3b82f6",
  },
  bookingButton: {
    backgroundColor: "#10b981",
  },
  quickActionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionEmoji: {
    fontSize: 18,
  },
  quickActionTextContainer: {
    flex: 1,
  },
  quickActionTitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  quickActionSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#4827EC",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
  homeButton: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 12,
  },
});
