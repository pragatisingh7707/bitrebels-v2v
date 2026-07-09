export const mentors = [
  {
    id: "m1",
    name: "Ananya Sharma",
    role: "Senior Software Engineer",
    company: "Google",
    domain: "Engineering",
    skills: ["React", "System Design", "Distributed Systems", "Python"],
    bio: "Alumni batch of 2019. Passionate about scaling web applications and mentoring women transitioning into Big Tech roles.",
    availability: "Tuesdays & Thursdays (Evenings)"
  },
  {
    id: "m2",
    name: "Riya Kapoor",
    role: "Product Manager",
    company: "Microsoft",
    domain: "Product",
    skills: ["Product Strategy", "A/B Testing", "User Research", "Agile"],
    bio: "Alumni batch of 2017. Helping students understand the intersection of business, design, and technical product management.",
    availability: "Saturday Mornings"
  },
  {
    id: "m3",
    name: "Dr. Sneha Iyer",
    role: "AI Research Scientist",
    company: "Meta AI",
    domain: "Research",
    skills: ["Deep Learning", "NLP", "PyTorch", "Computer Vision"],
    bio: "Alumni batch of 2015. Directing academic mindsets toward industry research applications. Let's discuss your thesis or ML project!",
    availability: "Friday Afternoons"
  },
  {
    id: "m4",
    name: "Kriti Verma",
    role: "Investment Banking Associate",
    company: "Goldman Sachs",
    domain: "Finance",
    skills: ["Financial Modeling", "Valuation", "Excel", "Corporate Strategy"],
    bio: "Alumni batch of 2020. Providing guidance on cracking core finance roles, interview preparation, and analytical toolsets.",
    availability: "Mondays (Late Evenings)"
  }
];
export const motivationalQuotes = [
  { text: "The future belongs to those who prepare for it today.", author: "Malcolm X" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "A woman with a voice is, by definition, a strong woman.", author: "Melinda Gates" },
  { text: "Doubt kills more dreams than failure ever will.", author: "Suzy Kassem" },
  { text: "Mentorship is a brain to pick, an ear to listen, and a push in the right direction.", author: "John C. Crosby" }
];

export const mentorshipStats = [
  { id: "s1", label: "Active Mentorships", value: 3, icon: "Handshake", tone: "primary" },
  { id: "s2", label: "Pending Requests", value: 2, icon: "Clock", tone: "amber" },
  { id: "s3", label: "Sessions Completed", value: 12, icon: "CheckCircle2", tone: "emerald" },
  { id: "s4", label: "Mentoring Hours", value: 18, icon: "Timer", tone: "secondary" }
];

export const upcomingSessions = [
  { id: "sess1", mentorName: "Ananya Sharma", topic: "System Design Mock Interview", date: "Tue, 15 Jul", time: "6:00 PM", mode: "Video Call" },
  { id: "sess2", mentorName: "Riya Kapoor", topic: "Resume & Portfolio Review", date: "Sat, 19 Jul", time: "10:30 AM", mode: "Video Call" },
  { id: "sess3", mentorName: "Dr. Sneha Iyer", topic: "Research Paper Feedback", date: "Fri, 25 Jul", time: "3:00 PM", mode: "Chat + Call" }
];

export const resources = [
  { id: "r1", title: "Breaking Into Big Tech: A Complete Roadmap", type: "Guide", author: "Ananya Sharma", readTime: "8 min read", tag: "Engineering" },
  { id: "r2", title: "Mastering the Product Sense Interview", type: "Article", author: "Riya Kapoor", readTime: "6 min read", tag: "Product" },
  { id: "r3", title: "Negotiating Your First Full-Time Offer", type: "Video", author: "Kriti Verma", readTime: "12 min watch", tag: "Career" },
  { id: "r4", title: "From Thesis to Publication: An NLP Story", type: "Guide", author: "Dr. Sneha Iyer", readTime: "10 min read", tag: "Research" }
];

export const internships = [
  { id: "i1", title: "Software Engineering Intern", company: "Google", location: "Bengaluru · Hybrid", tag: "Engineering", deadline: "Closes in 5 days" },
  { id: "i2", title: "Associate Product Intern", company: "Microsoft", location: "Remote", tag: "Product", deadline: "Closes in 9 days" },
  { id: "i3", title: "Investment Banking Summer Analyst", company: "Goldman Sachs", location: "Mumbai · On-site", tag: "Finance", deadline: "Closes in 14 days" }
];

export const upcomingEvents = [
  { id: "e1", title: "Women in AI: Panel Discussion", date: "18 Jul", time: "5:00 PM", type: "Webinar" },
  { id: "e2", title: "Resume Bootcamp with Alumni", date: "22 Jul", time: "11:00 AM", type: "Workshop" },
  { id: "e3", title: "Annual HerConnect Networking Night", date: "30 Jul", time: "7:00 PM", type: "Networking" }
];

export const notifications = [
  { id: "n1", message: "Ananya Sharma accepted your mentorship request.", time: "10 min ago", type: "success" },
  { id: "n2", message: "New reply in Women in AI & Analytics community.", time: "1 hour ago", type: "info" },
  { id: "n3", message: "Your session with Riya Kapoor starts in 2 days.", time: "3 hours ago", type: "reminder" },
  { id: "n4", message: "Profile completion reminder: add your resume.", time: "Yesterday", type: "warning" }
];

export const recentActivity = [
  { id: "a1", action: "Completed a mentorship session with Kriti Verma", time: "2 days ago" },
  { id: "a2", action: "Joined the Consulting & Strategy Prep community", time: "3 days ago" },
  { id: "a3", action: "Requested mentorship from Dr. Sneha Iyer", time: "5 days ago" },
  { id: "a4", action: "Bookmarked \"Breaking Into Big Tech: A Complete Roadmap\"", time: "1 week ago" }
];

export const profileCompletion = {
  percent: 72,
  missing: ["Resume", "Skills Assessment", "Career Interests"]
};
export const communities = [
  {
    id: "c1",
    name: "Women in AI & Analytics",
    category: "Engineering",
    description: "A collaborative hub for discussing neural networks, data engineering pipelines, open-source AI libraries, and paper reading groups.",
    membersCount: 240,
    lastActive: "12 minutes ago"
  },
  {
    id: "c2",
    name: "Product Management Circle",
    category: "Product",
    description: "A space to practice product teardowns, mock case studies, share resume reviews, and network with experienced PM mentors.",
    membersCount: 185,
    lastActive: "2 hours ago"
  },
  {
    id: "c3",
    name: "Consulting & Strategy Prep",
    category: "Finance",
    description: "Crack the case! Weekly mock case study rounds, guesstimate walkthroughs, and networking events for management roles.",
    membersCount: 150,
    lastActive: "Yesterday"
  }
];