import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "booking_confirmed",
      title: "Booking Confirmed",
      message:
        "Your badminton court booking at SportZone Complex has been confirmed for Jan 20, 2024 at 6:00 PM.",
      timestamp: "5 minutes ago",
      isRead: false,
      venue: "SportZone Complex",
      priority: "high",
    },
    {
      id: 2,
      type: "team_invite",
      title: "Team Invitation",
      message:
        "John Anderson invited you to join Thunder Hawks cricket team. 12 members already joined.",
      timestamp: "2 hours ago",
      isRead: false,
      teamName: "Thunder Hawks",
      priority: "high",
    },
    {
      id: 3,
      type: "payment_success",
      title: "Payment Successful",
      message:
        "Payment of LKR 2,500 for your futsal booking has been processed successfully.",
      timestamp: "4 hours ago",
      isRead: true,
      amount: "LKR 2,500",
      priority: "medium",
    },
    {
      id: 4,
      type: "venue_promotion",
      title: "Special Offer - 30% Off",
      message:
        "Elite Fitness Arena is offering 30% off on weekend bookings. Limited time offer!",
      timestamp: "6 hours ago",
      isRead: true,
      venue: "Elite Fitness Arena",
      discount: "30% OFF",
      priority: "medium",
    },
  ];

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((n) => !n.isRead);
      case "booking":
        return notifications.filter(
          (n) =>
            n.type.includes("booking") ||
            n.type.includes("payment") ||
            n.type.includes("match"),
        );
      case "social":
        return notifications.filter(
          (n) =>
            n.type.includes("team") ||
            n.type.includes("friend") ||
            n.type.includes("review"),
        );
      default:
        return notifications;
    }
  };

  const getNotificationCounts = () => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    const bookingCount = notifications.filter(
      (n) =>
        n.type.includes("booking") ||
        n.type.includes("payment") ||
        n.type.includes("match"),
    ).length;
    const socialCount = notifications.filter(
      (n) =>
        n.type.includes("team") ||
        n.type.includes("friend") ||
        n.type.includes("review"),
    ).length;

    return { unreadCount, bookingCount, socialCount };
  };

  const { unreadCount, bookingCount, socialCount } = getNotificationCounts();
  const filteredNotifications = getFilteredNotifications();

  const getTypeIcon = (type) => {
    switch (type) {
      case "booking_confirmed":
        return "📅";
      case "team_invite":
        return "👥";
      case "payment_success":
        return "💳";
      case "venue_promotion":
        return "🎁";
      default:
        return "🔔";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Notifications</Text>
              <Text style={styles.headerSubtitle}>
                Stay updated with your sports activities
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            {unreadCount > 0 && (
              <TouchableOpacity style={styles.markAllButton}>
                <Text style={styles.markAllIcon}>✓</Text>
                <Text style={styles.markAllText}>Mark all read</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.settingsButton}>
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabsContent}>
            <TouchableOpacity
              onPress={() => setActiveTab("all")}
              style={[styles.tab, activeTab === "all" && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "all" && styles.activeTabText,
                ]}
              >
                All ({notifications.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("unread")}
              style={[styles.tab, activeTab === "unread" && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "unread" && styles.activeTabText,
                ]}
              >
                Unread
                {unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
                  </View>
                )}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("booking")}
              style={[styles.tab, activeTab === "booking" && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "booking" && styles.activeTabText,
                ]}
              >
                Bookings ({bookingCount})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("social")}
              style={[styles.tab, activeTab === "social" && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "social" && styles.activeTabText,
                ]}
              >
                Social ({socialCount})
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Notifications List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.notificationsList}>
          {filteredNotifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔔</Text>
              <Text style={styles.emptyTitle}>No notifications found</Text>
              <Text style={styles.emptyMessage}>
                {activeTab === "unread"
                  ? "You're all caught up! No unread notifications."
                  : `No ${activeTab} notifications at the moment.`}
              </Text>
            </View>
          ) : (
            filteredNotifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  !notification.isRead && styles.unreadCard,
                ]}
              >
                <View style={styles.notificationContent}>
                  <View style={styles.notificationIcon}>
                    <Text style={styles.typeIcon}>
                      {getTypeIcon(notification.type)}
                    </Text>
                  </View>

                  <View style={styles.notificationBody}>
                    <View style={styles.notificationHeader}>
                      <Text style={styles.notificationTitle}>
                        {notification.title}
                      </Text>
                      <View style={styles.notificationMeta}>
                        {notification.priority === "high" && (
                          <View style={styles.priorityDot} />
                        )}
                        <Text style={styles.timestamp}>
                          {notification.timestamp}
                        </Text>
                        {!notification.isRead && (
                          <View style={styles.unreadDot} />
                        )}
                      </View>
                    </View>

                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>

                    <View style={styles.notificationFooter}>
                      <View style={styles.additionalInfo}>
                        {notification.venue && (
                          <View style={styles.venueInfo}>
                            <Text style={styles.venueIcon}>📍</Text>
                            <Text style={styles.venueText}>
                              {notification.venue}
                            </Text>
                          </View>
                        )}
                        {notification.discount && (
                          <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>
                              {notification.discount}
                            </Text>
                          </View>
                        )}
                        {notification.amount && (
                          <Text style={styles.amountText}>
                            {notification.amount}
                          </Text>
                        )}
                      </View>

                      <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton}>
                          <Text style={styles.actionButtonText}>View</Text>
                        </TouchableOpacity>
                        <View style={styles.quickActions}>
                          {!notification.isRead && (
                            <TouchableOpacity style={styles.quickAction}>
                              <Text style={styles.quickActionIcon}>✓</Text>
                            </TouchableOpacity>
                          )}
                          <TouchableOpacity style={styles.quickAction}>
                            <Text style={styles.quickActionIcon}>✕</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => router.push("/booking-history")}
          style={styles.navItem}
        >
          <Text style={styles.navIcon}>📅</Text>
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/feed")}
          style={styles.navItem}
        >
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navText}>Feed</Text>
        </TouchableOpacity>
        <View style={styles.navItem}>
          <TouchableOpacity
            onPress={() => router.push("/dashboard")}
            style={styles.homeButton}
          >
            <Text style={styles.homeIcon}>🏠</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/search")}
          style={styles.navItem}
        >
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/profile")}
          style={styles.navItem}
        >
          <Text style={styles.navIcon}>👤</Text>
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    color: "white",
    fontSize: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  markAllButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  markAllIcon: {
    color: "white",
    fontSize: 14,
  },
  markAllText: {
    color: "white",
    fontSize: 12,
  },
  settingsButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 8,
    borderRadius: 8,
  },
  settingsIcon: {
    fontSize: 16,
  },
  tabsContainer: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tabsContent: {
    flexDirection: "row",
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#4827EC",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  activeTabText: {
    color: "#4827EC",
  },
  unreadBadge: {
    backgroundColor: "#ef4444",
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: "center",
  },
  unreadBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  notificationsList: {
    padding: 16,
    paddingBottom: 80,
    gap: 12,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  notificationCard: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#4827EC",
    backgroundColor: "rgba(59, 130, 246, 0.05)",
  },
  notificationContent: {
    padding: 16,
  },
  notificationIcon: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  typeIcon: {
    fontSize: 20,
  },
  notificationBody: {
    marginLeft: 56,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
    marginRight: 8,
  },
  notificationMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  priorityDot: {
    width: 6,
    height: 6,
    backgroundColor: "#ef4444",
    borderRadius: 3,
  },
  timestamp: {
    fontSize: 12,
    color: "#6b7280",
  },
  unreadDot: {
    width: 6,
    height: 6,
    backgroundColor: "#4827EC",
    borderRadius: 3,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 12,
  },
  notificationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  additionalInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  venueInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  venueIcon: {
    fontSize: 10,
  },
  venueText: {
    fontSize: 12,
    color: "#6b7280",
  },
  discountBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#1DBF73",
  },
  discountText: {
    fontSize: 10,
    color: "#1DBF73",
    fontWeight: "500",
  },
  amountText: {
    fontSize: 12,
    color: "#1DBF73",
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionButtonText: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
  },
  quickActions: {
    flexDirection: "row",
    gap: 4,
  },
  quickAction: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
  },
  quickActionIcon: {
    fontSize: 12,
    color: "#6b7280",
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
