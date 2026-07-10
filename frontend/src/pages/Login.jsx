import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setIsSubmitting(true);
    const { error: signInError } = await signIn(email, password);
    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.08),_transparent_45%)] px-4 py-10 dark:bg-slate-950">
      <Card className="w-full max-w-md p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-700">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Log in to continue to your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
            <Input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
            <Input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
          </div>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

          <Button type="submit" className="w-full" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-primary-600 hover:underline">Sign up</Link>
        </p>
      </Card>
    </div>
  );
}