import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedArticles } from '@/components/home/FeaturedArticles';
import { LatestArticles } from '@/components/home/LatestArticles';
import { PageTransition } from '@/components/layout/PageTransition';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <PageTransition>
        <HeroSection />
        <FeaturedArticles />
        <LatestArticles />
      </PageTransition>
      <Footer />
    </div>
  );
}
