import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

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
    <View style={styles.container}>
      {/* Content */}
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>I</Text>
          </View>
          <Text style={styles.title}>IndoorB</Text>
          <Text style={styles.subtitle}>Sports Booking Made Easy</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Text style={styles.emoji}>📅</Text>
            </View>
            <Text style={styles.featureText}>Book courts instantly</Text>
          </View>
          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Text style={styles.emoji}>👥</Text>
            </View>
            <Text style={styles.featureText}>
              Connect with sports communities
            </Text>
          </View>
          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Text style={styles.emoji}>🏆</Text>
            </View>
            <Text style={styles.featureText}>
              Track your sporting activities
            </Text>
          </View>
        </View>

        {/* CTA Button */}
        <TouchableOpacity onPress={handleGetStarted} style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.redirectText}>
          Redirecting to dashboard in 3 seconds...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 48,
  },
  logoContainer: {
    width: 96,
    height: 96,
    backgroundColor: "#1DBF73",
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  logoText: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
  },
  featuresSection: {
    marginBottom: 48,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  featureIcon: {
    width: 32,
    height: 32,
    backgroundColor: "#1DBF73",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  emoji: {
    fontSize: 14,
  },
  featureText: {
    color: "#374151",
    fontSize: 16,
  },
  ctaButton: {
    backgroundColor: "#1DBF73",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
  },
  ctaButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  redirectText: {
    color: "#6b7280",
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
  },
});
