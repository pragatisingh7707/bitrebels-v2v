import React, { useState } from 'react';
import { Users, ShieldCheck, ArrowLeft, Send } from 'lucide-react';
import { communities } from '../data/dummyData';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

export default function Communities() {
  const [activeGroup, setActiveGroup] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, user: "Neha Drop", text: "Hey everyone! Does anyone have sample interview question banks for product design?", time: "10:45 AM" },
    { id: 2, user: "Priya (Alumni)", text: "Check out the pinned documentation link! Posted a complete repository yesterday.", time: "11:02 AM" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), user: "Demo User", text: input, time: "Just Now" }]);
    setInput("");
  };

  if (activeGroup) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 h-[80vh] flex flex-col justify-between">
        <Card className="flex-1 flex flex-col h-full bg-white border">
          {/* Header */}
          <div className="p-4 border-b flex items-center gap-4 bg-slate-50">
            <button onClick={() => setActiveGroup(null)} className="p-1 text-slate-500 hover:bg-slate-200 rounded"><ArrowLeft className="h-5 w-5" /></button>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{activeGroup.name}</h2>
              <p className="text-xs text-slate-500">{activeGroup.membersCount} connected active members</p>
            </div>
          </div>
          {/* Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map(m => (
              <div key={m.id} className={`flex flex-col ${m.user === "Demo User" ? "items-end" : "items-start"}`}>
                <span className="text-xs text-slate-400 font-medium mb-1">{m.user} • {m.time}</span>
                <div className={`p-3 rounded-xl text-sm max-w-md ${m.user === "Demo User" ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-800"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          {/* Form input controls footer */}
          <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
            <input type="text" placeholder="Type a message into the hub channel..." value={input} onChange={e => setInput(e.target.value)} className="flex-1 rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:border-primary-500" />
            <Button variant="primary" size="sm" type="submit"><Send className="h-4 w-4" /></Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-gradient-to-r from-secondary-900 to-indigo-900 text-white p-8 rounded-2xl">
        <h1 className="text-3xl font-bold">Interest Channels</h1>
        <p className="text-indigo-100 mt-2">Join global spaces curated by experienced alumni network members.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {communities.map(group => (
          <Card key={group.id} className="p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between"><Badge>{group.category}</Badge><span className="text-xs text-slate-500">{group.membersCount} members</span></div>
              <h3 className="text-xl font-bold flex items-center gap-2">{group.name} <ShieldCheck className="h-4 w-4 text-emerald-500" /></h3>
              <p className="text-slate-600 text-sm">{group.description}</p>
            </div>
            <div className="border-t mt-6 pt-4 flex justify-between items-center">
              <span className="text-xs text-slate-400">Active: {group.lastActive}</span>
              <Button variant="primary" size="sm" onClick={() => setActiveGroup(group)}>
                Enter Hub
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}