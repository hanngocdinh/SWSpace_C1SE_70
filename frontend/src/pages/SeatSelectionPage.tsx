import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

interface SeatMapData {
  id: string;
  status: 'available' | 'reserved' | 'processing' | 'selected';
}

type SeatRow = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

interface SeatSelectionPageProps {
  onBack?: () => void;
  onConfirm?: (selectedSeat: string, total: number) => void;
  initialSelectedSeat?: string;
  planPrice?: number;
}

export const SeatSelectionPage: React.FC<SeatSelectionPageProps> = ({ 
  onBack, 
  onConfirm,
  initialSelectedSeat = '',
  planPrice = 110000
}) => {
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = useState<string>(initialSelectedSeat);
  const [total, setTotal] = useState<number>(initialSelectedSeat ? planPrice : 0);
  
  // Generate seat data with some seats already reserved
  const generateSeats = (): Record<SeatRow, SeatMapData[]> => {
    const rows: SeatRow[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const seatsData: Partial<Record<SeatRow, SeatMapData[]>> = {};
    
    rows.forEach(row => {
      seatsData[row] = Array.from({ length: 10 }, (_, i) => {
        // Randomly set some seats as reserved (around 15%)
        const status = Math.random() < 0.15 ? 'reserved' : 'available';
        return {
          id: `${row}${i + 1}`,
          status
        };
      });
    });
    
    // Pre-set C9 as processing for the example
    if (seatsData['C'] && seatsData['C'][8]) {
      seatsData['C'][8].status = 'processing';
    }
    
    // Pre-set some specific seats as reserved for a more realistic look
    const reservedSeats = ['A5', 'B3', 'C4', 'D5', 'E2', 'F7'];
    reservedSeats.forEach(seatId => {
      const row = seatId[0] as SeatRow;
      const col = parseInt(seatId.slice(1)) - 1;
      if (seatsData[row] && seatsData[row][col]) {
        seatsData[row][col].status = 'reserved';
      }
    });

    return seatsData as Record<SeatRow, SeatMapData[]>;
  };

  const [seatsData, setSeatsData] = useState<Record<SeatRow, SeatMapData[]>>(generateSeats());

  useEffect(() => {
    // If there's an initialSelectedSeat, update its status
    if (initialSelectedSeat) {
      const row = initialSelectedSeat[0] as SeatRow;
      const col = parseInt(initialSelectedSeat.slice(1)) - 1;
      
      if (seatsData[row] && seatsData[row][col] && seatsData[row][col].status === 'available') {
        const newSeats = { ...seatsData };
        newSeats[row][col].status = 'selected';
        setSeatsData(newSeats);
      }
    }
  }, [initialSelectedSeat]);

  const handleSeatClick = (seatId: string) => {
    const row = seatId[0] as SeatRow;
    const col = parseInt(seatId.slice(1)) - 1;
    
    // Can't select reserved or processing seats
    if (seatsData[row][col].status === 'reserved' || seatsData[row][col].status === 'processing') {
      return;
    }
    
    // Reset previous selection
    if (selectedSeat) {
      const prevRow = selectedSeat[0] as SeatRow;
      const prevCol = parseInt(selectedSeat.slice(1)) - 1;
      if (seatsData[prevRow] && seatsData[prevRow][prevCol]) {
        const newSeats = { ...seatsData };
        newSeats[prevRow][prevCol].status = 'available';
        setSeatsData(newSeats);
      }
    }
    
    // Set new selection
    if (selectedSeat !== seatId) {
      const newSeats = { ...seatsData };
      newSeats[row][col].status = 'selected';
      setSeatsData(newSeats);
      setSelectedSeat(seatId);
      setTotal(planPrice);
    } else {
      setSelectedSeat('');
      setTotal(0);
    }
  };
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };
  
  const handleConfirm = () => {
    if (onConfirm && selectedSeat) {
      onConfirm(selectedSeat, total);
    } else {
      // If no callback provided, just navigate to a success page
      navigate('/booking-success', { 
        state: { 
          selectedSeat, 
          total,
          bookingDetails: {
            date: new Date().toLocaleDateString(),
            time: '10:00 AM - 4:00 PM',
            plan: 'HOT DESK'
          }
        } 
      });
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'available': return 'bg-yellow-400 hover:bg-yellow-500';
      case 'reserved': return 'bg-gray-300 cursor-not-allowed';
      case 'processing': return 'bg-green-400 cursor-not-allowed animate-pulse';
      case 'selected': return 'bg-yellow-500 border-2 border-yellow-600';
      default: return 'bg-yellow-400';
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header 
        isAuthenticated={true}
        userInfo={{firstName: 'User', lastName: '', email: '', phone: '', selectedPlan: '', signupDate: new Date(), planStatus: 'active'}}
        onGetStarted={() => {}}
        onLogout={() => {}}
      />
      
      <div className="flex-grow py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-center text-gray-800">WELCOME TO SWSPACE</h1>
            <h2 className="text-lg font-medium text-center text-gray-600">Modern & Flexible Workspace</h2>
            <p className="text-center text-sm text-gray-500 mt-1">Reserve the services you need here to get the special deal</p>
          </div>
          
          <div className="p-6">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Seat</h2>
            
            <div className="overflow-x-auto">
              <div className="flex">
                <div className="flex-grow">
                  <div className="grid grid-cols-10 gap-3 mb-5">
                    {/* Seat Map - Row A to G */}
                    {(['A', 'B', 'C', 'D', 'E', 'F', 'G'] as SeatRow[]).map((row) => (
                      <React.Fragment key={row}>
                        {seatsData[row].map((seat) => (
                          <button
                            key={seat.id}
                            className={`w-12 h-12 rounded-md flex items-center justify-center font-medium text-white shadow transition-all ${getStatusColor(seat.status)}`}
                            onClick={() => handleSeatClick(seat.id)}
                            disabled={seat.status === 'reserved' || seat.status === 'processing'}
                          >
                            {seat.id}
                          </button>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  {/* Stage Area */}
                  <div className="w-full h-12 rounded-md bg-yellow-400 flex items-center justify-center font-medium text-white mb-8">
                    X
                  </div>
                </div>
                
                <div className="ml-6 space-y-6 min-w-[160px]">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
                    <span className="text-sm text-gray-600">Reserved</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-sm"></div>
                    <span className="text-sm text-gray-600">Available</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-400 rounded-sm"></div>
                    <span className="text-sm text-gray-600">Processing</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500 uppercase mb-1">TOTAL</div>
                  <div className="text-xl font-bold text-yellow-500">
                    VND {total.toLocaleString()}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 uppercase mb-1">SEAT</div>
                  <div className="text-xl font-bold text-gray-700">{selectedSeat || '-'}</div>
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    className="px-8 py-2 border-gray-300"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  
                  <Button
                    className="px-8 py-2 text-white bg-blue-600 hover:bg-blue-700"
                    onClick={handleConfirm}
                    disabled={!selectedSeat}
                  >
                    Proceed Payment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};