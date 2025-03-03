// refactor common stuffs of android and ios
const extractTicketInfoIOS = (text) => {
  const result = {
    pnr: "",
    trainId: "",
    trainName: "",
    dateOfJourney: null,
    station: {
      start: "",
      end: "",
    },
    name: "",
    compartment: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    seatNumber: "",
    originalText: "",
  };
  result.originalText = text;
  const lines = text.split("\n");
  const pnrIndex = lines.findIndex((line) => line.includes("PNR:"));
  if (pnrIndex === -1) return;

  const pnrMatch = lines[pnrIndex].match(/PNR:\s*(\d+)/);
  if (pnrMatch) result.pnr = pnrMatch[1];

  // Extract train name and ID
  const trainMatch = lines[pnrIndex].match(/([^(]+)\s*\((\d+)\)/);
  if (trainMatch) {
    result.trainName = trainMatch[1].trim();
    result.trainId = trainMatch[2];
  }
  const cleanDurationLine = lines[pnrIndex + 1].replace(
    /^[^\d:]+|[^\d:]+$/g,
    ""
  );
  if (cleanDurationLine) {
    result.departureTime = cleanDurationLine.slice(0, 5);
    result.arrivalTime = cleanDurationLine.slice(-5);
  }

  const stationMatch = lines[pnrIndex + 2].split(/\s+/);
  if (stationMatch) {
    result.station.start = stationMatch[0];
    result.station.end = stationMatch[stationMatch.length - 1];
  }

  const dateOfJourneyMatch = lines[pnrIndex + 3].match(
    /([A-Za-z]{3}), (\d{2}) ([A-Za-z]{3})/
  );

  if (dateOfJourneyMatch) {
    const date = dateOfJourneyMatch[2]; // "06"
    const month = dateOfJourneyMatch[3]; // "Mar"
    const year = new Date().getFullYear(); // Assume the current year

    // Convert to a Date object
    const parsedDate = new Date(`${month} ${date}, ${year}`);

    result.dateOfJourney = parsedDate;
  }

  const passengerNameLine = lines[pnrIndex + 8].replace(/\d+/g, "").trim();
  if (passengerNameLine) {
    result.name = passengerNameLine;
  }
  const seatDetails = lines[pnrIndex + 11].split(/[\s*]+/);
  if (seatDetails && seatDetails.length > 1) {
    console.log("seatDetails");
    const [status = "-", compartment = "", seat = ""] =
      seatDetails[1].split("/");
    result.status = status;
    result.compartment = compartment;
    result.seatNumber = seat;
  }

  return result;
};

/* sample ticket
MALABAR EXPRESS (16629) PNR:1234564322
18:56 — 12h 30m — 07:26
Fri, 28 Mar Sat, 22 Mar
Kazhakuttam (KZK) Trikarpur (TKQ)
1 Adult 0 Child | SL | GENERAL | Kazhakuttam (KZK) | 21 Mar
2025
Cancellation & Refund Rules
Passenger Information
MICHAEL JORDAN
Male| 43 yrs
Bookir atu Current Statu
CNF/S3/62/UB *CNF/S3/62/UB
* Tap on Current Status from Menu to fetch latest status.
You can now book
Order Food - In Train
® a Ww = we
Home Account Shop Transactions More
*/
const extractTicketInfoAndroid = (text) => {
  const result = {
    pnr: "",
    trainId: "",
    trainName: "",
    dateOfJourney: null,
    station: {
      start: "",
      end: "",
    },
    name: "",
    compartment: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    seatNumber: "",
    originalText: "",
  };
  result.originalText = text;
  const lines = text.split("\n");
  const pnrIndex = lines.findIndex((line) => line.includes("PNR:"));
  if (pnrIndex === -1) return;

  const pnrMatch = lines[pnrIndex].match(/PNR:\s*(\d+)/);
  if (pnrMatch) result.pnr = pnrMatch[1];

  // Extract train name and ID
  const trainMatch = lines[pnrIndex].match(/([^(]+)\s*\((\d+)\)/);
  if (trainMatch) {
    result.trainName = trainMatch[1].trim();
    result.trainId = trainMatch[2];
  }
  const cleanDurationLine = lines[pnrIndex + 1].replace(
    /^[^\d:]+|[^\d:]+$/g,
    ""
  );
  if (cleanDurationLine) {
    result.departureTime = cleanDurationLine.slice(0, 5);
    result.arrivalTime = cleanDurationLine.slice(-5);
  }

  const dateOfJourneyMatch = lines[pnrIndex + 2].match(
    /([A-Za-z]{3}), (\d{2}) ([A-Za-z]{3})/
  );

  if (dateOfJourneyMatch) {
    const date = dateOfJourneyMatch[2]; // "06"
    const month = dateOfJourneyMatch[3]; // "Mar"
    const year = new Date().getFullYear(); // Assume the current year

    // Convert to a Date object
    const parsedDate = new Date(`${month} ${date}, ${year}`);

    result.dateOfJourney = parsedDate;
  }

  const stationMatch = lines[pnrIndex + 3].split(/\s+/);
  if (stationMatch) {
    if (stationMatch.length == 2) {
        result.station.start = stationMatch[0];
        result.station.end = stationMatch[stationMatch.length - 1];
    } else if (stationMatch.length === 4){
        result.station.start = stationMatch[0] + ' ' + stationMatch[1];
        result.station.end = stationMatch[2] + ' ' + stationMatch[3];
    }
  }


  const passengerSectionIndex = lines.findIndex((line) => line.includes("Passenger Information"));  
  const passengerNameLine = lines[passengerSectionIndex + 1].replace(/\d+/g, "").trim();
  if (passengerNameLine) {
    result.name = passengerNameLine;
  }
  const seatDetails = lines[passengerSectionIndex + 4].split(/[\s*]+/);
  if (seatDetails && seatDetails.length > 1) {
    console.log("seatDetails");
    const [status = "-", compartment = "", seat = ""] =
      seatDetails[1].split("/");
    result.status = status;
    result.compartment = compartment;
    result.seatNumber = seat;
  }

  return result;
};

export const extractTicketInfo = (text) => {
  // Detect device OS from user agent
  const isIOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  };

  const isAndroid = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android/i.test(userAgent);
  };

  // Use the appropriate extraction based on device type
  if (isIOS()) {
    return extractTicketInfoIOS(text);
  } else if (isAndroid()) {
    // Implement Android extraction or use iOS as fallback
    // For now, we'll use the iOS extraction as fallback
    return extractTicketInfoAndroid(text);
  } else {
    // For desktop or other devices, use iOS extraction as fallback
    return extractTicketInfoAndroid(text);
  }
};
