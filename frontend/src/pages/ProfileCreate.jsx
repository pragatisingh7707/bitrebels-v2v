import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';

export default function ProfileCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateProfile } = useAuth();

  const { role, profileData } = location.state || {};

  const [form, setForm] = useState({
    name: profileData?.name || '',
    bio: profileData?.bio || '',
    currentRole: profileData?.currentRole || '',
    company: profileData?.company || '',
    graduationYear: profileData?.graduationYear || '',
    field: profileData?.field || '',
    linkedInUrl: profileData?.linkedInUrl || ''
  });
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSaving(true);

    const { error: updateError } = await updateProfile({
      name: form.name,
      bio: form.bio,
      current_role: form.currentRole,
      company: form.company,
      graduation_year: form.graduationYear,
      field: form.field,
      linked_in_url: form.linkedInUrl,
      is_mentor: role === 'alumni'
    });

    setIsSaving(false);

    if (updateError) {
      setError(updateError.message || 'Something went wrong saving your profile.');
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] px-4 py-10 sm:px-6 lg:px-8 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">Complete your profile</h1>

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">Full name</label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Kritika Sharma" />
            </div>

            <div>
              <label htmlFor="bio" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                placeholder="A little about you..."
              />
            </div>

            <div>
              <label htmlFor="currentRole" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">Current role</label>
              <Input id="currentRole" name="currentRole" value={form.currentRole} onChange={handleChange} placeholder="Software Engineer" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-slate-700">Company</label>
                <Input id="company" name="company" value={form.company} onChange={handleChange} placeholder="Google" />
              </div>
              <div>
                <label htmlFor="graduationYear" className="mb-1.5 block text-sm font-medium text-slate-700">Graduation year</label>
                <Input id="graduationYear" name="graduationYear" value={form.graduationYear} onChange={handleChange} placeholder="2022" />
              </div>
            </div>

            <div>
              <label htmlFor="field" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">Field of study</label>
              <Input id="field" name="field" value={form.field} onChange={handleChange} placeholder="Computer Science" />
            </div>

            <div>
              <label htmlFor="linkedInUrl" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">LinkedIn URL</label>
              <Input id="linkedInUrl" name="linkedInUrl" value={form.linkedInUrl} onChange={handleChange} placeholder="https://linkedin.com/in/yourname" />
            </div>

            {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

            <Button type="submit" className="w-full gap-2" variant="primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Finish setup'} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}