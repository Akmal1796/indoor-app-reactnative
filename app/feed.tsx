import React, { useState } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { Link, router } from "expo-router";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from "react-native";


const user = {
  name: "John Doe",
  avatarUrl: null, // or use a real URL like 'https://example.com/avatar.jpg'
};

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  timestamp: string;
  content: string;
  image?: string;
  sport: string;
  venue?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  type: "match" | "achievement" | "venue" | "general";
}

export default function FeedScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      user: { name: "Alex Johnson", avatar: "👨‍💼", verified: true },
      timestamp: "2 hours ago",
      content:
        "Just had an amazing futsal match! Our team won 4-2 against Thunder Bolts. Great teamwork everyone! 🔥⚽",
      sport: "Futsal",
      venue: "SportsPlex Arena",
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false,
      type: "match",
    },
    {
      id: "2",
      user: { name: "Sarah Chen", avatar: "👩‍🦱", verified: false },
      timestamp: "4 hours ago",
      content:
        "Looking for a badminton partner for this weekend. Anyone interested? 🏸",
      sport: "Badminton",
      likes: 12,
      comments: 15,
      shares: 2,
      isLiked: true,
      type: "general",
    },
    {
      id: "3",
      user: { name: "Mike Torres", avatar: "👨‍🦲", verified: true },
      timestamp: "6 hours ago",
      content:
        "Just scored my first hat-trick in the local league! Dreams do come true 🎯⚽ #NeverGiveUp",
      sport: "Football",
      likes: 89,
      comments: 23,
      shares: 12,
      isLiked: true,
      type: "achievement",
    },
    {
      id: "4",
      user: { name: "Emma Davis", avatar: "👩‍🦳", verified: false },
      timestamp: "8 hours ago",
      content:
        "This new basketball court at Downtown Sports Center is incredible! Perfect lighting and clean facilities 🏀✨",
      sport: "Basketball",
      venue: "Downtown Sports Center",
      likes: 45,
      comments: 12,
      shares: 8,
      isLiked: false,
      type: "venue",
    },
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handlePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        user: { name: "You", avatar: "👤", verified: false },
        timestamp: "Just now",
        content: newPost,
        sport: "General",
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        type: "general",
      };
      setPosts((prev) => [post, ...prev]);
      setNewPost("");
    }
  };

  const getSportEmoji = (sport: string) => {
    const sportEmojis: { [key: string]: string } = {
      Futsal: "⚽",
      Basketball: "🏀",
      Football: "🏈",
      Badminton: "🏸",
      Tennis: "🎾",
      Cricket: "🏏",
      Volleyball: "🏐",
      General: "🏃‍♂️",
    };
    return sportEmojis[sport] || "🏃‍♂️";
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "match":
        return "🏆";
      case "achievement":
        return "🎯";
      case "venue":
        return "🏟️";
      default:
        return "💬";
    }
  };

const [isExpanded, setIsExpanded] = useState(false);


const Avatar = ({ name, imageUri }) => {
  const getInitial = () => name ? name.charAt(0).toUpperCase() : "?";

  const backgroundColors = ["#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#F43F5E"];
  const randomColor = backgroundColors[(name?.charCodeAt(0) || 0) % backgroundColors.length];

  return imageUri ? (
    <Image
      source={{ uri: imageUri }}
      style={styles.avatarImage}
    />
  ) : (
    <View style={[styles.avatarFallback, { backgroundColor: randomColor }]}>
      <Text style={styles.avatarInitial}>{getInitial()}</Text>
    </View>
  );
};


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logo}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>

        {/* Right Column - Action Buttons */}
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={() => router.push("/messages")}
            style={styles.headerButton}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={22} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/notifications")}
            style={[styles.headerButton, styles.notificationButton]}
          >
            <Ionicons name="notifications-outline" size={22} color="white" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.feed}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
      {/* Always Visible Post Form */}
<View style={styles.postForm}>
  <View style={styles.postRow}>
    {/* Avatar outside the text box, like WhatsApp */}
<Avatar name="John Doe" imageUri={user?.avatarUrl} />

    {/* Content beside avatar */}
    <View style={styles.postContentArea}>
      {!isExpanded ? (
        <TouchableOpacity
          style={styles.postCollapsed}
          onPress={() => setIsExpanded(true)}
        >
          <Text style={styles.placeholderText}>
            What's happening in your sports world?
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          <TextInput
            style={styles.postInput}
            placeholder="Share your thoughts..."
            value={newPost}
            onChangeText={setNewPost}
            multiline
          />

          <View style={styles.mediaOptions}>
            <TouchableOpacity style={styles.postOption}>
              {/* Camera icon: metallic or grayish tint */}
              <Icon name="camera" size={24} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.postOption}>
              {/* Map marker: realistic red */}
              <Icon name="map-marker" size={24} color="#E11D48" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.postOption}>
              {/* Running man: sporty blue or vibrant green */}
              <Icon name="male" size={24} color="#2563EB" />
            </TouchableOpacity>
          </View>


          <View style={styles.expandedActions}>
            <TouchableOpacity
              onPress={() => {
                setIsExpanded(false);
                setNewPost("");
              }}
            >
              <Text style={{ color: "#6b7280" }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.postButton}
              onPress={() => {
                handlePost();
                setIsExpanded(false);
              }}
            >
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  </View>
</View>

      {/* Feed */}
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.userInfo}>
                <Text style={styles.userAvatar}>{post.user.avatar}</Text>
                <View style={styles.userDetails}>
                  <View style={styles.userNameRow}>
                    <Text style={styles.userName}>{post.user.name}</Text>
                    {post.user.verified && (
                      <Text style={styles.verifiedBadge}>✓</Text>
                    )}
                  </View>
                  <View style={styles.postMeta}>
                    <Text style={styles.postTime}>{post.timestamp}</Text>
                    <Text style={styles.metaDot}>•</Text>
                    <Text style={styles.postSport}>
                      {getSportEmoji(post.sport)} {post.sport}
                    </Text>
                    {post.venue && (
                      <>
                        <Text style={styles.metaDot}>•</Text>
                        <Text style={styles.postVenue}>📍 {post.venue}</Text>
                      </>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.postTypeIcon}>
                <Text style={styles.postTypeEmoji}>
                  {getPostTypeIcon(post.type)}
                </Text>
              </View>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            {post.image && (
              <View style={styles.postImage}>
                <Text style={styles.imagePlaceholder}>📷 Image</Text>
              </View>
            )}

            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleLike(post.id)}
              >
                <Text
                  style={[styles.actionIcon, post.isLiked && styles.likedIcon]}
                >
                  {post.isLiked ? "❤️" : "🤍"}
                </Text>
                <Text
                  style={[styles.actionText, post.isLiked && styles.likedText]}
                >
                  {post.likes}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>🔄</Text>
                <Text style={styles.actionText}>{post.shares}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>📤</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.loadMoreContainer}>
          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Load More Posts</Text>
          </TouchableOpacity>
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
    padding: 20,
    paddingTop: 40, // Adjust for status bar
    borderWidth: 0.4,
    borderColor: "green",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    backgroundColor: "white",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  logoText: {
    color: "#4827EC",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  createPostButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 8,
    borderRadius: 8,
  },
  createPostIcon: {
    fontSize: 20,
  },
  postForm: {
    backgroundColor: 'transparent',
    marginBottom: 8,
    borderRadius: 12,
    padding: 8,
    marginTop: 2,
  },
  postFormHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  postFormTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    paddingBottom: 5,
  },
  closeButton: {
    fontSize: 18,
    color: "#6b7280",
  },
  postInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 12,
  },
  postFormActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postOptions: {
    flexDirection: "row",
    gap: 8,
  },
  postOption: {
    padding: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  postOptionIcon: {
    fontSize: 16,
  },
  postButton: {
    backgroundColor: "#1DBF73",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  postButtonText: {
    color: "white",
    fontWeight: "600",
  },
  feed: {
    flex: 1,
    padding: 16,
  },
  postCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    flex: 1,
  },
  userAvatar: {
    fontSize: 20,
    marginRight: 0,
  },
  userDetails: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginRight: 4,
  },
  verifiedBadge: {
    fontSize: 14,
    color: "#4827EC",
  },
  postMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  postTime: {
    fontSize: 12,
    color: "#6b7280",
  },
  metaDot: {
    fontSize: 12,
    color: "#6b7280",
    marginHorizontal: 4,
  },
  postSport: {
    fontSize: 12,
    color: "#6b7280",
  },
  postVenue: {
    fontSize: 12,
    color: "#6b7280",
  },
  postTypeIcon: {
    marginLeft: 8,
  },
  postTypeEmoji: {
    fontSize: 20,
  },
  postContent: {
    fontSize: 16,
    color: "#111827",
    lineHeight: 24,
    marginBottom: 12,
  },
  postImage: {
    backgroundColor: "#f3f4f6",
    height: 200,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  imagePlaceholder: {
    fontSize: 16,
    color: "#6b7280",
  },
  postActions: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    padding: 4,
  },
  actionIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  likedIcon: {
    color: "#ef4444",
  },
  actionText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  likedText: {
    color: "#ef4444",
  },
  loadMoreContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  loadMoreButton: {
    backgroundColor: "#4827EC",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loadMoreText: {
    color: "white",
    fontWeight: "600",
  },
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
  activeNavIcon: {
    color: "#4827EC",
  },

  activeNavText: {
    color: "#4827EC",
    fontWeight: "600",
  },

expandedHeader: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: 8,
},

mediaOptions: {
  flexDirection: "row",
  justifyContent: "flex-start",
  gap: 8,
  marginBottom: 12,
},

expandedActions: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

postRow: {
  flexDirection: "row",
  alignItems: "baseline",
  marginBottom: 12,
},

postContentArea: {
  flex: 1,
  marginLeft: 10,
},

postCollapsed: {
  borderWidth: 1,
  borderColor: "#e5e7eb",
  borderRadius: 20,
  backgroundColor: "#f3f4f6",
  paddingVertical: 10,
  paddingHorizontal: 16,
},

placeholderText: {
  color: "#9ca3af",
  fontSize: 16,
},


avatarImage: {
  width: 40,
  height: 40,
  borderRadius: 20,
},

avatarFallback: {
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
},

avatarInitial: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},


  //header nav and mesg 
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
});
