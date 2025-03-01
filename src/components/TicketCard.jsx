import React from 'react';

const ticketData = {
    trainNumber: "12345",
    pnr: "PNR87654321",
    date: "March 5, 2025",
    departureTime: "09:15 AM",
    arrivalTime: "17:00 PM",
    fromStation: "KJM",
    toStation: "IJK",
    compartment: "S4",
    seatNumber: "36",
    passengerName: "John Doe"
  };

const TicketCard = ({ ticket, featured = false }) => {
  return (
    <div className="max-w-md mx-auto">
      {/* Main ticket container with realistic ticket shape */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
        {/* Ticket top part */}
        <div className="relative">
          {/* Left ticket notch */}
          <div className="absolute -left-2 top-1/2 w-4 h-8 bg-[#cacfd7] rounded-r-full"></div>
          
          {/* Header */}
          <div className="flex items-center p-4 border-b border-gray-200 border-dashed">
          <div className="rounded-full bg-gradient-to-br from-rose-500 to-red-700 w-12 h-12 flex items-center justify-center mr-3 shadow-lg border border-red-400">
            <span className="text-white font-bold text-sm drop-shadow-sm">IR</span>
          </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Indian Railways</h2>
              <p className="text-gray-500 text-sm">Train #{ticketData.trainNumber}</p>
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                <div className="relative flex items-center justify-center mr-2">
                    <span className="absolute w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                    <span className="relative w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <span className="text-sm text-gray-600">Track</span>
            </div>
          </div>

          {/* Time and Stations */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-4 mx-3">
              <div className="text-center">
                <p className="text-2xl font-bold">{ticketData.departureTime}</p>
                <p className="text-gray-500">{ticketData.fromStation}</p>
              </div>
              
              <div className="flex-1 mx-4 relative">
                <div className="border-t-2 border-gray-300 border-dashed"></div>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold">N . A</p>
                <p className="text-gray-500">{ticketData.toStation}</p>
              </div>
            </div>
          </div>
          
          {/* Right ticket notch */}
          <div className="absolute -right-2 top-1/2 w-4 h-8 bg-[#cacfd7] rounded-l-full"></div>
        </div>
        
        {/* Zigzag separator between ticket parts */}
        <div className="flex w-full overflow-hidden h-2 bg-gray-100">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-white transform rotate-45 -translate-y-1 mx-px"></div>
          ))}
        </div>
        
        {/* Ticket bottom part */}
        <div className="relative">
          {/* Left ticket notch */}
          <div className="absolute -left-2 top-1/2 w-4 h-8 bg-[#f7f7f7] rounded-r-full"></div>
          
          {/* Passenger Details */}
          <div className="p-4 pb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-xs">PASSENGER</p>
                <p className="font-medium">{ticketData.passengerName}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">DATE</p>
                <p className="font-medium">{ticketData.date}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">PNR</p>
                <p className="font-medium">{ticketData.pnr}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">SEAT</p>
                <p className="font-medium">{ticketData.compartment} | {ticketData.seatNumber}</p>
              </div>
            </div>
          </div>
          
          {/* Right ticket notch */}
          <div className="absolute -right-2 top-1/2 w-4 h-8 bg-[#f7f7f7] rounded-l-full"></div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;