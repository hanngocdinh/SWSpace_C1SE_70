export interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  iconName: string;
  color: string;
  popular: boolean;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedPlan: string;
  signupDate: Date;
  planStatus: 'inactive' | 'active' | 'expired';
}

export interface Benefit {
  iconName: string;
  title: string;
  description: string;
  color: string;
}

export interface Review {
  name: string;
  position: string;
  avatar: string;
  rating: number;
  comment: string;
  color: string;
}

export interface BookingState {
  selectedSeats: string[];
  selectedDate: Date;
  selectedTimeSlot: string;
  bookingStep: number;
  selectedBookingPlan: string;
}