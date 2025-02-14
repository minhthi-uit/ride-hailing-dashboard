import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Driver } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import DriverProfile from "./DriverProfile";
import { Card } from "./ui/card";

export default function DriverList() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  useEffect(() => {
    axios.get("/api/drivers").then((res) => setDrivers(res.data));
  }, []);

  return (
    <Card className="p-4">
      <h2 className="text-lg font-bold">Available Drivers</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers?.map((driver) => (
            <TableRow key={driver.id}>
              <TableCell>{driver.name}</TableCell>
              <TableCell>{driver.vehicle}</TableCell>
              <TableCell>{driver.rating}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedDriver(driver)}>View Profile</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Driver Profile</DialogTitle>
                    {selectedDriver && <DriverProfile driver={selectedDriver} />}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
