import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MustBeAny } from "@/types";
import { ActivityIcon, Clock } from "lucide-react";
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('activityUpdate', (updatedLogs) => {
      setLogs(() => {
        // Keep only the latest 50 logs to prevent excessive rendering
        const newLogs = [...updatedLogs].reverse();
        return newLogs.slice(0, 50);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const formatTimestamp = (timestamp: MustBeAny) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const getActivityIcon = (activity: MustBeAny) => {
    // You can customize this based on your activity types
    if (activity.includes('booking')) return '🚗';
    if (activity.includes('user')) return '👤';
    if (activity.includes('payment')) return '💰';
    return '📝';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <ActivityIcon className="h-5 w-5" />
          Activity Log
        </CardTitle>
        <Badge variant={isConnected ? "default" : "destructive"}>
          {isConnected ? "Live" : "Offline"}
        </Badge>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {logs.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No recent activity
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-sm"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getActivityIcon(log)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{log}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimestamp(new Date())}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}