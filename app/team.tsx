import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Link } from "expo-router";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "active" | "inactive";
}

export default function TeamScreen() {
  const [activeTab, setActiveTab] = useState<
    "my-teams" | "invitations" | "create"
  >("my-teams");
  const [searchText, setSearchText] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  const myTeams = [
    {
      id: "1",
      name: "Thunder Strikers",
      sport: "Futsal",
      members: 8,
      maxMembers: 10,
      nextGame: "2024-01-20",
      isOwner: true,
    },
    {
      id: "2",
      name: "Court Kings",
      sport: "Basketball",
      members: 5,
      maxMembers: 8,
      nextGame: "2024-01-22",
      isOwner: false,
    },
  ];

  const invitations = [
    {
      id: "1",
      teamName: "Spike Masters",
      sport: "Volleyball",
      invitedBy: "John Doe",
      inviteDate: "2024-01-15",
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Alex Johnson",
      role: "Captain",
      avatar: "👨‍💼",
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Chen",
      role: "Player",
      avatar: "👩‍🦱",
      status: "active",
    },
    {
      id: "3",
      name: "Mike Torres",
      role: "Player",
      avatar: "👨‍🦲",
      status: "inactive",
    },
    {
      id: "4",
      name: "Emma Davis",
      role: "Player",
      avatar: "👩‍🦳",
      status: "active",
    },
  ];

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      Alert.alert("Error", "Please enter a team name");
      return;
    }
    Alert.alert("Success", "Team created successfully!");
    setTeamName("");
    setTeamDescription("");
    setActiveTab("my-teams");
  };

  const handleAcceptInvite = (teamId: string) => {
    Alert.alert("Success", "Invitation accepted!");
  };

  const handleDeclineInvite = (teamId: string) => {
    Alert.alert("Info", "Invitation declined");
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
          <Text style={styles.headerTitle}>Team Management</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "my-teams" && styles.activeTab]}
          onPress={() => setActiveTab("my-teams")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "my-teams" && styles.activeTabText,
            ]}
          >
            My Teams
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "invitations" && styles.activeTab]}
          onPress={() => setActiveTab("invitations")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "invitations" && styles.activeTabText,
            ]}
          >
            Invitations ({invitations.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "create" && styles.activeTab]}
          onPress={() => setActiveTab("create")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "create" && styles.activeTabText,
            ]}
          >
            Create Team
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "my-teams" && (
          <View>
            {/* Search */}
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search teams..."
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

            {/* Teams List */}
            {myTeams.map((team) => (
              <View key={team.id} style={styles.teamCard}>
                <View style={styles.teamHeader}>
                  <View style={styles.teamInfo}>
                    <Text style={styles.teamName}>{team.name}</Text>
                    <Text style={styles.teamSport}>⚽ {team.sport}</Text>
                  </View>
                  {team.isOwner && (
                    <View style={styles.ownerBadge}>
                      <Text style={styles.ownerText}>Owner</Text>
                    </View>
                  )}
                </View>

                <View style={styles.teamStats}>
                  <Text style={styles.teamStatText}>
                    👥 {team.members}/{team.maxMembers} members
                  </Text>
                  <Text style={styles.teamStatText}>
                    📅 Next: {team.nextGame}
                  </Text>
                </View>

                <View style={styles.teamActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Manage</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === "invitations" && (
          <View>
            {invitations.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>📨</Text>
                <Text style={styles.emptyTitle}>No Invitations</Text>
                <Text style={styles.emptyDescription}>
                  You don't have any pending team invitations
                </Text>
              </View>
            ) : (
              invitations.map((invite) => (
                <View key={invite.id} style={styles.inviteCard}>
                  <View style={styles.inviteHeader}>
                    <Text style={styles.inviteTeamName}>{invite.teamName}</Text>
                    <Text style={styles.inviteSport}>⚽ {invite.sport}</Text>
                  </View>
                  <Text style={styles.inviteText}>
                    Invited by {invite.invitedBy} on {invite.inviteDate}
                  </Text>

                  <View style={styles.inviteActions}>
                    <TouchableOpacity
                      style={[styles.inviteButton, styles.acceptButton]}
                      onPress={() => handleAcceptInvite(invite.id)}
                    >
                      <Text style={styles.acceptButtonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.inviteButton, styles.declineButton]}
                      onPress={() => handleDeclineInvite(invite.id)}
                    >
                      <Text style={styles.declineButtonText}>Decline</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {activeTab === "create" && (
          <View style={styles.createForm}>
            <Text style={styles.formTitle}>Create New Team</Text>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Team Name *</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter team name"
                value={teamName}
                onChangeText={setTeamName}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Sport</Text>
              <TouchableOpacity style={styles.sportSelector}>
                <Text style={styles.sportSelectorText}>⚽ Select Sport</Text>
                <Text style={styles.sportSelectorArrow}>▼</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Description</Text>
              <TextInput
                style={[styles.formInput, styles.textArea]}
                placeholder="Describe your team (optional)"
                value={teamDescription}
                onChangeText={setTeamDescription}
                multiline
                numberOfLines={4}
              />
            </View>

            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateTeam}
            >
              <Text style={styles.createButtonText}>Create Team</Text>
            </TouchableOpacity>
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
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
  },
  teamCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  teamHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  teamSport: {
    fontSize: 14,
    color: "#6b7280",
  },
  ownerBadge: {
    backgroundColor: "#4827EC",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ownerText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  teamStats: {
    marginBottom: 16,
  },
  teamStatText: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  teamActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#4827EC",
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  inviteCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  inviteHeader: {
    marginBottom: 8,
  },
  inviteTeamName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  inviteSport: {
    fontSize: 14,
    color: "#6b7280",
  },
  inviteText: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  inviteActions: {
    flexDirection: "row",
    gap: 8,
  },
  inviteButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#4827EC",
  },
  acceptButtonText: {
    color: "white",
    fontWeight: "600",
  },
  declineButton: {
    backgroundColor: "#f3f4f6",
  },
  declineButtonText: {
    color: "#6b7280",
    fontWeight: "600",
  },
  createForm: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#111827",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  sportSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  sportSelectorText: {
    fontSize: 16,
    color: "#6b7280",
  },
  sportSelectorArrow: {
    fontSize: 12,
    color: "#6b7280",
  },
  createButton: {
    backgroundColor: "#4827EC",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
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
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: "#6b7280",
  },
});