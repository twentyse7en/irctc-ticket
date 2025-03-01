import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tickets, setTickets] = useState([])
  const [activeTab, setActiveTab] = useState('upcoming')

  const handlePasteTicket = async () => {
    try {
      const text = await navigator.clipboard.readText()
      // TODO: Parse ticket details from clipboard
      const newTicket = {
        id: Date.now(),
        details: text,
        date: new Date().toISOString()
      }
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
      const ticketDate = new Date(ticket.date)
      return type === 'upcoming' ? ticketDate >= now : ticketDate < now
    })
  }

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
            <div className="ticket-card featured">
              <time>{new Date(0).toLocaleDateString()}</time>
            </div>
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
                <div key={ticket.id} className="ticket-card">
                  <pre>{ticket.details}</pre>
                  <time>{new Date(ticket.date).toLocaleDateString()}</time>
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
