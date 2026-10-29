export interface SeniorPicnicEvent {
  id: string;
  titleEn: string;
  titleTr: string;
  parkName: string;
  address: string;
  suburb: string;
  date: string;
  time: string;
  descriptionEn: string;
  descriptionTr: string;
  accessibilityFeatures: string[];
  traditions: string[];
  image: string;
  googleMapsUrl: string;
  rsvpCount: number;
  contactCoordinator: string;
}

export interface SeniorRegistration {
  id: string;
  elderName: string;
  age?: number;
  suburb: string;
  needsTransport: boolean;
  notes: string;
  familyContact: string;
  registeredAt: string;
}

export const SENIOR_PARK_PICNICS: SeniorPicnicEvent[] = [
  {
    id: "picnic-1",
    titleEn: "Roma Street Parkland: Shaded Lawn Picnic & Samovar Çay",
    titleTr: "Roma Street Parkland: Gölgelik Çimlerde Semaver Çayı ve Tavla Buluşması",
    parkName: "Roma Street Parkland (Celebration Precinct & Shaded Pavilions)",
    address: "1 Parkland Blvd, Brisbane City QLD 4000",
    suburb: "Brisbane CBD",
    date: "2026-11-15",
    time: "10:30 AM – 2:30 PM",
    descriptionEn: "A relaxed, shaded Sunday gathering in central Brisbane. Continuous fresh Turkish samovar tea (semaver çayı) brewed all day, backgammon (tavla) boards set up under jacarandas, and a potluck table of homemade börek and sarma. Complete wheelchair and walker accessibility with elevator access directly from Roma Street Station.",
    descriptionTr: "Brisbane şehir merkezinin kalbinde, ulu ağaçlar altındaki gölgelik pavilyonlarda pazar buluşması. Gün boyu demlenen kömürlü semaver çayı, tavla masaları, ev yapımı börek ve yaprak sarması imecesi. Roma Street tren istasyonundan asansörlü, basamaksız tekerlekli sandalye ve yürüteç uyumlu erişim.",
    accessibilityFeatures: [
      "100% Step-free level pathways & wheelchair friendly",
      "Direct elevator access from Roma Street Train & Bus Station",
      "Close accessible restrooms (Changing Places accredited)",
      "Free youth carpool pick-up from Sunnybank, Chermside & West End",
    ],
    traditions: [
      "Kömürlü semaverde taze demlenmiş Rize çayı (ince belli bardak)",
      "Geleneksel tavla ve okey turnuvası (kazanana Türk lokumu ödülü)",
      "Ev yapımı su böreği, poğaça ve meze ikramları",
      "Akustik bağlama ve nostaljik Türk Sanat Müziği dinletisi",
    ],
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Roma+Street+Parkland+Brisbane",
    rsvpCount: 38,
    contactCoordinator: "Fatma Teyze & Gönüllüler (+61 400 777 222)",
  },
  {
    id: "picnic-2",
    titleEn: "New Farm Park: Riverfront Rotunda Turkish Çay & Health Check",
    titleTr: "New Farm Park: Nehir Kenarı Tarihi Rotunda Çay Saati ve Sağlık Kontrolü",
    parkName: "New Farm Park (Riverfront Rotunda & Shaded Rose Gardens)",
    address: "Brunswick St, New Farm QLD 4005",
    suburb: "New Farm",
    date: "2026-11-22",
    time: "10:00 AM – 2:00 PM",
    descriptionEn: "Cool river breezes and open lawns beside the Brisbane River. Volunteer Turkish nursing students provide free blood pressure and glucose wellness checks, followed by Turkish coffee and conversation. Step-free access via New Farm Park CityCat ferry terminal.",
    descriptionTr: "Brisbane Nehri kıyısında serin meltemler ve ulu incir ağaçları altında huzurlu bir buluşma. Gönüllü Türk hemşirelik öğrencilerimiz tarafından tansiyon ve şeker ölçümü, ardından közde Türk kahvesi ve sıcacık muhabbet. CityCat feribot iskelesinden basamaksız düz ayak ulaşım.",
    accessibilityFeatures: [
      "Level riverside walking path with abundant park benches",
      "CityCat Ferry Terminal wheelchair boarding ramp",
      "Designated disabled parking bays next to Rotunda",
      "Shaded seating under century-old fig trees",
    ],
    traditions: [
      "Gönüllü hemşirelerden ücretsiz tansiyon & şeker kontrolü",
      "Közde kumda Türk kahvesi ve sohbet halkası",
      "Torunlar için çim oyunları ve gölgeli dinlenme alanları",
      "Şiir ve anı paylaşım köşesi",
    ],
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=New+Farm+Park+Brisbane",
    rsvpCount: 44,
    contactCoordinator: "Mehmet Amca & Gençlik Kolu (+61 400 777 333)",
  },
  {
    id: "picnic-3",
    titleEn: "South Bank: Picnic Island Covered Gazebo & Aged Care Clinic",
    titleTr: "South Bank: Picnic Island Gazebo Buluşması ve Yaşlı Bakım Bilgilendirmesi",
    parkName: "South Bank Parklands (Picnic Island Green)",
    address: "Little Stanley St, South Brisbane QLD 4101",
    suburb: "South Bank",
    date: "2026-12-06",
    time: "11:00 AM – 3:00 PM",
    descriptionEn: "Undercover covered gazebo gathering surrounded by tranquil lotus ponds. Features an informal bilingual Q&A session with Turkish-speaking social workers on My Aged Care Home Care Packages, Centrelink Age Pension concessions, and free telephone interpreters (TIS National 131 450).",
    descriptionTr: "Nilüfer havuzları ve yağmur ormanı gölgeliğinde kapalı kamelya buluşması. Türkçe bilen sosyal hizmet danışmanları eşliğinde My Aged Care Evde Bakım Paketleri, Centrelink Yaşlılık Aylığı hakları ve TIS National (131 450) ücretsiz tercüman kullanımı hakkında bilgilendirme sohbeti.",
    accessibilityFeatures: [
      "Fully covered weatherproof gazebo with picnic tables and lighting",
      "Flat concrete promenade connecting South Bank Station & Cultural Centre",
      "Underground secure parking with lift access direct to lawns",
      "Hearing-loop friendly quiet atmosphere",
    ],
    traditions: [
      "Türkçe My Aged Care & Centrelink hakları bilgilendirmesi",
      "Geleneksel Türk ezgileri ve türkü korosu",
      "Ev yapımı mantı ve kısır ikramı",
      "Tavla ve satranç karşılaşmaları",
    ],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=South+Bank+Parklands+Brisbane",
    rsvpCount: 52,
    contactCoordinator: "Ayşe Hanım (+61 400 777 444)",
  },
  {
    id: "picnic-4",
    titleEn: "Gold Coast: Broadwater Parklands Ocean Breeze Elders Picnic",
    titleTr: "Gold Coast: Broadwater Parklands Sahil Parkı Deniz Kenarı Çay Buluşması",
    parkName: "Broadwater Parklands (The Great Lawn & Shaded Pavilion)",
    address: "Marine Parade, Southport QLD 4215",
    suburb: "Southport (Gold Coast)",
    date: "2026-12-13",
    time: "11:00 AM – 3:00 PM",
    descriptionEn: "Dedicated Gold Coast coastal gathering for Turkish retirees and families. Looking out over the calm waters of the Southport Broadwater with fresh sea breezes, semaver çayı, and simit. Direct G:link Southport light rail access.",
    descriptionTr: "Gold Coast ve civarında yaşayan emeklilerimiz ve büyüklerimiz için deniz kıyısında ferahlatıcı açık hava pikniği. Durgun sular manzarası, semaver çayı, taze simit ve peynir ikramı. G:link Southport tramvay durağına düz ayak yürüme mesafesinde.",
    accessibilityFeatures: [
      "Direct level access from Southport G:link Tram Station",
      "Wide paved foreshore boardwalk suitable for mobility scooters",
      "Accessible covered pergolas with electric BBQs",
      "Carpool meet-point from Surfers Paradise and Helensvale",
    ],
    traditions: [
      "Kıyı şeridinde grup yürüyüşü ve deniz havası",
      "Taze çıtır simit, tulum peyniri ve semaver çayı",
      "Klasik Türk müziği eşliğinde nostalji sohbetleri",
      "Tavla ve domino oyunları",
    ],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Broadwater+Parklands+Southport",
    rsvpCount: 36,
    contactCoordinator: "Kemal Bey (+61 400 777 555)",
  },
];
