import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeft,
  MapPin,
  CheckCircle,
  Download,
  Share2,
} from "lucide-react";

interface BookingData {
  game: { name: string; price: string };
  date: Date;
  time: string;
  venue: string;
}

export default function BookingSummary() {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [bookingId] = useState(
    `BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
  );

  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (data) {
      const parsed = JSON.parse(data);
      setBookingData({
        ...parsed,
        date: new Date(parsed.date),
      });
    }
  }, []);

  const handleConfirmBooking = () => {
    setShowQR(true);
  };

  const generateQRCodeData = () => {
    if (!bookingData) return "";
    return JSON.stringify({
      bookingId,
      venue: bookingData.venue,
      game: bookingData.game.name,
      date: bookingData.date.toLocaleDateString(),
      time: bookingData.time,
      price: bookingData.game.price,
    });
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No booking data found</p>
          <Link to="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Your Location</p>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">
                Alijinna Mawatha Thihariya
              </span>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="bg-primary/30 text-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 pb-20">
        {/* Back Button */}
        {!showQR && (
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 mb-6 text-gray-600"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Booking</span>
          </Link>
        )}

        {!showQR ? (
          <div className="space-y-6">
            {/* Page Title */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Booking Summary
              </h1>
              <p className="text-gray-600">
                Please review your booking details
              </p>
            </div>

            {/* Booking Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {bookingId}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Venue:</span>
                  <span className="font-medium">{bookingData.venue}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Game:</span>
                  <span className="font-medium">{bookingData.game.name}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {bookingData.date.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{bookingData.time}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-t border-gray-200">
                  <span className="text-lg font-semibold">Total Amount:</span>
                  <span className="text-xl font-bold text-primary">
                    {bookingData.game.price}/hour
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-blue-900">
                    Terms & Conditions:
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Cancellation allowed up to 2 hours before booking</li>
                    <li>
                      • Please arrive 10 minutes before your scheduled time
                    </li>
                    <li>• Valid ID required for verification</li>
                    <li>• Additional charges apply for overtime</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Confirm Button */}
            <Button
              onClick={handleConfirmBooking}
              className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl text-lg font-medium"
            >
              Confirm Booking
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Success Message */}
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-gray-600">
                Your booking has been successfully confirmed
              </p>
            </div>

            {/* QR Code Card */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">
                  Your Booking QR Code
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Show this QR code at the venue
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* QR Code Placeholder */}
                <div className="mx-auto w-48 h-48 bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="w-44 h-44 bg-white rounded grid grid-cols-8 gap-px p-2">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${
                          Math.random() > 0.5 ? "bg-black" : "bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-mono text-sm text-gray-600">
                    Booking ID: {bookingId}
                  </p>
                  <p className="text-xs text-gray-500">
                    Valid for: {bookingData.date.toLocaleDateString()} at{" "}
                    {bookingData.time}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2 py-3"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 py-3"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>

            {/* Return to Dashboard */}
            <Link to="/dashboard" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl text-lg font-medium">
                Return to Dashboard
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary px-4 py-2">
        <div className="flex items-center justify-center relative">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <Link to="/dashboard">
              <svg
                className="w-6 h-6 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex justify-around items-center mt-2">
          <Link to="/booking-history" className="text-center text-white">
            <svg
              className="w-5 h-5 mx-auto mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
            </svg>
          </Link>
          <Link to="/feed" className="text-center text-white">
            <svg
              className="w-5 h-5 mx-auto mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5S5 9.329 5 8.5zM9 9h2v1H9V9zm0-2.5h9v1H9v-1zM9 12h9v1H9v-1zm0 2.5h9v1H9v-1zM5 13.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5S5 14.328 5 13.5zM5 18.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5S5 19.328 5 18.5z" />
            </svg>
          </Link>
          <div className="text-center text-white">
            {/* Center space for home button */}
          </div>
          <Link to="/search" className="text-center text-white">
            <svg
              className="w-5 h-5 mx-auto mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </Link>
          <Link to="/profile" className="text-center text-white">
            <svg
              className="w-5 h-5 mx-auto mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
