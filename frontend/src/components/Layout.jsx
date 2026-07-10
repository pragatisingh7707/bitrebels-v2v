import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main className="flex-grow overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}