import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

interface NotificationBadgeProps {
  count?: number;
  className?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count = 0,
  className = "",
}) => {
  return (
    <Link to="/notifications" className="relative">
      <Button
        size="sm"
        variant="ghost"
        className={`bg-white/20 hover:bg-white/30 text-white p-2 ${className}`}
      >
        <Bell className="w-5 h-5" />
        {count > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[18px] h-4 flex items-center justify-center rounded-full border-2 border-white">
            {count > 99 ? "99+" : count}
          </Badge>
        )}
      </Button>
    </Link>
  );
};

export default NotificationBadge;
