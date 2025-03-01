import { useState, useEffect } from 'react'
import './App.css'
import FeaturedTicket from './components/FeaturedTicket'
import TabNavigation from './components/TabNavigation'
import TicketList from './components/TicketList'

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
    departureTime: '',
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
  
    // Extract Departure Time
    const dpMatch = text.match(/DP:(\d{2}:\d{2})/);
    if (dpMatch) result.departureTime = dpMatch[1];

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
      const newTicket = parseIRCTCTicket(text);
      setTickets(prev => [...prev, newTicket])
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

  useEffect(() => {
    const savedTickets = localStorage.getItem('tickets')
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets))
    }
  }, [])

  const upcomingTickets = filterTickets('upcoming')
  const featuredTicket = upcomingTickets[0]

  return (
    <div className="h-full bg-white">
      <div className="bg-gradient-to-b from-slate-500 to-bg-gray-100 h-[300px] w-full absolute top-0"></div>
      <div className="px-4 py-2 w-full flex flex-col h-screen">
        <header className="my-3">
          <h1 className="text-3xl font-bold text-white">Train Pass</h1>
        </header>
        <main className="flex-1 h-0">
          <FeaturedTicket ticket={featuredTicket} />
          {/* <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <TicketList tickets={filterTickets(activeTab)} activeTab={activeTab} /> */}
        </main>
        <button className="mt-4 w-full bg-[#f16d15] text-white font-medium py-3 rounded-xl shadow-md active:opacity-90" onClick={handlePasteTicket}>
          Paste from Clipboard
        </button>
      </div>
    </div>
  )
}

export default App
