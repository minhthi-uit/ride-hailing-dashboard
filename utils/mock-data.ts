export const users = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    password: "password", // In real app, this would be a HASHED password!
    role: "Admin",
  },
  {
    id: "2",
    email: "operator@example.com",
    name: "Operator User",
    password: "password", // In real app, this would be a HASHED password!
    role: "Operator",
  },
];

export const bookings = [
  {
    id: "1",
    customerName: "John Doe",
    pickupLocation: "123 Main St",
    dropoffLocation: "456 Elm St",
    driverName: "Alice Smith",
    rideStatus: "Completed",
    driverId: "1", // Link to driver
  },
  // ... more bookings
];

export const drivers = [
  {
    id: "1",
    fullName: "Alice Smith",
    contactInfo: "alice@example.com",
    vehicleDetails: "Toyota Camry",
    completedRides: 150,
    ratings: 4.5,
    reviews: [],
  },
  // ... more drivers
];
