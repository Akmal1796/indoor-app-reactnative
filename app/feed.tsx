import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { Link } from "expo-router";

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

  const [newPost, setNewPost] = useState("");
  const [showPostForm, setShowPostForm] = useState(false);

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
          : post,
      ),
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
      setShowPostForm(false);
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>I</Text>
          </View>
          <Text style={styles.headerTitle}>Sports Feed</Text>
        </View>
        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => setShowPostForm(!showPostForm)}
        >
          <Text style={styles.createPostIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      {/* Create Post Form */}
      {showPostForm && (
        <View style={styles.postForm}>
          <View style={styles.postFormHeader}>
            <Text style={styles.postFormTitle}>Share with the community</Text>
            <TouchableOpacity onPress={() => setShowPostForm(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.postInput}
            placeholder="What's happening in your sports world?"
            value={newPost}
            onChangeText={setNewPost}
            multiline
            numberOfLines={3}
          />
          <View style={styles.postFormActions}>
            <View style={styles.postOptions}>
              <TouchableOpacity style={styles.postOption}>
                <Text style={styles.postOptionIcon}>📷</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postOption}>
                <Text style={styles.postOptionIcon}>📍</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postOption}>
                <Text style={styles.postOptionIcon}>🏃‍♂️</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.postButton} onPress={handlePost}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Feed */}
      <ScrollView
        style={styles.feed}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            {/* Post Header */}
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

            {/* Post Content */}
            <Text style={styles.postContent}>{post.content}</Text>

            {/* Post Image Placeholder */}
            {post.image && (
              <View style={styles.postImage}>
                <Text style={styles.imagePlaceholder}>📷 Image</Text>
              </View>
            )}

            {/* Post Actions */}
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
        <Link href="/booking-history" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>📋</Text>
            <Text style={styles.navText}>History</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text style={[styles.navIcon, styles.activeNavIcon]}>📱</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Feed</Text>
        </TouchableOpacity>
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
    backgroundColor: "white",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
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
    backgroundColor: "#4827EC",
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
    fontSize: 40,
    marginRight: 12,
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
