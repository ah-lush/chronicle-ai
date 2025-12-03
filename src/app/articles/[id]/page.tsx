import { ArticleDetailPage } from "@/components/article/ArticleDetailPage";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata = {
  title: "Article | Chronicle AI",
  description: "Read the full article",
};

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: ArticlePageProps) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <PageTransition>
          <ArticleDetailPage articleId={id} />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
