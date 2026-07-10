import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookMarked, CalendarDays, Compass, ExternalLink, MessageSquareText, PlusCircle, Search, SlidersHorizontal, Users } from 'lucide-react';
import { communities, communityAlumni, communityEvents, communityPosts, communityResources } from '../data/dummyData';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Input } from '../components/Input';
import PostCard from '../components/PostCard';

export default function CommunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const community = communities.find((item) => item.id === id) || communities[0];

  const [posts, setPosts] = useState([]);
  const [upvotedPostIds, setUpvotedPostIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => {
    const basePosts = communityPosts.filter((post) => post.communityId === id);
    const incomingPost = location.state?.newPost;
    setPosts(incomingPost ? [incomingPost, ...basePosts] : basePosts);
    setUpvotedPostIds([]);
    setSearchTerm('');
    setActiveTag('All');
  }, [id, location.state?.newPost?.id]);

  const allTags = useMemo(() => {
    const tags = posts.flatMap((post) => post.tags || []);
    return ['All', ...new Set(tags)];
  }, [posts]);

  const trendingTags = useMemo(() => {
    const counts = posts.reduce((acc, post) => {
      (post.tags || []).forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [posts]);

  const visiblePosts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesTag = activeTag === 'All' || post.tags.includes(activeTag);
      const matchesSearch =
        normalized.length === 0 ||
        `${post.title} ${post.body} ${post.tags.join(' ')}`.toLowerCase().includes(normalized);

      return matchesTag && matchesSearch;
    });
  }, [activeTag, posts, searchTerm]);

  const handleUpvote = (postId) => {
    if (upvotedPostIds.includes(postId)) return;

    setPosts((currentPosts) =>
      currentPosts.map((post) => (post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post))
    );
    setUpvotedPostIds((current) => [...current, postId]);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-slate-900 dark:text-slate-100">
      <Button variant="ghost" as={Link} to="/communities" className="mb-4 px-0 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to communities
      </Button>

      <section className="overflow-hidden rounded-[28px] bg-gradient-to-r from-primary-600 via-fuchsia-600 to-secondary-600 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm text-white/80">
              <Compass className="h-4 w-4" /> Community hub
            </div>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{community.name}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">{community.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge className="border-white/20 bg-white/15 text-white">{community.category}</Badge>
              <Badge className="border-white/20 bg-white/15 text-white">{community.membersCount} members</Badge>
              <Badge className="border-white/20 bg-white/15 text-white">Active {community.lastActive}</Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => navigate(`/communities/${id}/create-post`)} className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Create post
            </Button>
            <Button variant="outline" as={Link} to={`/resources?category=${encodeURIComponent(community.category)}`} className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white">
              Browse resources
            </Button>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
        <div className="space-y-5">
          <Card className="p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search posts or topics"
                  className="pl-9"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                  <SlidersHorizontal className="h-4 w-4" /> Filter
                </span>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${activeTag === tag ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {visiblePosts.length === 0 ? (
            <Card className="p-8 text-center">
              <MessageSquareText className="mx-auto h-8 w-8 text-slate-400" />
              <h2 className="mt-3 text-lg font-semibold text-slate-800">No posts yet for this search</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Try another keyword or start the conversation yourself.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {visiblePosts.map((post) => (
                <PostCard key={post.id} post={post} onUpvote={handleUpvote} isUpvoted={upvotedPostIds.includes(post.id)} />
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <Card className="p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <BookMarked className="h-4 w-4 text-primary-600" />
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Pinned resources</h2>
            </div>
            <div className="mt-4 space-y-3">
              {communityResources.filter((resource) => resource.communityId === id).map((resource) => (
                <a key={resource.id} href={resource.href} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 transition hover:border-primary-200 hover:bg-primary-50/70">
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{resource.title}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{resource.type}</p>
                  </div>
                  <ExternalLink className="mt-1 h-4 w-4 text-slate-400" />
                </a>
              ))}
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <MessageSquareText className="h-4 w-4 text-secondary-600" />
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Trending topics</h2>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {trendingTags.length > 0 ? (
                trendingTags.map(([tag, count]) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    #{tag} · {count}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-slate-500">No topic data yet.</p>
              )}
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary-600" />
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Popular alumni</h2>
            </div>
            <div className="mt-4 space-y-3">
              {communityAlumni.filter((alumni) => alumni.communityId === id).map((alumni) => (
                <div key={alumni.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
                  <Avatar name={alumni.name} className="h-10 w-10" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{alumni.name}</p>
                    <p className="text-xs text-slate-500">{alumni.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-secondary-600" />
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Upcoming events</h2>
            </div>
            <div className="mt-4 space-y-3">
              {communityEvents.filter((event) => event.communityId === id).map((event) => (
                <div key={event.id} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
                  <p className="text-sm font-semibold text-slate-800">{event.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{event.date}</p>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
