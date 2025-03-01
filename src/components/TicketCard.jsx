import React from 'react';

const TicketCard = ({ ticket, featured = false }) => {
  return (
    <div className={`ticket-card ${featured ? 'featured' : ''}`}>
      <div className="ticket-header">
        <div className="pnr">PNR: {ticket.pnr}</div>
        <div className="train">Train: {ticket.trainId}</div>
      </div>
      <div className="journey-details">
        <div className="stations">
          <span>{ticket.station.start}</span>
          <span className="arrow">→</span>
          <span>{ticket.station.end}</span>
        </div>
        <time>{ticket.dateOfJourney} - {ticket.departureTime}</time>
      </div>
      <div className="passenger-details">
        <div className="name">{ticket.name}</div>
        <div className="seat">{ticket.compartment} - {ticket.seatNumber}</div>
      </div>
    </div>
  );
};

export default TicketCard;