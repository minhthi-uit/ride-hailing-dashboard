import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditBooking() {
  const router = useRouter();
  const { id } = router.query;
  const { toast } = useToast();
  const [drivers, setDrivers] = useState([]);

  const form = useForm({
    defaultValues: {
      customer: "",
      pickup: "",
      dropoff: "",
      status: "Pending",
      driverId: "",
    },
  });

  // ✅ Fetch booking details for editing
  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/${id}`);
        const data = await response.json();
        if (data) {
          form.reset({
            customer: data.customer,
            pickup: data.pickup,
            dropoff: data.dropoff,
            status: data.status,
            driverId: data.driver ? data.driver.id.toString() : "",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to load booking details",
          variant: "destructive",
        });
      }
    };

    fetchBooking();
  }, [id]);

  // ✅ Fetch drivers for dropdown
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch("/api/drivers");
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error fetching drivers",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    };

    fetchDrivers();
  }, []);

  // ✅ Handle form submission (Update Booking)
  const onSubmit = async (data) => {
    try {
      const selectedDriver = drivers.find((d) => d.id === parseInt(data.driverId));

      await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          driver: selectedDriver || null,
        }),
      });

      toast({
        title: "Success",
        description: "Booking updated successfully",
      });

      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-lg mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Booking</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="customer"
                rules={{ required: "Customer name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter customer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pickup"
                rules={{ required: "Pickup location is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pickup location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dropoff"
                rules={{ required: "Dropoff location is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dropoff Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter dropoff location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="driverId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign Driver (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a driver" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {drivers.map((driver) => (
                          <SelectItem key={driver.id} value={driver.id.toString()}>
                            {driver.name} - {driver.vehicle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Update Booking
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
