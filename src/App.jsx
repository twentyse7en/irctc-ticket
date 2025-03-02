import { useState, useEffect } from 'react'
import './App.css'
import FeaturedTicket from './components/FeaturedTicket'
import PreviewTicket from './components/PreviewTicket'
import Settings from './components/Settings'

const SettingIcon = () => {
  return (
    <svg fill="currentColor" className='h-full w-full' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
      <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"></path>
    </svg>
  )
}

const dummyTicket = {
  pnr: '8754321098',
  trainId: '12628',
  dateOfJourney: new Date().toISOString(),
  station: {
    start: 'NDLS',
    end: 'SBC'
  },
  name: 'MICHAEL JORDAN',
  compartment: 'A1',
  departureTime: '20:20',
  seatNumber: '23'
};

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
  const [showSettings, setShowSettings] = useState(false)

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
  const featuredTicket = upcomingTickets[0] ?? dummyTicket;

  return (
    <div className="h-full bg-white z-0 relative">
      <div className="bg-gradient-to-b from-slate-500 to-bg-gray-100 h-[300px] w-full absolute top-0 -z-1"></div>
      <div className="px-4 py-2 w-full flex flex-col h-screen">
        <header className="my-3 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Train Pass</h1>
          <button className='h-6 w-6 text-white' onClick={() => setShowSettings(true)}><SettingIcon /></button>
        </header>
        <main className="flex-1 h-0 overflow-auto">
          <section>
            <FeaturedTicket ticket={featuredTicket} />
          </section>
          <section className="mt-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Upcoming Journey</h2>
          {upcomingTickets.length > 2 ? (
            <section className="mt-6">
              <div className="space-y-4">
                {upcomingTickets.slice(1).map((ticket, index) => (
                  <PreviewTicket key={ticket.pnr || index} ticket={ticket} />
                ))}
              </div>
            </section>
          ): (
            <div className="flex flex-col items-center justify-center text-gray-500 py-8">
              <span className="text-4xl mb-2">🛋️</span>
              <p className="text-lg font-medium">No upcoming journeys, chill madi!</p>
              <p className="text-sm">Time to plan your next adventure</p>
            </div>
          )}
          </section>
        </main>
        <button className="text-xl mt-4 mb-5 w-full bg-gradient-to-r from-[#5856D6] to-[#6A68FF] text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#5856D6]/20" onClick={handlePasteTicket}>
          Paste
        </button>
      </div>
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  )
}

export default App
