import { seatRows, seatsPerRow, occupiedSeats, premiumSeats } from '../../utils/constants';

interface SeatMapProps {
  selectedSeats: string[];
  onSeatClick: (seatId: string) => void;
}

export const SeatMap = ({ selectedSeats, onSeatClick }: SeatMapProps) => {
  const getSeatStatus = (seatId: string) => {
    if (selectedSeats.includes(seatId)) return 'selected';
    if (occupiedSeats.includes(seatId)) return 'occupied';
    if (premiumSeats.includes(seatId)) return 'premium';
    return 'available';
  };

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'selected': return '#F59E0B';
      case 'occupied': return '#9CA3AF';
      case 'premium': return '#EAB308';
      case 'available': return '#22D3EE';
      default: return '#E5E7EB';
    }
  };

  const handleSeatClick = (seatId: string) => {
    const status = getSeatStatus(seatId);
    if (status === 'occupied') return;
    onSeatClick(seatId);
  };

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex justify-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#22D3EE' }}></div>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#EAB308' }}></div>
          <span>Premium</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F59E0B' }}></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#9CA3AF' }}></div>
          <span>Occupied</span>
        </div>
      </div>

      {/* Screen/Front indicator */}
      <div className="text-center">
        <div className="inline-block px-6 py-2 bg-gray-800 text-white rounded-full text-sm">
          ENTRANCE
        </div>
      </div>

      {/* Seat Grid */}
      <div className="space-y-3 overflow-x-auto px-4">
        {seatRows.map((row) => (
          <div key={row} className="flex items-center justify-center space-x-2">
            <div className="w-8 text-center text-sm font-medium text-gray-600">
              {row}
            </div>
            <div className="flex space-x-1">
              {Array.from({ length: seatsPerRow }, (_, index) => {
                const seatNumber = index + 1;
                const seatId = `${row}${seatNumber}`;
                const status = getSeatStatus(seatId);
                const isClickable = status !== 'occupied';
                
                return (
                  <button
                    key={seatId}
                    onClick={() => handleSeatClick(seatId)}
                    disabled={!isClickable}
                    className={`w-8 h-8 rounded-lg border-2 text-xs font-medium transition-all duration-200 ${
                      isClickable 
                        ? 'hover:scale-110 hover:shadow-md cursor-pointer' 
                        : 'cursor-not-allowed opacity-60'
                    } ${
                      status === 'selected' 
                        ? 'border-orange-600 text-white transform scale-110 shadow-lg' 
                        : 'border-gray-300 text-gray-700'
                    }`}
                    style={{ 
                      backgroundColor: getSeatColor(status),
                      color: status === 'available' || status === 'premium' ? '#374151' : 'white'
                    }}
                  >
                    {seatNumber}
                  </button>
                );
              })}
            </div>
            <div className="w-8 text-center text-sm font-medium text-gray-600">
              {row}
            </div>
          </div>
        ))}
      </div>

      {/* Aisle indicator */}
      <div className="text-center">
        <div className="inline-block px-6 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
          RECEPTION AREA
        </div>
      </div>
    </div>
  );
};