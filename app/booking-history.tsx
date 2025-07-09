import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Link } from "expo-router";

interface Booking {
  id: string;
  venueName: string;
  sport: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: "upcoming" | "completed" | "cancelled";
  court: string;
  bookingRef: string;
  participants?: number;
  maxParticipants?: number;
  teamName?: string;
}

export default function BookingHistoryScreen() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled">(
    "upcoming",
  );

  const bookings: Booking[] = [
    {
      id: "1",
      venueName: "SportsPlex Arena",
      sport: "Futsal",
      date: "2024-01-22",
      time: "18:00",
      duration: 2,
      price: 50,
      status: "upcoming",
      court: "Court 1",
      bookingRef: "SPX001234",
      participants: 8,
      maxParticipants: 10,
      teamName: "Thunder Strikers",
    },
    {
      id: "2",
      venueName: "Downtown Sports Center",
      sport: "Basketball",
      date: "2024-01-25",
      time: "20:00",
      duration: 1.5,
      price: 45,
      status: "upcoming",
      court: "Court A",
      bookingRef: "DSC005678",
      participants: 6,
      maxParticipants: 8,
    },
    {
      id: "3",
      venueName: "Elite Badminton Club",
      sport: "Badminton",
      date: "2024-01-15",
      time: "16:00",
      duration: 1,
      price: 25,
      status: "completed",
      court: "Court 3",
      bookingRef: "EBC009876",
    },
    {
      id: "4",
      venueName: "SportsPlex Arena",
      sport: "Futsal",
      date: "2024-01-10",
      time: "19:00",
      duration: 2,
      price: 50,
      status: "completed",
      court: "Court 2",
      bookingRef: "SPX001122",
      teamName: "Thunder Strikers",
    },
    {
      id: "5",
      venueName: "Tennis Academy",
      sport: "Tennis",
      date: "2024-01-08",
      time: "14:00",
      duration: 1,
      price: 35,
      status: "cancelled",
      court: "Court 5",
      bookingRef: "TA003344",
    },
  ];

  const getSportEmoji = (sport: string) => {
    const sportEmojis: { [key: string]: string } = {
      Futsal: "⚽",
      Basketball: "🏀",
      Badminton: "🏸",
      Tennis: "🎾",
      Cricket: "🏏",
      Volleyball: "🏐",
    };
    return sportEmojis[sport] || "🏃‍♂���";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "#4827EC";
      case "completed":
        return "#10b981";
      case "cancelled":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "Upcoming";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "upcoming") return booking.status === "upcoming";
    if (activeTab === "past") return booking.status === "completed";
    if (activeTab === "cancelled") return booking.status === "cancelled";
    return true;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleCancelBooking = (bookingId: string) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking? This action cannot be undone.",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            Alert.alert("Success", "Booking cancelled successfully");
          },
        },
      ],
    );
  };

  const handleReschedule = (bookingId: string) => {
    Alert.alert("Reschedule", "This feature will be available soon!");
  };

  const handleViewDetails = (bookingId: string) => {
    Alert.alert("View Details", "This feature will be available soon!");
  };

  const handleRebook = (bookingId: string) => {
    Alert.alert("Rebook", "This feature will be available soon!");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Link href="/dashboard" asChild>
            <TouchableOpacity style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          </Link>
          <Text style={styles.headerTitle}>Booking History</Text>
        </View>
        <TouchableOpacity style={styles.calendarButton}>
          <Text style={styles.calendarIcon}>📅</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
          onPress={() => setActiveTab("upcoming")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "upcoming" && styles.activeTabText,
            ]}
          >
            Upcoming ({bookings.filter((b) => b.status === "upcoming").length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "past" && styles.activeTab]}
          onPress={() => setActiveTab("past")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "past" && styles.activeTabText,
            ]}
          >
            Past ({bookings.filter((b) => b.status === "completed").length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "cancelled" && styles.activeTab]}
          onPress={() => setActiveTab("cancelled")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "cancelled" && styles.activeTabText,
            ]}
          >
            Cancelled ({bookings.filter((b) => b.status === "cancelled").length}
            )
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>
              {activeTab === "upcoming"
                ? "📅"
                : activeTab === "past"
                  ? "✅"
                  : "❌"}
            </Text>
            <Text style={styles.emptyTitle}>
              No{" "}
              {activeTab === "upcoming"
                ? "upcoming"
                : activeTab === "past"
                  ? "past"
                  : "cancelled"}{" "}
              bookings
            </Text>
            <Text style={styles.emptyDescription}>
              {activeTab === "upcoming"
                ? "Book your next sports session to get started!"
                : activeTab === "past"
                  ? "Your completed bookings will appear here"
                  : "Your cancelled bookings will appear here"}
            </Text>
            {activeTab === "upcoming" && (
              <Link href="/search" asChild>
                <TouchableOpacity style={styles.bookNowButton}>
                  <Text style={styles.bookNowText}>Book Now</Text>
                </TouchableOpacity>
              </Link>
            )}
          </View>
        ) : (
          filteredBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              {/* Booking Header */}
              <View style={styles.bookingHeader}>
                <View style={styles.venueInfo}>
                  <Text style={styles.venueName}>{booking.venueName}</Text>
                  <View style={styles.sportInfo}>
                    <Text style={styles.sportEmoji}>
                      {getSportEmoji(booking.sport)}
                    </Text>
                    <Text style={styles.sportName}>{booking.sport}</Text>
                    <Text style={styles.court}>• {booking.court}</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(booking.status) },
                  ]}
                >
                  <Text style={styles.statusText}>
                    {getStatusText(booking.status)}
                  </Text>
                </View>
              </View>

              {/* Booking Details */}
              <View style={styles.bookingDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>📅</Text>
                  <Text style={styles.detailText}>
                    {formatDate(booking.date)} • {formatTime(booking.time)}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>⏱️</Text>
                  <Text style={styles.detailText}>
                    {booking.duration} hour{booking.duration !== 1 ? "s" : ""}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>💰</Text>
                  <Text style={styles.detailText}>${booking.price}</Text>
                </View>
                {booking.participants && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailIcon}>👥</Text>
                    <Text style={styles.detailText}>
                      {booking.participants}/{booking.maxParticipants} players
                    </Text>
                  </View>
                )}
                {booking.teamName && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailIcon}>⚽</Text>
                    <Text style={styles.detailText}>{booking.teamName}</Text>
                  </View>
                )}
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>🔖</Text>
                  <Text style={styles.detailText}>
                    Ref: {booking.bookingRef}
                  </Text>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.bookingActions}>
                {booking.status === "upcoming" && (
                  <>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.secondaryButton]}
                      onPress={() => handleReschedule(booking.id)}
                    >
                      <Text style={styles.secondaryButtonText}>Reschedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.primaryButton]}
                      onPress={() => handleViewDetails(booking.id)}
                    >
                      <Text style={styles.primaryButtonText}>View Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.dangerButton]}
                      onPress={() => handleCancelBooking(booking.id)}
                    >
                      <Text style={styles.dangerButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </>
                )}

                {booking.status === "completed" && (
                  <>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.secondaryButton]}
                      onPress={() => handleRebook(booking.id)}
                    >
                      <Text style={styles.secondaryButtonText}>Rebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.primaryButton]}
                      onPress={() => handleViewDetails(booking.id)}
                    >
                      <Text style={styles.primaryButtonText}>View Receipt</Text>
                    </TouchableOpacity>
                  </>
                )}

                {booking.status === "cancelled" && (
                  <>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.secondaryButton]}
                      onPress={() => handleRebook(booking.id)}
                    >
                      <Text style={styles.secondaryButtonText}>Rebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.primaryButton]}
                      onPress={() => handleViewDetails(booking.id)}
                    >
                      <Text style={styles.primaryButtonText}>View Details</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text style={[styles.navIcon, styles.activeNavIcon]}>📋</Text>
          <Text style={[styles.navText, styles.activeNavText]}>History</Text>
        </TouchableOpacity>
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
        <Link href="/search" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🔍</Text>
            <Text style={styles.navText}>Search</Text>
          </TouchableOpacity>
        </Link>
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
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 12,
    padding: 8,
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  calendarButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 8,
    borderRadius: 8,
  },
  calendarIcon: {
    fontSize: 20,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: -8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#4827EC",
  },
  tabText: {
    fontSize: 14,
    color: "#6b7280",
  },
  activeTabText: {
    color: "#4827EC",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },
  bookNowButton: {
    backgroundColor: "#4827EC",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookNowText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  bookingCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  sportInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  sportEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  sportName: {
    fontSize: 14,
    color: "#6b7280",
  },
  court: {
    fontSize: 14,
    color: "#6b7280",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  bookingDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
  },
  detailText: {
    fontSize: 14,
    color: "#374151",
  },
  bookingActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#4827EC",
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: "#f3f4f6",
  },
  secondaryButtonText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 14,
  },
  dangerButton: {
    backgroundColor: "#fef2f2",
  },
  dangerButtonText: {
    color: "#dc2626",
    fontWeight: "600",
    fontSize: 14,
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
