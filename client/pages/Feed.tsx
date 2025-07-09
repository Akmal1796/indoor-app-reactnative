import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  MapPin,
  Clock,
  Users,
  Home,
  Calendar,
  List,
  Search,
  User,
} from "lucide-react";

const Feed = () => {
  const [showCreatePost, setShowCreatePost] = React.useState(false);
  const [newPostText, setNewPostText] = React.useState("");
  const [newPostImage, setNewPostImage] = React.useState<string | null>(null);
  const [newPostVideo, setNewPostVideo] = React.useState<string | null>(null);
  const [posts, setPosts] = React.useState<any[]>([]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const videoInputRef = React.useRef<HTMLInputElement>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "venue_update":
        return <MapPin className="h-4 w-4 text-blue-500" />;
      case "promotion":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "news":
        return <Bell className="h-4 w-4 text-orange-500" />;
      case "trending":
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleCreatePost = () => {
    if (!newPostText.trim() && !newPostImage && !newPostVideo) return;
    const post = {
      id: Date.now(),
      author: "Mohamed Saman",
      authorAvatar:
        "https://media.licdn.com/dms/image/v2/D4E03AQGzhtrV6TYsQw/profile-displayphoto-shrink_200_200/B4EZT0AQtOGwAY-/0/1739260497870?e=2147483647&v=beta&t=73gqVUf1rElwvWbBzZHyEvlDgYQSmGbp4057lItAy5g",
      content: newPostText,
      image: newPostImage,
      video: newPostVideo,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
    };
    setPosts([post, ...posts]);
    setShowCreatePost(false);
    setNewPostText("");
    setNewPostImage(null);
    setNewPostVideo(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setNewPostImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  React.useEffect(() => {
    const stored = localStorage.getItem("myFeedPosts");
    if (stored) setPosts(JSON.parse(stored));
  }, []);
  React.useEffect(() => {
    localStorage.setItem("myFeedPosts", JSON.stringify(posts));
  }, [posts]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#1DBF73] text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Sports Feed</h1>
            <p className="text-sm opacity-80">Latest updates and news</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/20 hover:bg-white/30"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {/* Stories Section */}
        <div className="mb-6">
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {/* Add Your Story */}
            <div className="min-w-[80px] flex-shrink-0">
              <div className="relative">
                <div className="w-20 h-28 bg-gradient-to-b from-gray-200 to-gray-300 rounded-2xl overflow-hidden">
                  <div className="w-full h-20 bg-gray-400 flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 bg-[#1DBF73] rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-white text-xs font-bold">+</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center mt-1 text-gray-600">
                  Add Story
                </p>
              </div>
            </div>

            {/* Stories */}
            {[
              {
                id: 1,
                user: "SportZone",
                image:
                  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=80&h=120&fit=crop",
                isLive: true,
                sport: "Badminton Live",
              },
              {
                id: 2,
                user: "Cricket Club",
                image:
                  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=80&h=120&fit=crop",
                isLive: false,
                sport: "Match Highlights",
              },
              {
                id: 3,
                user: "Elite Arena",
                image:
                  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=120&fit=crop",
                isLive: true,
                sport: "Football Live",
              },
              {
                id: 4,
                user: "Pro Courts",
                image:
                  "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=80&h=120&fit=crop",
                isLive: false,
                sport: "Swimming Tips",
              },
            ].map((story) => (
              <div key={story.id} className="min-w-[80px] flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-28 rounded-2xl overflow-hidden ring-2 ring-[#1DBF73] ring-offset-2">
                    <img
                      src={story.image}
                      alt={story.user}
                      className="w-full h-full object-cover"
                    />
                    {story.isLive && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        LIVE
                      </div>
                    )}
                    <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#1DBF73] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {story.user[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-center mt-1 text-gray-600 truncate">
                    {story.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Post Section (Facebook Style) */}
        <Card className="mb-6 border-gray-200">
          <CardContent className="p-4">
            <div className="flex gap-3 items-center">
              <img
                src="https://media.licdn.com/dms/image/v2/D4E03AQGzhtrV6TYsQw/profile-displayphoto-shrink_200_200/B4EZT0AQtOGwAY-/0/1739260497870?e=2147483647&v=beta&t=73gqVUf1rElwvWbBzZHyEvlDgYQSmGbp4057lItAy5g"
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <button
                onClick={() => setShowCreatePost(true)}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-900 placeholder-gray-500 outline-none hover:bg-gray-200 transition-colors text-left"
              >
                What's on your mind, Mohamed?
              </button>
            </div>
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
              <button
                className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => videoInputRef.current?.click()}
                type="button"
              >
                <span className="text-pink-600">Live Video</span>
                <input
                  type="file"
                  accept="video/*"
                  capture="user"
                  ref={videoInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setNewPostVideo(ev.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </button>
              <button className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-500 text-sm">📷</span>
                </div>
                <span className="text-gray-600 font-medium text-sm">Photo</span>
              </button>
              <button className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-3 w-3 text-orange-500" />
                </div>
                <span className="text-gray-600 font-medium text-sm">
                  Check-in
                </span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant="default"
            size="sm"
            className="bg-[#1DBF73] hover:bg-[#17a862] whitespace-nowrap"
          >
            All
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Venues
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Promotions
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            News
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Trending
          </Button>
        </div>

        {/* Feed Items */}
        <div className="space-y-4">
          {posts.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                {item.image && (
                  <div className="relative">
                    <img
                      src={item.image}
                      alt="Post"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={item.authorAvatar}
                      alt={item.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-medium text-gray-900">
                        {item.author}
                      </span>
                      <div className="text-xs text-gray-500">
                        {item.timestamp}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                    {item.content}
                  </p>
                  {/* Like, Comment, Share Buttons */}
                    <div className="flex justify-center gap-6 mt-2 text-gray-500 space-x-6">
                    <button className="flex items-center gap-1 hover:text-[#1DBF73] transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">Like</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-[#1DBF73] transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">Comment</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-[#1DBF73] transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-6">
          <Button variant="outline" className="w-full">
            Load More Posts
          </Button>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setShowCreatePost(false)}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4">Create post</h2>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://media.licdn.com/dms/image/v2/D4E03AQGzhtrV6TYsQw/profile-displayphoto-shrink_200_200/B4EZT0AQtOGwAY-/0/1739260497870?e=2147483647&v=beta&t=73gqVUf1rElwvWbBzZHyEvlDgYQSmGbp4057lItAy5g"
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">Mohamed Saman</div>
                <div className="text-xs text-gray-500">Public</div>
              </div>
            </div>
            <textarea
              rows={4}
              className="w-full border-none outline-none resize-none text-lg placeholder-gray-400 mb-4"
              placeholder="What's on your mind, Mohamed?"
              autoFocus
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
            {newPostImage && (
              <img
                src={newPostImage}
                alt="Preview"
                className="w-full rounded-lg mb-3"
              />
            )}
            {newPostVideo && (
              <video
                src={newPostVideo}
                controls
                className="w-full rounded-lg mb-3"
              />
            )}
            {/* Add to your post actions */}
            <div className="flex gap-2 mb-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <span className="text-xl">😊</span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <span className="text-xl">📍</span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <span className="text-xl">👥</span>
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => fileInputRef.current?.click()}
                type="button"
              >
                <span className="text-xl">🖼️</span>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
              </button>
            </div>
            <Button
              className="w-full bg-[#1DBF73] text-white font-semibold rounded-full py-2"
              onClick={handleCreatePost}
            >
              Post
            </Button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white p-4">
        <div className="flex items-center justify-around">
          <Link to="/booking-history" className="text-center text-white">
            <Calendar className="h-6 w-6 mx-auto mb-1" />
            <span className="text-xs">History</span>
          </Link>
          <Link to="/feed" className="text-center text-white">
            <List className="h-6 w-6 mx-auto mb-1" />
            <span className="text-xs">Feed</span>
          </Link>
          <div className="text-center text-white">
            <Link
              to="/dashboard"
              className="bg-white text-green-600 rounded-full p-3 inline-block"
            >
              <Home className="h-6 w-6" />
            </Link>
          </div>
          <Link to="/search" className="text-center text-white">
            <Search className="h-6 w-6 mx-auto mb-1" />
            <span className="text-xs">Search</span>
          </Link>
          <Link to="/profile" className="text-center text-white">
            <User className="h-6 w-6 mx-auto mb-1" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Feed;
