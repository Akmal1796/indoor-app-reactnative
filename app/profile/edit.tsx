import React, { useState } from "react";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { Link, router,Stack  } from "expo-router";

export const screenOptions = {
  headerShown: false,
};


export default function ProfileEditScreen() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 234 567 8900",
    bio: "Passionate sports enthusiast who loves playing futsal and basketball.",
    location: "New York, NY",
    preferredSports: ["Futsal", "Basketball"],
    skillLevel: "Intermediate",
    availability: "Weekends",
  });

  const [profileImage, setProfileImage] = useState("👤");

  const skillLevels = ["Beginner", "Intermediate", "Advanced", "Professional"];
  const availabilityOptions = ["Weekdays", "Weekends", "Both"];
  const sportsOptions = [
    "Futsal",
    "Basketball",
    "Cricket",
    "Badminton",
    "Tennis",
    "Volleyball",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSportToggle = (sport: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredSports: prev.preferredSports.includes(sport)
        ? prev.preferredSports.filter((s) => s !== sport)
        : [...prev.preferredSports, sport],
    }));
  };

  const handleSave = () => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim()
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    Alert.alert("Success", "Profile updated successfully!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const handleChangePhoto = () => {
    Alert.alert("Change Profile Photo", "Choose an option", [
      { text: "Camera", onPress: () => console.log("Camera selected") },
      { text: "Gallery", onPress: () => console.log("Gallery selected") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Link href="/profile" asChild>
            <TouchableOpacity style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          </Link>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View> */}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <Text style={styles.profilePhoto}>{profileImage}</Text>
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={handleChangePhoto}
            >
              <Text style={styles.changePhotoIcon}>📷</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleChangePhoto}>
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>First Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(value) => handleInputChange("firstName", value)}
                placeholder="Enter first name"
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Last Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(value) => handleInputChange("lastName", value)}
                placeholder="Enter last name"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(value) => handleInputChange("phone", value)}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(value) => handleInputChange("location", value)}
              placeholder="Enter your location"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.bio}
              onChangeText={(value) => handleInputChange("bio", value)}
              placeholder="Tell us about yourself"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Sports Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sports Preferences</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Preferred Sports</Text>
            <View style={styles.sportsGrid}>
              {sportsOptions.map((sport) => (
                <TouchableOpacity
                  key={sport}
                  style={[
                    styles.sportChip,
                    formData.preferredSports.includes(sport) &&
                      styles.sportChipSelected,
                  ]}
                  onPress={() => handleSportToggle(sport)}
                >
                  <Text
                    style={[
                      styles.sportChipText,
                      formData.preferredSports.includes(sport) &&
                        styles.sportChipTextSelected,
                    ]}
                  >
                    {sport}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Skill Level</Text>
            <View style={styles.optionsRow}>
              {skillLevels.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.optionButton,
                    formData.skillLevel === level &&
                      styles.optionButtonSelected,
                  ]}
                  onPress={() => handleInputChange("skillLevel", level)}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      formData.skillLevel === level &&
                        styles.optionButtonTextSelected,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Availability</Text>
            <View style={styles.optionsRow}>
              {availabilityOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    formData.availability === option &&
                      styles.optionButtonSelected,
                  ]}
                  onPress={() => handleInputChange("availability", option)}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      formData.availability === option &&
                        styles.optionButtonTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Public Profile</Text>
              <Text style={styles.settingDescription}>
                Allow others to see your profile
              </Text>
            </View>
            <TouchableOpacity style={styles.toggleButton}>
              <Text style={styles.toggleText}>✓</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Show Contact Info</Text>
              <Text style={styles.settingDescription}>
                Display phone number and email to team members
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.toggleButton, styles.toggleButtonOff]}
            >
              <Text style={styles.toggleText}>✗</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Activity Status</Text>
              <Text style={styles.settingDescription}>
                Show when you're online
              </Text>
            </View>
            <TouchableOpacity style={styles.toggleButton}>
              <Text style={styles.toggleText}>✓</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.dangerButton}>
            <Text style={styles.dangerButtonText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.dangerButton, styles.deleteButton]}>
            <Text style={[styles.dangerButtonText, styles.deleteButtonText]}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#1DBF73",
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
  saveButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  photoSection: {
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  photoContainer: {
    position: "relative",
    marginBottom: 12,
  },
  profilePhoto: {
    fontSize: 80,
    width: 120,
    height: 120,
    textAlign: "center",
    lineHeight: 120,
    backgroundColor: "#f3f4f6",
    borderRadius: 60,
    overflow: "hidden",
  },
  changePhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1DBF73",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  changePhotoIcon: {
    fontSize: 20,
    color: "white",
  },
  changePhotoText: {
    color: "#1DBF73",
    fontWeight: "600",
  },
  section: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "white",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  sportsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  sportChip: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  sportChipSelected: {
    backgroundColor: "#1DBF73",
    borderColor: "#1DBF73",
  },
  sportChipText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
  },
  sportChipTextSelected: {
    color: "white",
  },
  optionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  optionButton: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  optionButtonSelected: {
    backgroundColor: "#1DBF73",
    borderColor: "#1DBF73",
  },
  optionButtonText: {
    color: "#374151",
    fontWeight: "500",
    fontSize: 14,
  },
  optionButtonTextSelected: {
    color: "white",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  toggleButton: {
    backgroundColor: "#1DBF73",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonOff: {
    backgroundColor: "#d1d5db",
  },
  toggleText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  dangerButton: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  dangerButtonText: {
    color: "#374151",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  deleteButtonText: {
    color: "#dc2626",
  },
  bottomSpace: {
    height: 80,
  },
});
