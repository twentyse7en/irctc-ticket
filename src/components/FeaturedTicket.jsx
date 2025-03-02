import React from 'react';
import TicketCard from './TicketCard';

const FeaturedTicket = ({ ticket }) => {
  if (!ticket) return null;

  return (
    <div className="px-3">
      <TicketCard ticket={ticket} featured={true} />
    </div>
  );
};

export default FeaturedTicket;