import React from 'react';

const PreviewTicket = ({ ticket }) => {
  if (!ticket) return null;

  const date = new Date(ticket.dateOfJourney);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  const time = ticket.departureTime.split(':').map((n, i) => parseInt(n)).reduce((h, m) => {
        const period = h >= 12 ? 'PM' : 'AM';
        const hour = h % 12 || 12;
        return `${hour}:${String(m).padStart(2, '0')} ${period}`;
    }) 

  return (
    <div className="bg-white rounded-xl overflow-hidden relative border-2 border-gray-100 relative z-0">
  {/* Ticket top part */}
    {/* Left ticket notch */}
    <div className="absolute -left-2 top-1/2 w-4 h-8 bg-[#f2f2f7] rounded-r-full z-1"></div>

    {/* Right ticket notch */}
    <div className="absolute -right-2 top-1/2 w-4 h-8 bg-[#f2f2f7] rounded-l-full z-1"></div>
    
    <div className="p-4 border-b-2 border-gray-100 border-dashed">
      <div className="flex items-center">
        <div className="flex-1">
          <div className="flex items-center">
            <div className="mr-7">
              <div className="text-lg font-bold text-[#FF3B30]">{dayName}</div>
              <div className="text-sm text-[#8E8E93]">{day} {month}</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <span className="font-medium text-[#1C1C1E]">{ticket.station.start}</span>
                <span className="mx-2 text-[#007AFF]">→</span>
                <span className="font-medium text-[#1C1C1E]">{ticket.station.end}</span>
              </div>
              <div className="text-sm  font-medium text-[#8E8E93]">
                {time}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  
  {/* Ticket bottom part */}
  <div className="relative p-4 bg-white">
    <div className="flex justify-between text-sm">
      <span className="text-[#8E8E93] font-medium">{ticket.compartment} - {ticket.seatNumber}</span>
      <span className="text-[#8E8E93] font-medium">Train: {ticket.trainId}</span>
    </div>
  </div>
</div>
  );
};

export default PreviewTicket;