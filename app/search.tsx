import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";

interface SearchResult {
  id: string;
  type: "venue" | "user" | "team" | "event";
  title: string;
  subtitle: string;
  rating?: number;
  distance?: string;
  price?: string;
  image?: string;
  sport?: string;
  verified?: boolean;
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "venues" | "users" | "teams" | "events"
  >("all");
  const [sortBy, setSortBy] = useState<
    "relevance" | "distance" | "rating" | "price"
  >("relevance");
  const [showFilters, setShowFilters] = useState(false);

  const recentSearches = [
    "SportsPlex Arena",
    "Basketball courts near me",
    "Thunder Strikers",
    "Badminton partners",
  ];

  const searchResults: SearchResult[] = [
    {
      id: "1",
      type: "venue",
      title: "SportsPlex Arena",
      subtitle: "Multi-sport facility with 5 courts",
      rating: 4.8,
      distance: "0.5 km",
      price: "$25/hour",
      sport: "Futsal",
    },
    {
      id: "2",
      type: "venue",
      title: "Downtown Sports Center",
      subtitle: "Premium basketball and tennis courts",
      rating: 4.6,
      distance: "1.2 km",
      price: "$30/hour",
      sport: "Basketball",
    },
    {
      id: "3",
      type: "user",
      title: "Alex Johnson",
      subtitle: "Professional futsal player • 25 years old",
      verified: true,
      sport: "Futsal",
    },
    {
      id: "4",
      type: "team",
      title: "Thunder Strikers",
      subtitle: "Competitive futsal team • 8/10 members",
      sport: "Futsal",
    },
    {
      id: "5",
      type: "event",
      title: "Weekend Basketball Tournament",
      subtitle: "Jan 20-21, 2024 • Downtown Sports Center",
      sport: "Basketball",
    },
  ];

  const filters = [
    { id: "all", label: "All", icon: "🔍" },
    { id: "venues", label: "Venues", icon: "🏟️" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "teams", label: "Teams", icon: "⚽" },
    { id: "events", label: "Events", icon: "📅" },
  ];

  const sortOptions = [
    { id: "relevance", label: "Relevance" },
    { id: "distance", label: "Distance" },
    { id: "rating", label: "Rating" },
    { id: "price", label: "Price" },
  ];

  const filteredResults =
    searchQuery.length > 0
      ? searchResults.filter(
          (result) =>
            (activeFilter === "all" || result.type === activeFilter) &&
            (result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              result.subtitle
                .toLowerCase()
                .includes(searchQuery.toLowerCase())),
        )
      : [];

  const getResultIcon = (type: string) => {
    switch (type) {
      case "venue":
        return "🏟️";
      case "user":
        return "👤";
      case "team":
        return "⚽";
      case "event":
        return "📅";
      default:
        return "🔍";
    }
  };

  const getSportEmoji = (sport?: string) => {
    if (!sport) return "";
    const sportEmojis: { [key: string]: string } = {
      Futsal: "⚽",
      Basketball: "🏀",
      Tennis: "🎾",
      Badminton: "🏸",
      Cricket: "🏏",
    };
    return sportEmojis[sport] || "🏃‍♂️";
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search venues, users, teams..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                activeFilter === filter.id && styles.activeFilterChip,
              ]}
              onPress={() => setActiveFilter(filter.id as any)}
            >
              <Text style={styles.filterEmoji}>{filter.icon}</Text>
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter.id && styles.activeFilterText,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Advanced Filters */}
      {showFilters && (
        <View style={styles.advancedFilters}>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Sort by:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.sortOption,
                    sortBy === option.id && styles.activeSortOption,
                  ]}
                  onPress={() => setSortBy(option.id as any)}
                >
                  <Text
                    style={[
                      styles.sortOptionText,
                      sortBy === option.id && styles.activeSortOptionText,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Recent Searches */}
        {searchQuery.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentSearchItem}
                onPress={() => setSearchQuery(search)}
              >
                <Text style={styles.recentSearchIcon}>🕒</Text>
                <Text style={styles.recentSearchText}>{search}</Text>
                <TouchableOpacity style={styles.recentSearchClose}>
                  <Text style={styles.recentSearchCloseIcon}>✕</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Popular Categories */}
        {searchQuery.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Categories</Text>
            <View style={styles.categoriesGrid}>
              <TouchableOpacity style={styles.categoryCard}>
                <Text style={styles.categoryIcon}>⚽</Text>
                <Text style={styles.categoryTitle}>Futsal</Text>
                <Text style={styles.categorySubtitle}>25 venues nearby</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryCard}>
                <Text style={styles.categoryIcon}>🏀</Text>
                <Text style={styles.categoryTitle}>Basketball</Text>
                <Text style={styles.categorySubtitle}>18 venues nearby</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryCard}>
                <Text style={styles.categoryIcon}>🏸</Text>
                <Text style={styles.categoryTitle}>Badminton</Text>
                <Text style={styles.categorySubtitle}>12 venues nearby</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryCard}>
                <Text style={styles.categoryIcon}>🎾</Text>
                <Text style={styles.categoryTitle}>Tennis</Text>
                <Text style={styles.categorySubtitle}>8 venues nearby</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Search Results */}
        {searchQuery.length > 0 && (
          <View style={styles.section}>
            <View style={styles.resultsHeader}>
              <Text style={styles.sectionTitle}>
                {filteredResults.length} results for "{searchQuery}"
              </Text>
            </View>

            {filteredResults.length === 0 ? (
              <View style={styles.noResults}>
                <Text style={styles.noResultsIcon}>🔍</Text>
                <Text style={styles.noResultsTitle}>No results found</Text>
                <Text style={styles.noResultsText}>
                  Try adjusting your search or filters
                </Text>
              </View>
            ) : (
              filteredResults.map((result) => (
                <TouchableOpacity key={result.id} style={styles.resultCard}>
                  <View style={styles.resultHeader}>
                    <Text style={styles.resultIcon}>
                      {getResultIcon(result.type)}
                    </Text>
                    <View style={styles.resultInfo}>
                      <View style={styles.resultTitleRow}>
                        <Text style={styles.resultTitle}>{result.title}</Text>
                        {result.verified && (
                          <Text style={styles.verifiedBadge}>✓</Text>
                        )}
                        {result.sport && (
                          <Text style={styles.sportBadge}>
                            {getSportEmoji(result.sport)}
                          </Text>
                        )}
                      </View>
                      <Text style={styles.resultSubtitle}>
                        {result.subtitle}
                      </Text>

                      {/* Venue specific info */}
                      {result.type === "venue" && (
                        <View style={styles.venueInfo}>
                          {result.rating && (
                            <View style={styles.ratingContainer}>
                              <Text style={styles.ratingIcon}>⭐</Text>
                              <Text style={styles.ratingText}>
                                {result.rating}
                              </Text>
                            </View>
                          )}
                          {result.distance && (
                            <Text style={styles.venueDetail}>
                              📍 {result.distance}
                            </Text>
                          )}
                          {result.price && (
                            <Text style={styles.venueDetail}>
                              💰 {result.price}
                            </Text>
                          )}
                        </View>
                      )}
                    </View>
                    <TouchableOpacity style={styles.resultAction}>
                      <Text style={styles.resultActionIcon}>→</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Link href="/booking-history" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>📋</Text>
            <Text style={styles.navText}>History</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/feed" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>📱</Text>
            <Text style={styles.navText}>Feed</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/dashboard" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text style={[styles.navIcon, styles.activeNavIcon]}>🔍</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Search</Text>
        </TouchableOpacity>
        <Link href="/profile" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>👤</Text>
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </Link>
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
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: "#6b7280",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    fontSize: 14,
    color: "#6b7280",
  },
  filterButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 8,
  },
  filterIcon: {
    fontSize: 18,
  },
  filtersContainer: {
    backgroundColor: "white",
    paddingVertical: 12,
  },
  filtersScroll: {
    paddingHorizontal: 16,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: "#4827EC",
  },
  filterEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "white",
  },
  advancedFilters: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  sortOption: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  activeSortOption: {
    backgroundColor: "#4827EC",
  },
  sortOptionText: {
    fontSize: 12,
    color: "#374151",
  },
  activeSortOptionText: {
    color: "white",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  recentSearchItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  recentSearchIcon: {
    fontSize: 16,
    marginRight: 12,
    color: "#6b7280",
  },
  recentSearchText: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  recentSearchClose: {
    padding: 4,
  },
  recentSearchCloseIcon: {
    fontSize: 12,
    color: "#6b7280",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  resultsHeader: {
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  resultIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginRight: 8,
  },
  verifiedBadge: {
    fontSize: 14,
    color: "#4827EC",
    marginRight: 4,
  },
  sportBadge: {
    fontSize: 14,
  },
  resultSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  venueInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingIcon: {
    fontSize: 12,
    marginRight: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
  venueDetail: {
    fontSize: 12,
    color: "#6b7280",
  },
  resultAction: {
    padding: 8,
  },
  resultActionIcon: {
    fontSize: 16,
    color: "#4827EC",
  },
  noResults: {
    alignItems: "center",
    paddingVertical: 40,
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  activeNavItem: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  activeNavIcon: {
    color: "#4827EC",
  },
  navText: {
    fontSize: 12,
    color: "#6b7280",
  },
  activeNavText: {
    color: "#4827EC",
    fontWeight: "600",
  },
});
