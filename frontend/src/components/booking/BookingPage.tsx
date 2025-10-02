import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  CheckCircle, 
  Crown, 
  Calendar, 
  Clock, 
  Grid 
} from 'lucide-react';
import { SeatMap } from './SeatMap';
import { plans, timeSlots } from '../../utils/constants';
import { getIcon } from '../../utils/iconUtils';
import { BookingState } from '../../types';

interface BookingPageProps {
  bookingState: BookingState;
  onBack: () => void;
  onUpdateBooking: (updates: Partial<BookingState>) => void;
  onConfirmBooking: () => void;
}

export const BookingPage = ({ bookingState, onBack, onUpdateBooking, onConfirmBooking }: BookingPageProps) => {
  const { selectedSeats, selectedDate, selectedTimeSlot, bookingStep, selectedBookingPlan } = bookingState;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDatesArray = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const getSelectedPlanDetails = () => {
    return plans.find(p => p.name === selectedBookingPlan);
  };

  const calculatePlanPrice = (): number => {
    const planDetails = getSelectedPlanDetails();
    if (!planDetails) return 0;

    const priceStr = planDetails.price.replace(/,/g, '');
    let price: number;

    if (priceStr.includes('m')) {
      price = parseFloat(priceStr.replace('m', '')) * 1000000;
    } else {
      price = parseFloat(priceStr);
    }

    return price;
  };

  const calculateTotal = (): number => {
    const planPrice = calculatePlanPrice();
    return planPrice * selectedSeats.length;
  };

  const handleBackStep = () => {
    if (bookingStep > 1) {
      onUpdateBooking({ bookingStep: bookingStep - 1 });
    } else {
      onBack();
    }
  };

  const handleNextStep = () => {
    if (bookingStep < 3) {
      onUpdateBooking({ bookingStep: bookingStep + 1 });
    }
  };

  const getStepTitle = () => {
    switch (bookingStep) {
      case 1: return 'Choose Your Plan';
      case 2: return 'Select Date & Time';
      case 3: return 'Choose Your Seats';
      default: return 'Book Your Space';
    }
  };

  const canProceedToNextStep = () => {
    switch (bookingStep) {
      case 1: return selectedBookingPlan !== '';
      case 2: return selectedTimeSlot !== '';
      case 3: return selectedSeats.length > 0;
      default: return false;
    }
  };

  const handleSeatClick = (seatId: string) => {
    const newSelectedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter(id => id !== seatId)
      : [...selectedSeats, seatId];
    
    onUpdateBooking({ selectedSeats: newSelectedSeats });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleBackStep}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-medium">{getStepTitle()}</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  step <= bookingStep 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step < bookingStep ? <Check className="w-4 h-4" /> : step}
              </div>
              {step < 3 && (
                <div 
                  className={`w-8 h-1 mx-2 rounded transition-all duration-200 ${
                    step < bookingStep ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Plan</span>
          <span>Time</span>
          <span>Seats</span>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Step 1: Plan Selection */}
        {bookingStep === 1 && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                <span>Select Service Plan</span>
              </CardTitle>
              <CardDescription>
                Choose the plan that best fits your needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  onClick={() => onUpdateBooking({ selectedBookingPlan: plan.name })}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedBookingPlan === plan.name
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getIcon(plan.iconName)}
                      <div>
                        <h3 className="font-medium text-gray-900">{plan.name}</h3>
                        <p className="text-sm text-gray-600">{plan.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">VND {plan.price}</div>
                      <div className="text-sm text-gray-500">{plan.period}</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-600">
                    <div className="flex items-center space-x-1 mb-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>{plan.features[0]}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>{plan.features[1]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Date & Time Selection */}
        {bookingStep === 2 && (
          <>
            {/* Date Selection */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>Select Date</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {getDatesArray().map((date, index) => {
                    const isSelected = selectedDate.toDateString() === date.toDateString();
                    const isToday = index === 0;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => onUpdateBooking({ selectedDate: date })}
                        className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 text-center min-w-20 transition-all duration-200 ${
                          isSelected 
                            ? 'border-orange-500 bg-orange-50 text-orange-700' 
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <div className="text-xs font-medium">
                          {isToday ? 'Today' : formatDate(date).split(' ')[0]}
                        </div>
                        <div className="text-lg font-bold mt-1">
                          {date.getDate()}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Time Slot Selection */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span>Select Time Slot</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => onUpdateBooking({ selectedTimeSlot: time })}
                      className={`py-3 px-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                        selectedTimeSlot === time
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Plan Summary */}
            {selectedBookingPlan && (
              <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getIcon(getSelectedPlanDetails()?.iconName || '')}
                      <div>
                        <div className="font-medium text-gray-900">{selectedBookingPlan}</div>
                        <div className="text-sm text-gray-600">VND {getSelectedPlanDetails()?.price}{getSelectedPlanDetails()?.period}</div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onUpdateBooking({ bookingStep: 1 })}
                      className="text-blue-600 hover:bg-blue-100"
                    >
                      Change
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Step 3: Seat Selection */}
        {bookingStep === 3 && (
          <>
            {/* Seat Selection */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Grid className="w-5 h-5 text-purple-600" />
                    <span>Choose Your Seats</span>
                  </div>
                  <Badge variant="outline" className="text-purple-600 border-purple-300">
                    {selectedSeats.length} selected
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SeatMap 
                  selectedSeats={selectedSeats}
                  onSeatClick={handleSeatClick}
                />
              </CardContent>
            </Card>

            {/* Booking Summary */}
            {selectedSeats.length > 0 && (
              <Card className="border-0 shadow-sm bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Selected Plan</span>
                      <span className="text-orange-600 font-medium">
                        {selectedBookingPlan}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Selected Seats</span>
                      <span className="text-orange-600 font-medium">
                        {selectedSeats.join(', ')}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Date & Time</span>
                      <div className="text-right">
                        <div className="text-gray-700">{formatDate(selectedDate)}</div>
                        <div className="text-sm text-gray-500">{selectedTimeSlot}</div>
                      </div>
                    </div>
                    
                    <div className="border-t border-orange-200 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">Total Amount</span>
                        <span className="text-xl font-bold text-orange-600">
                          VND {calculateTotal().toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {selectedSeats.length} seat(s) × VND {calculatePlanPrice().toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t">
        <div className="max-w-md mx-auto">
          {bookingStep < 3 ? (
            <Button 
              className="w-full h-12 text-white font-medium"
              style={{ backgroundColor: '#F59E0B' }}
              onClick={handleNextStep}
              disabled={!canProceedToNextStep()}
            >
              Continue to {bookingStep === 1 ? 'Date & Time' : 'Seat Selection'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            selectedSeats.length > 0 && selectedTimeSlot && (
              <Button 
                className="w-full h-12 text-white font-medium"
                style={{ backgroundColor: '#F59E0B' }}
                onClick={onConfirmBooking}
              >
                <Check className="w-5 h-5 mr-2" />
                Confirm Booking - VND {calculateTotal().toLocaleString()}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
};