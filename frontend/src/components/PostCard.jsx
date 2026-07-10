import React, { useState } from 'react';
import { ChevronUp, MessageCircle, Sparkles } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { Input } from './Input';

function renderCommentTree(comments, depth = 0) {
  return comments.map((comment) => (
    <div key={comment.id} className="rounded-2xl border border-slate-100 bg-white/80 p-3" style={{ marginLeft: depth * 12 }}>
      <div className="flex items-start gap-2">
        <Avatar name={comment.author} className="h-8 w-8 text-xs" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-slate-800">{comment.author}</p>
            <span className="text-[11px] text-slate-400">{comment.createdAt}</span>
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-600">{comment.body}</p>
          {comment.replies?.length > 0 && (
            <div className="mt-3 space-y-2">{renderCommentTree(comment.replies, depth + 1)}</div>
          )}
        </div>
      </div>
    </div>
  ));
}

export default function PostCard({ post, onUpvote, isUpvoted }) {
  const [commentDraft, setCommentDraft] = useState('');
  const [comments, setComments] = useState(post.comments || []);

  const handleAddComment = (event) => {
    event.preventDefault();
    if (!commentDraft.trim()) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      author: 'You',
      role: 'Member',
      body: commentDraft.trim(),
      createdAt: 'Just now',
      replies: []
    };

    setComments([newComment, ...comments]);
    setCommentDraft('');
  };

  return (
    <Card className="overflow-visible bg-white/90">
      <div className="flex gap-3 p-4 sm:p-5">
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2">
          <button
            type="button"
            onClick={() => onUpvote(post.id)}
            className={`rounded-full p-2 transition ${isUpvoted ? 'bg-primary-600 text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-primary-50 hover:text-primary-600'}`}
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold text-slate-700">{post.upvotes}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant={tag === post.tags[0] ? 'primary' : 'slate'}>{tag}</Badge>
            ))}
            <span className="text-[11px] text-slate-400">• {post.createdAt}</span>
          </div>

          <h3 className="mt-3 text-lg font-semibold text-slate-900">{post.title}</h3>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <Avatar name={post.author} className="h-8 w-8 text-xs" />
            <div>
              <p className="font-medium text-slate-700">{post.author}</p>
              <p className="text-xs text-slate-400">{post.role}</p>
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-600">{post.body}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" />
              {comments.length} comments
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              Community favorite
            </span>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-800">Discussion</h4>
              <span className="text-xs text-slate-500">Keep it supportive</span>
            </div>

            <div className="mt-3 space-y-3">{renderCommentTree(comments)}</div>

            <form onSubmit={handleAddComment} className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Input
                value={commentDraft}
                onChange={(event) => setCommentDraft(event.target.value)}
                placeholder="Add a thoughtful reply"
                className="h-10"
              />
              <Button type="submit" size="sm" variant="secondary">
                Reply
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Card>
  );
}
