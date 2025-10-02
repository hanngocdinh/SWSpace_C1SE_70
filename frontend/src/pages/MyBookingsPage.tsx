import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

interface Booking {
  id: string;
  date: string;
  time: string;
  seat: string;
  plan: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  price: number;
}

export const MyBookingsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data for bookings
  const bookings: Booking[] = [
    {
      id: 'BK-1001',
      date: '2025-10-05',
      time: '10:00 AM - 4:00 PM',
      seat: 'C9',
      plan: 'HOT DESK',
      status: 'upcoming',
      price: 110000
    },
    {
      id: 'BK-1000',
      date: '2025-10-02',
      time: '09:00 AM - 5:00 PM',
      seat: 'B4',
      plan: 'HOT DESK',
      status: 'active',
      price: 110000
    },
    {
      id: 'BK-0999',
      date: '2025-09-30',
      time: '01:00 PM - 6:00 PM',
      seat: 'A7',
      plan: 'FIXED DESK',
      status: 'completed',
      price: 150000
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      upcoming: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleBookAgain = () => {
    navigate('/booking-form');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        isAuthenticated={true}
        userInfo={{firstName: 'User', lastName: '', email: '', phone: '', selectedPlan: '', signupDate: new Date(), planStatus: 'active'}}
        onGetStarted={() => {}}
        onLogout={() => {}}
      />
      
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleBookAgain}
            >
              Book Again
            </Button>
          </div>
          
          {bookings.length > 0 ? (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">{booking.plan}</h3>
                          {getStatusBadge(booking.status)}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Booking ID: {booking.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-yellow-500">VND {booking.price.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-600">{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-600">{booking.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-600">Seat {booking.seat}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-600">1 Person</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end space-x-3">
                      {booking.status === 'upcoming' && (
                        <>
                          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            Cancel Booking
                          </Button>
                          <Button variant="outline">
                            Reschedule
                          </Button>
                        </>
                      )}
                      <Button 
                        variant={booking.status === 'active' ? 'default' : 'outline'}
                        className={booking.status === 'active' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium text-gray-700">No bookings found</h3>
              <p className="text-gray-500 mt-2">You haven't made any bookings yet.</p>
              <Button 
                className="mt-6 bg-blue-600 hover:bg-blue-700"
                onClick={handleBookAgain}
              >
                Book Now
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};