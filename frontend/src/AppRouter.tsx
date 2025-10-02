import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createAppRouter } from './routes/router';
import { useState, useEffect } from 'react';
import { useSession } from './hooks/useSession';
import { useBooking } from './hooks/useBooking';

function AppRouter() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const navigate = useNavigate();
  
  const { isAuthenticated, userInfo, login, logout } = useSession();
  const { bookingState, updateBooking, resetBooking } = useBooking();

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    if (!isAuthenticated) {
      // Show signup modal
    } else {
      // If authenticated, update booking state with the selected plan
      updateBooking({ selectedBookingPlan: planName });
      navigate('/booking');
    }
  };

  const handleSignup = (formData: any) => {
    const userData = {
      firstName: formData.firstName || 'User',
      lastName: formData.lastName || '',
      email: formData.email || '',
      phone: formData.phone || '',
      selectedPlan: selectedPlan,
      signupDate: new Date(),
      planStatus: 'inactive' as const
    };
    
    login(userData);
    navigate('/welcome');
  };

  const handleTestLogin = () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      selectedPlan: 'FIXED DESK',
      signupDate: new Date(),
      planStatus: 'active' as const
    };
    
    login(userData);
  };

  const handleBookSpace = () => {
    if (isAuthenticated) {
      // If user is authenticated, navigate to booking-form (new design)
      navigate('/booking-form');
    } else {
      // If not authenticated, show signup modal
      // After signup, user will be redirected to welcome screen
    }
  };

  const handleBackFromBooking = () => {
    resetBooking();
    navigate('/');
  };

  const handleConfirmBooking = () => {
    const { selectedSeats, selectedDate, selectedTimeSlot, selectedBookingPlan } = bookingState;
    
    alert(`Booking confirmed!\nPlan: ${selectedBookingPlan}\nSeats: ${selectedSeats.join(', ')}\nDate: ${selectedDate.toLocaleDateString()}\nTime: ${selectedTimeSlot}`);
    
    resetBooking();
    navigate('/');
  };

  // Create the router with all the necessary callbacks
  const router = createAppRouter(
    isAuthenticated,
    userInfo,
    bookingState,
    {
      navigate,
      handleBackFromBooking,
      updateBooking,
      handleConfirmBooking
    }
  );

  return <RouterProvider router={router} />;
}

export default AppRouter;