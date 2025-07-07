import { RequestHandler } from "express";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Ideally, these types would go into your `@shared/api` package.
export interface Notification {
  id: string;
  type: "booking" | "message" | "promo";
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
}

export interface NotificationsResponse {
  notifications: Notification[];
}

const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "booking",
    title: "Your booking is confirmed!",
    body: "Your booking for Kanzul Sport Complex on Dec 25, 2023 at 5:00 PM is confirmed.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: false,
  },
  {
    id: "notif-2",
    type: "message",
    title: "New message from Ahmd Sport",
    body: "You have a new message regarding your inquiry about futsal court availability.",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    read: false,
  },
  {
    id: "notif-3",
    type: "promo",
    title: "Holiday Special Offer!",
    body: "Get 20% off on your next Badminton court booking. Use code: HOLIDAY20",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read: true,
  },
];

export const handleGetNotifications: RequestHandler = (req, res) => {
  const response: NotificationsResponse = {
    notifications: mockNotifications,
  };
  res.status(200).json(response);
};