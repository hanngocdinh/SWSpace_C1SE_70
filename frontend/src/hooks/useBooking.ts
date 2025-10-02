import { useState } from 'react';
import { BookingState } from '../types';

export const useBooking = () => {
  const [bookingState, setBookingState] = useState<BookingState>({
    selectedSeats: [],
    selectedDate: new Date(),
    selectedTimeSlot: '',
    bookingStep: 1,
    selectedBookingPlan: ''
  });

  const updateBooking = (updates: Partial<BookingState>) => {
    setBookingState(prev => ({ ...prev, ...updates }));
  };

  const resetBooking = () => {
    setBookingState({
      selectedSeats: [],
      selectedDate: new Date(),
      selectedTimeSlot: '',
      bookingStep: 1,
      selectedBookingPlan: ''
    });
  };

  return {
    bookingState,
    updateBooking,
    resetBooking
  };
};