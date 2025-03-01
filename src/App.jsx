import { useState, useEffect } from 'react'
import './App.css'

function parseIRCTCTicket(text) {
  const result = {
    pnr: '',
    trainId: '',
    dateOfJourney: null,
    station: {
      start: '',
      end: ''
    },
    name: '',
    compartment: '',
    seatNumber: ''
  };
  
  // Extract PNR
  const pnrMatch = text.match(/PNR:(\d+)/);
  if (pnrMatch) result.pnr = pnrMatch[1];
  
  // Extract Train ID
  const trainMatch = text.match(/TRN:(\d+)/);
  if (trainMatch) result.trainId = trainMatch[1];
  
  // Extract Date of Journey
  const dateMatch = text.match(/DOJ:(\d{2}-\d{2}-\d{2})/);
  if (dateMatch) {
    const dateParts = dateMatch[1].split('-');
    result.dateOfJourney = new Date(`20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
  }
  
  // Extract Stations
  const stationMatch = text.match(/([A-Z]+)-([A-Z]+)/);
  if (stationMatch) {
    result.station.start = stationMatch[1];
    result.station.end = stationMatch[2];
  }
  
  // Extract Name
  const nameMatch = text.match(/Boarding at [A-Z]+ only,\s*([^,]+)/);
  if (nameMatch) result.name = nameMatch[1].trim();
  
  // Extract Compartment and Seat
  const seatMatch = text.match(/([A-Z]\d+)\s+(\d+)/);
  if (seatMatch) {
    result.compartment = seatMatch[1];
    result.seatNumber = seatMatch[2];
  }
  
  return result;
}

function App() {
  const [tickets, setTickets] = useState([])
  const [activeTab, setActiveTab] = useState('upcoming')

  const handlePasteTicket = async () => {
    try {
      const text = await navigator.clipboard.readText()
      // TODO: Parse ticket details from clipboard
      const newTicket = parseIRCTCTicket(text);
      setTickets(prev => [...prev, newTicket])
      // Store in localStorage for offline access
      localStorage.setItem('tickets', JSON.stringify([...tickets, newTicket]))
    } catch (err) {
      console.error('Failed to read clipboard:', err)
    }
  }

  const filterTickets = (type) => {
    const now = new Date()
    return tickets.filter(ticket => {
      const ticketDate = new Date(ticket.dateOfJourney)
      return type === 'upcoming' ? ticketDate >= now : ticketDate < now
    })
  }

  console.log({tickets});
  useEffect(() => {
    const savedTickets = localStorage.getItem('tickets')
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets))
    }
  }, [])

  return (
    <div className="ios-container">
      <header className="ios-header">
        <h1>Train Tickets</h1>
      </header>

      <main className="ios-content">
          <div className="featured-ticket">
            {tickets.length > 0 && filterTickets('upcoming')[0] && (
              <div className="ticket-card featured">
                <div className="ticket-header">
                  <div className="pnr">PNR: {filterTickets('upcoming')[0].pnr}</div>
                  <div className="train">Train: {filterTickets('upcoming')[0].trainId}</div>
                </div>
                <div className="journey-details">
                  <div className="stations">
                    <span>{filterTickets('upcoming')[0].station.start}</span>
                    <span className="arrow">→</span>
                    <span>{filterTickets('upcoming')[0].station.end}</span>
                  </div>
                  <time>{filterTickets('upcoming')[0].dateOfJourney}</time>
                </div>
                <div className="passenger-details">
                  <div className="name">{filterTickets('upcoming')[0].name}</div>
                  <div className="seat">{filterTickets('upcoming')[0].compartment} - {filterTickets('upcoming')[0].seatNumber}</div>
                </div>
              </div>
            )}
          </div>

        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Trips
          </button>
        </div>

        <div className="tickets-list">
          {tickets.length === 0 ? (
            <div className="empty-state">
              <p>No tickets yet</p>
              <p>Paste your ticket details to get started</p>
            </div>
          ) : (
            filterTickets(activeTab)
              .slice(activeTab === 'upcoming' ? 1 : 0)
              .map(ticket => (
                <div key={ticket.pnr} className="ticket-card">
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
                    <time>{ticket.dateOfJourney}</time>
                  </div>
                  <div className="passenger-details">
                    <div className="name">{ticket.name}</div>
                    <div className="seat">{ticket.compartment} - {ticket.seatNumber}</div>
                  </div>
                </div>
              ))
          )}
        </div>

        <button className="ios-button primary" onClick={handlePasteTicket}>
          Copy from Clipboard
        </button>
      </main>
      
    </div>
  )
}

export default App
