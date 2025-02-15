import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { MustBeAny } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [, setDeleteDialog] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/bookings").then((res) => setBookings(res.data.bookings));
  }, []);

  const deleteBooking = async (id: MustBeAny) => {
    setDeleteDialog(false);
    await axios.delete("/api/bookings", { data: { id } });
    setBookings(bookings.filter((b: MustBeAny) => b.id !== id));
    toast({ title: "Booking Deleted", description: `Booking ${id} has been deleted.` });
  };

  const bulkDelete = async () => {
    if (selectedBookings.length === 0) return;
    await axios.post("/api/bookings/bulk-delete", { ids: selectedBookings });
    setBookings(bookings.filter((b: MustBeAny) => !selectedBookings.includes(b.id)));
    setSelectedBookings([]);
    toast({ title: "Bookings Deleted", description: `${selectedBookings.length} bookings have been deleted.` });
  };
  const onEdit = (booking: MustBeAny) => {
    router.push(`/bookings/${booking.id}`);
  };
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Ride Bookings</h1>
        <Button variant="destructive" onClick={bulkDelete} disabled={selectedBookings.length === 0}>
          Delete Selected
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox onCheckedChange={(checked) => setSelectedBookings(checked ? bookings.map((b) => b.id) : [])} />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Pickup</TableHead>
            <TableHead>Dropoff</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((b: MustBeAny) => (
            <TableRow key={b.id}>
              <TableCell>
                <Checkbox checked={selectedBookings.includes(b.id)} onCheckedChange={() => setSelectedBookings((prev) => prev.includes(b.id) ? prev.filter(id => id !== b.id) : [...prev, b.id])} />
              </TableCell>
              <TableCell>{b.id}</TableCell>
              <TableCell>{b.customer}</TableCell>
              <TableCell>{b.pickup}</TableCell>
              <TableCell>{b.dropoff}</TableCell>
              <TableCell>{b.driver ? b.driver.name : "Unassigned"}</TableCell>
              <TableCell>{b.status}</TableCell>
              <TableCell>
                <Button variant="secondary" onClick={() => onEdit(b)}>Edit</Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete booking {b.id}?
                    </DialogDescription>
                    <Button variant="destructive" onClick={() => deleteBooking(b.id)}>Confirm</Button>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
