import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSession } from './hooks/useSession';
import { useBooking } from './hooks/useBooking';

// Components
import App from './App';
import { BookingPage } from './components/booking/BookingPage';
import { BookingFormPage } from './pages/BookingFormPage';
import { WelcomeScreen } from './components/WelcomeScreen';

export default function RouterApp() {
  const [selectedPlan, setSelectedPlan] = useState('');
  
  const { isAuthenticated, userInfo, login, logout } = useSession();
  const { bookingState, updateBooking, resetBooking } = useBooking();

  // Create router
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <App
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
          login={login}
          logout={logout}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          bookingState={bookingState}
          updateBooking={updateBooking}
          resetBooking={resetBooking}
        />
      ),
    },
    {
      path: '/welcome',
      element: (
        <WelcomeScreen 
          userInfo={userInfo}
          onContinue={() => window.location.href = '/'}
          onExploreServices={() => window.location.href = '/'} 
        />
      ),
    },
    {
      path: '/booking',
      element: (
        <BookingPage
          bookingState={bookingState}
          onBack={() => {
            resetBooking();
            window.location.href = '/';
          }}
          onUpdateBooking={updateBooking}
          onConfirmBooking={() => {
            const { selectedSeats, selectedDate, selectedTimeSlot, selectedBookingPlan } = bookingState;
            alert(`Booking confirmed!\nPlan: ${selectedBookingPlan}\nSeats: ${selectedSeats.join(', ')}\nDate: ${selectedDate.toLocaleDateString()}\nTime: ${selectedTimeSlot}`);
            resetBooking();
            window.location.href = '/';
          }}
        />
      ),
    },
    {
      path: '/booking-form',
      element: (
        <BookingFormPage
          onSubmit={(formData) => {
            console.log('Booking form submitted:', formData);
            window.location.href = '/';
          }}
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}