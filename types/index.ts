// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MustBeAny = any;

export interface Driver {
  id: string;
  name: string;
  contact: string;
  email: string;
  vehicle: string;
  completedRides: number;
  rating: number;
  reviews: Array<{
    id: string;
    text: string;
    rating: number;
    date: Date;
  }>;
}