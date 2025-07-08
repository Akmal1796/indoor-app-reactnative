// components/CustomHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Header({ title = "Title", showBack = true }) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        {/* Left Column - Logo */}
        <View style={styles.logoSection}>
          <Text style={styles.headerTitle}>{title}</Text>
     
        </View>

        {/* Right Column - Action Buttons */}
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={() => router.push('/messages')}
            style={styles.headerButton}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={22} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/notifications')}
            style={[styles.headerButton, styles.notificationButton]}
          >
            <Ionicons name="notifications-outline" size={22} color="white" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1DBF73',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 25,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  logoSection: {},
  logoTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 16,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
  },
});
