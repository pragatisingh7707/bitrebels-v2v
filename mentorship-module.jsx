import React, { useState, useMemo } from "react";
import {
  Search, Calendar, Clock, MessageSquare, CheckCircle2, XCircle, RefreshCw,
  User, BarChart3, History, Inbox, Star, Briefcase, GraduationCap,
  X, ClipboardList, CalendarCheck, CalendarClock, Building2,
  ArrowRight, Sparkles
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

/* ---------------------------------------------------------------------- */
/*  MOCK DATA                                                              */
/* ---------------------------------------------------------------------- */

const NOW = new Date("2026-07-10T00:00:00");
const STUDENT_NAME = "Aditi Sharma";

const MENTORS = [
  { id: "m1", name: "Rohan Kapoor", title: "Senior Software Engineer", company: "Meridian Systems", field: "Software Engineering", experience: "8 yrs", rating: 4.9, sessions: 42, initials: "RK", bio: "Backend systems, distributed infra, and interview prep for SDE roles." },
  { id: "m2", name: "Priya Nair", title: "Product Manager", company: "Solstice Health", field: "Product Management", experience: "6 yrs", rating: 4.8, sessions: 31, initials: "PN", bio: "0-to-1 product building, PM interviews, and career transitions into product." },
  { id: "m3", name: "Arjun Mehta", title: "Data Scientist", company: "Northfield Analytics", field: "Data Science", experience: "5 yrs", rating: 4.7, sessions: 24, initials: "AM", bio: "ML fundamentals, portfolio projects, and breaking into data science." },
  { id: "m4", name: "Sneha Iyer", title: "Investment Analyst", company: "Cedarwood Capital", field: "Finance", experience: "7 yrs", rating: 4.9, sessions: 38, initials: "SI", bio: "Financial modelling, IB recruiting, and CFA guidance." },
  { id: "m5", name: "Karan Bhatia", title: "Lead Product Designer", company: "Fernwood Studio", field: "Design", experience: "6 yrs", rating: 4.6, sessions: 19, initials: "KB", bio: "Portfolio reviews, design systems, and UX case study feedback." },
  { id: "m6", name: "Meera Rao", title: "Growth Marketing Lead", company: "Lumen Brands", field: "Marketing", experience: "9 yrs", rating: 4.8, sessions: 27, initials: "MR", bio: "Brand strategy, growth loops, and marketing career pivots." },
];

const initialRequests = [
  { id: "r1", mentorId: "m1", studentName: STUDENT_NAME, purpose: "Interview Prep", meetingTime: "2026-06-18T11:00", duration: 45, message: "Would love mock system-design rounds before my interviews next month.", status: "accepted", createdAt: "2026-06-10T09:00" },
  { id: "r2", mentorId: "m1", studentName: STUDENT_NAME, purpose: "Career Guidance", meetingTime: "2026-07-22T16:00", duration: 30, message: "Trying to decide between two backend offers — could use your perspective.", status: "accepted", createdAt: "2026-07-01T09:00" },
  { id: "r3", mentorId: "m2", studentName: STUDENT_NAME, purpose: "Resume Review", meetingTime: "2026-06-25T14:00", duration: 30, message: "Could you review my resume before I apply to PM roles?", status: "accepted", createdAt: "2026-06-20T09:00" },
  { id: "r4", mentorId: "m3", studentName: STUDENT_NAME, purpose: "Skill Development", meetingTime: "2026-07-28T10:00", duration: 60, message: "Want to build a roadmap for learning applied ML over the next 6 months.", status: "pending", createdAt: "2026-07-08T09:00" },
  { id: "r5", mentorId: "m4", studentName: STUDENT_NAME, purpose: "Higher Studies Guidance", meetingTime: "2026-06-05T15:00", duration: 45, message: "Considering an MBA — would appreciate your take on timing.", status: "rejected", createdAt: "2026-05-28T09:00" },
  { id: "r6", mentorId: "m1", studentName: "Vikram Sethi", purpose: "Networking", meetingTime: "2026-07-15T13:00", duration: 30, message: "Would like an intro to your team's hiring manager.", status: "pending", createdAt: "2026-07-05T09:00" },
  { id: "r7", mentorId: "m1", studentName: "Ishita Roy", purpose: "Interview Prep", meetingTime: "2026-06-01T10:00", duration: 45, message: "Mock behavioural round ahead of my onsite.", status: "accepted", createdAt: "2026-05-20T09:00" },
  { id: "r8", mentorId: "m1", studentName: "Dev Anand", purpose: "Career Guidance", meetingTime: "2026-07-14T12:00", duration: 30, message: "Weighing a move from support engineering into SDE.", status: "rescheduled", rescheduledTime: "2026-07-21T12:00", createdAt: "2026-07-02T09:00" },
  { id: "r9", mentorId: "m1", studentName: "Naina Kulkarni", purpose: "Skill Development", meetingTime: "2026-05-10T09:00", duration: 60, message: "Deep dive on distributed caching strategies.", status: "accepted", createdAt: "2026-05-01T09:00" },
  { id: "r10", mentorId: "m1", studentName: "Farhan Ali", purpose: "Resume Review", meetingTime: "2026-06-28T17:00", duration: 30, message: "", status: "rejected", createdAt: "2026-06-20T09:00" },
];

const PURPOSES = ["Career Guidance", "Resume Review", "Interview Prep", "Skill Development", "Networking", "Higher Studies Guidance", "Other"];
const DURATIONS = [30, 45, 60, 90];

/* ---------------------------------------------------------------------- */
/*  HELPERS                                                                */
/* ---------------------------------------------------------------------- */

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}
function mentorById(id) { return MENTORS.find((m) => m.id === id); }

/* ---------------------------------------------------------------------- */
/*  REUSABLE PRIMITIVES                                                    */
/* ---------------------------------------------------------------------- */

function Button({ children, onClick, variant = "primary", icon: Icon, className = "", type = "button", disabled }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`mm-btn mm-btn-${variant} ${className}`}
    >
      {Icon && <Icon size={15} strokeWidth={2.2} />}
      {children}
    </button>
  );
}

function Card({ children, className = "", onClick }) {
  // Make clickable card keyboard-accessible when an onClick is provided
  if (onClick) {
    // Use a native button element for better accessibility instead of a div with role="button"
    return (
      <button type="button" className={`mm-card ${className}`} onClick={onClick}>
        {children}
      </button>
    );
  }
  return <div className={`mm-card ${className}`}>{children}</div>;
}

const STATUS_CONFIG = {
  pending: { label: "Pending", varColor: "var(--warning)", varSoft: "var(--warning-soft)" },
  accepted: { label: "Accepted", varColor: "var(--success)", varSoft: "var(--success-soft)" },
  rejected: { label: "Rejected", varColor: "var(--danger)", varSoft: "var(--danger-soft)" },
  rescheduled: { label: "Reschedule Proposed", varColor: "var(--accent)", varSoft: "var(--accent-soft)" },
  completed: { label: "Completed", varColor: "var(--success)", varSoft: "var(--success-soft)" },
};

function StatusStamp({ status }) {
  const c = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span className="mm-stamp mm-mono" style={{ borderColor: c.varColor, color: c.varColor, background: c.varSoft }}>
      {c.label}
    </span>
  );
}

function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <div className="mm-empty">
      <Icon size={26} strokeWidth={1.5} />
      <p className="mm-empty-title">{title}</p>
      {subtitle && <p className="mm-empty-sub">{subtitle}</p>}
    </div>
  );
}

function Modal({ title, onClose, children, width = 480 }) {
  return (
      <dialog className="mm-modal-overlay" onCancel={onClose} onClick={(e) => e.target === e.currentTarget && onClose()} open>
      <div className="mm-modal mm-card" style={{ maxWidth: width }} onClick={(e) => e.stopPropagation()}>
        <div className="mm-modal-head">
          <h3 className="mm-display">{title}</h3>
          <button className="mm-modal-btn" onClick={onClose}><X size={18} /></button>
        </div>
        {children}
      </div>
    </dialog>
  );
}

function Avatar({ initials, size = 44 }) {
  return (
    <div className="mm-avatar" style={{ width: size, height: size, fontSize: size * 0.36 }}>
      {initials}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="mm-field">
      <span className="mm-field-label">{label}</span>
      {children}
    </label>
  );
}

function Tabs({ items, active, onChange }) {
  return (
    <div className="mm-tabs">
      {items.map((it) => (
        <button
          key={it.key}
          className={`mm-tab ${active === it.key ? "mm-tab-active" : ""}`}
          onClick={() => onChange(it.key)}
        >
          <it.icon size={15} strokeWidth={2.2} />
          {it.label}
          {it.count !== undefined && it.count > 0 && <span className="mm-tab-count">{it.count}</span>}
        </button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  STUDENT SIDE — Browse Mentors                                          */
/* ---------------------------------------------------------------------- */

function MentorCard({ mentor, onRequest }) {
  return (
    <Card className="mm-mentor-card">
      <div className="mm-mentor-top">
        <Avatar initials={mentor.initials} />
        <div>
          <p className="mm-mentor-name mm-display">{mentor.name}</p>
          <p className="mm-mentor-title">{mentor.title}</p>
          <p className="mm-mentor-company"><Building2 size={12} /> {mentor.company}</p>
        </div>
      </div>
      <p className="mm-mentor-bio">{mentor.bio}</p>
      <div className="mm-mentor-meta">
        <span className="mm-chip">{mentor.field}</span>
        <span className="mm-meta-item"><Star size={12} fill="var(--accent)" stroke="none" /> {mentor.rating}</span>
        <span className="mm-meta-item">{mentor.sessions} sessions</span>
      </div>
      <Button variant="primary" icon={ArrowRight} className="mm-w-full" onClick={() => onRequest(mentor)}>
        Request mentorship
      </Button>
    </Card>
  );
}

function BrowseMentors({ onRequest }) {
  const [query, setQuery] = useState("");
  const [field, setField] = useState("All");
  const fields = ["All", ...new Set(MENTORS.map((m) => m.field))];

  const filtered = MENTORS.filter((m) => {
    const matchesQuery = (m.name + m.title + m.company).toLowerCase().includes(query.toLowerCase());
    const matchesField = field === "All" || m.field === field;
    return matchesQuery && matchesField;
  });

  return (
    <div>
      <div className="mm-browse-controls">
        <div className="mm-search">
          <Search size={16} />
          <input placeholder="Search mentors by name, title or company" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <select className="mm-select" value={field} onChange={(e) => setField(e.target.value)}>
          {fields.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      {filtered.length === 0 ? (
        <EmptyState icon={Search} title="No mentors match your search" subtitle="Try a different name, field or company." />
      ) : (
        <div className="mm-mentor-grid">
          {filtered.map((m) => <MentorCard key={m.id} mentor={m} onRequest={onRequest} />)}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  STUDENT SIDE — Request Mentor Modal                                    */
/* ---------------------------------------------------------------------- */

function RequestMentorModal({ mentor, onClose, onSubmit }) {
  const [purpose, setPurpose] = useState(PURPOSES[0]);
  const [date, setDate] = useState("2026-07-20");
  const [time, setTime] = useState("15:00");
  const [duration, setDuration] = useState(30);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      mentorId: mentor.id,
      purpose,
      meetingTime: `${date}T${time}`,
      duration: Number(duration),
      message,
    });
  }

  return (
    <Modal title={`Request ${mentor.name}`} onClose={onClose} width={520}>
      <p className="mm-modal-sub">{mentor.title} · {mentor.company}</p>
      <form onSubmit={handleSubmit} className="mm-form">
        <Field label="Purpose">
          <select className="mm-select mm-w-full" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
            {PURPOSES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </Field>
        <div className="mm-form-row">
          <Field label="Meeting date">
            <input type="date" className="mm-input" value={date} onChange={(e) => setDate(e.target.value)} required />
          </Field>
          <Field label="Meeting time">
            <input type="time" className="mm-input" value={time} onChange={(e) => setTime(e.target.value)} required />
          </Field>
        </div>
        <Field label="Duration">
          <select className="mm-select mm-w-full" value={duration} onChange={(e) => setDuration(e.target.value)}>
            {DURATIONS.map((d) => <option key={d} value={d}>{d} minutes</option>)}
          </select>
        </Field>
        <Field label="Message to mentor">
          <textarea
            className="mm-textarea"
            rows={4}
            placeholder="Briefly share what you'd like help with..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Field>
        <div className="mm-modal-actions">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" icon={ClipboardList}>Send request</Button>
        </div>
      </form>
    </Modal>
  );
}

/* ---------------------------------------------------------------------- */
/*  STUDENT SIDE — Track Status                                            */
/* ---------------------------------------------------------------------- */

function RequestRow({ req, showMentor = true, onConfirmReschedule, onDeclineReschedule }) {
  const mentor = mentorById(req.mentorId);
  return (
    <Card className="mm-request-row">
      <div className="mm-request-main">
        {showMentor && <Avatar initials={mentor.initials} size={38} />}
        <div className="mm-request-body">
          <div className="mm-request-head">
            <p className="mm-request-title">{req.purpose}{showMentor && <> · <span className="mm-text-muted">{mentor.name}</span></>}</p>
            <StatusStamp status={req.status} />
          </div>
          <div className="mm-request-meta">
            <span><Calendar size={12} /> {fmtDate(req.status === "rescheduled" ? req.rescheduledTime : req.meetingTime)}</span>
            <span><Clock size={12} /> {fmtTime(req.status === "rescheduled" ? req.rescheduledTime : req.meetingTime)}</span>
            <span><Clock size={12} /> {req.duration} min</span>
          </div>
          {req.message && <p className="mm-request-message"><MessageSquare size={12} /> {req.message}</p>}
          {req.status === "rescheduled" && (
            <div className="mm-reschedule-banner">
              <CalendarClock size={14} />
              <span>New time proposed: <strong>{fmtDate(req.rescheduledTime)} at {fmtTime(req.rescheduledTime)}</strong></span>
              {onConfirmReschedule && (
                <div className="mm-reschedule-actions">
                  <Button variant="success-outline" onClick={() => onConfirmReschedule(req.id)}>Confirm</Button>
                  <Button variant="danger-outline" onClick={() => onDeclineReschedule(req.id)}>Decline</Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function TrackStatus({ requests, onConfirmReschedule, onDeclineReschedule }) {
  if (requests.length === 0) {
    return <EmptyState icon={ClipboardList} title="No requests yet" subtitle="Browse mentors to send your first request." />;
  }
  return (
    <div className="mm-list">
      {requests.map((r) => (
        <RequestRow key={r.id} req={r} onConfirmReschedule={onConfirmReschedule} onDeclineReschedule={onDeclineReschedule} />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  STUDENT SIDE — Upcoming / Completed Sessions                           */
/* ---------------------------------------------------------------------- */

function SessionCard({ req }) {
  const mentor = mentorById(req.mentorId);
  const isPast = new Date(req.meetingTime) < NOW;
  return (
    <Card className="mm-session-card">
      <Avatar initials={mentor.initials} size={46} />
      <div className="mm-session-body">
        <p className="mm-request-title">{req.purpose}</p>
        <p className="mm-text-muted mm-small">with {mentor.name} · {mentor.title}</p>
        <div className="mm-request-meta">
          <span><Calendar size={12} /> {fmtDate(req.meetingTime)}</span>
          <span><Clock size={12} /> {fmtTime(req.meetingTime)}</span>
          <span><Clock size={12} /> {req.duration} min</span>
        </div>
      </div>
      {isPast ? (
        <span className="mm-chip mm-chip-success"><CheckCircle2 size={12} /> Completed</span>
      ) : (
        <span className="mm-chip mm-chip-accent"><CalendarCheck size={12} /> Upcoming</span>
      )}
    </Card>
  );
}

function SessionsList({ sessions, emptyTitle, emptySub, emptyIcon }) {
  if (sessions.length === 0) return <EmptyState icon={emptyIcon} title={emptyTitle} subtitle={emptySub} />;
  return <div className="mm-list">{sessions.map((s) => <SessionCard key={s.id} req={s} />)}</div>;
}

/* ---------------------------------------------------------------------- */
/*  ALUMNI SIDE — Incoming Requests (Accept / Reject / Reschedule)         */
/* ---------------------------------------------------------------------- */

function IncomingRequestCard({ req, onAccept, onReject, onReschedule }) {
  return (
    <Card className="mm-request-row">
      <div className="mm-request-main">
        <Avatar initials={req.studentName.split(" ").map((n) => n[0]).join("")} size={38} />
        <div className="mm-request-body">
          <div className="mm-request-head">
            <p className="mm-request-title">{req.purpose} · <span className="mm-text-muted">{req.studentName}</span></p>
            <StatusStamp status={req.status} />
          </div>
          <div className="mm-request-meta">
            <span><Calendar size={12} /> {fmtDate(req.meetingTime)}</span>
            <span><Clock size={12} /> {fmtTime(req.meetingTime)}</span>
            <span><Clock size={12} /> {req.duration} min</span>
          </div>
          {req.message && <p className="mm-request-message"><MessageSquare size={12} /> {req.message}</p>}
          <div className="mm-incoming-actions">
            <Button variant="success" icon={CheckCircle2} onClick={() => onAccept(req.id)}>Accept</Button>
            <Button variant="danger" icon={XCircle} onClick={() => onReject(req.id)}>Reject</Button>
            <Button variant="ghost-outline" icon={RefreshCw} onClick={() => onReschedule(req)}>Reschedule</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function RescheduleModal({ req, onClose, onSubmit }) {
  const [date, setDate] = useState(req.meetingTime.split("T")[0]);
  const [time, setTime] = useState(req.meetingTime.split("T")[1]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(req.id, `${date}T${time}`);
  }

  return (
    <Modal title="Propose a new time" onClose={onClose} width={420}>
      <p className="mm-modal-sub">Requesting student: {req.studentName}</p>
      <form onSubmit={handleSubmit} className="mm-form">
        <div className="mm-form-row">
          <Field label="New date">
            <input type="date" className="mm-input" value={date} onChange={(e) => setDate(e.target.value)} required />
          </Field>
          <Field label="New time">
            <input type="time" className="mm-input" value={time} onChange={(e) => setTime(e.target.value)} required />
          </Field>
        </div>
        <div className="mm-modal-actions">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" icon={RefreshCw}>Propose new time</Button>
        </div>
      </form>
    </Modal>
  );
}

function IncomingRequests({ requests, onAccept, onReject, onReschedule }) {
  if (requests.length === 0) {
    return <EmptyState icon={Inbox} title="No pending requests" subtitle="New mentorship requests will show up here." />;
  }
  return (
    <div className="mm-list">
      {requests.map((r) => (
        <IncomingRequestCard key={r.id} req={r} onAccept={onAccept} onReject={onReject} onReschedule={onReschedule} />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  ALUMNI SIDE — Meeting History                                          */
/* ---------------------------------------------------------------------- */

function MeetingHistory({ requests }) {
  const resolved = requests.filter((r) => r.status !== "pending");
  if (resolved.length === 0) {
    return <EmptyState icon={History} title="No meeting history yet" subtitle="Resolved requests will appear here." />;
  }
  return (
    <Card className="mm-table-card">
      <table className="mm-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Purpose</th>
            <th>Date</th>
            <th>Time</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {resolved.map((r) => (
            <tr key={r.id}>
              <td>{r.studentName}</td>
              <td>{r.purpose}</td>
              <td className="mm-mono">{fmtDate(r.status === "rescheduled" ? r.rescheduledTime : r.meetingTime)}</td>
              <td className="mm-mono">{fmtTime(r.status === "rescheduled" ? r.rescheduledTime : r.meetingTime)}</td>
              <td className="mm-mono">{r.duration}m</td>
              <td><StatusStamp status={r.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

/* ---------------------------------------------------------------------- */
/*  ALUMNI SIDE — Analytics                                                */
/* ---------------------------------------------------------------------- */

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <Card className="mm-stat-card">
      <div className="mm-stat-icon"><Icon size={17} /></div>
      <p className="mm-stat-value mm-display">{value}</p>
      <p className="mm-stat-label">{label}</p>
      {sub && <p className="mm-stat-sub">{sub}</p>}
    </Card>
  );
}

const PIE_COLORS = { Pending: "#E0984A", Accepted: "#3FA796", Rejected: "#C1666B", Rescheduled: "#C9A227" };

function Analytics({ requests }) {
  const total = requests.length;
  const accepted = requests.filter((r) => r.status === "accepted").length;
  const rejected = requests.filter((r) => r.status === "rejected").length;
  const pending = requests.filter((r) => r.status === "pending").length;
  const rescheduled = requests.filter((r) => r.status === "rescheduled").length;
  const acceptanceRate = total ? Math.round((accepted / (accepted + rejected || 1)) * 100) : 0;
  const avgDuration = total ? Math.round(requests.reduce((s, r) => s + r.duration, 0) / total) : 0;

  const monthly = useMemo(() => {
    const map = {};
    requests.forEach((r) => {
      const d = new Date(r.meetingTime);
      const key = d.toLocaleDateString("en-IN", { month: "short" });
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map).map(([month, count]) => ({ month, count }));
  }, [requests]);

  const pieData = [
    { name: "Accepted", value: accepted },
    { name: "Pending", value: pending },
    { name: "Rejected", value: rejected },
    { name: "Rescheduled", value: rescheduled },
  ].filter((d) => d.value > 0);

  return (
    <div>
      <div className="mm-stat-grid">
        <StatCard icon={Inbox} label="Total requests" value={total} />
        <StatCard icon={CheckCircle2} label="Acceptance rate" value={`${acceptanceRate}%`} sub={`${accepted} accepted · ${rejected} rejected`} />
        <StatCard icon={Clock} label="Avg. session length" value={`${avgDuration}m`} />
        <StatCard icon={Star} label="Mentor rating" value="4.9" sub="from 42 reviews" />
      </div>

      <div className="mm-chart-grid">
        <Card className="mm-chart-card">
          <p className="mm-chart-title mm-display">Sessions by month</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthly}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)" }} />
              <Bar dataKey="count" fill="var(--accent)" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="mm-chart-card">
          <p className="mm-chart-title mm-display">Request status breakdown</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={3}>
                {pieData.map((entry, i) => <Cell key={i} fill={PIE_COLORS[entry.name]} />)}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 12, color: "var(--text-muted)" }} />
              <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)" }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  ROOT MODULE                                                            */
/* ---------------------------------------------------------------------- */

export default function MentorshipModule() {
  const [role, setRole] = useState("student");
  const [studentTab, setStudentTab] = useState("browse");
  const [alumniTab, setAlumniTab] = useState("incoming");
  const [requests, setRequests] = useState(initialRequests);
  const [requestingMentor, setRequestingMentor] = useState(null);
  const [reschedulingReq, setReschedulingReq] = useState(null);
  const [alumniMentorId, setAlumniMentorId] = useState("m1");
  const [toast, setToast] = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function handleSendRequest(payload) {
    const newReq = {
      id: `r${Date.now()}`,
      studentName: STUDENT_NAME,
      status: "pending",
      createdAt: new Date().toISOString(),
      ...payload,
    };
    setRequests((prev) => [newReq, ...prev]);
    setRequestingMentor(null);
    showToast("Request sent to mentor");
  }

  function updateStatus(id, status, extra = {}) {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status, ...extra } : r)));
  }

  function handleAccept(id) { updateStatus(id, "accepted"); showToast("Request accepted"); }
  function handleReject(id) { updateStatus(id, "rejected"); showToast("Request rejected"); }
  function handleReschedule(id, newTime) {
    updateStatus(id, "rescheduled", { rescheduledTime: newTime });
    setReschedulingReq(null);
    showToast("New time proposed to student");
  }
  function handleConfirmReschedule(id) {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "accepted", meetingTime: r.rescheduledTime } : r)));
    showToast("New time confirmed");
  }
  function handleDeclineReschedule(id) { updateStatus(id, "rejected"); showToast("Reschedule declined"); }

  const myRequests = requests.filter((r) => r.studentName === STUDENT_NAME);
  const upcoming = myRequests.filter((r) => r.status === "accepted" && new Date(r.meetingTime) >= NOW);
  const completed = myRequests.filter((r) => r.status === "accepted" && new Date(r.meetingTime) < NOW);

  const mentorRequests = requests.filter((r) => r.mentorId === alumniMentorId);
  const pendingForMentor = mentorRequests.filter((r) => r.status === "pending");
  const currentMentor = mentorById(alumniMentorId);

  return (
    <div className="mm-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .mm-root {
          --bg: #12172B;
          --surface: #1B2340;
          --surface-alt: #232C52;
          --border: #313B67;
          --text: #EDEFF5;
          --text-muted: #9AA3C0;
          --accent: #C9A227;
          --accent-soft: rgba(201,162,39,0.16);
          --success: #3FA796;
          --success-soft: rgba(63,167,150,0.16);
          --danger: #C1666B;
          --danger-soft: rgba(193,102,107,0.16);
          --warning: #E0984A;
          --warning-soft: rgba(224,152,74,0.16);
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          padding: 28px;
          box-sizing: border-box;
        }
        .mm-root * { box-sizing: border-box; }
        .mm-display { font-family: 'Fraunces', serif; }
        .mm-mono { font-family: 'IBM Plex Mono', monospace; }
        .mm-text-muted { color: var(--text-muted); }
        .mm-small { font-size: 12px; }
        .mm-w-full { width: 100%; }

        .mm-shell { max-width: 1180px; margin: 0 auto; }

        .mm-topbar { display:flex; align-items:center; justify-content:space-between; margin-bottom: 26px; flex-wrap: wrap; gap: 14px; }
        .mm-brand { display:flex; align-items:center; gap: 10px; }
        .mm-brand-mark { width: 38px; height: 38px; border-radius: 10px; background: var(--accent-soft); border: 1px solid var(--accent); display:flex; align-items:center; justify-content:center; color: var(--accent); }
        .mm-brand-title { font-size: 20px; font-weight: 600; letter-spacing: 0.01em; }
        .mm-brand-sub { color: var(--text-muted); font-size: 12.5px; }

        .mm-role-switch { display:flex; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 4px; gap: 4px; }
        .mm-role-btn { display:flex; align-items:center; gap:6px; padding: 8px 16px; border-radius: 9px; border:none; background:transparent; color: var(--text-muted); font-size: 13px; font-weight: 600; cursor:pointer; font-family:'Inter',sans-serif; }
        .mm-role-btn.active { background: var(--accent); color: #1B1706; }

        .mm-tabs { display:flex; gap: 6px; margin-bottom: 22px; flex-wrap: wrap; border-bottom: 1px solid var(--border); padding-bottom: 2px; }
        .mm-tab { display:flex; align-items:center; gap: 7px; padding: 10px 16px; border:none; background:transparent; color: var(--text-muted); font-size: 13.5px; font-weight: 600; cursor:pointer; border-bottom: 2px solid transparent; font-family:'Inter',sans-serif; }
        .mm-tab-active { color: var(--text); border-bottom: 2px solid var(--accent); }
        .mm-tab-count { background: var(--accent-soft); color: var(--accent); border-radius: 999px; padding: 1px 7px; font-size: 11px; font-family:'IBM Plex Mono',monospace; }

        .mm-alumni-persona { display:flex; align-items:center; gap: 10px; margin-bottom: 20px; background: var(--surface); border:1px solid var(--border); border-radius: 12px; padding: 10px 14px; }
        .mm-alumni-persona select { background: var(--surface-alt); color: var(--text); border: 1px solid var(--border); border-radius: 8px; padding: 6px 10px; font-family:'Inter',sans-serif; font-size: 13px; }

        .mm-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 18px; }

        .mm-mentor-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 16px; }
        .mm-mentor-card { display:flex; flex-direction:column; gap: 12px; }
        .mm-mentor-top { display:flex; gap: 12px; align-items:flex-start; }
        .mm-mentor-name { font-size: 15.5px; font-weight: 600; }
        .mm-mentor-title { font-size: 12.5px; color: var(--text-muted); margin-top: 1px; }
        .mm-mentor-company { font-size: 12px; color: var(--text-muted); display:flex; align-items:center; gap:5px; margin-top: 3px; }
        .mm-mentor-bio { font-size: 12.5px; color: var(--text-muted); line-height: 1.5; }
        .mm-mentor-meta { display:flex; align-items:center; gap: 10px; flex-wrap: wrap; font-size: 12px; color: var(--text-muted); }
        .mm-meta-item { display:flex; align-items:center; gap: 4px; }

        .mm-avatar { border-radius: 50%; background: linear-gradient(135deg, var(--accent-soft), var(--success-soft)); border: 1px solid var(--border); display:flex; align-items:center; justify-content:center; font-weight: 700; font-family:'Fraunces',serif; color: var(--accent); flex-shrink:0; }

        .mm-chip { display:inline-flex; align-items:center; gap: 4px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 999px; padding: 3px 10px; font-size: 11.5px; color: var(--text-muted); }
        .mm-chip-success { background: var(--success-soft); color: var(--success); border-color: var(--success); }
        .mm-chip-accent { background: var(--accent-soft); color: var(--accent); border-color: var(--accent); }

        .mm-btn { display:inline-flex; align-items:center; justify-content:center; gap: 7px; border-radius: 9px; padding: 9px 16px; font-size: 13px; font-weight: 600; cursor:pointer; border: 1px solid transparent; font-family:'Inter',sans-serif; transition: filter 0.15s ease; }
        .mm-btn:hover { filter: brightness(1.08); }
        .mm-btn-primary { background: var(--accent); color: #1B1706; }
        .mm-btn-ghost { background: transparent; color: var(--text-muted); border-color: var(--border); }
        .mm-btn-ghost-outline { background: transparent; color: var(--text); border-color: var(--border); }
        .mm-btn-success { background: var(--success); color: #0C201C; }
        .mm-btn-success-outline { background: var(--success-soft); color: var(--success); border-color: var(--success); }
        .mm-btn-danger { background: var(--danger); color: #250B0C; }
        .mm-btn-danger-outline { background: var(--danger-soft); color: var(--danger); border-color: var(--danger); }

        .mm-browse-controls { display:flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
        .mm-search { display:flex; align-items:center; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 9px 14px; flex: 1; min-width: 220px; color: var(--text-muted); }
        .mm-search input { background: transparent; border: none; outline: none; color: var(--text); font-size: 13.5px; width: 100%; font-family:'Inter',sans-serif; }
        .mm-select { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 9px 14px; color: var(--text); font-size: 13.5px; font-family:'Inter',sans-serif; }
        .mm-input, .mm-textarea { background: var(--surface-alt); border: 1px solid var(--border); border-radius: 9px; padding: 9px 12px; color: var(--text); font-size: 13.5px; font-family:'Inter',sans-serif; width: 100%; }
        .mm-textarea { resize: vertical; font-family:'Inter',sans-serif; }

        .mm-stamp { display:inline-flex; align-items:center; padding: 4px 11px; border: 1.5px dashed; border-radius: 999px; font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; transform: rotate(-1.5deg); white-space: nowrap; }

        .mm-list { display:flex; flex-direction: column; gap: 12px; }
        .mm-request-row { }
        .mm-request-main { display:flex; gap: 12px; }
        .mm-request-body { flex: 1; display:flex; flex-direction:column; gap: 8px; }
        .mm-request-head { display:flex; align-items:center; justify-content:space-between; gap: 10px; flex-wrap: wrap; }
        .mm-request-title { font-size: 14px; font-weight: 600; }
        .mm-request-meta { display:flex; gap: 14px; flex-wrap: wrap; font-size: 12px; color: var(--text-muted); }
        .mm-request-meta span { display:flex; align-items:center; gap: 5px; }
        .mm-request-message { font-size: 12.5px; color: var(--text-muted); display:flex; gap: 6px; background: var(--surface-alt); padding: 8px 10px; border-radius: 8px; line-height: 1.5; }

        .mm-reschedule-banner { display:flex; align-items:center; gap: 8px; flex-wrap: wrap; background: var(--accent-soft); border: 1px solid var(--accent); color: var(--accent); border-radius: 9px; padding: 9px 12px; font-size: 12.5px; }
        .mm-reschedule-actions { display:flex; gap: 8px; margin-left: auto; }

        .mm-incoming-actions { display:flex; gap: 8px; flex-wrap: wrap; margin-top: 2px; }

        .mm-session-card { display:flex; align-items:center; gap: 14px; }
        .mm-session-body { flex: 1; }

        .mm-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 8px; padding: 60px 20px; color: var(--text-muted); text-align:center; }
        .mm-empty-title { font-size: 14px; font-weight: 600; color: var(--text); }
        .mm-empty-sub { font-size: 12.5px; }

        .mm-modal-overlay { position: fixed; inset: 0; background: rgba(6,8,18,0.7); display:flex; align-items:center; justify-content:center; z-index: 50; padding: 20px; }
        .mm-modal { width: 100%; max-height: 90vh; overflow-y: auto; }
        .mm-modal-head { display:flex; align-items:center; justify-content:space-between; margin-bottom: 4px; }
        .mm-modal-head h3 { font-size: 18px; font-weight: 600; margin: 0; }
        .mm-modal-sub { color: var(--text-muted); font-size: 12.5px; margin: 4px 0 16px; }
        .mm-icon-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 4px; }
        .mm-form { display:flex; flex-direction: column; gap: 14px; }
        .mm-form-row { display:flex; gap: 12px; }
        .mm-form-row > * { flex: 1; }
        .mm-field { display:flex; flex-direction: column; gap: 6px; }
        .mm-field-label { font-size: 12px; color: var(--text-muted); font-weight: 600; }
        .mm-modal-actions { display:flex; justify-content:flex-end; gap: 10px; margin-top: 4px; }

        .mm-table-card { padding: 0; overflow-x: auto; }
        .mm-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .mm-table th { text-align: left; padding: 12px 16px; color: var(--text-muted); font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border); }
        .mm-table td { padding: 12px 16px; border-bottom: 1px solid var(--border); }
        .mm-table tr:last-child td { border-bottom: none; }

        .mm-stat-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 20px; }
        .mm-stat-card { display:flex; flex-direction: column; gap: 6px; }
        .mm-stat-icon { width: 30px; height: 30px; border-radius: 8px; background: var(--accent-soft); color: var(--accent); display:flex; align-items:center; justify-content:center; }
        .mm-stat-value { font-size: 26px; font-weight: 700; }
        .mm-stat-label { font-size: 12.5px; color: var(--text-muted); }
        .mm-stat-sub { font-size: 11px; color: var(--text-muted); }

        .mm-chart-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; }
        .mm-chart-card { }
        .mm-chart-title { font-size: 14.5px; font-weight: 600; margin: 0 0 12px; }

        .mm-toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: var(--surface); border: 1px solid var(--accent); color: var(--text); padding: 11px 20px; border-radius: 10px; font-size: 13px; display:flex; align-items:center; gap: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); z-index: 60; }
      `}</style>

      <div className="mm-shell">
        <div className="mm-topbar">
          <div className="mm-brand">
            <div className="mm-brand-mark"><Sparkles size={18} /></div>
            <div>
              <p className="mm-brand-title mm-display">Mentorship Ledger</p>
              <p className="mm-brand-sub">Connecting students with alumni mentors</p>
            </div>
          </div>
          <div className="mm-role-switch">
            <button className={`mm-role-btn ${role === "student" ? "active" : ""}`} onClick={() => setRole("student")}>
              <GraduationCap size={15} /> Student
            </button>
            <button className={`mm-role-btn ${role === "alumni" ? "active" : ""}`} onClick={() => setRole("alumni")}>
              <Briefcase size={15} /> Alumni
            </button>
          </div>
        </div>

        {role === "student" && (
          <>
            <Tabs
              active={studentTab}
              onChange={setStudentTab}
              items={[
                { key: "browse", label: "Browse Mentors", icon: Search },
                { key: "status", label: "Track Status", icon: ClipboardList, count: myRequests.filter(r=>r.status==='pending'||r.status==='rescheduled').length },
                { key: "upcoming", label: "Upcoming Sessions", icon: CalendarCheck, count: upcoming.length },
                { key: "completed", label: "Completed Sessions", icon: History },
              ]}
            />
            {studentTab === "browse" && <BrowseMentors onRequest={setRequestingMentor} />}
            {studentTab === "status" && (
              <TrackStatus
                requests={myRequests}
                onConfirmReschedule={handleConfirmReschedule}
                onDeclineReschedule={handleDeclineReschedule}
              />
            )}
            {studentTab === "upcoming" && (
              <SessionsList sessions={upcoming} emptyIcon={CalendarCheck} emptyTitle="No upcoming sessions" emptySub="Accepted requests with future dates will show here." />
            )}
            {studentTab === "completed" && (
              <SessionsList sessions={completed} emptyIcon={History} emptyTitle="No completed sessions yet" emptySub="Past sessions will appear here once they're done." />
            )}
          </>
        )}

        {role === "alumni" && (
          <>
            <div className="mm-alumni-persona">
              <User size={16} className="mm-text-muted" />
              <span className="mm-small mm-text-muted">Viewing as mentor:</span>
              <select value={alumniMentorId} onChange={(e) => setAlumniMentorId(e.target.value)}>
                {MENTORS.map((m) => <option key={m.id} value={m.id}>{m.name} — {m.title}</option>)}
              </select>
            </div>
            <Tabs
              active={alumniTab}
              onChange={setAlumniTab}
              items={[
                { key: "incoming", label: "Incoming Requests", icon: Inbox, count: pendingForMentor.length },
                { key: "history", label: "Meeting History", icon: History },
                { key: "analytics", label: "Analytics", icon: BarChart3 },
              ]}
            />
            {alumniTab === "incoming" && (
              <IncomingRequests
                requests={pendingForMentor}
                onAccept={handleAccept}
                onReject={handleReject}
                onReschedule={setReschedulingReq}
              />
            )}
            {alumniTab === "history" && <MeetingHistory requests={mentorRequests} />}
            {alumniTab === "analytics" && <Analytics requests={mentorRequests} />}
          </>
        )}
      </div>

      {requestingMentor && (
        <RequestMentorModal
          mentor={requestingMentor}
          onClose={() => setRequestingMentor(null)}
          onSubmit={handleSendRequest}
        />
      )}
      {reschedulingReq && (
        <RescheduleModal
          req={reschedulingReq}
          onClose={() => setReschedulingReq(null)}
          onSubmit={handleReschedule}
        />
      )}
      {toast && <div className="mm-toast"><CheckCircle2 size={15} color="var(--accent)" /> {toast}</div>}
    </div>
  );
}
