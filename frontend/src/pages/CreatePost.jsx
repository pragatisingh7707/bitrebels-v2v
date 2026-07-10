import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { communities } from '../data/dummyData';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Input } from '../components/Input';

const tagOptions = ['AI', 'Product', 'Career', 'Strategy', 'Research', 'Finance'];

export default function CreatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const community = communities.find((item) => item.id === id) || communities[0];

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedTag, setSelectedTag] = useState(tagOptions[0]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !body.trim()) return;

    const newPost = {
      id: `post-${Date.now()}`,
      communityId: id,
      title: title.trim(),
      body: body.trim(),
      author: 'You',
      role: 'Member',
      upvotes: 1,
      tags: [selectedTag, 'New'],
      createdAt: 'Just now',
      comments: []
    };

    navigate(`/communities/${id}`, { state: { newPost } });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Button variant="ghost" onClick={() => navigate(`/communities/${id}`)} className="mb-4 px-0 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to community
      </Button>

      <Card className="overflow-hidden border border-primary-100 bg-gradient-to-br from-white to-primary-50/60">
        <div className="border-b border-primary-100 bg-white/80 p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-primary-600">
            <Sparkles className="h-4 w-4" /> Share with {community.name}
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Create a new post</h1>
          <p className="mt-2 text-sm text-slate-600">Spark a helpful discussion around career growth, product practice, or research wins.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
            <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What are you looking for today?" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Body</label>
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              rows="6"
              placeholder="Share context, ask a question, or post a useful resource..."
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Topic</label>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${selectedTag === tag ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white/80 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">Ready to publish?</p>
              <p className="text-sm text-slate-500">Your post will appear instantly for the community.</p>
            </div>
            <Button type="submit" variant="primary">
              Publish post
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
