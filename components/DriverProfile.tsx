import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Driver } from "@/types";
import {
  Car,
  Phone,
  Route,
  Star
} from "lucide-react";

export default function DriverProfile({ driver }: { driver: Driver }) {
  const getInitials = (name: Driver['name']) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const getDriverLevel = (rides: Driver['completedRides']) => {
    if (rides >= 1000) return ["Elite", "bg-purple-500"];
    if (rides >= 500) return ["Expert", "bg-blue-500"];
    if (rides >= 100) return ["Pro", "bg-green-500"];
    return ["Rookie", "bg-gray-500"];
  };

  const [driverLevel, levelColor] = getDriverLevel(driver.completedRides);

  return (
    <Card className="max-w-md">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg bg-primary/10">
                {getInitials(driver.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{driver.name}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className={levelColor}>
                  {driverLevel}
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  <Star className="h-3 w-3 fill-current" /> {driver.rating.toFixed(1)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contact</p>
              <p className="font-medium">{driver.contact}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Car className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vehicle</p>
              <p className="font-medium">{driver.vehicle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Route className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed Rides</p>
              <p className="font-medium">{driver.completedRides.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Star className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rating</p>
              <div className="flex items-center gap-1">
                <p className="font-medium">{driver.rating.toFixed(1)}</p>
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(driver.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}