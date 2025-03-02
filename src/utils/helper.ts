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