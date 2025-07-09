import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Star,
  Camera,
  Smile,
  ThumbsUp,
  MapPin,
  Users,
  Calendar,
  Upload,
  Check,
} from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  venueName: string;
  onSubmit: (review: ReviewData) => void;
}

interface ReviewData {
  rating: number;
  title: string;
  comment: string;
  visitDate: string;
  categories: string[];
  photos: File[];
  wouldRecommend: boolean;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  venueName,
  onSubmit,
}) => {
  const [reviewData, setReviewData] = useState<ReviewData>({
    rating: 0,
    title: "",
    comment: "",
    visitDate: "",
    categories: [],
    photos: [],
    wouldRecommend: true,
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  const categoryOptions = [
    { id: "facilities", label: "Facilities", icon: "🏢" },
    { id: "cleanliness", label: "Cleanliness", icon: "✨" },
    { id: "staff", label: "Staff Service", icon: "👥" },
    { id: "value", label: "Value for Money", icon: "💰" },
    { id: "location", label: "Location", icon: "📍" },
    { id: "equipment", label: "Equipment", icon: "⚽" },
    { id: "atmosphere", label: "Atmosphere", icon: "🎭" },
    { id: "booking", label: "Booking Process", icon: "📅" },
  ];

  const handleRatingClick = (rating: number) => {
    setReviewData((prev) => ({ ...prev, rating }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setReviewData((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((c) => c !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setReviewData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files].slice(0, 5), // Max 5 photos
    }));
  };

  const removePhoto = (index: number) => {
    setReviewData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (reviewData.rating === 0 || !reviewData.comment.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onSubmit(reviewData);
    setIsSubmitting(false);
    onClose();

    // Reset form
    setReviewData({
      rating: 0,
      title: "",
      comment: "",
      visitDate: "",
      categories: [],
      photos: [],
      wouldRecommend: true,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Write a Review
              </h2>
              <p className="text-gray-600 mt-1">
                Share your experience at {venueName}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Rating Section */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              How would you rate your overall experience?
            </h3>
            <div className="flex justify-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= (hoverRating || reviewData.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {(hoverRating || reviewData.rating) > 0 && (
              <p className="text-lg font-medium text-[#4827EC]">
                {ratingLabels[hoverRating || reviewData.rating]}
              </p>
            )}
          </div>

          {/* Review Title */}
          <div>
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Review Title (Optional)
            </Label>
            <Input
              id="title"
              value={reviewData.title}
              onChange={(e) =>
                setReviewData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Summarize your experience in a few words"
              className="mt-1"
            />
          </div>

          {/* Review Comment */}
          <div>
            <Label
              htmlFor="comment"
              className="text-sm font-medium text-gray-700"
            >
              Your Review *
            </Label>
            <textarea
              id="comment"
              value={reviewData.comment}
              onChange={(e) =>
                setReviewData((prev) => ({ ...prev, comment: e.target.value }))
              }
              placeholder="Tell others about your experience. What did you like? What could be improved?"
              rows={4}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#4827EC] focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {reviewData.comment.length}/500 characters
            </p>
          </div>

          {/* Visit Date */}
          <div>
            <Label
              htmlFor="visitDate"
              className="text-sm font-medium text-gray-700"
            >
              When did you visit?
            </Label>
            <Input
              id="visitDate"
              type="date"
              value={reviewData.visitDate}
              onChange={(e) =>
                setReviewData((prev) => ({
                  ...prev,
                  visitDate: e.target.value,
                }))
              }
              className="mt-1"
            />
          </div>

          {/* Category Ratings */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              What aspects were notable? (Select all that apply)
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {categoryOptions.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    reviewData.categories.includes(category.id)
                      ? "border-[#4827EC] bg-[#4827EC]/10 text-[#4827EC]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm font-medium">{category.label}</span>
                  {reviewData.categories.includes(category.id) && (
                    <Check className="h-4 w-4 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Add Photos (Optional)
            </h4>
            <div className="space-y-3">
              {reviewData.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {reviewData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {reviewData.photos.length < 5 && (
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#4827EC] transition-colors">
                  <Camera className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    Add photos to your review
                  </span>
                  <span className="text-xs text-gray-500">Up to 5 photos</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Would you recommend this venue to others?
            </h4>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  setReviewData((prev) => ({ ...prev, wouldRecommend: true }))
                }
                className={`flex-1 p-3 rounded-lg border transition-colors ${
                  reviewData.wouldRecommend
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <ThumbsUp className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Yes, I recommend</span>
              </button>
              <button
                onClick={() =>
                  setReviewData((prev) => ({ ...prev, wouldRecommend: false }))
                }
                className={`flex-1 p-3 rounded-lg border transition-colors ${
                  !reviewData.wouldRecommend
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-sm font-medium">
                  No, I don't recommend
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={
                reviewData.rating === 0 ||
                !reviewData.comment.trim() ||
                isSubmitting
              }
              className="flex-1 bg-[#4827EC] hover:bg-[#3d1fb8]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                "Submit Review"
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            By submitting, you agree that your review reflects your genuine
            experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
