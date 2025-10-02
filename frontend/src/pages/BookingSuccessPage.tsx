import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CheckCircle } from 'lucide-react';

interface BookingSuccessState {
  selectedSeat: string;
  total: number;
  bookingDetails: {
    date: string;
    time: string;
    plan: string;
  };
}

export const BookingSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSeat, total, bookingDetails } = (location.state as BookingSuccessState) || {
    selectedSeat: 'C9',
    total: 110000,
    bookingDetails: {
      date: new Date().toLocaleDateString(),
      time: '10:00 AM - 4:00 PM',
      plan: 'HOT DESK'
    }
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleViewBookings = () => {
    navigate('/my-bookings');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        isAuthenticated={true}
        userInfo={{firstName: 'User', lastName: '', email: '', phone: '', selectedPlan: '', signupDate: new Date(), planStatus: 'active'}}
        onGetStarted={() => {}}
        onLogout={() => {}}
      />
      
      <div className="flex-grow py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-20 w-20 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Successful!</h1>
            <p className="text-gray-600 mb-8">Your workspace has been successfully booked.</p>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-gray-500">Seat Number</p>
                  <p className="text-xl font-semibold">{selectedSeat}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Plan</p>
                  <p className="text-xl font-semibold">{bookingDetails.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-xl font-semibold">{bookingDetails.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="text-xl font-semibold">{bookingDetails.time}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-2xl font-bold text-yellow-500">VND {total.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="px-8 py-2"
                onClick={handleGoToHome}
              >
                Back to Home
              </Button>
              
              <Button
                className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleViewBookings}
              >
                View My Bookings
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};