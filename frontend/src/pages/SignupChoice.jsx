import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Link2, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';

const initialManualData = {
  currentRole: '',
  company: '',
  graduationYear: '',
  field: ''
};

export default function SignupChoice() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [manualData, setManualData] = useState(initialManualData);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState('');

  const handleManualChange = (event) => {
    const { name, value } = event.target;
    setManualData((prev) => ({ ...prev, [name]: value }));
  };

  const handleManualContinue = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter an email and password to create your account.');
      return;
    }

    const { error: signUpError } = await signUp(email, password, '', role);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    navigate('/profile/create', {
      state: {
        role,
        profileData: {
          name: '',
          bio: '',
          currentRole: manualData.currentRole,
          company: manualData.company,
          graduationYear: manualData.graduationYear,
          field: manualData.field,
          linkedInUrl,
          isMentor: role === 'alumni'
        }
      }
    });
  };

  const handlePdfUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!email || !password) {
      setError('Please enter an email and password before uploading.');
      return;
    }

    setError('');
    setIsParsing(true);

    window.setTimeout(async () => {
      const { error: signUpError } = await signUp(email, password, '', role);
      if (signUpError) {
        setError(signUpError.message);
        setIsParsing(false);
        return;
      }

      const prefilledProfile = role === 'alumni'
        ? {
            name: 'Riya Kapoor',
            currentRole: 'Senior Product Manager',
            company: 'Microsoft',
            graduationYear: '2017',
            field: 'Computer Science',
            linkedInUrl: 'https://www.linkedin.com/in/riya-kapoor'
          }
        : {
            name: 'Aisha Verma',
            currentRole: 'Product Design Intern',
            company: 'Figma',
            graduationYear: '2025',
            field: 'Design',
            linkedInUrl: 'https://www.linkedin.com/in/aisha-verma'
          };

      navigate('/profile/create', {
        state: {
          role,
          profileData: {
            ...prefilledProfile,
            bio: '',
            isMentor: role === 'alumni'
          }
        }
      });
    }, 1400);
  };

  return (
    <div className="min-h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.08),_transparent_45%)] px-4 py-10 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary-600">Create your account</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Join HerConnect as a student or alum</h1>
            <p className="text-base text-slate-600 dark:text-slate-300">Choose the path that fits you best and we'll help you build your profile.</p>
          </div>

          <div className="mx-auto flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setRole('student')} className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${role === 'student' ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-700'}`}>
              I am a Student
            </button>
            <button type="button" onClick={() => setRole('alumni')} className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${role === 'alumni' ? 'bg-secondary-600 text-white shadow-md' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-700'}`}>
              I am an Alumni
            </button>
          </div>
        </div>

        <Card className="mx-auto w-full max-w-md p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-700">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Account details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
            </div>
          </div>
          {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6 sm:p-8">
            <div className="mb-6 flex items-start gap-3">
              <div className="rounded-xl bg-primary-50 p-2 text-primary-600"><Link2 className="h-5 w-5" /></div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Paste LinkedIn URL</h2>
                <p className="text-sm text-slate-600">Fill in a few details manually and continue to your profile.</p>
              </div>
            </div>

            <form onSubmit={handleManualContinue} className="space-y-4">
              <div>
                <label htmlFor="linkedin-url" className="mb-1.5 block text-sm font-medium text-slate-700">LinkedIn URL</label>
                <Input id="linkedin-url" value={linkedInUrl} onChange={(event) => setLinkedInUrl(event.target.value)} placeholder="https://linkedin.com/in/yourname" />
              </div>
              <div>
                <label htmlFor="current-role" className="mb-1.5 block text-sm font-medium text-slate-700">Current role</label>
                <Input id="current-role" name="currentRole" value={manualData.currentRole} onChange={handleManualChange} placeholder="Software Engineer" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-slate-700">Company</label>
                  <Input id="company" name="company" value={manualData.company} onChange={handleManualChange} placeholder="Google" />
                </div>
                <div>
                  <label htmlFor="graduation-year" className="mb-1.5 block text-sm font-medium text-slate-700">Graduation year</label>
                  <Input id="graduation-year" name="graduationYear" value={manualData.graduationYear} onChange={handleManualChange} placeholder="2022" />
                </div>
              </div>
              <div>
                <label htmlFor="field-of-study" className="mb-1.5 block text-sm font-medium text-slate-700">Field of study</label>
                <Input id="field-of-study" name="field" value={manualData.field} onChange={handleManualChange} placeholder="Computer Science" />
              </div>

              <Button type="submit" className="w-full gap-2" variant="primary">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </Card>

          <Card className="p-6 sm:p-8">
            <div className="mb-6 flex items-start gap-3">
              <div className="rounded-xl bg-secondary-50 p-2 text-secondary-600"><FileText className="h-5 w-5" /></div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Upload LinkedIn PDF</h2>
                <p className="text-sm text-slate-600">Import your details quickly and move to the editable profile screen.</p>
              </div>
            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-primary-400 hover:bg-primary-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-primary-400">
              <input type="file" accept=".pdf" className="hidden" onChange={handlePdfUpload} />
              <div className="rounded-full bg-white p-3 shadow-sm"><FileText className="h-6 w-6 text-primary-600" /></div>
              <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Choose a LinkedIn PDF</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">We'll parse it and prefill your profile.</p>
            </label>

            {isParsing ? (
              <div className="mt-4 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm font-medium text-primary-700">
                Parsing PDF...
              </div>
            ) : null}
          </Card>
        </div>
      </div>
    </div>
  );
}