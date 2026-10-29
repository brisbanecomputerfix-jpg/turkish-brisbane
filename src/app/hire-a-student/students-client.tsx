"use client";

import * as React from "react";
import Link from "next/link";
import {
  GraduationCap,
  ShieldCheck,
  HeartHandshake,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  Filter,
  MessageCircle,
  Mail,
  Car,
  Wrench,
  Baby,
  Sparkles,
  Laptop,
  BookOpen,
  DollarSign,
  X,
  FileText,
  UserCheck,
} from "lucide-react";
import {
  StudentProfile,
  StudentTaskRequest,
  STUDENT_CATEGORIES,
} from "@/data/students-data";
import { Button } from "@/components/ui/button";

interface StudentsClientProps {
  initialStudents: StudentProfile[];
  initialTasks: StudentTaskRequest[];
}

export function StudentsClient({
  initialStudents,
  initialTasks,
}: StudentsClientProps) {
  const [students, setStudents] = React.useState<StudentProfile[]>(initialStudents);
  const [tasks, setTasks] = React.useState<StudentTaskRequest[]>(initialTasks);
  const [activeTab, setActiveTab] = React.useState<"students" | "tasks">("students");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All Services");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // Modals state
  const [registerStudentModalOpen, setRegisterStudentModalOpen] = React.useState(false);
  const [postTaskModalOpen, setPostTaskModalOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Form states
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [studentForm, setStudentForm] = React.useState({
    name: "",
    university: "UQ (University of Queensland)" as StudentProfile["university"],
    degree: "",
    suburb: "",
    categories: ["Babysitting & Childcare"] as StudentProfile["categories"],
    hourlyRate: "$30 - $35/hr",
    bio: "",
    skills: "",
    hasBlueCard: false,
    hasWhiteCard: false,
    hasDriversLicence: false,
    availability: "Flexible weekdays & weekends",
    contactWhatsApp: "",
    contactEmail: "",
  });

  const [taskForm, setTaskForm] = React.useState({
    title: "",
    category: "Babysitting & Childcare" as StudentTaskRequest["category"],
    suburb: "",
    payOffer: "$35 / hr",
    dateOrFrequency: "",
    description: "",
    postedBy: "",
    contactChannel: "",
  });

  // Filter students
  const filteredStudents = React.useMemo(() => {
    return students.filter((s) => {
      const matchesCat =
        selectedCategory === "All Services" ||
        s.categories.some((c) => c.toLowerCase() === selectedCategory.toLowerCase());
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.degree.toLowerCase().includes(q) ||
        s.suburb.toLowerCase().includes(q) ||
        s.bio.toLowerCase().includes(q) ||
        s.skills.some((sk) => sk.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [students, selectedCategory, searchQuery]);

  // Filter tasks
  const filteredTasks = React.useMemo(() => {
    return tasks.filter((t) => {
      const matchesCat =
        selectedCategory === "All Services" ||
        t.category.toLowerCase() === selectedCategory.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.suburb.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [tasks, selectedCategory, searchQuery]);

  // Handle Register Student
  const handleRegisterStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.degree || !studentForm.contactWhatsApp) {
      alert("Please fill in your name, degree, and WhatsApp number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const skillsArray = studentForm.skills
        ? studentForm.skills.split("\n").filter(Boolean)
        : ["Bilingual Turkish & English", "Punctual & trustworthy"];

      const newStudent: StudentProfile = {
        id: `student-${Date.now()}`,
        name: studentForm.name,
        university: studentForm.university,
        degree: studentForm.degree,
        suburb: studentForm.suburb || "Brisbane",
        categories: studentForm.categories,
        hourlyRate: studentForm.hourlyRate || "$30 - $35/hr",
        bio: studentForm.bio || "Hardworking Turkish student in Queensland.",
        skills: skillsArray,
        languages: ["Turkish (Native)", "English"],
        hasBlueCard: studentForm.hasBlueCard,
        hasWhiteCard: studentForm.hasWhiteCard,
        hasDriversLicence: studentForm.hasDriversLicence,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        availability: studentForm.availability,
        contactWhatsApp: studentForm.contactWhatsApp,
        contactEmail: studentForm.contactEmail || undefined,
        verifiedStudent: true,
      };

      await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register_student",
          studentData: newStudent,
        }),
      });

      setStudents((prev) => [newStudent, ...prev]);
      setRegisterStudentModalOpen(false);
      setToastMessage("Harika! Your student profile has been submitted and published.");
      setTimeout(() => setToastMessage(null), 5000);
    } catch (err) {
      console.error(err);
      alert("Could not register student profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Post Task
  const handlePostTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.title || !taskForm.payOffer || !taskForm.contactChannel) {
      alert("Please provide the task title, pay offer, and contact details.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newTask: StudentTaskRequest = {
        id: `task-${Date.now()}`,
        title: taskForm.title,
        category: taskForm.category,
        suburb: taskForm.suburb || "Brisbane",
        payOffer: taskForm.payOffer,
        dateOrFrequency: taskForm.dateOrFrequency || "Flexible",
        description: taskForm.description || "Community task for a Turkish student.",
        postedBy: taskForm.postedBy || "Community Member",
        contactChannel: taskForm.contactChannel,
        postedAt: new Date().toISOString().split("T")[0],
      };

      await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "post_task",
          taskData: newTask,
        }),
      });

      setTasks((prev) => [newTask, ...prev]);
      setPostTaskModalOpen(false);
      setActiveTab("tasks");
      setToastMessage("Your task request has been published for students!");
      setTimeout(() => setToastMessage(null), 5000);
    } catch (err) {
      console.error(err);
      alert("Could not post task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 pb-20">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-900 shadow-xl dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header with Mission & Narrative */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-red-50/50 via-white to-zinc-50/60 py-12 dark:border-zinc-800 dark:from-red-950/20 dark:via-zinc-950 dark:to-zinc-950 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(#E30A17_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-3xl space-y-3.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50/90 px-3 py-1 text-xs font-semibold text-[#E30A17] dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                <GraduationCap className="h-3.5 w-3.5 text-[#E30A17]" />
                <span>Queensland Turkish Student Solidarity & Opportunity Initiative</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
                Hire A Turkish Student:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30A17] via-red-600 to-cyan-600 dark:to-cyan-400">
                  Dignity, Skill & Community Support
                </span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Many talented Turkish international students in Queensland face extreme living costs and are forced into perilous midnight food delivery and gig courier shifts. By hiring them directly for babysitting, home cleaning, handyman repairs, IT troubleshooting, and tutoring, our community provides dignified, fair-paying work while benefiting from trusted bilingual talent.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap sm:flex-col gap-3 shrink-0">
              <Button
                onClick={() => setPostTaskModalOpen(true)}
                variant="turkish"
                className="gap-2 text-xs font-semibold shadow-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Post a Job / Task for Students</span>
              </Button>

              <Button
                onClick={() => setRegisterStudentModalOpen(true)}
                variant="outline"
                className="gap-2 text-xs font-medium border-zinc-300 bg-white dark:bg-zinc-900 dark:border-zinc-700 hover:border-[#E30A17]"
              >
                <GraduationCap className="h-4 w-4 text-[#E30A17]" />
                <span>I Am a Turkish Student (Register)</span>
              </Button>
            </div>
          </div>

          {/* Pillars Bar: Fair Pay & Safety */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white p-3.5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                <DollarSign className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  $30 – $45/hr Fair Wage
                </div>
                <div className="text-[11px] text-zinc-500">
                  No below-award cash-in-hand exploitation. Fair pay for honest, quality work.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white p-3.5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Blue Card & White Card
                </div>
                <div className="text-[11px] text-zinc-500">
                  Verified Queensland Working with Children Checks for trusted babysitting & tutoring.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white p-3.5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                <HeartHandshake className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Turkish Language Immersion
                </div>
                <div className="text-[11px] text-zinc-500">
                  Babysitters and tutors help children speak, read, and maintain native Turkish.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white p-3.5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#E30A17] dark:bg-red-950/60 dark:text-red-300">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  48-Hr Visa Compliant
                </div>
                <div className="text-[11px] text-zinc-500">
                  All hours strictly respect Department of Home Affairs student visa limitations.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Registry & Tasks Workspace */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("students")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "students"
                  ? "bg-[#E30A17] text-white shadow-xs"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800"
              }`}
            >
              <UserCheck className="h-4 w-4" />
              <span>Available Students ({students.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("tasks")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "tasks"
                  ? "bg-[#E30A17] text-white shadow-xs"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Open Student Tasks ({tasks.length})</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill, degree, suburb..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 bg-white shadow-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>

        {/* Category Chips Bar */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="h-3.5 w-3.5 text-zinc-400 shrink-0 ml-1 mr-1" />
          {STUDENT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs font-semibold"
                    : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* TAB 1: Available Students Registry */}
        {activeTab === "students" && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStudents.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-800">
                <GraduationCap className="mx-auto h-8 w-8 text-zinc-400" />
                <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  No student profiles found
                </h3>
                <p className="mt-1 text-xs text-zinc-500">
                  Try switching category filters or clearing your search.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 text-xs"
                  onClick={() => {
                    setSelectedCategory("All Services");
                    setSearchQuery("");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs hover:shadow-md hover:border-red-200 transition-all dark:border-zinc-800/80 dark:bg-zinc-900"
                >
                  <div>
                    {/* Header: Avatar, Name & Degree */}
                    <div className="flex items-start gap-3.5">
                      <div className="relative">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="h-13 w-13 rounded-full object-cover ring-2 ring-zinc-100 dark:ring-zinc-800 group-hover:ring-red-200 transition-all"
                        />
                        {student.verifiedStudent && (
                          <div
                            className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#E30A17] text-white shadow-xs"
                            title="Verified Queensland University Student"
                          >
                            <CheckCircle2 className="h-3 w-3" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                            {student.name}
                          </h3>
                          <span className="shrink-0 text-xs font-bold text-[#E30A17]">
                            {student.hourlyRate}
                          </span>
                        </div>
                        <div className="text-[11px] font-medium text-cyan-700 dark:text-cyan-400 truncate">
                          {student.university}
                        </div>
                        <div className="text-[11px] text-zinc-500 truncate">
                          {student.degree}
                        </div>
                      </div>
                    </div>

                    {/* Suburb & Availability */}
                    <div className="mt-3.5 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
                      <span className="flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300">
                        <MapPin className="h-3 w-3 text-red-500" />
                        <span>{student.suburb}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-zinc-500">
                        <Clock className="h-3 w-3 text-zinc-400" />
                        <span>{student.availability}</span>
                      </span>
                    </div>

                    {/* Credentials Pills: Blue Card, White Card, Licence */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {student.hasBlueCard && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                          <ShieldCheck className="h-3 w-3" />
                          <span>Blue Card (Childcare)</span>
                        </span>
                      )}
                      {student.hasWhiteCard && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                          <Wrench className="h-3 w-3" />
                          <span>White Card (Safety)</span>
                        </span>
                      )}
                      {student.hasDriversLicence && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                          <Car className="h-3 w-3" />
                          <span>Driver&apos;s Licence</span>
                        </span>
                      )}
                    </div>

                    {/* Bio */}
                    <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                      {student.bio}
                    </p>

                    {/* Skills Checklist */}
                    <div className="mt-3 space-y-1">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        Top Skills & Tasks
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {student.skills.slice(0, 3).map((sk, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions / Direct Contact */}
                  <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-zinc-400">Direct Contact</span>
                    <div className="flex items-center gap-2">
                      {student.contactWhatsApp && (
                        <a
                          href={`https://wa.me/${student.contactWhatsApp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `Merhaba ${student.name}! I found your profile on QLD Turks (Hire a Turkish Student) and would like to discuss a community task.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 transition-colors"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                      {student.contactEmail && (
                        <a
                          href={`mailto:${student.contactEmail}?subject=${encodeURIComponent(
                            `QLD Turks: Task Inquiry for ${student.name}`
                          )}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 transition-colors"
                        >
                          <Mail className="h-3.5 w-3.5 text-zinc-400" />
                          <span>Email</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: Open Student Tasks Board */}
        {activeTab === "tasks" && (
          <div className="mt-6 space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-800">
                <FileText className="mx-auto h-8 w-8 text-zinc-400" />
                <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  No open tasks found in this category
                </h3>
                <p className="mt-1 text-xs text-zinc-500">
                  Be the first to post a community job or task for our Turkish students!
                </p>
                <Button
                  onClick={() => setPostTaskModalOpen(true)}
                  variant="turkish"
                  size="sm"
                  className="mt-4 text-xs font-semibold"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  <span>Post A Task</span>
                </Button>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs hover:border-red-200 transition-all dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-[10px] font-bold text-[#E30A17] dark:bg-red-950/60 dark:text-red-300">
                          {task.category}
                        </span>
                        <span className="text-xs font-medium text-zinc-400">•</span>
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <MapPin className="h-3 w-3 text-red-400" />
                          <span>{task.suburb}</span>
                        </span>
                        <span className="text-xs font-medium text-zinc-400">•</span>
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <Clock className="h-3 w-3 text-zinc-400" />
                          <span>{task.dateOrFrequency}</span>
                        </span>
                      </div>

                      <h3 className="mt-2 text-base font-bold text-zinc-900 dark:text-white">
                        {task.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                        {task.description}
                      </p>
                      <div className="mt-2 text-[11px] text-zinc-400">
                        Posted by <span className="font-semibold text-zinc-700 dark:text-zinc-300">{task.postedBy}</span> on {task.postedAt}
                      </div>
                    </div>

                    <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800">
                      <div className="text-sm font-extrabold text-[#E30A17]">
                        {task.payOffer}
                      </div>
                      <a
                        href={
                          task.contactChannel.startsWith("WhatsApp:")
                            ? `https://wa.me/${task.contactChannel.replace(/[^0-9]/g, "")}`
                            : `mailto:${task.contactChannel}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#E30A17] px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-red-700 transition-colors"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Apply / Inquire</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Why Support Turkish Students Banner */}
        <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E30A17]">
              <HeartHandshake className="h-4 w-4" />
              <span>Community Impact & Ethical Employment Manifesto</span>
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Why We Are Ending The Food Delivery Trap for Turkish Students
            </h2>
            <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                International Turkish students in Queensland are among our community&apos;s brightest assets—studying advanced engineering, nursing, computer science, and business at top Australian universities. Yet without local networks, many are forced into midnight food delivery and rideshare gigs that offer below-minimum effective hourly rates after vehicle fuel, registration, and risk.
              </p>
              <p>
                By connecting these students with Turkish and Australian families for babysitting, homework tutoring, home cleaning, moving, and tech repairs, everyone wins: families gain trustworthy, high-caliber helpers who understand our culture and language, and students earn respectable, safe living wages to focus on their degrees.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Zero Commission Platform (100% Goes to Student)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Fair Work Award Aligned</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Working With Children (Blue Card) Verified</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Register as a Turkish Student */}
      {registerStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-fade-in"
            onClick={() => setRegisterStudentModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#E30A17] dark:bg-red-950/50">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    Register as a Student
                  </h3>
                  <div className="text-[11px] text-zinc-500">Free community listing for Queensland students</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRegisterStudentModalOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterStudent} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Full Name <span className="text-[#E30A17]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Caner Yılmaz"
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    University / College <span className="text-[#E30A17]">*</span>
                  </label>
                  <select
                    value={studentForm.university}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        university: e.target.value as StudentProfile["university"],
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  >
                    <option value="UQ (University of Queensland)">UQ</option>
                    <option value="QUT (Queensland University of Technology)">QUT</option>
                    <option value="Griffith University">Griffith University</option>
                    <option value="Torrens University">Torrens University</option>
                    <option value="TAFE Queensland">TAFE Queensland</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Degree / Course <span className="text-[#E30A17]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master of IT, Nursing Year 2"
                    value={studentForm.degree}
                    onChange={(e) => setStudentForm({ ...studentForm, degree: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Suburb / Location <span className="text-[#E30A17]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. St Lucia, West End, South Bank"
                    value={studentForm.suburb}
                    onChange={(e) => setStudentForm({ ...studentForm, suburb: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Expected Hourly Rate
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $30 - $35/hr"
                    value={studentForm.hourlyRate}
                    onChange={(e) => setStudentForm({ ...studentForm, hourlyRate: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Short Bio / Introduction
                </label>
                <textarea
                  rows={3}
                  placeholder="Share a little about yourself, your background, experience with children, tools, or tutoring."
                  value={studentForm.bio}
                  onChange={(e) => setStudentForm({ ...studentForm, bio: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Top Skills (One per line)
                </label>
                <textarea
                  rows={2}
                  placeholder="Toddler care & homework help&#10;Flatpack furniture assembly&#10;Mac/PC troubleshooting"
                  value={studentForm.skills}
                  onChange={(e) => setStudentForm({ ...studentForm, skills: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              {/* Checkboxes: Blue Card, White Card, Driver Licence */}
              <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                <div className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                  Queensland Credentials (boosts profile trust)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={studentForm.hasBlueCard}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, hasBlueCard: e.target.checked })
                      }
                      className="rounded border-zinc-300 text-[#E30A17] focus:ring-[#E30A17]"
                    />
                    <span>Blue Card (Childcare)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={studentForm.hasWhiteCard}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, hasWhiteCard: e.target.checked })
                      }
                      className="rounded border-zinc-300 text-[#E30A17] focus:ring-[#E30A17]"
                    />
                    <span>White Card (Trades)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={studentForm.hasDriversLicence}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, hasDriversLicence: e.target.checked })
                      }
                      className="rounded border-zinc-300 text-[#E30A17] focus:ring-[#E30A17]"
                    />
                    <span>Driver&apos;s Licence</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    WhatsApp Number <span className="text-[#E30A17]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+61 400 123 456"
                    value={studentForm.contactWhatsApp}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, contactWhatsApp: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Student Email
                  </label>
                  <input
                    type="email"
                    placeholder="student@uq.edu.au"
                    value={studentForm.contactEmail}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, contactEmail: e.target.value })
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
                  onClick={() => setRegisterStudentModalOpen(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="turkish"
                  size="sm"
                  disabled={isSubmitting}
                  className="text-xs font-semibold"
                >
                  {isSubmitting ? "Submitting..." : "Publish Student Profile"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Post a Task for Students */}
      {postTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-fade-in"
            onClick={() => setPostTaskModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#E30A17] dark:bg-red-950/50">
                  <Plus className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    Post a Task for Turkish Students
                  </h3>
                  <div className="text-[11px] text-zinc-500">Hire trusted bilingual help across Queensland</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPostTaskModalOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handlePostTask} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Task Title <span className="text-[#E30A17]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Babysitter needed for 2 kids this Saturday"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Category <span className="text-[#E30A17]">*</span>
                  </label>
                  <select
                    value={taskForm.category}
                    onChange={(e) =>
                      setTaskForm({
                        ...taskForm,
                        category: e.target.value as StudentTaskRequest["category"],
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  >
                    <option value="Babysitting & Childcare">Babysitting & Childcare</option>
                    <option value="Cleaning & Moving">Cleaning & Moving</option>
                    <option value="Handyman & Yard Care">Handyman & Yard Care</option>
                    <option value="Tech & Computer Repairs">Tech & Computer Repairs</option>
                    <option value="Tutoring & Academic">Tutoring & Academic</option>
                    <option value="Hospitality & Events">Hospitality & Events</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Suburb / Location <span className="text-[#E30A17]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. West End, Carindale"
                    value={taskForm.suburb}
                    onChange={(e) => setTaskForm({ ...taskForm, suburb: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Pay Offer <span className="text-[#E30A17]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. $35 / hr or $180 flat"
                    value={taskForm.payOffer}
                    onChange={(e) => setTaskForm({ ...taskForm, payOffer: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Date or Schedule
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Saturday 2 Nov, 1pm-5pm"
                    value={taskForm.dateOrFrequency}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, dateOrFrequency: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Task Details & Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the task clearly (e.g. 2 children ages 4 and 7, playing games, speaking Turkish, reading books)."
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Your Name / Family
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Deniz B."
                    value={taskForm.postedBy}
                    onChange={(e) => setTaskForm({ ...taskForm, postedBy: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Contact Channel <span className="text-[#E30A17]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="WhatsApp: +61 411 222 333"
                    value={taskForm.contactChannel}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, contactChannel: e.target.value })
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
                  onClick={() => setPostTaskModalOpen(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="turkish"
                  size="sm"
                  disabled={isSubmitting}
                  className="text-xs font-semibold"
                >
                  {isSubmitting ? "Publishing..." : "Post Task for Students"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
