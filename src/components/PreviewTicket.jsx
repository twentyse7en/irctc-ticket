import React from 'react';

const PreviewTicket = ({ ticket }) => {
  if (!ticket) return null;

  const date = new Date(ticket.dateOfJourney);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  const startTime = ticket.departureTime.split(':').map((n, i) => parseInt(n)).reduce((h, m) => {
        const period = h >= 12 ? 'PM' : 'AM';
        const hour = h % 12 || 12;
        return `${hour}:${String(m).padStart(2, '0')} ${period}`;
    }) 
  
  const arrivalTime = ticket.arrivalTime.split(':').map((n, i) => parseInt(n)).reduce((h, m) => {
        const period = h >= 12 ? 'PM' : 'AM';
        const hour = h % 12 || 12;
        return `${hour}:${String(m).padStart(2, '0')} ${period}`;
    }) 
  const stationStart = ticket.station.start.replace(/\s*\(.*?\)/, '');
  const stationEnd = ticket.station.end.replace(/\s*\(.*?\)/, '');

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
              <div className="text-xl font-bold text-[#FF3B30]">{dayName}</div>
              <div className="text-sm text-[#8E8E93]">{day} {month}</div>
            </div>
            <div className="flex-1 px-4">
              <div className="flex items-center mb-1 justify-between">
                <span className="font-medium text-[#1C1C1E]">{stationStart}</span>
                <span className="mx-2 text-[#007AFF]">→</span>
                <span className="font-medium text-[#1C1C1E]">{stationEnd}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className="text-sm  font-medium text-[#8E8E93]">
                  {startTime}
                </span>
                <span className="text-sm  font-medium text-[#8E8E93]">
                  {arrivalTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  
  {/* Ticket bottom part */}
  <div className="relative p-4 bg-white">
    <div className="flex justify-between text-sm">
      <span className="text-[#8E8E93] font-medium">{ticket.trainName}</span>
      <span className="text-[#8E8E93] font-medium">{ticket.compartment} - {ticket.seatNumber}</span>
    </div>
  </div>
</div>
  );
};

export default PreviewTicket;