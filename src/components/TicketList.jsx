import PreviewTicket from './PreviewTicket';

const TicketList = ({ tickets, activeTab }) => {
  if (tickets.length === 0) {
    return (
      <div className="empty-state">
        <p>No tickets yet</p>
        <p>Paste your ticket details to get started</p>
      </div>
    );
  }

  return (
    <div className="tickets-list">
      {tickets
        .slice(activeTab === 'upcoming' ? 1 : 0)
        .map(ticket => (
          <PreviewTicket key={ticket.pnr} ticket={ticket} />
        ))}
    </div>
  );
};

export default TicketList;