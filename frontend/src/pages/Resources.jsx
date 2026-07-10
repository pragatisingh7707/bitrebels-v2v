import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bookmark, BookmarkCheck, Download, Search, Sparkles } from 'lucide-react';
import { resourceLibrary } from '../data/dummyData';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Input } from '../components/Input';

const categoryOptions = ['All', 'Resume', 'Interview', 'Scholarships', 'Research', 'Women in Tech', 'Entrepreneurship', 'Books', 'Courses'];

export default function Resources() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedIds, setSavedIds] = useState(() => new Set(resourceLibrary.filter((resource) => resource.bookmarked).map((resource) => resource.id)));

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryOptions.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  const visibleResources = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return resourceLibrary.filter((resource) => {
      const matchesCategory = activeCategory === 'All' || resource.category === activeCategory;
      const matchesSearch =
        normalized.length === 0 ||
        `${resource.title} ${resource.description}`.toLowerCase().includes(normalized);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const toggleSaved = (resourceId) => {
    setSavedIds((current) => {
      const next = new Set(current);
      if (next.has(resourceId)) {
        next.delete(resourceId);
      } else {
        next.add(resourceId);
      }
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[28px] bg-gradient-to-r from-primary-600 via-fuchsia-600 to-secondary-600 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm text-white/80">
              <Sparkles className="h-4 w-4" /> Curated for your next step
            </div>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">HerConnect resources</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
              Browse alumni-curated guides, interview prep material, scholarships, books, and courses in one place.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/80">
            <div className="font-semibold text-white">{resourceLibrary.length} resources</div>
            <p className="mt-1">Updated weekly by alumni mentors.</p>
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by title or description"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${activeCategory === category ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleResources.map((resource) => {
          const isSaved = savedIds.has(resource.id);

          return (
            <Card key={resource.id} className="flex h-full flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <Badge variant="primary">{resource.category}</Badge>
                <button
                  type="button"
                  onClick={() => toggleSaved(resource.id)}
                  className={`rounded-full p-2 transition ${isSaved ? 'bg-primary-50 text-primary-600' : 'bg-slate-100 text-slate-500 hover:bg-primary-50 hover:text-primary-600'}`}
                  aria-label={isSaved ? 'Remove bookmark' : 'Save resource'}
                >
                  {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                </button>
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-900">{resource.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{resource.description}</p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <Badge variant="secondary">{resource.type}</Badge>
                <Button as="a" href={resource.url} target="_blank" rel="noreferrer" variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" /> Open
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {visibleResources.length === 0 && (
        <Card className="mt-8 p-8 text-center">
          <p className="text-lg font-semibold text-slate-800">No resources match this search yet.</p>
          <p className="mt-2 text-sm text-slate-500">Try another keyword or switch to a different category.</p>
        </Card>
      )}
    </div>
  );
}
