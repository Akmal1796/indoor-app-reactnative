import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

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
      rating: 4.5,
      reviews: 1240,
      address: "6315 N. Warana Road Thihariya",
      prices: ["LKR.1300/h", "LKR.700/h", "LKR.900/h"],
    },
    {
      id: 2,
      name: "Ahmd Sport",
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
      category: "Football",
      timestamp: "Live",
      venue: "National Stadium",
      isLive: true,
    },
  ];

  return (
    <View style={styles.container}>
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

          {/* Right Column - Action Buttons */}
          <View style={styles.headerButtons}>
            <TouchableOpacity
              onPress={() => console.log("Messages")}
              style={styles.headerButton}
            >
              <Text style={styles.buttonText}>💬</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log("Notifications")}
              style={[styles.headerButton, styles.notificationButton]}
            >
              <Text style={styles.buttonText}>🔔</Text>
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
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  placeholder="Search Complex, Sports etc"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={styles.searchInput}
                />
                <TouchableOpacity style={styles.filterButton}>
                  <Text style={styles.filterIcon}>⚙️</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            <View style={styles.categoriesContent}>
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
            </View>
          </ScrollView>

          {/* Nearby Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Nearby Venues</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.venuesList}>
              {venues.map((venue) => (
                <TouchableOpacity
                  key={venue.id}
                  style={styles.venueCard}
                  onPress={() => console.log("Venue", venue.id)}
                >
                  <View style={styles.venueImagePlaceholder}>
                    <Text style={styles.venueImageText}>🏟️</Text>
                  </View>

                  <View style={styles.venueInfo}>
                    <View style={styles.venueRating}>
                      <Text style={styles.starIcon}>⭐</Text>
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

                    <TouchableOpacity style={styles.checkAvailabilityButton}>
                      <Text style={styles.checkAvailabilityText}>
                        Check Availability
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Sports News */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Sports News</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.newsContent}
            >
              {newsItems.map((news) => (
                <TouchableOpacity key={news.id} style={styles.newsCard}>
                  <View style={styles.newsImageContainer}>
                    <View style={styles.newsImagePlaceholder}>
                      <Text style={styles.newsImageText}>📰</Text>
                    </View>
                    {news.isLive && (
                      <View style={styles.liveIndicator}>
                        <Text style={styles.liveText}>🔴 LIVE</Text>
                      </View>
                    )}
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>
                        {news.category}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.newsInfo}>
                    <Text style={styles.newsTitle} numberOfLines={2}>
                      {news.title}
                    </Text>
                    <Text style={styles.newsExcerpt} numberOfLines={2}>
                      {news.excerpt}
                    </Text>

                    <View style={styles.newsFooter}>
                      <View style={styles.newsLocation}>
                        <Text style={styles.locationIcon}>📍</Text>
                        <Text style={styles.newsVenue} numberOfLines={1}>
                          {news.venue}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.newsTimestamp,
                          news.isLive && styles.liveTimestamp,
                        ]}
                      >
                        {news.timestamp}
                      </Text>
                    </View>
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
                style={[styles.quickActionButton, styles.bookingButton]}
              >
                <View style={styles.quickActionContent}>
                  <View style={styles.quickActionIcon}>
                    <Text style={styles.quickActionEmoji}>📅</Text>
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
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📅</Text>
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navText}>Feed</Text>
        </TouchableOpacity>
        <View style={styles.navItem}>
          <TouchableOpacity style={styles.homeButton}>
            <Text style={styles.homeIcon}>🏠</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
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
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
    color: "#4827EC",
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  filterButton: {
    marginLeft: 8,
    padding: 8,
  },
  filterIcon: {
    fontSize: 16,
    color: "#4827EC",
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesContent: {
    flexDirection: "row",
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
  venuesList: {
    gap: 16,
  },
  venueCard: {
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  venueImagePlaceholder: {
    height: 160,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  venueImageText: {
    fontSize: 60,
  },
  venueInfo: {
    padding: 16,
  },
  venueRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  starIcon: {
    fontSize: 16,
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
  newsContent: {
    paddingRight: 16,
  },
  newsCard: {
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    width: 280,
    marginRight: 16,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  newsImageContainer: {
    position: "relative",
  },
  newsImagePlaceholder: {
    height: 140,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  newsImageText: {
    fontSize: 30,
  },
  liveIndicator: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  categoryBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    color: "white",
    fontSize: 10,
  },
  newsInfo: {
    padding: 16,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  newsExcerpt: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 12,
  },
  newsFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  newsLocation: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  locationIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  newsVenue: {
    fontSize: 10,
    color: "#6b7280",
    flex: 1,
  },
  newsTimestamp: {
    fontSize: 10,
    color: "#6b7280",
  },
  liveTimestamp: {
    color: "#ef4444",
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
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    color: "white",
    fontSize: 12,
  },
  homeButton: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 12,
  },
  homeIcon: {
    fontSize: 20,
    color: "#4827EC",
  },
});
