export interface StudentProfile {
  id: string;
  name: string;
  university: "UQ (University of Queensland)" | "QUT (Queensland University of Technology)" | "Griffith University" | "Torrens University" | "TAFE Queensland";
  degree: string;
  suburb: string;
  categories: ("Babysitting & Childcare" | "Cleaning & Moving" | "Handyman & Yard Care" | "Tech & Computer Repairs" | "Tutoring & Academic" | "Hospitality & Events")[];
  hourlyRate: string; // e.g. "$30 - $35/hr"
  bio: string;
  skills: string[];
  languages: string[];
  hasBlueCard: boolean; // Queensland Working with Children check
  hasWhiteCard: boolean; // Construction/safety induction
  hasDriversLicence: boolean;
  avatar: string;
  availability: string; // e.g. "Weekends & Weekday Afternoons"
  contactEmail?: string;
  contactWhatsApp?: string;
  verifiedStudent: boolean;
}

export interface StudentTaskRequest {
  id: string;
  title: string;
  category: "Babysitting & Childcare" | "Cleaning & Moving" | "Handyman & Yard Care" | "Tech & Computer Repairs" | "Tutoring & Academic" | "Hospitality & Events";
  suburb: string;
  payOffer: string;
  dateOrFrequency: string;
  description: string;
  postedBy: string;
  contactChannel: string;
  postedAt: string;
}

export const STUDENT_CATEGORIES = [
  "All Services",
  "Babysitting & Childcare",
  "Cleaning & Moving",
  "Handyman & Yard Care",
  "Tech & Computer Repairs",
  "Tutoring & Academic",
  "Hospitality & Events",
] as const;

export const INITIAL_STUDENT_PROFILES: StudentProfile[] = [
  {
    id: "student-1",
    name: "Selin K.",
    university: "UQ (University of Queensland)",
    degree: "Master of Educational Studies (Early Childhood Focus)",
    suburb: "St Lucia & West End",
    categories: ["Babysitting & Childcare", "Tutoring & Academic"],
    hourlyRate: "$32 - $38/hr",
    bio: "Passionate early childhood educator and master's student at UQ. Fluent in native Turkish and English. Extensive experience with toddlers and primary school kids. I help Turkish-Australian children practice Turkish through storytelling, games, and homework support.",
    skills: [
      "Native Turkish & English Bilingual",
      "Toddler & Infant Care",
      "Homework Assistance (Maths & English)",
      "First Aid & CPR Certified",
      "Cooking healthy kid meals",
    ],
    languages: ["Turkish (Native)", "English (Fluent)"],
    hasBlueCard: true,
    hasWhiteCard: false,
    hasDriversLicence: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    availability: "Mon, Wed, Fri afternoons & All Weekend",
    contactWhatsApp: "+61 400 333 101",
    contactEmail: "selin.uq@qldturks.com",
    verifiedStudent: true,
  },
  {
    id: "student-2",
    name: "Burak D.",
    university: "QUT (Queensland University of Technology)",
    degree: "Bachelor of Civil Engineering (Honours, Year 3)",
    suburb: "Kelvin Grove & Chermside",
    categories: ["Handyman & Yard Care", "Cleaning & Moving"],
    hourlyRate: "$35 - $40/hr",
    bio: "Hardworking civil engineering student with practical tool skills. Owns a reliable station wagon and cordless drill set. Experienced in flat-pack IKEA assembly, shelf mounting, curtain rail installation, wall painting touch-ups, and heavy lifting for apartment moves.",
    skills: [
      "IKEA & Flatpack Furniture Assembly",
      "Cordless Power Tools & Wall Mounts",
      "Apartment Bond Cleaning & Moving Help",
      "Lawn Mowing & High-Pressure Water Blasting",
      "Reliable station wagon vehicle",
    ],
    languages: ["Turkish (Native)", "English (Fluent)"],
    hasBlueCard: false,
    hasWhiteCard: true,
    hasDriversLicence: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    availability: "Tuesdays, Thursdays & Weekends",
    contactWhatsApp: "+61 400 333 102",
    contactEmail: "burak.qut@qldturks.com",
    verifiedStudent: true,
  },
  {
    id: "student-3",
    name: "Emre T.",
    university: "Griffith University",
    degree: "Bachelor of Computer Science & Cybersecurity",
    suburb: "South Bank & Brisbane CBD",
    categories: ["Tech & Computer Repairs", "Tutoring & Academic"],
    hourlyRate: "$40 - $50/hr",
    bio: "Computer science student with 4 years of hands-on PC hardware repair and software troubleshooting. I help community families, seniors, and small businesses with slow laptops, Wi-Fi network dead-zones, data backup, virus removal, and basic coding lessons.",
    skills: [
      "Windows & Mac Laptop Repair & SSD Upgrades",
      "Home Wi-Fi Mesh & Router Setup",
      "Data Recovery & Secure Cloud Backup",
      "Small Business Website & Email Configuration",
      "Python & Maths Tutoring for High Schoolers",
    ],
    languages: ["Turkish (Native)", "English (Fluent)"],
    hasBlueCard: true,
    hasWhiteCard: false,
    hasDriversLicence: false,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    availability: "Flexible weekdays & Weekend mornings",
    contactWhatsApp: "+61 400 333 103",
    contactEmail: "emre.griffith@qldturks.com",
    verifiedStudent: true,
  },
  {
    id: "student-4",
    name: "Merve A.",
    university: "Torrens University",
    degree: "Bachelor of Nursing (Year 2)",
    suburb: "Sunnybank, Mount Gravatt & South Brisbane",
    categories: ["Babysitting & Childcare", "Cleaning & Moving"],
    hourlyRate: "$30 - $35/hr",
    bio: "Compassionate nursing undergraduate with formal hospital aged-care placement experience. Available for trusted home cleaning, elderly Turkish companion care (accompanying to medical appointments, grocery shopping), and caring for children.",
    skills: [
      "Senior Companionship & Turkish Medical Interpreting",
      "Meticulous Home & Bond Cleaning",
      "Safe Medication Reminders & Patient Care",
      "CPR & First Aid HLTAID011 Certified",
      "Cooking Anatolian homestyle comfort meals",
    ],
    languages: ["Turkish (Native)", "English (Fluent)"],
    hasBlueCard: true,
    hasWhiteCard: false,
    hasDriversLicence: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    availability: "Mondays, Wednesdays & All Weekend",
    contactWhatsApp: "+61 400 333 104",
    contactEmail: "merve.nursing@qldturks.com",
    verifiedStudent: true,
  },
  {
    id: "student-5",
    name: "Kaan S.",
    university: "UQ (University of Queensland)",
    degree: "Bachelor of Agricultural Science & Landscape",
    suburb: "Indooroopilly, Toowong & Kenmore",
    categories: ["Handyman & Yard Care", "Hospitality & Events"],
    hourlyRate: "$32 - $38/hr",
    bio: "Agricultural science student with a deep passion for horticulture and garden care. Equipped with battery-powered lawn mower, line trimmer, and pruning shears. Keeps your backyard, turf, and garden beds immaculate throughout Brisbane's tropical summer.",
    skills: [
      "Precision Lawn Mowing & Edge Trimming",
      "Hedge Pruning & Garden Bed Weeding",
      "Green Waste Removal",
      "Patio Pressure Washing",
      "Weekend Event Waitstaff & Charcoal Grill BBQ",
    ],
    languages: ["Turkish (Native)", "English (Conversational)"],
    hasBlueCard: false,
    hasWhiteCard: true,
    hasDriversLicence: true,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    availability: "Fridays, Saturdays & Sundays",
    contactWhatsApp: "+61 400 333 105",
    contactEmail: "kaan.agri@qldturks.com",
    verifiedStudent: true,
  },
  {
    id: "student-6",
    name: "Ece Y.",
    university: "QUT (Queensland University of Technology)",
    degree: "Bachelor of Business (Marketing & Event Management)",
    suburb: "Fortitude Valley, New Farm & Hamilton",
    categories: ["Hospitality & Events", "Babysitting & Childcare"],
    hourlyRate: "$30 - $36/hr",
    bio: "Outgoing hospitality & marketing student with 2 years of specialty cafe barista and event coordination experience. Available for private dinner party service, Turkish coffee brewing, kids birthday party facilitation, and front-of-house support.",
    skills: [
      "Specialty Barista & Traditional Turkish Coffee",
      "Event Coordination & Table Setting",
      "Kids Party Activities & Face Painting",
      "Responsible Service of Alcohol (RSA QLD)",
      "Social Media Content Creation",
    ],
    languages: ["Turkish (Native)", "English (Fluent)"],
    hasBlueCard: true,
    hasWhiteCard: false,
    hasDriversLicence: true,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    availability: "Thursday to Sunday Evenings",
    contactWhatsApp: "+61 400 333 106",
    contactEmail: "ece.business@qldturks.com",
    verifiedStudent: true,
  },
];

export const INITIAL_STUDENT_TASKS: StudentTaskRequest[] = [
  {
    id: "task-1",
    title: "Weekend Babysitter needed for 2 kids (4 & 7 yrs) - Turkish speaking",
    category: "Babysitting & Childcare",
    suburb: "West End, Brisbane",
    payOffer: "$35 / hr (approx 5 hrs)",
    dateOrFrequency: "Every Saturday 1:00 PM – 6:00 PM",
    description: "Looking for a kind Turkish university student to mind our two kids on Saturday afternoons. Reading Turkish books, playtime at Davies Park, and preparing an afternoon snack. Blue Card preferred.",
    postedBy: "Deniz B. (Mother & Architect)",
    contactChannel: "WhatsApp: +61 411 222 333",
    postedAt: "2026-10-28",
  },
  {
    id: "task-2",
    title: "Need 2 students for 2-bedroom apartment move (heavy lifting)",
    category: "Cleaning & Moving",
    suburb: "Toowong to St Lucia",
    payOffer: "$40 / hr + Lunch & Fuel allowance",
    dateOrFrequency: "Sunday 8 Nov, 9:00 AM – 2:00 PM",
    description: "Moving from 2nd-floor walkup in Toowong to townhouse in St Lucia. Need 2 fit students to help load and unload sofa, mattress, fridge, and 15 packed boxes. Truck provided.",
    postedBy: "Hakan O. (Engineer)",
    contactChannel: "hakan.move@example.com",
    postedAt: "2026-10-27",
  },
  {
    id: "task-3",
    title: "Overgrown backyard lawn mowing & green waste cleanup",
    category: "Handyman & Yard Care",
    suburb: "Carindale, QLD",
    payOffer: "$180 Flat Rate (est. 3-4 hours)",
    dateOrFrequency: "Any weekday afternoon this week",
    description: "Need lawn mowed, edges trimmed, and palm fronds stacked for council collection. Please bring your own mower and line trimmer.",
    postedBy: "Süheyla T.",
    contactChannel: "WhatsApp: +61 422 555 888",
    postedAt: "2026-10-26",
  },
  {
    id: "task-4",
    title: "Senior Turkish grandma needs PC & WhatsApp tablet troubleshooting",
    category: "Tech & Computer Repairs",
    suburb: "Sunnybank Hills",
    payOffer: "$50 / hr (est. 2 hours)",
    dateOrFrequency: "Flexible morning this week",
    description: "Grandmother’s iPad and laptop keep losing connection to Turkish news channels and WhatsApp video call sound is muted. Patient student who speaks native Turkish to guide her gently.",
    postedBy: "Ahmet K. (Family member)",
    contactChannel: "ahmet.family@example.com",
    postedAt: "2026-10-25",
  },
];

