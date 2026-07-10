import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50">
      <Navbar />
      <main className="flex-grow overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}