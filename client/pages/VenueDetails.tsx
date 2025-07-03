import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewModal from "@/components/ReviewModal";
import {
  ChevronLeft,
  Heart,
  Star,
  MapPin,
  Users,
  Droplets,
  Trophy,
  Plus,
  Calendar,
  Home,
  List,
  Search,
} from "lucide-react";

export default function VenueDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("sports");
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleReviewSubmit = (reviewData: any) => {
    console.log("New review submitted:", reviewData);
    // Handle review submission logic here
  };

  const venue = {
    id: 1,
    name: "Kanzul Sports Complex",
    image:
      "https://caavl.com/storage/files/lk/1926/thumb-816x460-487a8ca23f14c980894df937a151e030.jpg",
    rating: 4.5,
    reviewsCount: 1240,
    address: "6315 N. Warana Road Thihariya",
    location: "Kalagedihena",
    monthlyRate: "$11,049/month",
    sports: [
      {
        id: 1,
        name: "Football/Soccer",
        price: "1300",
        image:
      "https://www.nbc.com/sites/nbcblog/files/2024/07/paris-2024-olympics-soccer.jpg",
      },
      {
        id: 2,
        name: "Tennis",
        price: "800",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9s7Zsas3Ee0grv_PPcI4yznWl4TduWjCe8w&s",
      },
      {
        id: 3,
        name: "Pool/Billiards",
        price: "300",
        image:
      "https://cdn.britannica.com/73/80573-050-A596D085/Billiard-balls-table.jpg",
      },
      {
        id: 4,
        name: "Table Tennis",
        price: "500",
        image:
          "https://www.paralympic.org/sites/default/files/styles/large_original/public/images/150413103127066_LON_0109_4685.jpg?itok=rgvvqm0F",
      },
    ],
    gallery: [
      "https://caavl.com/storage/files/lk/1926/thumb-816x460-487a8ca23f14c980894df937a151e030.jpg",
      "https://caavl.com/storage/files/lk/1926/thumb-816x460-487a8ca23f14c980894df937a151e030.jpg",
      "https://caavl.com/storage/files/lk/1928/thumb-816x460-6feaf76aff9cd80dcff6b389660e36ba.jpeg",
      "https://caavl.com/storage/files/lk/1928/thumb-816x460-6feaf76aff9cd80dcff6b389660e36ba.jpeg",
    ],
    reviews: [
      {
        id: 1,
        name: "Ahmd Arkam",
        location: "Thihariya",
        avatar:
          "https://media.licdn.com/dms/image/v2/D4E03AQGzhtrV6TYsQw/profile-displayphoto-shrink_200_200/B4EZT0AQtOGwAY-/0/1739260497870?e=2147483647&v=beta&t=73gqVUf1rElwvWbBzZHyEvlDgYQSmGbp4057lItAy5g",
        comment:
          "Emma Grace is a passionate Listing Agent, known for her in-depth consulting skills and understanding of the real estate market. She is dedicated to helping clients find and sell homes, providing optimal solutions to achieve their goals.",
      },
      {
        id: 2,
        name: "Mohmd Akmal",
        location: "Kahatowita",
        avatar:
          "https://media.licdn.com/dms/image/v2/D4E03AQGzhtrV6TYsQw/profile-displayphoto-shrink_200_200/B4EZT0AQtOGwAY-/0/1739260497870?e=2147483647&v=beta&t=73gqVUf1rElwvWbBzZHyEvlDgYQSmGbp4057lItAy5g",
        comment:
          "Great facilities and excellent customer service. The sports complex is well-maintained and offers a variety of activities.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Your Location</p>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">San Francisco, CA</span>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="bg-primary/30 text-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </Button>
        </div>
      </div>

      <div className="pb-20">
        {/* Hero Image */}
        <div className="relative">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-80 object-cover"
          />
          <Link
            to="/dashboard"
            className="absolute top-4 left-4 bg-white/80 rounded-full p-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-4 right-4 bg-white/80 hover:bg-white/90"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>

        {/* Venue Info */}
        <div className="bg-white p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{venue.rating}</span>
            <span className="text-xs text-gray-500">
              ({venue.reviewsCount.toLocaleString()} reviews)
            </span>
          </div>

          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            {venue.name}
          </h1>
          <p className="text-sm text-gray-500 mb-1">{venue.monthlyRate}</p>
          <p className="text-sm font-medium text-gray-700 mb-1">
            {venue.address}
          </p>
          <p className="text-sm text-gray-500">{venue.location}</p>
        </div>

        {/* Tabs */}
        <div className="bg-white">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="px-4">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-2xl p-1">
                <TabsTrigger
                  value="sports"
                  className="rounded-xl text-sm data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Sports
                </TabsTrigger>
                <TabsTrigger
                  value="gallery"
                  className="rounded-xl text-sm data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Gallery
                </TabsTrigger>
                <TabsTrigger
                  value="info"
                  className="rounded-xl text-sm data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Info
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="sports" className="p-4 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Our Games
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {venue.sports.map((sport) => (
                  <Link
                    key={sport.id}
                    to={`/sport/${sport.id}`}
                    className="block"
                  >
                    <div className="relative bg-gray-900 rounded-2xl overflow-hidden h-40">
                      <img
                        src={sport.image}
                        alt={sport.name}
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
                        <div className="text-2xl font-bold mb-1">
                          Rs {sport.price}
                        </div>
                        <div className="text-sm opacity-90">Per Hour</div>
                        <div className="text-sm opacity-90">{sport.name}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {venue.gallery.map((image, index) => (
                  <div key={index} className="rounded-2xl overflow-hidden">
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="info" className="p-4 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Venue Information
                </h2>
                <Button
                  onClick={() => setShowReviewModal(true)}
                  className="bg-[#4827EC] hover:bg-[#3d1fb8] text-white px-4 py-2 text-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Write Review
                </Button>
              </div>

              <div>
                <h3 className="text-md font-semibold text-gray-900 mb-4">
                  Facilities
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Trophy className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Square Feet</h3>
                      <p className="text-sm text-gray-500">10x10 Square</p>
                      <p className="text-sm text-gray-500">
                        11 players can play for a side
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Scoreboard Display
                      </h3>
                      <p className="text-sm text-gray-500">
                        Digital or manual scoring system
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Droplets className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Changing Rooms & Showers
                      </h3>
                      <p className="text-sm text-gray-500">
                        For teams to get ready and clean up after games
                      </p>
                      <p className="text-sm text-gray-500">
                        Separate male and female washrooms
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Location
                </h2>
                <div className="bg-gray-200 rounded-2xl h-48 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Map View</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Reviews Section */}
        <div className="bg-white mt-4 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Player's Reviews
            </h2>
            <Link to="#" className="text-sm text-green-600 font-medium">
              See all
            </Link>
          </div>

          <div className="space-y-4">
            {venue.reviews.map((review) => (
              <div key={review.id} className="flex gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">
                      {review.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {review.location}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
              className="bg-white text-[#4827EC] rounded-full p-3 inline-block"
            >
              <Home className="h-6 w-6" />
            </Link>
          </div>
          <Link to="/search" className="text-center text-white">
            <Search className="h-6 w-6 mx-auto mb-1" />
            <span className="text-xs">Search</span>
          </Link>
          <Link to="/profile" className="text-center text-white">
            <Users className="h-6 w-6 mx-auto mb-1" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col relative min-h-[100px] p-5 max-w-[1200px] mx-auto">
        <section className="flex flex-col relative min-h-[100px] p-5 w-full self-stretch flex-grow max-w-[1200px] mx-auto"></section>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        venueName={venue.name}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
}
