export interface JobPosting {
  id: string;
  title: string;
  company: string;
  category: "Hospitality" | "Trades & Construction" | "Healthcare" | "Professional Services" | "Tech Support & IT" | "Retail & Logistics";
  employmentType: "Full-time" | "Part-time" | "Casual" | "Apprenticeship";
  suburb: string;
  payRate: string;
  description: string;
  requirements: string[];
  contactEmail?: string;
  contactPhone?: string;
  contactWhatsApp?: string;
  isFairWorkCompliant: boolean;
  visaFriendly: "Student Visa Friendly (24h/wk)" | "Permanent / Full Working Rights" | "TSS 482 Visa Sponsorship Potential";
  postedAt: string;
}

export interface CandidateProfile {
  id: string;
  name: string;
  targetRole: string;
  category: "Hospitality" | "Trades & Construction" | "Healthcare" | "Professional Services" | "Tech Support & IT" | "Retail & Logistics";
  experienceYears: string;
  skills: string[];
  licenses: string[]; // e.g. "White Card", "RSA", "QBCC License", "AHPRA Pending", "Valid QLD Driver Licence"
  languages: string; // e.g. "Turkish (Native), English (IELTS 7.5 Fluent)"
  availability: "Immediate - Full Time" | "Part Time (Student 24h/wk)" | "Weekends & Casual";
  suburb: string;
  bio: string;
  contactChannel: string; // e.g. "WhatsApp: +61 412 345 678" or "Email: ..."
  registeredAt: string;
}

export const INITIAL_JOB_POSTINGS: JobPosting[] = [
  {
    id: "job-1",
    title: "Head Grill Chef & Pide Master (Usta)",
    company: "Bosphorus Meze & Grill",
    category: "Hospitality",
    employmentType: "Full-time",
    suburb: "South Bank",
    payRate: "$75,000 - $85,000 / year + Super (or $36/hr)",
    description:
      "Busy South Bank dining destination seeking an experienced woodfired oven pide and charcoal grill chef. Leading the kitchen brigade, preparing authentic marinades, slow-cooked lamb, and hand-rolled pastries.",
    requirements: [
      "Minimum 3+ years experience with Turkish charcoal grill & woodfired oven",
      "Trade qualification in Commercial Cookery (Cert III/IV or equivalent Turkish Ustalık Belgesi)",
      "Food Safety Supervisor certificate",
      "Full working rights or TSS 482 visa sponsorship available for qualified candidates",
    ],
    contactEmail: "careers@bosphorusmeze.com.au",
    contactWhatsApp: "+61 411 222 333",
    isFairWorkCompliant: true,
    visaFriendly: "TSS 482 Visa Sponsorship Potential",
    postedAt: "2026-10-27",
  },
  {
    id: "job-2",
    title: "Electrician Trade Assistant / 2nd Year Apprentice",
    company: "Toros Electrical & Air Conditioning",
    category: "Trades & Construction",
    employmentType: "Full-time",
    suburb: "Chermside",
    payRate: "$32 - $36 / hr + Super + Tool Allowance",
    description:
      "Master electrician team expanding residential and commercial services across Brisbane Northside. Assisting with switchboard upgrades, split-system AC installations, and commercial fitouts.",
    requirements: [
      "Valid Queensland Construction White Card",
      "Manual Driver Licence (Class C)",
      "High attention to safety and reliability",
      "Bilingual Turkish/English speaker preferred for Turkish client communications",
    ],
    contactPhone: "+61 412 888 999",
    contactEmail: "jobs@toroselectrical.com.au",
    isFairWorkCompliant: true,
    visaFriendly: "Permanent / Full Working Rights",
    postedAt: "2026-10-25",
  },
  {
    id: "job-3",
    title: "Bilingual Dental Assistant / Receptionist",
    company: "Aegean Family Dental Care",
    category: "Healthcare",
    employmentType: "Part-time",
    suburb: "Mount Gravatt",
    payRate: "$30 - $34 / hr (Health Services Award Level 3)",
    description:
      "Modern, friendly dental practice looking for a patient-focused assistant fluent in English and Turkish. Chairside assisting, sterilization, instrument management, and front desk booking.",
    requirements: [
      "Certificate III in Dental Assisting (or overseas dental nursing degree underway with AHPRA)",
      "Fluent spoken and written English and Turkish",
      "Warm chairside manner and patient empathy",
      "Flexible schedule across 3-4 days per week",
    ],
    contactEmail: "clinic@aegeandental.com.au",
    isFairWorkCompliant: true,
    visaFriendly: "Student Visa Friendly (24h/wk)",
    postedAt: "2026-10-24",
  },
  {
    id: "job-4",
    title: "Assistant Accountant / Junior Tax Consultant",
    company: "Bosphorus Accounting & Advisory",
    category: "Professional Services",
    employmentType: "Part-time",
    suburb: "Brisbane CBD",
    payRate: "$34 - $38 / hr + Super",
    description:
      "CPA firm assisting local businesses and international trade entities. Hands-on exposure to Xero, MYOB, quarterly BAS preparation, and company tax returns. Mentorship provided by CPA registered partners.",
    requirements: [
      "Bachelor of Commerce / Accounting (completed or in final year at UQ, QUT, or Griffith)",
      "Working knowledge of Australian GST and BAS principles",
      "Proficient in Excel and cloud accounting platforms (Xero certified preferred)",
      "Fluent in Turkish & English for cross-border trade invoicing",
    ],
    contactEmail: "tax@bosphorusadvisory.com.au",
    isFairWorkCompliant: true,
    visaFriendly: "Student Visa Friendly (24h/wk)",
    postedAt: "2026-10-22",
  },
  {
    id: "job-5",
    title: "Wall & Floor Tiler / Stone Mason",
    company: "Antalya Travertine & Natural Stone",
    category: "Trades & Construction",
    employmentType: "Full-time",
    suburb: "Fortitude Valley",
    payRate: "$42 - $50 / hr (Subcontract or PAYG + Super)",
    description:
      "Specialty architectural stone contractor installing premium Denizli travertine, marble bathroom vanities, and outdoor pool surrounds on high-end residential projects.",
    requirements: [
      "Valid White Card & QBCC subcontractor licence (or trade certificate)",
      "Demonstrated experience cutting and laying natural stone & large format porcelain tiles",
      "Own reliable transport and basic tiling tools",
    ],
    contactPhone: "+61 7 3100 8822",
    contactWhatsApp: "+61 400 999 444",
    isFairWorkCompliant: true,
    visaFriendly: "Permanent / Full Working Rights",
    postedAt: "2026-10-20",
  },
  {
    id: "job-6",
    title: "Junior Cloud & DevOps Technician",
    company: "Anatolian IT & Cloud Solutions",
    category: "Tech Support & IT",
    employmentType: "Casual",
    suburb: "Indooroopilly",
    payRate: "$35 - $40 / hr",
    description:
      "IT managed services provider helping Brisbane small businesses migrate to AWS/Azure and maintaining local retail POS networks. Ideal for computer science university students.",
    requirements: [
      "Basic Linux command line, networking (DNS, DHCP, VPN) and cloud fundamentals",
      "Clear verbal English communication skills for customer ticket triage",
      "Fast learner with enthusiasm for troubleshooting hardware and cloud servers",
    ],
    contactEmail: "support@anatolianit.com.au",
    isFairWorkCompliant: true,
    visaFriendly: "Student Visa Friendly (24h/wk)",
    postedAt: "2026-10-18",
  },
];

export const INITIAL_CANDIDATE_PROFILES: CandidateProfile[] = [
  {
    id: "cand-1",
    name: "Emre K.",
    targetRole: "Civil Project Engineer / Site Supervisor",
    category: "Trades & Construction",
    experienceYears: "5+ Years (Istanbul & Australia)",
    skills: ["AutoCAD", "Site Supervision", "Concrete QA/QC", "Project Scheduling", "WHS Compliance"],
    licenses: ["White Card", "Engineers Australia Stage 1 Assessed", "QLD Driver Licence"],
    languages: "Turkish (Native), English (PTE 79 / Fluent)",
    availability: "Immediate - Full Time",
    suburb: "Brisbane CBD / Northside",
    bio: "Civil engineering graduate with 5 years commercial construction experience in Türkiye. Currently completing Australian qualification equivalency. Looking for project coordinator or site engineer roles.",
    contactChannel: "Email: emre.civil.qld@gmail.com",
    registeredAt: "2026-10-26",
  },
  {
    id: "cand-2",
    name: "Selin D.",
    targetRole: "Barista & Cafe Front of House All-Rounder",
    category: "Hospitality",
    experienceYears: "2 Years Specialty Coffee",
    skills: ["Latte Art", "Espresso Dial-in", "POS Systems (Square/Lightspeed)", "Customer Service"],
    licenses: ["RSA (Responsible Service of Alcohol) QLD"],
    languages: "Turkish (Native), English (Fluent / IELTS 7.0)",
    availability: "Part Time (Student 24h/wk)",
    suburb: "South Bank / West End",
    bio: "Master’s student at UQ with 2 years specialty cafe experience in Kadıköy and Brisbane. Punctual, cheerful, and fast in high-volume morning rushes.",
    contactChannel: "WhatsApp / SMS: +61 433 111 222",
    registeredAt: "2026-10-24",
  },
  {
    id: "cand-3",
    name: "Baris Y.",
    targetRole: "Commercial Painter & Plasterer",
    category: "Trades & Construction",
    experienceYears: "7 Years",
    skills: ["Interior/Exterior Spraying", "Plaster Sheeting & Stopping", "Waterproofing", "Scaffolding"],
    licenses: ["White Card", "Working at Heights", "Own Van & Spray Equipment"],
    languages: "Turkish (Native), English (Conversational)",
    availability: "Immediate - Full Time",
    suburb: "Logan / Southside / Gold Coast",
    bio: "Experienced residential and commercial painter with own commercial spray unit and vehicle. Available for subcontracting or full-time crew roles.",
    contactChannel: "Phone / SMS: +61 422 555 777",
    registeredAt: "2026-10-21",
  },
  {
    id: "cand-4",
    name: "Zeynep T.",
    targetRole: "Full-Stack Web Developer (React / Next.js / Node)",
    category: "Tech Support & IT",
    experienceYears: "3 Years",
    skills: ["TypeScript", "Next.js", "Tailwind CSS", "PostgreSQL", "Docker", "REST/GraphQL APIs"],
    licenses: ["Bachelor of Software Engineering (ITU Istanbul)"],
    languages: "Turkish (Native), English (Fluent / IELTS 8.0)",
    availability: "Immediate - Full Time",
    suburb: "Toowong / St Lucia",
    bio: "Passionate software engineer skilled in building responsive SaaS dashboards and full-stack web applications. Seeking frontend or full-stack software engineer roles in Brisbane.",
    contactChannel: "LinkedIn / Email: zeynep.dev.brisbane@gmail.com",
    registeredAt: "2026-10-19",
  },
];
