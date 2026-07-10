export type AvailabilityStatus = 'Available now' | 'This week' | 'Weekends' | 'Limited';

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  domain: string;
  experience: number;
  graduationYear: number;
  skills: string[];
  bio: string;
  availability: AvailabilityStatus;
  verified: boolean;
  location: string;
  linkedin: string;
  profilePhoto: string;
  rating: number;
}

export interface RequestFormValues {
  purpose: string;
  topic: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
  duration: string;
  mode: string;
}

export interface StudentRequestRecord extends RequestFormValues {
  id: string;
  mentorId: string;
  mentorName: string;
  status: 'Pending' | 'Accepted' | 'Completed' | 'Cancelled' | 'Upcoming';
  createdAt: string;
  meetingLink?: string;
}

export interface AlumniRequest {
  id: string;
  studentName: string;
  college: string;
  branch: string;
  graduationYear: number;
  topic: string;
  requestedDate: string;
  message: string;
  status: 'Pending' | 'Accepted' | 'Completed' | 'Rejected';
}

export interface SessionItem {
  id: string;
  mentor: string;
  topic: string;
  date: string;
  time: string;
  link: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  mode: string;
}
