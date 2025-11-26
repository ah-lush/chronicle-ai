"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchResults } from "@/components/search/SearchResults";
import { PageTransition } from "@/components/layout/PageTransition";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Header />
      <main className="flex-1">
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
              <h1 className="text-3xl font-bold mb-6">Search Articles</h1>
              <SearchBar
                initialQuery={query}
                onSearch={(newQuery) => {
                  setQuery(newQuery);
                  const params = new URLSearchParams();
                  params.set("q", newQuery);
                  window.history.replaceState(
                    {},
                    "",
                    `/search?${params.toString()}`
                  );
                }}
              />
            </div>

            {query && <SearchResults query={query} />}
          </div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" />}>
      <SearchPageContent />
    </Suspense>
  );
}
