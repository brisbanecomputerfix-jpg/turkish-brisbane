export interface CommunityEvent {
  id: string;
  title: string;
  category: "Community & Family" | "Business & Networking" | "Culture & Youth" | "Workshops & Legal";
  date: string; // ISO date format "YYYY-MM-DD"
  startTime: string; // e.g. "10:00 AM"
  endTime: string; // e.g. "1:00 PM"
  locationName: string;
  address: string;
  suburb: string;
  cost: string; // "Free" or "$45 / ticket"
  organizer: string;
  description: string;
  highlights: string[];
  image: string;
  rsvpCount: number;
  contactEmail?: string;
  contactWhatsApp?: string;
  googleMapsUrl: string;
}

export const INITIAL_COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: "event-1",
    title: "Monthly Community Turkish Breakfast & Networking",
    category: "Community & Family",
    date: "2026-11-08",
    startTime: "10:00 AM",
    endTime: "1:00 PM",
    locationName: "New Farm Park (Riverfront Rotunda & Lawns)",
    address: "Brunswick St, New Farm QLD 4005",
    suburb: "New Farm",
    cost: "Free (Community Picnic)",
    organizer: "QLD Turks Community Steering Group",
    description:
      "Join us for our signature monthly open-air community gathering by the Brisbane River. Fresh Turkish tea (çay) brewed all morning in community samovars, fresh simit, and good conversation. Bring your family, lawn chairs, and a breakfast plate to share.",
    highlights: [
      "Traditional Turkish çay brewed in charcoal samovars all morning",
      "Informal meet & greet for newly arrived families and international students",
      "Kids lawn games & playground adjacent to riverfront rotunda",
      "Free community noticeboard corner for room rentals and job leads",
    ],
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    rsvpCount: 68,
    contactWhatsApp: "+61 400 999 111",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=New+Farm+Park+Brisbane",
  },
  {
    id: "event-2",
    title: "Queensland–Türkiye Bilateral Trade & Business Breakfast",
    category: "Business & Networking",
    date: "2026-11-19",
    startTime: "7:30 AM",
    endTime: "9:45 AM",
    locationName: "Brisbane Convention & Exhibition Centre (BCEC)",
    address: "Glenelg St, South Brisbane QLD 4101",
    suburb: "South Bank",
    cost: "$45 (Includes Full Hot Breakfast)",
    organizer: "Anatolian Queensland Business Chamber",
    description:
      "A high-level business briefing bringing together Queensland builders, Turkish natural stone & travertine importers, food logistics operators, and commercial solicitors. Exploring bilateral procurement pipelines leading into the Brisbane 2032 Olympic infrastructure boom.",
    highlights: [
      "Keynote presentation on direct import corridors for Turkish marble, tiles, and dry food logistics",
      "Commercial solicitor Q&A on Fair Work awards, ABN/Pty Ltd structuring, and customs duty exemptions",
      "Executive networking directory provided to all registered attendees",
      "Hot plated breakfast and barista Turkish coffee provided",
    ],
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    rsvpCount: 42,
    contactEmail: "chamber@qldturks.com",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Brisbane+Convention+Exhibition+Centre",
  },
  {
    id: "event-3",
    title: "29 Ekim Cumhuriyet Bayramı Gala Ball & Banquet",
    category: "Culture & Youth",
    date: "2026-10-29",
    startTime: "6:30 PM",
    endTime: "11:30 PM",
    locationName: "The Grand Ballroom at The Greek Club",
    address: "29 Edmondstone St, South Brisbane QLD 4101",
    suburb: "South Brisbane",
    cost: "$85 / person (3-Course Banquet)",
    organizer: "Queensland Turkish Association & Cultural Committee",
    description:
      "Celebrate the 103rd anniversary of the proclamation of the Republic of Türkiye with our annual formal Gala Ball. Featuring a 3-course Anatolian meze and lamb banquet, classical and modern live Turkish music, traditional Zeybek folk dance performances, and celebration speeches.",
    highlights: [
      "Authentic 3-course banquet dinner with meze platters, woodfired bread, and slow-cooked lamb",
      "Live music performance by Brisbane Anatolian Ensemble",
      "Traditional Zeybek and Halay performances with audience participation",
      "Student scholarship charity raffle raising funds for Turkish university scholars in QLD",
    ],
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
    rsvpCount: 135,
    contactEmail: "gala@qldturks.com",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Greek+Club+South+Brisbane",
  },
  {
    id: "event-4",
    title: "Turkish University Student Welcome & Mentorship BBQ",
    category: "Culture & Youth",
    date: "2026-11-14",
    startTime: "12:00 PM",
    endTime: "3:30 PM",
    locationName: "UQ St Lucia Riverside Parklands (BBQ Shed 3)",
    address: "Sir William MacGregor Dr, St Lucia QLD 4072",
    suburb: "St Lucia",
    cost: "Free for Students (UQ, QUT, Griffith)",
    organizer: "Queensland Turkish Student Societies Coalition",
    description:
      "Welcoming all Turkish undergraduate, master's, and PhD students across Greater Brisbane. Enjoy freshly grilled Turkish köfte and sucuk, connect with senior alumni working in Queensland engineering, tech, and healthcare, and get practical advice on student visa working rights and resume building.",
    highlights: [
      "Halal Turkish köfte and sucuk BBQ with ayran and refreshments",
      "Visa guidance talk: Navigating the 48-hour fortnightly student work limit safely",
      "Resume & LinkedIn speed-reviews with senior Turkish-Australian engineers and accountants",
      "CityCat ferry accessibility from UQ St Lucia terminal",
    ],
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    rsvpCount: 54,
    contactEmail: "students@qldturks.com",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UQ+St+Lucia+Riverside+Parklands",
  },
  {
    id: "event-5",
    title: "QBCC Contractor Licensing & Fair Work Compliance Workshop",
    category: "Workshops & Legal",
    date: "2026-11-25",
    startTime: "6:00 PM",
    endTime: "8:00 PM",
    locationName: "State Library of Queensland (SLQ Meeting Room 1B)",
    address: "Stanley Pl, South Brisbane QLD 4101",
    suburb: "South Bank",
    cost: "Free (RSVP Required)",
    organizer: "Ottoman Legal & QLD Turks Trade Committee",
    description:
      "A practical workshop designed for Turkish tradespeople, subcontractors, and small business owners in Queensland. Legal practitioners and licensed builders walk through Queensland Building and Construction Commission (QBCC) licence requirements, trade skills assessments (TRA), White Card compliance, and Fair Work Modern Award minimum wages.",
    highlights: [
      "Step-by-step checklist to convert Turkish Ustalık certificates into Australian trade credentials",
      "How to obtain a QBCC trade contractor licence without costly broker fees",
      "Sole Trader vs Pty Ltd company structure tax pros and cons",
      "Free 1-on-1 legal & migration advisory clinic following the presentations",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    rsvpCount: 39,
    contactEmail: "workshop@ottomanlegal.com.au",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=State+Library+of+Queensland",
  },
];

/**
 * Generates direct Google Calendar URL with event parameters
 */
export function getGoogleCalendarUrl(event: CommunityEvent): string {
  // Format dates: YYYYMMDDTHHmmSS
  const cleanDate = event.date.replace(/-/g, "");
  
  // Parse simple start time "10:00 AM" to 24-hr format
  const parseHour = (timeStr: string) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, "0")}${minutes.toString().padStart(2, "0")}00`;
  };

  const startFormatted = `${cleanDate}T${parseHour(event.startTime)}`;
  const endFormatted = `${cleanDate}T${parseHour(event.endTime)}`;

  const details = `${event.description}\n\nOrganizer: ${event.organizer}\nCost: ${event.cost}\nMore Info: https://qldturks.com/events`;

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", event.title);
  url.searchParams.set("dates", `${startFormatted}/${endFormatted}`);
  url.searchParams.set("details", details);
  url.searchParams.set("location", `${event.locationName}, ${event.address}`);

  return url.toString();
}

/**
 * Generates an iCalendar (.ics) string for Apple Calendar and Outlook
 */
export function generateIcsContent(event: CommunityEvent): string {
  const cleanDate = event.date.replace(/-/g, "");
  const parseHour = (timeStr: string) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, "0")}${minutes.toString().padStart(2, "0")}00`;
  };

  const dtStart = `${cleanDate}T${parseHour(event.startTime)}`;
  const dtEnd = `${cleanDate}T${parseHour(event.endTime)}`;
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//QLD Turks//Community Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@qldturks.com`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=Australia/Brisbane:${dtStart}`,
    `DTEND;TZID=Australia/Brisbane:${dtEnd}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.locationName}, ${event.address}`,
    `ORGANIZER;CN=${event.organizer}:MAILTO:${event.contactEmail || "events@qldturks.com"}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
