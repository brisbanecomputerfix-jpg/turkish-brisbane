"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Briefcase,
  Users,
  Search,
  MapPin,
  DollarSign,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Send,
  X,
  Building,
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  Award,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IsometricJobPool } from "@/components/ui/isometric-icons";
import { JobPosting, CandidateProfile } from "@/data/job-listings";
import { useApp } from "@/context/app-context";

interface JobsClientProps {
  initialJobs: JobPosting[];
  initialCandidates: CandidateProfile[];
}

const CATEGORIES = [
  "All",
  "Trades & Construction",
  "Hospitality",
  "Healthcare",
  "Professional Services",
  "Tech Support & IT",
];

const EMPLOYMENT_TYPES = ["All", "Full-time", "Part-time", "Casual", "Apprenticeship"];

export function JobsClient({ initialJobs, initialCandidates }: JobsClientProps) {
  const { language } = useApp();
  const isTr = language === "tr";

  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "candidates" ? "candidates" : "jobs";
  const [activeTab, setActiveTab] = React.useState<"jobs" | "candidates">(initialTab);
  const [jobs, setJobs] = React.useState<JobPosting[]>(initialJobs);
  const [candidates, setCandidates] = React.useState<CandidateProfile[]>(initialCandidates);

  React.useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "candidates" || tab === "jobs") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Filters
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedType, setSelectedType] = React.useState("All");
  const [studentFriendlyOnly, setStudentFriendlyOnly] = React.useState(false);

  // Modals
  const [isPostJobOpen, setPostJobOpen] = React.useState(false);
  const [isJoinTalentOpen, setJoinTalentOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successToast, setSuccessToast] = React.useState<string | null>(null);

  // New Job Form State
  const [newJob, setNewJob] = React.useState({
    title: "",
    company: "",
    category: "Hospitality" as JobPosting["category"],
    employmentType: "Full-time" as JobPosting["employmentType"],
    suburb: "South Bank",
    payRate: "",
    description: "",
    requirements: "",
    contactEmail: "",
    contactWhatsApp: "",
    visaFriendly: "Permanent / Full Working Rights" as JobPosting["visaFriendly"],
    isFairWorkCompliant: true,
  });

  // New Candidate Form State
  const [newCandidate, setNewCandidate] = React.useState({
    name: "",
    targetRole: "",
    category: "Trades & Construction" as CandidateProfile["category"],
    experienceYears: "2 Years",
    skills: "",
    licenses: "White Card, QLD Driver Licence",
    languages: "Turkish (Native), English (Conversational)",
    availability: "Immediate - Full Time" as CandidateProfile["availability"],
    suburb: "Brisbane",
    bio: "",
    contactChannel: "",
  });

  // Filtered Jobs
  const filteredJobs = React.useMemo(() => {
    return jobs.filter((j) => {
      const matchCat =
        selectedCategory === "All" || j.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchType =
        selectedType === "All" || j.employmentType.toLowerCase() === selectedType.toLowerCase();
      const matchStudent =
        !studentFriendlyOnly || j.visaFriendly.includes("Student Visa");

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.suburb.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q);

      return matchCat && matchType && matchStudent && matchQuery;
    });
  }, [jobs, selectedCategory, selectedType, studentFriendlyOnly, searchQuery]);

  // Filtered Candidates
  const filteredCandidates = React.useMemo(() => {
    return candidates.filter((c) => {
      const matchCat =
        selectedCategory === "All" || c.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.targetRole.toLowerCase().includes(q) ||
        c.suburb.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q)) ||
        c.bio.toLowerCase().includes(q);

      return matchCat && matchQuery;
    });
  }, [candidates, selectedCategory, searchQuery]);

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedJob: JobPosting = {
      id: `job-${Date.now()}`,
      title: newJob.title,
      company: newJob.company,
      category: newJob.category,
      employmentType: newJob.employmentType,
      suburb: newJob.suburb,
      payRate: newJob.payRate || "Award Rate / Competitive",
      description: newJob.description,
      requirements: newJob.requirements
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      contactEmail: newJob.contactEmail || undefined,
      contactWhatsApp: newJob.contactWhatsApp || undefined,
      visaFriendly: newJob.visaFriendly,
      isFairWorkCompliant: newJob.isFairWorkCompliant,
      postedAt: new Date().toISOString().split("T")[0],
    };

    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "job", data: formattedJob }),
      });
    } catch (err) {
      console.warn("API write error:", err);
    }

    setJobs((prev) => [formattedJob, ...prev]);
    setIsSubmitting(false);
    setPostJobOpen(false);
    setSuccessToast("Job vacancy published successfully!");
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleJoinTalent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedCandidate: CandidateProfile = {
      id: `cand-${Date.now()}`,
      name: newCandidate.name,
      targetRole: newCandidate.targetRole,
      category: newCandidate.category,
      experienceYears: newCandidate.experienceYears,
      skills: newCandidate.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      licenses: newCandidate.licenses
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean),
      languages: newCandidate.languages,
      availability: newCandidate.availability,
      suburb: newCandidate.suburb,
      bio: newCandidate.bio,
      contactChannel: newCandidate.contactChannel,
      registeredAt: new Date().toISOString().split("T")[0],
    };

    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "candidate", data: formattedCandidate }),
      });
    } catch (err) {
      console.warn("API write error:", err);
    }

    setCandidates((prev) => [formattedCandidate, ...prev]);
    setIsSubmitting(false);
    setJoinTalentOpen(false);
    setSuccessToast("Profile added to Talent Pool!");
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Toast Alert */}
        {successToast && (
          <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-zinc-900 text-white px-5 py-3.5 shadow-2xl border border-zinc-800 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold">{successToast}</span>
          </div>
        )}

        {/* Hero Section with Isometric Icon */}
        <div className="rounded-3xl border border-zinc-200/80 bg-linear-to-b from-zinc-50 to-white p-6 sm:p-10 dark:border-zinc-800 dark:from-zinc-900/60 dark:to-zinc-950 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/30 dark:border-blue-500/30 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                {isTr ? "Queensland Türk İş Gücü & Kariyer Havuzu" : "Queensland Turkish Workforce & Job Pool"}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                {isTr
                  ? "İki Dilli Yetenekleri Güvenilir Queensland İşverenleriyle Buluşturuyoruz"
                  : "Connecting Bilingual Talent With Trusted Queensland Employers"}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isTr
                  ? "Türkçe konuşan ustaları, şefleri, sağlıkçıları, mühendisleri ve öğrencileri Fair Work standartlarına uygun yasal işverenlerle buluşturan kariyer ağı."
                  : "A verified career network matching Turkish-speaking tradespeople, chefs, healthcare professionals, engineers, and international students with legitimate, Fair Work-compliant employers."}
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => setPostJobOpen(true)}
                  variant="turkish"
                  size="lg"
                  className="gap-2 shadow-xs"
                >
                  <Plus className="h-4 w-4" />
                  <span>{isTr ? "İş İlanı Ver (İşverenler)" : "Post a Vacancy (Employers)"}</span>
                </Button>
                <Button
                  onClick={() => setJoinTalentOpen(true)}
                  variant="outline"
                  size="lg"
                  className="gap-2 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
                >
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>{isTr ? "Yetenek Havuzuna Katıl (İş Arayanlar)" : "Join Talent Pool (Jobseekers)"}</span>
                </Button>
              </div>
            </div>

            {/* Bespoke 3D Isometric Illustration */}
            <div className="hidden lg:flex flex-col items-center justify-center p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 shrink-0">
              <IsometricJobPool size={140} />
              <span className="mt-2 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                {isTr ? "Onaylı Kariyer Ağı" : "Verified Career Network"}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation: Jobs vs Talent Pool */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center rounded-2xl border border-zinc-200 bg-zinc-100/80 p-1 dark:border-zinc-800 dark:bg-zinc-900">
            <button
              type="button"
              onClick={() => setActiveTab("jobs")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === "jobs"
                  ? "bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              <Briefcase className="h-4 w-4 text-[#E30A17]" />
              <span>{isTr ? "Açık İş İlanları" : "Verified Job Openings"}</span>
              <span className="ml-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-[#E30A17] dark:bg-red-950/60">
                {jobs.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("candidates")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === "candidates"
                  ? "bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              <Users className="h-4 w-4 text-blue-600" />
              <span>{isTr ? "Yetenek Havuzu & Adaylar" : "Talent Pool & Candidates"}</span>
              <span className="ml-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:bg-blue-950/60">
                {candidates.length}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Fair Work Award Standards & No Exploitation Policy</span>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 sm:p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder={
                  activeTab === "jobs"
                    ? "Search job title, skills, employer, or suburb (e.g. Chef, Electrician, South Bank)..."
                    : "Search candidate role, engineering degree, White Card, barista..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#E30A17] focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            {activeTab === "jobs" && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-xs font-medium text-zinc-700 focus:border-[#E30A17] focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 shrink-0"
                >
                  {EMPLOYMENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t === "All" ? "All Types" : t}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setStudentFriendlyOnly((prev) => !prev)}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors border ${
                    studentFriendlyOnly
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  🎓 Student Visa Friendly
                </button>
              </div>
            )}
          </div>

          {/* Industry Category Pills */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/80">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-[#E30A17] text-white"
                    : "bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section: Jobs vs Candidates */}
        {activeTab === "jobs" ? (
          /* JOB POSTINGS LIST */
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>
                Showing <strong className="text-zinc-900 dark:text-zinc-100">{filteredJobs.length}</strong> active job vacancies
              </span>
              <span>Updated Daily</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 transition-all"
                >
                  <div>
                    {/* Header: Category & Visa Friendly */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#E30A17] bg-red-50 dark:bg-red-950/40 px-2.5 py-0.5 rounded-full">
                        {job.category}
                      </span>
                      <span className="text-[11px] font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
                        {job.visaFriendly}
                      </span>
                    </div>

                    {/* Job Title & Company */}
                    <h3 className="mt-3 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {job.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500 font-medium">
                      <span className="text-zinc-800 dark:text-zinc-200 font-semibold">{job.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-zinc-400" />
                        <span>{job.suburb}, QLD</span>
                      </span>
                      <span>•</span>
                      <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-zinc-700 dark:text-zinc-300">
                        {job.employmentType}
                      </span>
                    </div>

                    {/* Pay Rate Box */}
                    <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/40 px-3 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      <DollarSign className="h-3.5 w-3.5" />
                      <span>{job.payRate}</span>
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Requirements */}
                    <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">
                        Key Requirements:
                      </span>
                      <ul className="mt-1.5 space-y-1">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer & Apply Buttons */}
                  <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 text-[11px]">
                      Posted {job.postedAt}
                    </span>

                    <div className="flex items-center gap-2">
                      {job.contactWhatsApp && (
                        <a
                          href={`https://wa.me/${job.contactWhatsApp.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                      {job.contactEmail && (
                        <a
                          href={`mailto:${job.contactEmail}?subject=Application for ${encodeURIComponent(
                            job.title
                          )}`}
                          className="inline-flex items-center gap-1 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 transition-colors"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Email Apply</span>
                        </a>
                      )}
                      {job.contactPhone && !job.contactEmail && !job.contactWhatsApp && (
                        <a
                          href={`tel:${job.contactPhone.replace(/\s+/g, "")}`}
                          className="inline-flex items-center gap-1 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          <span>Call Employer</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="py-16 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                <Briefcase className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  No job vacancies found
                </h4>
                <p className="mt-1 text-xs text-zinc-500 max-w-sm mx-auto">
                  No active jobs match your search filters. Try clearing your filters or post a new job vacancy for your business.
                </p>
                <Button
                  onClick={() => setPostJobOpen(true)}
                  variant="turkish"
                  size="sm"
                  className="mt-4 gap-1.5"
                >
                  <Plus className="h-4 w-4" />
                  <span>Post a Free Job Listing</span>
                </Button>
              </div>
            )}
          </div>
        ) : (
          /* CANDIDATE TALENT POOL LIST */
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>
                Showing <strong className="text-zinc-900 dark:text-zinc-100">{filteredCandidates.length}</strong> registered Turkish candidates
              </span>
              <span>Direct Employer Contact Enabled</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredCandidates.map((cand) => (
                <div
                  key={cand.id}
                  className="flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full">
                          {cand.category}
                        </span>
                        <h3 className="mt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                          {cand.targetRole}
                        </h3>
                        <div className="text-xs font-semibold text-zinc-500">
                          Candidate: {cand.name} • {cand.suburb}
                        </div>
                      </div>

                      <span className="rounded-lg bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                        {cand.availability}
                      </span>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {cand.bio}
                    </p>

                    {/* Qualifications & Licenses */}
                    <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">
                        Licenses & Credentials:
                      </span>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {cand.licenses.map((lic, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:text-zinc-300"
                          >
                            <Award className="h-3 w-3 text-blue-600" />
                            <span>{lic}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skills Chips */}
                    <div className="mt-3">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">
                        Core Competencies:
                      </span>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {cand.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-red-50 dark:bg-red-950/40 px-2 py-0.5 text-[11px] font-medium text-[#E30A17]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="mt-3 text-xs text-zinc-500">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">Languages:</span>{" "}
                      {cand.languages}
                    </div>
                  </div>

                  {/* Footer & Contact */}
                  <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 text-[11px]">
                      Experience: {cand.experienceYears}
                    </span>

                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg">
                      {cand.contactChannel}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredCandidates.length === 0 && (
              <div className="py-16 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                <Users className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  No candidates found
                </h4>
                <p className="mt-1 text-xs text-zinc-500 max-w-sm mx-auto">
                  No candidates match your search filters. Register your skills to get noticed by Turkish and Queensland employers.
                </p>
                <Button
                  onClick={() => setJoinTalentOpen(true)}
                  variant="outline"
                  size="sm"
                  className="mt-4 gap-1.5"
                >
                  <Plus className="h-4 w-4" />
                  <span>Register Your Profile</span>
                </Button>
              </div>
            )}
          </div>
        )}

        {/* E-E-A-T & Fair Work Rights Education Box */}
        <div className="mt-16 rounded-3xl border border-zinc-200/90 bg-linear-to-r from-zinc-50 to-red-50/20 p-6 sm:p-8 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E30A17] text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Fair Work Australia & Worker Protection Standards
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                All employment in Queensland is governed by the Australian <strong>Fair Work Act 2009</strong> and Modern Industry Awards. As of 2026, the national minimum wage is <strong>$24.10/hr</strong> (plus <strong>11.5% superannuation</strong> and penalty rates on weekends). All construction personnel require a Queensland Construction White Card. QLD Turks strictly prohibits cash-in-hand underpayment or visa exploitation.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
                <Link
                  href="/blog/creating-a-unified-turkish-job-pool-queensland"
                  className="font-bold text-[#E30A17] hover:underline inline-flex items-center gap-1"
                >
                  <span>Read our Guide to Degree Recognition & Fair Pay in QLD</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
                <a
                  href="https://www.fairwork.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 underline"
                >
                  Fair Work Ombudsman Official Portal ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL 1: POST A JOB */}
        {isPostJobOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in">
            <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
              <button
                type="button"
                onClick={() => setPostJobOpen(false)}
                className="absolute right-4 top-4 rounded-xl p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E30A17]">
                <Briefcase className="h-4 w-4" />
                <span>Employer Listing</span>
              </div>
              <h2 className="mt-1 text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
                Post a Job Vacancy
              </h2>
              <p className="mt-1 text-xs text-zinc-500">
                Reach bilingual professionals, tradespeople, and students across Queensland.
              </p>

              <form onSubmit={handlePostJob} className="mt-6 space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2nd Year Apprentice Electrician"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Business / Company *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Toros Electrical"
                      value={newJob.company}
                      onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Suburb *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. South Bank, QLD"
                      value={newJob.suburb}
                      onChange={(e) => setNewJob({ ...newJob, suburb: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Industry Sector *
                    </label>
                    <select
                      value={newJob.category}
                      onChange={(e) =>
                        setNewJob({ ...newJob, category: e.target.value as any })
                      }
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    >
                      {CATEGORIES.filter((c) => c !== "All").map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Employment Type *
                    </label>
                    <select
                      value={newJob.employmentType}
                      onChange={(e) =>
                        setNewJob({ ...newJob, employmentType: e.target.value as any })
                      }
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    >
                      {EMPLOYMENT_TYPES.filter((t) => t !== "All").map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Pay Rate / Wage (AUD) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. $34 - $38/hr + Super (or $80,000/yr)"
                    value={newJob.payRate}
                    onChange={(e) => setNewJob({ ...newJob, payRate: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Visa Flexibility *
                  </label>
                  <select
                    value={newJob.visaFriendly}
                    onChange={(e) =>
                      setNewJob({ ...newJob, visaFriendly: e.target.value as any })
                    }
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Permanent / Full Working Rights">
                      Permanent / Full Working Rights
                    </option>
                    <option value="Student Visa Friendly (24h/wk)">
                      Student Visa Friendly (24h/wk)
                    </option>
                    <option value="TSS 482 Visa Sponsorship Potential">
                      TSS 482 Visa Sponsorship Potential
                    </option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Role Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe daily responsibilities, hours, and team culture..."
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Requirements (one per line)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="White Card&#10;Own reliable transport&#10;Bilingual Turkish/English"
                    value={newJob.requirements}
                    onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      placeholder="jobs@company.com.au"
                      value={newJob.contactEmail}
                      onChange={(e) => setNewJob({ ...newJob, contactEmail: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2 text-xs dark:border-zinc-700 dark:bg-zinc-800"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      WhatsApp / Mobile
                    </label>
                    <input
                      type="text"
                      placeholder="+61 400 000 000"
                      value={newJob.contactWhatsApp}
                      onChange={(e) => setNewJob({ ...newJob, contactWhatsApp: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2 text-xs dark:border-zinc-700 dark:bg-zinc-800"
                    />
                  </div>
                </div>

                {/* Fair Work Declaration */}
                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3 border border-zinc-200 dark:border-zinc-700 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="fairwork"
                    required
                    checked={newJob.isFairWorkCompliant}
                    onChange={(e) =>
                      setNewJob({ ...newJob, isFairWorkCompliant: e.target.checked })
                    }
                    className="mt-0.5 rounded border-zinc-300 text-[#E30A17] focus:ring-[#E30A17]"
                  />
                  <label htmlFor="fairwork" className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      Fair Work Compliance Guarantee:
                    </strong>{" "}
                    I certify that this vacancy meets or exceeds relevant Modern Award rates and Australian workplace statutory entitlements.
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="turkish"
                  size="lg"
                  className="w-full gap-2 mt-4"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? "Publishing..." : "Publish Job Vacancy (Free)"}</span>
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: JOIN TALENT POOL */}
        {isJoinTalentOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in">
            <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
              <button
                type="button"
                onClick={() => setJoinTalentOpen(false)}
                className="absolute right-4 top-4 rounded-xl p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
                <Users className="h-4 w-4" />
                <span>Jobseeker Talent Registry</span>
              </div>
              <h2 className="mt-1 text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
                Register with the Talent Pool
              </h2>
              <p className="mt-1 text-xs text-zinc-500">
                Showcase your skills to Turkish businesses and Australian recruiters across Queensland.
              </p>

              <form onSubmit={handleJoinTalent} className="mt-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Full Name or Initial *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Emre K."
                      value={newCandidate.name}
                      onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Target Role / Specialty *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Civil Engineer / Tiler"
                      value={newCandidate.targetRole}
                      onChange={(e) =>
                        setNewCandidate({ ...newCandidate, targetRole: e.target.value })
                      }
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Industry Category *
                    </label>
                    <select
                      value={newCandidate.category}
                      onChange={(e) =>
                        setNewCandidate({ ...newCandidate, category: e.target.value as any })
                      }
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    >
                      {CATEGORIES.filter((c) => c !== "All").map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Availability *
                    </label>
                    <select
                      value={newCandidate.availability}
                      onChange={(e) =>
                        setNewCandidate({ ...newCandidate, availability: e.target.value as any })
                      }
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    >
                      <option value="Immediate - Full Time">Immediate - Full Time</option>
                      <option value="Part Time (Student 24h/wk)">Part Time (Student 24h/wk)</option>
                      <option value="Weekends & Casual">Weekends & Casual</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Qualifications & Australian Licenses *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. White Card, RSA, B.Eng, QBCC Licence"
                    value={newCandidate.licenses}
                    onChange={(e) =>
                      setNewCandidate({ ...newCandidate, licenses: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Core Skills (comma separated) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AutoCAD, Concrete QA, Latte Art, React, Xero"
                    value={newCandidate.skills}
                    onChange={(e) => setNewCandidate({ ...newCandidate, skills: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Languages *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Turkish (Native), English (IELTS 7.5)"
                      value={newCandidate.languages}
                      onChange={(e) =>
                        setNewCandidate({ ...newCandidate, languages: e.target.value })
                      }
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2 text-xs dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Location / Suburb *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. South Bank / Brisbane"
                      value={newCandidate.suburb}
                      onChange={(e) =>
                        setNewCandidate({ ...newCandidate, suburb: e.target.value })
                      }
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2 text-xs dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Candidate Bio / Summary *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Share your background, recent projects, and what kind of role you are seeking..."
                    value={newCandidate.bio}
                    onChange={(e) => setNewCandidate({ ...newCandidate, bio: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Contact Channel (Visible to employers) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. WhatsApp: +61 400 111 222 or Email: name@gmail.com"
                    value={newCandidate.contactChannel}
                    onChange={(e) =>
                      setNewCandidate({ ...newCandidate, contactChannel: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="turkish"
                  size="lg"
                  className="w-full gap-2 mt-4"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? "Submitting..." : "Register with Talent Pool"}</span>
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
