"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Tag,
  Plus,
  Search,
  CheckCircle2,
  ExternalLink,
  Download,
  Share2,
  Sparkles,
  Info,
  X,
  MessageCircle,
  Mail,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  CommunityEvent,
  getGoogleCalendarUrl,
  generateIcsContent,
} from "@/data/community-events";
import { Button } from "@/components/ui/button";

interface EventsClientProps {
  initialEvents: CommunityEvent[];
}

const CATEGORIES = [
  "All",
  "Community & Family",
  "Business & Networking",
  "Culture & Youth",
  "Workshops & Legal",
] as const;

export function EventsClient({ initialEvents }: EventsClientProps) {
  const [events, setEvents] = React.useState<CommunityEvent[]>(initialEvents);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [rsvpedEventIds, setRsvpedEventIds] = React.useState<Set<string>>(new Set());

  // RSVP Modal State
  const [rsvpModalOpen, setRsvpModalOpen] = React.useState(false);
  const [selectedEventForRsvp, setSelectedEventForRsvp] = React.useState<CommunityEvent | null>(null);
  const [rsvpName, setRsvpName] = React.useState("");
  const [rsvpEmail, setRsvpEmail] = React.useState("");
  const [isSubmittingRsvp, setIsSubmittingRsvp] = React.useState(false);
  const [rsvpToast, setRsvpToast] = React.useState<string | null>(null);

  // Submit Event Modal State
  const [submitModalOpen, setSubmitModalOpen] = React.useState(false);
  const [isSubmittingEvent, setIsSubmittingEvent] = React.useState(false);
  const [eventForm, setEventForm] = React.useState({
    title: "",
    category: "Community & Family" as CommunityEvent["category"],
    date: "",
    startTime: "10:00 AM",
    endTime: "1:00 PM",
    locationName: "",
    address: "",
    suburb: "",
    cost: "Free",
    organizer: "",
    description: "",
    highlights: "",
    contactEmail: "",
    contactWhatsApp: "",
  });

  // Filter events
  const filteredEvents = React.useMemo(() => {
    return events.filter((e) => {
      const matchesCategory =
        selectedCategory === "All" || e.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.suburb.toLowerCase().includes(q) ||
        e.locationName.toLowerCase().includes(q) ||
        e.organizer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, searchQuery]);

  // Handle iCal Download (.ics)
  const handleDownloadIcs = (event: CommunityEvent) => {
    const icsContent = generateIcsContent(event);
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${event.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Open RSVP Modal
  const openRsvpModal = (event: CommunityEvent) => {
    setSelectedEventForRsvp(event);
    setRsvpModalOpen(true);
  };

  // Submit RSVP
  const handleConfirmRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventForRsvp || !rsvpName.trim()) return;

    setIsSubmittingRsvp(true);
    try {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "rsvp",
          rsvpData: {
            eventId: selectedEventForRsvp.id,
            name: rsvpName,
            email: rsvpEmail,
          },
        }),
      });

      // Update local RSVP counts and state
      setRsvpedEventIds((prev) => new Set(prev).add(selectedEventForRsvp.id));
      setEvents((prev) =>
        prev.map((item) =>
          item.id === selectedEventForRsvp.id
            ? { ...item, rsvpCount: item.rsvpCount + 1 }
            : item
        )
      );

      setRsvpToast(`Harika! Your RSVP for "${selectedEventForRsvp.title}" is confirmed.`);
      setRsvpModalOpen(false);
      setRsvpName("");
      setRsvpEmail("");
      setTimeout(() => setRsvpToast(null), 5000);
    } catch (err) {
      console.error(err);
      alert("Could not submit RSVP. Please try again.");
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  // Submit New Community Event
  const handleSubmitNewEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date || !eventForm.locationName) {
      alert("Please fill in the required fields: Title, Date, and Location.");
      return;
    }

    setIsSubmittingEvent(true);
    try {
      const highlightsArray = eventForm.highlights
        ? eventForm.highlights.split("\n").filter(Boolean)
        : ["Family & community friendly", "Traditional hospitality"];

      const newEvent: CommunityEvent = {
        id: `custom-event-${Date.now()}`,
        title: eventForm.title,
        category: eventForm.category,
        date: eventForm.date,
        startTime: eventForm.startTime || "10:00 AM",
        endTime: eventForm.endTime || "1:00 PM",
        locationName: eventForm.locationName,
        address: eventForm.address || `${eventForm.locationName}, Queensland`,
        suburb: eventForm.suburb || "Brisbane",
        cost: eventForm.cost || "Free",
        organizer: eventForm.organizer || "Community Organizer",
        description: eventForm.description || "Community event hosted in Queensland.",
        highlights: highlightsArray,
        image:
          "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        rsvpCount: 1,
        contactEmail: eventForm.contactEmail || undefined,
        contactWhatsApp: eventForm.contactWhatsApp || undefined,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          eventForm.locationName + " " + eventForm.address
        )}`,
      };

      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          eventData: newEvent,
        }),
      });

      setEvents((prev) => [newEvent, ...prev]);
      setSubmitModalOpen(false);
      setEventForm({
        title: "",
        category: "Community & Family",
        date: "",
        startTime: "10:00 AM",
        endTime: "1:00 PM",
        locationName: "",
        address: "",
        suburb: "",
        cost: "Free",
        organizer: "",
        description: "",
        highlights: "",
        contactEmail: "",
        contactWhatsApp: "",
      });
      setRsvpToast("Your community event has been submitted and added to the calendar!");
      setTimeout(() => setRsvpToast(null), 5000);
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  // Helper to parse date badge
  const formatBadgeDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split("-").map(Number);
      const d = new Date(year, month - 1, day);
      const monthName = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
      const dayNum = String(day).padStart(2, "0");
      const weekday = d.toLocaleString("en-US", { weekday: "short" });
      return { monthName, dayNum, weekday };
    } catch {
      return { monthName: "DATE", dayNum: "01", weekday: "Day" };
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 pb-20">
      {/* Toast Notification */}
      {rsvpToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-900 shadow-xl dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{rsvpToast}</span>
        </div>
      )}

      {/* Hero Banner with Turkish Crimson & Turquoise Accents */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-red-50/40 via-white to-zinc-50/50 py-12 dark:border-zinc-800 dark:from-red-950/20 dark:via-zinc-950 dark:to-zinc-950 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(#E30A17_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50/80 px-3 py-1 text-xs font-semibold text-[#E30A17] dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                <CalendarIcon className="h-3.5 w-3.5 text-[#E30A17]" />
                <span>Queensland Turkish Community Calendar 2026</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
                Events, Gatherings &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30A17] via-red-600 to-cyan-600 dark:to-cyan-400">
                  Bilateral Forums
                </span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Connect with Queensland’s vibrant Turkish diaspora through monthly riverfront breakfasts, Republic Day galas, university mentorship BBQs, and licensed trade workshops across Greater Brisbane and the Gold Coast.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Button
                onClick={() => setSubmitModalOpen(true)}
                variant="turkish"
                className="gap-2 text-xs font-semibold shadow-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Submit Community Event</span>
              </Button>
              <Link href="/noticeboard">
                <Button variant="outline" className="gap-2 text-xs font-medium">
                  <span>View Noticeboard →</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Metrics & Sync Pills */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-3 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/80">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-[#E30A17] dark:bg-red-950/60">
                <CalendarIcon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {events.length} Upcoming
                </div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">Verified community gatherings</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-3 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/80">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {events.reduce((acc, cur) => acc + cur.rsvpCount, 0)}+ RSVPs
                </div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">Community participants</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-3 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/80">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">100% Free & Open</div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">Family & student friendly</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-3 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/80">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                <Download className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">1-Click Sync</div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">Google, Apple & Outlook</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* Controls: Search & Category Chips */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, venues, suburbs, or topics..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-zinc-200 bg-white shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs text-zinc-500 dark:text-zinc-400 self-center">
              Showing <span className="font-semibold text-zinc-800 dark:text-zinc-200">{filteredEvents.length}</span> of {events.length} events
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="h-3.5 w-3.5 text-zinc-400 shrink-0 ml-1 mr-1" />
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    isSelected
                      ? "bg-[#E30A17] text-white shadow-xs"
                      : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Events Cards Grid */}
        <div className="mt-8 space-y-6">
          {filteredEvents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-800">
              <CalendarIcon className="mx-auto h-8 w-8 text-zinc-400" />
              <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                No events found matching your criteria
              </h3>
              <p className="mt-1 text-xs text-zinc-500">
                Try clearing your search query or switching category filters.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 text-xs"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            filteredEvents.map((event) => {
              const { monthName, dayNum, weekday } = formatBadgeDate(event.date);
              const isRsvped = rsvpedEventIds.has(event.id);
              const googleCalUrl = getGoogleCalendarUrl(event);

              return (
                <article
                  key={event.id}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-xs hover:shadow-md transition-all dark:border-zinc-800/80 dark:bg-zinc-900"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                    {/* Left: Event Image & Date Badge */}
                    <div className="relative md:col-span-4 min-h-[200px] md:min-h-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />

                      {/* Date Badge Overlay */}
                      <div className="absolute top-4 left-4 flex flex-col items-center justify-center rounded-xl bg-white/95 px-3 py-2 text-center shadow-lg backdrop-blur-xs border border-white/40 dark:bg-zinc-900/95 dark:border-zinc-800">
                        <span className="text-[10px] font-extrabold tracking-wider text-[#E30A17]">
                          {monthName}
                        </span>
                        <span className="text-xl font-black text-zinc-900 dark:text-white leading-none">
                          {dayNum}
                        </span>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                          {weekday}
                        </span>
                      </div>

                      {/* Category Pill Overlay */}
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center rounded-full bg-zinc-900/80 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-xs shadow-xs">
                          {event.category}
                        </span>
                      </div>

                      {/* Suburb Pill Overlay (Mobile) */}
                      <div className="absolute bottom-3 left-4 md:hidden text-xs font-semibold text-white flex items-center gap-1 drop-shadow">
                        <MapPin className="h-3.5 w-3.5 text-red-400" />
                        <span>{event.suburb}</span>
                      </div>
                    </div>

                    {/* Right: Content & Actions */}
                    <div className="p-6 md:col-span-8 flex flex-col justify-between space-y-4">
                      <div>
                        {/* Meta Bar: Suburb, Time & Cost */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                          <span className="flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300">
                            <Clock className="h-3.5 w-3.5 text-[#E30A17]" />
                            <span>
                              {event.startTime} – {event.endTime}
                            </span>
                          </span>
                          <span className="text-zinc-300 dark:text-zinc-700">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                            <span>
                              {event.locationName} ({event.suburb})
                            </span>
                          </span>
                          <span className="text-zinc-300 dark:text-zinc-700">•</span>
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                            {event.cost}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="mt-2.5 text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-[#E30A17] transition-colors">
                          {event.title}
                        </h2>

                        {/* Organizer Tag */}
                        <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                          <span>Hosted by</span>
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                            {event.organizer}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Highlights List */}
                        {event.highlights && event.highlights.length > 0 && (
                          <div className="mt-4 rounded-xl bg-zinc-50 p-3.5 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800/60">
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                              Event Highlights & Inclusions
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                              {event.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="text-[#E30A17] font-bold shrink-0 mt-0.5">★</span>
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Bottom Footer Actions */}
                      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* Attendance Counter & Venue Link */}
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1.5 font-semibold text-zinc-700 dark:text-zinc-300">
                            <Users className="h-4 w-4 text-cyan-600" />
                            <span>{event.rsvpCount} Attending</span>
                          </div>

                          <a
                            href={event.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                          >
                            <span>Venue Map</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Calendar Options Dropdown or Direct Buttons */}
                          <a
                            href={googleCalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
                            title="Add directly to Google Calendar"
                          >
                            <CalendarIcon className="h-3.5 w-3.5 text-blue-600" />
                            <span>Google Cal</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDownloadIcs(event)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
                            title="Download iCal file for Apple Calendar or Outlook"
                          >
                            <Download className="h-3.5 w-3.5 text-zinc-500" />
                            <span>.ICS File</span>
                          </button>

                          {/* RSVP Action */}
                          {isRsvped ? (
                            <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                              <span>Attending</span>
                            </div>
                          ) : (
                            <Button
                              onClick={() => openRsvpModal(event)}
                              variant="turkish"
                              size="sm"
                              className="text-xs font-semibold shadow-xs"
                            >
                              <span>RSVP Free</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Community Hosting Guidelines Banner */}
        <div className="mt-12 rounded-2xl border border-zinc-200 bg-gradient-to-r from-red-50/50 via-zinc-50 to-cyan-50/40 p-6 sm:p-8 dark:border-zinc-800 dark:from-red-950/20 dark:via-zinc-900 dark:to-cyan-950/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E30A17]">
                <Sparkles className="h-4 w-4" />
                <span>Host a Community Gathering in Queensland</span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
                Are you organizing a Turkish event, student meet, or business workshop?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                All authentic community events are listed free of charge on QLD Turks. We cross-promote through our 420+ member WhatsApp network and distribute Google & Apple Calendar reminders to the broader diaspora.
              </p>
            </div>
            <Button
              onClick={() => setSubmitModalOpen(true)}
              variant="turkish"
              className="gap-2 text-xs font-semibold shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>Submit Your Event</span>
            </Button>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {rsvpModalOpen && selectedEventForRsvp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-fade-in"
            onClick={() => setRsvpModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#E30A17] dark:bg-red-950/50">
                  <CalendarIcon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    Confirm Event RSVP
                  </h3>
                  <div className="text-[11px] text-zinc-500">Free community registration</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRsvpModalOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 rounded-xl bg-zinc-50 p-3 text-xs dark:bg-zinc-800/50">
              <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                {selectedEventForRsvp.title}
              </div>
              <div className="mt-1 flex items-center gap-2 text-zinc-500">
                <span>{selectedEventForRsvp.date}</span>
                <span>•</span>
                <span>{selectedEventForRsvp.startTime}</span>
                <span>•</span>
                <span>{selectedEventForRsvp.locationName}</span>
              </div>
            </div>

            <form onSubmit={handleConfirmRsvp} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Your Full Name <span className="text-[#E30A17]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mehmet Yılmaz"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Email Address (for calendar invite & reminders)
                </label>
                <input
                  type="email"
                  placeholder="e.g. mehmet@example.com"
                  value={rsvpEmail}
                  onChange={(e) => setRsvpEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div className="flex items-start gap-2 pt-1 text-[11px] text-zinc-500">
                <Info className="h-3.5 w-3.5 text-[#E30A17] shrink-0 mt-0.5" />
                <span>
                  Your contact details are strictly kept private and only used to confirm attendee numbers for samovar tea and seating arrangements.
                </span>
              </div>

              <div className="mt-5 flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRsvpModalOpen(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="turkish"
                  size="sm"
                  disabled={isSubmittingRsvp}
                  className="text-xs font-semibold"
                >
                  {isSubmittingRsvp ? "Confirming..." : "Confirm My Spot"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Submit Event Modal */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-fade-in"
            onClick={() => setSubmitModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#E30A17] dark:bg-red-950/50">
                  <Plus className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    Submit a Community Event
                  </h3>
                  <div className="text-[11px] text-zinc-500">Listing on QLD Turks is 100% free</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSubmitModalOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewEvent} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Event Title <span className="text-[#E30A17]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brisbane Turkish Book Club & Coffee"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Category <span className="text-[#E30A17]">*</span>
                  </label>
                  <select
                    value={eventForm.category}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        category: e.target.value as CommunityEvent["category"],
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  >
                    <option value="Community & Family">Community & Family</option>
                    <option value="Business & Networking">Business & Networking</option>
                    <option value="Culture & Youth">Culture & Youth</option>
                    <option value="Workshops & Legal">Workshops & Legal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Event Date <span className="text-[#E30A17]">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Start Time
                  </label>
                  <input
                    type="text"
                    placeholder="10:00 AM"
                    value={eventForm.startTime}
                    onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    End Time
                  </label>
                  <input
                    type="text"
                    placeholder="1:00 PM"
                    value={eventForm.endTime}
                    onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Venue Name <span className="text-[#E30A17]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. South Bank Parklands"
                    value={eventForm.locationName}
                    onChange={(e) => setEventForm({ ...eventForm, locationName: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Suburb / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. South Brisbane"
                    value={eventForm.suburb}
                    onChange={(e) => setEventForm({ ...eventForm, suburb: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Cost / Admission
                  </label>
                  <input
                    type="text"
                    placeholder="Free or $20 / ticket"
                    value={eventForm.cost}
                    onChange={(e) => setEventForm({ ...eventForm, cost: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Host / Organizer Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Brisbane Turkish Students"
                    value={eventForm.organizer}
                    onChange={(e) => setEventForm({ ...eventForm, organizer: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Event Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide details about what attendees can expect, what to bring, etc."
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Highlights (One per line)
                </label>
                <textarea
                  rows={2}
                  placeholder="Fresh çay included&#10;Open networking&#10;Free street parking"
                  value={eventForm.highlights}
                  onChange={(e) => setEventForm({ ...eventForm, highlights: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Organizer Email
                  </label>
                  <input
                    type="email"
                    placeholder="contact@example.com"
                    value={eventForm.contactEmail}
                    onChange={(e) => setEventForm({ ...eventForm, contactEmail: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Organizer WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="+61 400 123 456"
                    value={eventForm.contactWhatsApp}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, contactWhatsApp: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitModalOpen(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="turkish"
                  size="sm"
                  disabled={isSubmittingEvent}
                  className="text-xs font-semibold"
                >
                  {isSubmittingEvent ? "Submitting..." : "Submit Event Listing"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
