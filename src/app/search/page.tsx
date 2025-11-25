'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { PageTransition } from '@/components/layout/PageTransition';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Bar */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-6">Search Articles</h1>
            <SearchBar
              initialQuery={query}
              onSearch={(newQuery) => {
                setQuery(newQuery);
                const params = new URLSearchParams();
                params.set('q', newQuery);
                window.history.replaceState({}, '', `/search?${params.toString()}`);
              }}
            />
          </div>

          {/* Results */}
          {query && <SearchResults query={query} />}
        </div>
      </PageTransition>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageContent />
    </Suspense>
  );
}
