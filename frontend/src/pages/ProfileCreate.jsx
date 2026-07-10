import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Camera, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';

const defaultProfile = {
  name: '',
  bio: '',
  currentRole: '',
  company: '',
  graduationYear: '',
  field: '',
  linkedInUrl: '',
  isMentor: false,
  photoPreview: ''
};

export default function ProfileCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUserData } = useAuth();
  const role = location.state?.role || 'student';
  const passedProfile = location.state?.profileData || {};

  const [profile, setProfile] = useState({
    ...defaultProfile,
    ...passedProfile
  });

  const [photoName, setPhotoName] = useState('');

  const showMentorToggle = useMemo(() => role === 'alumni', [role]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setProfile((prev) => ({ ...prev, photoPreview: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save user data to auth context
    setUserData({
      name: profile.name || 'User',
      role,
      profile: {
        bio: profile.bio,
        currentRole: profile.currentRole,
        company: profile.company,
        graduationYear: profile.graduationYear,
        field: profile.field,
        linkedInUrl: profile.linkedInUrl,
        isMentor: profile.isMentor,
        photoPreview: profile.photoPreview
      }
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.08),_transparent_45%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden">
          <div className="border-b border-slate-100 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 px-6 py-8 text-white sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary-100">Almost there</p>
                <h1 className="text-3xl font-bold tracking-tight">Create your HerConnect profile</h1>
                <p className="mt-2 text-sm text-primary-50">Your profile can be edited anytime, and alumni can opt into mentoring.</p>
              </div>
              <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
            <div className="flex flex-col gap-6 rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white">
                {profile.photoPreview ? (
                  <img src={profile.photoPreview} alt="Profile preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100 text-lg font-semibold text-slate-700">
                    {profile.name ? profile.name.charAt(0).toUpperCase() : 'H'}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label htmlFor="photo-upload" className="mb-2 block text-sm font-medium text-slate-700">Profile photo</label>
                <label htmlFor="photo-upload" className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
                  <Camera className="h-4 w-4" />
                  Upload photo
                  <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </label>
                {photoName ? <p className="mt-2 text-sm text-slate-500">{photoName}</p> : null}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">Name</label>
                <Input id="name" name="name" value={profile.name} onChange={handleChange} placeholder="Ava Patel" />
              </div>
              <div>
                <label htmlFor="current-role-profile" className="mb-1.5 block text-sm font-medium text-slate-700">Current role</label>
                <Input id="current-role-profile" name="currentRole" value={profile.currentRole} onChange={handleChange} placeholder="Product Designer" />
              </div>
              <div>
                <label htmlFor="company-profile" className="mb-1.5 block text-sm font-medium text-slate-700">Company</label>
                <Input id="company-profile" name="company" value={profile.company} onChange={handleChange} placeholder="Notion" />
              </div>
              <div>
                <label htmlFor="graduation-year-profile" className="mb-1.5 block text-sm font-medium text-slate-700">Graduation year</label>
                <Input id="graduation-year-profile" name="graduationYear" value={profile.graduationYear} onChange={handleChange} placeholder="2024" />
              </div>
              <div>
                <label htmlFor="field-profile" className="mb-1.5 block text-sm font-medium text-slate-700">Field</label>
                <Input id="field-profile" name="field" value={profile.field} onChange={handleChange} placeholder="Human-Computer Interaction" />
              </div>
              <div>
                <label htmlFor="linkedin-url-profile" className="mb-1.5 block text-sm font-medium text-slate-700">LinkedIn URL (optional)</label>
                <Input id="linkedin-url-profile" name="linkedInUrl" value={profile.linkedInUrl} onChange={handleChange} placeholder="https://www.linkedin.com/in/yourname" />
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="mb-1.5 block text-sm font-medium text-slate-700">Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                value={profile.bio}
                onChange={handleChange}
                placeholder="Tell other women in the community a bit about yourself and what you hope to learn or share."
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            {showMentorToggle ? (
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-slate-900">I’m available as a mentor</p>
                  <p className="text-sm text-slate-500">Let students request guidance from you.</p>
                </div>
                <input
                  id="mentor-toggle"
                  type="checkbox"
                  name="isMentor"
                  className="h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  checked={profile.isMentor}
                  onChange={handleChange}
                />
              </div>
            ) : null}

            <div className="flex flex-wrap justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => navigate('/signup')}>
                Back
              </Button>
              <Button type="submit" variant="primary">
                Continue to Dashboard
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
