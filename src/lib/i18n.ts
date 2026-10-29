export type Language = "en" | "tr";

export const translations = {
  // Navigation
  "nav.directory": { en: "Directory", tr: "Rehber" },
  "nav.interactive_map": { en: "Interactive Map", tr: "Harita Görünümü" },
  "nav.community": { en: "Community", tr: "Topluluk" },
  "nav.careers": { en: "Careers & Jobs", tr: "Kariyer & İş İlanları" },
  "nav.hire_student": { en: "Hire a Student", tr: "Öğrenciye Destek" },
  "nav.seniors": { en: "Elders & Picnics", tr: "Büyüklerimiz & Piknik" },
  "nav.events": { en: "Events Calendar", tr: "Etkinlik Takvimi" },
  "nav.guide": { en: "Living in QLD Guide", tr: "QLD Yaşam Rehberi" },
  "nav.blog": { en: "Insights & Blog", tr: "Makaleler & Blog" },
  "nav.about": { en: "About & E-E-A-T", tr: "Hakkımızda & Standartlar" },
  "nav.contact": { en: "Contact", tr: "İletişim" },
  "nav.list_business": { en: "List Business", tr: "İşletme Ekle" },
  "nav.join_whatsapp": { en: "WhatsApp Hub", tr: "WhatsApp Grubu" },
  "nav.noticeboard": { en: "Noticeboard", tr: "Duyuru Panosu" },

  // Hero & Search
  "hero.badge": {
    en: "Queensland Turkish Community & Business Network",
    tr: "Queensland Türk Topluluğu ve Ticaret Dayanışma Ağı",
  },
  "hero.title_prefix": {
    en: "Find trusted Turkish businesses & services in",
    tr: "Queensland'deki güvenilir Türk işletme ve hizmetlerini",
  },
  "hero.title_highlight": {
    en: "Queensland.",
    tr: "keşfedin.",
  },
  "hero.subtitle": {
    en: "Connecting Turkish-speaking doctors, lawyers, grocers, trades, and professionals across Greater Brisbane, Gold Coast, and Sunshine Coast.",
    tr: "Brisbane, Gold Coast ve Sunshine Coast genelinde Türkçe konuşan doktorlar, avukatlar, marketler, ustalar ve profesyonelleri bir araya getiriyoruz.",
  },
  "hero.explore_directory": { en: "Explore Directory", tr: "Rehberi İncele" },
  "hero.join_community": { en: "Join WhatsApp Hub", tr: "WhatsApp Topluluğuna Katıl" },
  "hero.verified_badge": { en: "ABR Verified Providers", tr: "ABR Onaylı İşletmeler" },
  "hero.free_platform": { en: "100% Free & Independent", tr: "%100 Ücretsiz & Bağımsız" },

  // Hire a Student
  "student.badge": {
    en: "Queensland Turkish Student Solidarity & Opportunity Initiative",
    tr: "Queensland Türk Öğrenci Dayanışma ve İstihdam Hareketi",
  },
  "student.title": {
    en: "Hire A Turkish Student: Dignity, Skill & Community Support",
    tr: "Bir Türk Öğrenciye Destek Olun: Saygın İş, Beceri ve Topluluk Gücü",
  },
  "student.subtitle": {
    en: "Many talented Turkish international students in Queensland face extreme living costs and are forced into perilous midnight food delivery and gig courier shifts. By hiring them directly for babysitting, home cleaning, handyman repairs, IT troubleshooting, and tutoring, our community provides dignified, fair-paying work while benefiting from trusted bilingual talent.",
    tr: "Queensland'deki yetenekli Türk üniversite öğrencileri yüksek yaşam maliyetleri yüzünden geceleri tehlikeli kuryelik ve paket servis işlerinde yıpranıyor. Onları çocuk bakımı, ev temizliği, boya-tamirat, bilgisayar desteği ve Türkçe dersleri için tercih ederek hem hak ettikleri saygın kazancı sağlayın, hem de güvenilir Türk gençlerinden destek alın.",
  },
  "student.post_task": { en: "Post a Job / Task for Students", tr: "Öğrencilere İş / Görev İlanı Ver" },
  "student.register": { en: "I Am a Turkish Student (Register)", tr: "Ben Türk Öğrenciyim (Profil Ekle)" },
  "student.available_tab": { en: "Available Students", tr: "Müsait Öğrenciler" },
  "student.tasks_tab": { en: "Open Student Tasks", tr: "Açık Öğrenci İşleri" },

  // Seniors & Elders
  "seniors.badge": {
    en: "Queensland Turkish Elders & Seniors Circle",
    tr: "Queensland Türk Büyüklerimiz & Emekliler Kulübü",
  },
  "seniors.title": {
    en: "Public Park Picnics, Samovar Tea & Elders Gatherings",
    tr: "Park Piknikleri, Semaver Çayı ve Büyüklerimiz Buluşması",
  },
  "seniors.subtitle": {
    en: "Dedicated open-air gatherings in Queensland's shaded public parks for our beloved Turkish elders and retirees. Combating isolation with fresh samovar çay, backgammon tournaments, homemade börek, traditional folk music, and free youth carpooling support.",
    tr: "Queensland'de yaşayan saygıdeğer büyüklerimiz ve emeklilerimiz için Brisbane ve Gold Coast'un en güzel gölgeli parklarında semaver çayı, tavla turnuvaları, ev yapımı börekler, türküler ve gençlerin ücretsiz araçla alma desteğiyle yalnızlığa son veriyoruz.",
  },
  "seniors.register_elder": { en: "Register an Elder Family Member", tr: "Büyüğümüzü / Anne-Babamızı Kaydet" },
  "seniors.volunteer_driver": { en: "Volunteer as a Youth Driver", tr: "Genç Şoför Olarak Gönüllü Ol" },
  "seniors.upcoming_picnics": { en: "Upcoming Park Picnics", tr: "Yaklaşan Park Piknikleri" },
  "seniors.traditions": { en: "Park Traditions & Activities", tr: "Piknik Gelenekleri ve Etkinlikler" },
  "seniors.health_support": { en: "Bilingual Aged Care & Health Guidance", tr: "Türkçe Yaşlı Bakım & Sağlık Rehberliği" },

  // Events Calendar
  "events.badge": {
    en: "Queensland Turkish Community Calendar 2026",
    tr: "Queensland Türk Topluluğu Etkinlik Takvimi 2026",
  },
  "events.title": {
    en: "Events, Gatherings & Bilateral Forums",
    tr: "Etkinlikler, Buluşmalar ve İş Forumları",
  },
  "events.submit_btn": { en: "Submit Community Event", tr: "Topluluk Etkinliği Ekle" },
  "events.rsvp_free": { en: "RSVP Free", tr: "Ücretsiz Katıl" },
  "events.google_cal": { en: "Google Cal", tr: "Google Takvim" },
  "events.ics_file": { en: ".ICS File", tr: ".ICS İndir" },
  "events.attending": { en: "Attending", tr: "Katılıyor" },

  // Common UI
  "common.all": { en: "All", tr: "Tümü" },
  "common.search": { en: "Search...", tr: "Ara..." },
  "common.cancel": { en: "Cancel", tr: "İptal" },
  "common.submit": { en: "Submit", tr: "Gönder" },
  "common.close": { en: "Close", tr: "Kapat" },
  "common.loading": { en: "Loading...", tr: "Yükleniyor..." },
  "common.verified": { en: "Verified", tr: "Doğrulanmış" },
  "common.direct_contact": { en: "Direct Contact", tr: "Doğrudan İletişim" },
  "common.whatsapp": { en: "WhatsApp", tr: "WhatsApp" },
  "common.email": { en: "Email", tr: "E-posta" },
  "common.phone": { en: "Phone", tr: "Telefon" },
};

export function getTranslation(key: keyof typeof translations, lang: Language): string {
  const item = translations[key];
  if (!item) return key;
  return item[lang] || item["en"] || key;
}

