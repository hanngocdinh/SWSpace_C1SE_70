import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import { BookingPage } from '../components/booking/BookingPage';
import { BookingFormPage } from '../pages/BookingFormPage';
import { WelcomeScreen } from '../components/WelcomeScreen';

// Authentication guard to protect routes
const AuthGuard = ({ component: Component, isAuthenticated }: any) => {
  return isAuthenticated ? Component : <Navigate to="/" />;
};

export const createAppRouter = (isAuthenticated: boolean, userInfo: any, bookingState: any, callbacks: any) => {
  return createBrowserRouter([
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/welcome',
      element: (
        <AuthGuard 
          component={
            <WelcomeScreen 
              userInfo={userInfo}
              onContinue={() => callbacks.navigate('/')}
              onExploreServices={() => callbacks.navigate('/')} 
            />
          } 
          isAuthenticated={isAuthenticated} 
        />
      )
    },
    {
      path: '/booking',
      element: (
        <AuthGuard 
          component={
            <BookingPage
              bookingState={bookingState}
              onBack={callbacks.handleBackFromBooking}
              onUpdateBooking={callbacks.updateBooking}
              onConfirmBooking={callbacks.handleConfirmBooking}
            />
          } 
          isAuthenticated={isAuthenticated} 
        />
      )
    },
    {
      path: '/booking-form',
      element: (
        <AuthGuard 
          component={
            <BookingFormPage
              onSubmit={(formData) => {
                console.log('Booking form submitted:', formData);
                callbacks.navigate('/');
                // Here you would typically send the data to your backend
              }}
            />
          } 
          isAuthenticated={isAuthenticated} 
        />
      )
    },
    // Add fallback route
    {
      path: '*',
      element: <Navigate to="/" replace />,
    }
  ]);
};