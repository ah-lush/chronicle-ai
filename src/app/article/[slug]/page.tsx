import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticleContent } from '@/components/article/ArticleContent';
import { RelatedArticles } from '@/components/article/RelatedArticles';
import { PageTransition } from '@/components/layout/PageTransition';
import { createCaller } from '@/lib/trpc/server';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caller = await createCaller();
  const article = await caller.article.getBySlug({ slug });

  return {
    title: `${article.title} | Chronicle AI`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.coverImage }],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const caller = await createCaller();
  const article = await caller.article.getBySlug({ slug });

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <PageTransition>
        <div className="py-12">
          <ArticleContent article={article} />
        </div>
        <RelatedArticles articles={article.relatedArticles} />
      </PageTransition>
      <Footer />
    </div>
  );
}
