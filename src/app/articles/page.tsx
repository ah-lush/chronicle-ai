import ArticlesPage from "@/components/article/Articlespage";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata = {
  title: "Explore Articles | Chronicle AI",
  description: "Discover insightful stories, expert opinions, and thought-provoking content",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <PageTransition>
          <ArticlesPage />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
