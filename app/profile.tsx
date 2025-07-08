import React from "react";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
export default function Profile() {
  const user = {
    name: "Ashley Robinson",
    email: "onlybrianwhite@yahoo.com",
    bio: "Nisi ipsum officia consequat ea in non eiusmod eu. Reprehenderit et exercitation dolore pariatur dolor id aliquip amet nisi laboris.",
  };

  const menuItems = [
    {
      icon: "👥",
      title: "Team",
      href: "/team",
      showArrow: true,
    },
    {
      icon: "💳",
      title: "Payments",
      href: "/payments",
      showArrow: true,
    },
    {
      icon: "🎟️",
      title: "Your Promos",
      href: "/promos",
      showArrow: true,
    },
    {
      icon: "⚙️",
      title: "Settings",
      href: "/settings",
      showArrow: true,
    },
    {
      icon: "🎧",
      title: "Support",
      href: "/support",
      showArrow: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{user.name[0]}</Text>
                </View>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => router.push("/profile/edit")}
                >
                  <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bioSection}>
              <Text style={styles.bioText}>{user.bio}</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => router.push(item.href)}
              >
                <View style={styles.menuContent}>
                  <View style={styles.menuLeft}>
                    <View style={styles.menuIconContainer}>
                      <Text style={styles.menuIcon}>{item.icon}</Text>
                    </View>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                  </View>
                  {item.showArrow && <Text style={styles.menuArrow}>→</Text>}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => router.push("/booking-history")}
          style={styles.navItem}
        >
          <Feather name="calendar" size={24} color="green" />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/feed")} style={styles.navItem}>
          <Feather name="file-text" size={24} color="green" />
          <Text style={styles.navText}>Feed</Text>
        </TouchableOpacity>

        <View style={styles.navItem}>
          <TouchableOpacity
            onPress={() => router.push("/dashboard")}
            style={styles.homeButton}
          >
            <Ionicons name="home" size={28} color="green" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push("/search")} style={styles.navItem}>
          <Feather name="search" size={24} color="green" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/profile")} style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="green" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
 header: {
    backgroundColor: "#1DBF73",
    padding: 16,
    paddingTop: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
    headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 8,
    borderRadius: 8,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
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
  buttonText: {
    fontSize: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flex: 1,
  },
  headerLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
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
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  locationIcon: {
    fontSize: 16,
  },
  locationText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  notificationButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 8,
    borderRadius: 8,
  },
  notificationIcon: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: 40,
    paddingBottom: 80,
  },
  profileSection: {
    backgroundColor: "white",
  },
  profileHeader: {
    flexDirection: "row",
    padding: 24,
    gap: 16,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 96,
    height: 96,
    backgroundColor: "#1DBF73",
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 36,
    fontWeight: "600",
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },
  editButton: {
    borderWidth: 1,
    borderColor: "#1DBF73",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  editButtonText: {
    color: "#1DBF73",
    fontSize: 14,
    fontWeight: "500",
  },
  bioSection: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  bioText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  menuSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },
  menuItem: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#dcfce7",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: {
    fontSize: 20,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1f2937",
  },
  menuArrow: {
    fontSize: 16,
    color: "#6b7280",
  },
  // Bottom Navigation
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 0,
    paddingBottom: 25,
    backgroundColor: "white",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "green",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    color: "green",
    fontSize: 12,
    marginTop: 4,
  },
  homeButton: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 8,
  },
  //end bottom navigation
});
