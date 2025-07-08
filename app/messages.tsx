import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";

export default function Messages() {
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Thunder Hawks Team",
      lastMessage: "Great match yesterday! When's our next practice?",
      timestamp: "2 min ago",
      unread: 3,
      isOnline: true,
      type: "team",
    },
    {
      id: 2,
      name: "SportZone Complex",
      lastMessage: "Your booking for tomorrow has been confirmed!",
      timestamp: "1 hour ago",
      unread: 1,
      isOnline: false,
      type: "venue",
    },
    {
      id: 3,
      name: "John Anderson",
      lastMessage: "Are you free for badminton this evening?",
      timestamp: "3 hours ago",
      unread: 0,
      isOnline: true,
      type: "player",
    },
  ];

  const chatMessages = [
    {
      id: 1,
      sender: "John Anderson",
      message: "Hey! Are you free for badminton this evening?",
      timestamp: "3:45 PM",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      message: "Yes! What time are you thinking?",
      timestamp: "3:47 PM",
      isMe: true,
      status: "read",
    },
    {
      id: 3,
      sender: "John Anderson",
      message:
        "How about 6 PM at SportZone? I already checked, Court A is available.",
      timestamp: "3:48 PM",
      isMe: false,
    },
    {
      id: 4,
      sender: "Me",
      message: "Perfect! Should I book it or do you want to?",
      timestamp: "3:50 PM",
      isMe: true,
      status: "read",
    },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "team":
        return "👥";
      case "venue":
        return "🏢";
      case "player":
        return "👤";
      default:
        return "💬";
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  if (activeChat) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Chat Header */}
        <View style={styles.chatHeader}>
          <View style={styles.chatHeaderRow}>
            <TouchableOpacity
              onPress={() => setActiveChat(null)}
              style={styles.backButton}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>
                {conversations.find((c) => c.id === activeChat)?.name}
              </Text>
              <View style={styles.onlineStatus}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Online</Text>
              </View>
            </View>
            <View style={styles.chatActions}>
              <TouchableOpacity style={styles.chatActionButton}>
                <Text style={styles.chatActionIcon}>📞</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatActionButton}>
                <Text style={styles.chatActionIcon}>📹</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Messages */}
        <ScrollView style={styles.messagesContainer}>
          <View style={styles.messagesList}>
            {chatMessages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageRow,
                  message.isMe ? styles.myMessageRow : styles.theirMessageRow,
                ]}
              >
                {!message.isMe && (
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{message.sender[0]}</Text>
                  </View>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    message.isMe ? styles.myMessage : styles.theirMessage,
                  ]}
                >
                  <Text style={styles.messageText}>{message.message}</Text>
                  <View style={styles.messageFooter}>
                    <Text style={styles.messageTime}>{message.timestamp}</Text>
                    {message.isMe && message.status === "read" && (
                      <Text style={styles.readStatus}>✓✓</Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Message Input */}
        <View style={styles.messageInput}>
          <TouchableOpacity style={styles.attachButton}>
            <Text style={styles.attachIcon}>📎</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              style={styles.textInput}
              multiline
            />
            <TouchableOpacity style={styles.emojiButton}>
              <Text style={styles.emojiIcon}>😊</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleSendMessage}
            style={[
              styles.sendButton,
              !newMessage.trim() && styles.sendButtonDisabled,
            ]}
            disabled={!newMessage.trim()}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}


      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                placeholder="Search conversations..."
                style={styles.searchInput}
              />
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickActionIcon}>👥</Text>
              <Text style={styles.quickActionText}>Teams</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickActionIcon}>🏢</Text>
              <Text style={styles.quickActionText}>Venues</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickActionIcon}>👤</Text>
              <Text style={styles.quickActionText}>Players</Text>
            </TouchableOpacity>
          </View>

          {/* Conversations */}
          <View style={styles.conversationsList}>
            {conversations.map((conversation) => (
              <TouchableOpacity
                key={conversation.id}
                style={styles.conversationCard}
                onPress={() => setActiveChat(conversation.id)}
              >
                <View style={styles.conversationContent}>
                  <View style={styles.avatarContainer}>
                    <View style={styles.conversationAvatar}>
                      <Text style={styles.conversationAvatarText}>
                        {conversation.name[0]}
                      </Text>
                    </View>
                    {conversation.isOnline && (
                      <View style={styles.onlineIndicator} />
                    )}
                  </View>

                  <View style={styles.conversationBody}>
                    <View style={styles.conversationHeader}>
                      <View style={styles.conversationTitleRow}>
                        <Text style={styles.conversationName}>
                          {conversation.name}
                        </Text>
                        <Text style={styles.conversationTypeIcon}>
                          {getTypeIcon(conversation.type)}
                        </Text>
                      </View>
                      <View style={styles.conversationMeta}>
                        <Text style={styles.conversationTime}>
                          {conversation.timestamp}
                        </Text>
                        {conversation.unread > 0 && (
                          <View style={styles.unreadBadge}>
                            <Text style={styles.unreadBadgeText}>
                              {conversation.unread}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                      {conversation.lastMessage}
                    </Text>
                  </View>
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
  headerButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 8,
    borderRadius: 8,
  },
  headerButtonIcon: {
    fontSize: 16,
    color: "white",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  searchContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: "#6b7280",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  quickActions: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  quickAction: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  quickActionIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  quickActionText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  conversationsList: {
    gap: 8,
  },
  conversationCard: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  conversationContent: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  avatarContainer: {
    position: "relative",
  },
  conversationAvatar: {
    width: 48,
    height: 48,
    backgroundColor: "#4827EC",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  conversationAvatarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    backgroundColor: "#10b981",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  conversationBody: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  conversationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  conversationTypeIcon: {
    fontSize: 12,
  },
  conversationMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  conversationTime: {
    fontSize: 12,
    color: "#6b7280",
  },
  unreadBadge: {
    backgroundColor: "#4827EC",
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  unreadBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  lastMessage: {
    fontSize: 14,
    color: "#6b7280",
  },
  chatHeader: {
    backgroundColor: "#4827EC",
    padding: 16,
  },
  chatHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatName: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  onlineStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  onlineDot: {
    width: 8,
    height: 8,
    backgroundColor: "#10b981",
    borderRadius: 4,
  },
  onlineText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  chatActions: {
    flexDirection: "row",
    gap: 8,
  },
  chatActionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 8,
    borderRadius: 8,
  },
  chatActionIcon: {
    fontSize: 16,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  messagesList: {
    padding: 16,
    gap: 16,
  },
  messageRow: {
    flexDirection: "row",
    gap: 8,
    maxWidth: "80%",
  },
  myMessageRow: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  theirMessageRow: {
    alignSelf: "flex-start",
  },
  avatar: {
    width: 32,
    height: 32,
    backgroundColor: "#4827EC",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  avatarText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    maxWidth: "100%",
  },
  myMessage: {
    backgroundColor: "#4827EC",
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    backgroundColor: "white",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  messageFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  messageTime: {
    fontSize: 12,
    opacity: 0.7,
  },
  readStatus: {
    fontSize: 12,
    opacity: 0.7,
  },
  messageInput: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    gap: 8,
  },
  attachButton: {
    padding: 8,
  },
  attachIcon: {
    fontSize: 20,
    color: "#6b7280",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
  },
  emojiButton: {
    padding: 4,
  },
  emojiIcon: {
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#4827EC",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#d1d5db",
  },
  sendIcon: {
    color: "white",
    fontSize: 16,
  },
  bottomNav: {
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
