import { useState, useEffect } from 'react';
import { ViewerPage } from './pages/ViewerPage';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { WelcomeScreen } from './components/WelcomeScreen';
import { useSession } from './hooks/useSession';
import { useBooking } from './hooks/useBooking';
import { useRouter } from './hooks/useRouter';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false);
  
  const { isAuthenticated, userInfo, login, logout } = useSession();
  const { bookingState, updateBooking, resetBooking } = useBooking();
  const { currentRoute, navigateTo } = useRouter();

  // Debug logging
  console.log('App render:', { isAuthenticated, currentRoute, userInfo });

  // Auto-navigate authenticated users to home page
  useEffect(() => {
    if (isAuthenticated && currentRoute === 'viewer') {
      navigateTo('home');
    }
  }, [isAuthenticated, currentRoute, navigateTo]);

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    setShowSignupModal(true);
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
    setShowSignupModal(false);
    navigateTo('welcome');
  };

  const handleBookSpace = () => {
    if (isAuthenticated) {
      navigateTo('booking');
      resetBooking();
    } else {
      setShowSignupModal(true);
    }
  };

  const handleBackFromBooking = () => {
    navigateTo('home');
    resetBooking();
  };

  const handleConfirmBooking = () => {
    const { selectedSeats, selectedDate, selectedTimeSlot, selectedBookingPlan } = bookingState;
    
    alert(`Booking confirmed!\nPlan: ${selectedBookingPlan}\nSeats: ${selectedSeats.join(', ')}\nDate: ${selectedDate.toLocaleDateString()}\nTime: ${selectedTimeSlot}`);
    
    navigateTo('home');
    resetBooking();
  };

  const handleLogout = () => {
    logout();
    navigateTo('viewer');
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigateTo('home');
    } else {
      setShowSignupModal(true);
    }
  };

  // Route-based rendering with fallback
  console.log('Rendering route:', currentRoute);

  if (currentRoute === 'welcome') {
    return (
      <WelcomeScreen 
        userInfo={userInfo!}
        onContinue={() => navigateTo('home')}
        onExploreServices={() => navigateTo('home')}
      />
    );
  }

  if (currentRoute === 'home' && isAuthenticated && userInfo) {
    return (
      <HomePage
        userInfo={userInfo}
        onLogout={handleLogout}
        onBookSpace={handleBookSpace}
      />
    );
  }

  if (currentRoute === 'booking' && isAuthenticated && userInfo) {
    return (
      <BookingPage
        userInfo={userInfo}
        bookingState={bookingState}
        onBack={handleBackFromBooking}
        onLogout={handleLogout}
        onUpdateBooking={updateBooking}
        onConfirmBooking={handleConfirmBooking}
      />
    );
  }

  // Default to ViewerPage - simplified version for debugging
  console.log('About to render ViewerPage');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-center">SWSpace - ViewerPage</h1>
        <p className="text-center mt-4">Current route: {currentRoute}</p>
        <p className="text-center">Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
        <button 
          onClick={handleGetStarted}
          className="block mx-auto mt-4 px-6 py-3 bg-blue-600 text-white rounded"
        >
          Get Started
        </button>
      </div>
      
      {/* Try rendering ViewerPage */}
      <ViewerPage
        selectedPlan={selectedPlan}
        showSignupModal={showSignupModal}
        onSelectPlan={handleSelectPlan}
        onGetStarted={handleGetStarted}
        onCloseSignupModal={() => setShowSignupModal(false)}
        onSignup={handleSignup}
        onPlanChange={setSelectedPlan}
      />
    </div>
  );
}