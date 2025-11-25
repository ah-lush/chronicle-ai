import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { ArticleCard } from '@/components/common/ArticleCard';
import { CategoryChip } from '@/components/common/CategoryChip';
import { createCaller } from '@/lib/trpc/server';
import { CATEGORIES } from '@/lib/constants';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  return {
    title: `${category?.name || 'Category'} | Chronicle AI`,
    description: category?.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  const caller = await createCaller();

  if (!category) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-gray-600 dark:text-gray-400">
            Category not found
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const response = await caller.article.getByCategory({
    category: category.slug,
    limit: 20,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <PageTransition>
        {/* Category Header */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4 capitalize">{category.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {category.description}
            </p>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex overflow-x-auto gap-3 pb-4">
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat.id}
                slug={cat.slug}
                name={cat.name}
                selected={cat.slug === category.slug}
              />
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {response.items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No articles found in this category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {response.items.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </PageTransition>
      <Footer />
    </div>
  );
}
