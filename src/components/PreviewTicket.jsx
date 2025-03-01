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
    <div className="preview-ticket">
      <div className="ticket-content">
        <div className="date-column">
          <div className="day-name">{dayName}</div>
          <div className="date-info">
            <div className="month">{day} {month}</div>
          </div>
        </div>
        <div className="journey-info">
          <div className="stations">
            <span className="station-name">{ticket.station.start}</span>
            <span className="arrow">→</span>
            <span className="station-name">{ticket.station.end}</span>
          </div>
          <div className="time-info">
            <span className="departure">
                {time}
            </span>
          </div>
        </div>
      </div>
      <div className="secondary-info">
        <span className="seat-info">{ticket.compartment} - {ticket.seatNumber}</span>
        <span className="train-info">Train: {ticket.trainId}</span>
      </div>
    </div>
  );
};

export default PreviewTicket;