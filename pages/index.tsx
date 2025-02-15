import ActivityLog from '@/components/ActivityLog';
import BookingTable from '@/components/BookingTable';
import DriverList from '@/components/DriverList';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Car, LogOut, Plus } from "lucide-react";
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  if (!session) {
    return (
      <Card className="max-w-md mx-auto mt-20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Car className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="text-2xl font-semibold">Authentication Required</h2>
            <p className="text-gray-500">Please log in to access the dashboard.</p>
            <Button variant="default" color="primary" onClick={handleLogin}>
              Log In
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Welcome, {session?.user?.name}</h2>
            <Button
              variant="destructive"
              onClick={() => signOut()}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-bold">Ride Bookings</CardTitle>
            <Button
              onClick={() => router.push('/bookings/new')}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Booking
            </Button>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <BookingTable />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityLog />
          </CardContent>
        </Card>
        <DriverList />
      </div>
    </div>
  );
}

