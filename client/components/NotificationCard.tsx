import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  X,
  MapPin,
  Calendar,
  Users,
  CreditCard,
  Trophy,
  Star,
  Gift,
  AlertCircle,
  MessageCircle,
} from "lucide-react";

interface NotificationCardProps {
  notification: {
    id: number;
    type: string;
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    venue?: string;
    icon: React.ComponentType<any>;
    iconColor: string;
    iconBg: string;
    actionText: string;
    priority: "high" | "medium" | "low";
    discount?: string;
    amount?: string;
    teamName?: string;
    opponent?: string;
    friend?: string;
    points?: number;
    refund?: string;
  };
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
  onAction: (id: number, actionType: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
  onAction,
}) => {
  const IconComponent = notification.icon;

  return (
    <Card
      className={`transition-all hover:shadow-md cursor-pointer ${
        !notification.isRead
          ? "border-l-4 border-l-[#4827EC] bg-blue-50/30"
          : ""
      }`}
      onClick={() => onAction(notification.id, notification.type)}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Icon */}
          <div
            className={`p-2 rounded-full ${notification.iconBg} flex-shrink-0`}
          >
            <IconComponent className={`h-5 w-5 ${notification.iconColor}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3
                className={`font-semibold text-sm ${!notification.isRead ? "text-gray-900" : "text-gray-700"}`}
              >
                {notification.title}
              </h3>
              <div className="flex items-center gap-2 ml-2">
                {notification.priority === "high" && (
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                )}
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {notification.timestamp}
                </span>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-[#4827EC] rounded-full"></div>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
              {notification.message}
            </p>

            {/* Additional Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                {notification.venue && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate max-w-[120px]">
                      {notification.venue}
                    </span>
                  </div>
                )}
                {notification.discount && (
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-600 text-xs"
                  >
                    {notification.discount}
                  </Badge>
                )}
                {notification.amount && (
                  <span className="font-medium text-green-600">
                    {notification.amount}
                  </span>
                )}
                {notification.refund && (
                  <span className="font-medium text-blue-600">
                    Refunded: {notification.refund}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAction(notification.id, notification.type);
                  }}
                  className="text-xs px-3 h-7 hover:bg-[#4827EC] hover:text-white"
                >
                  {notification.actionText}
                </Button>
                <div className="flex gap-1">
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkAsRead(notification.id);
                      }}
                      className="p-1 h-7 w-7 hover:bg-green-100 hover:text-green-600"
                      title="Mark as read"
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(notification.id);
                    }}
                    className="p-1 h-7 w-7 hover:bg-red-50 hover:text-red-600"
                    title="Delete notification"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
