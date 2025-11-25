'use client';

import ReactMarkdown from 'react-markdown';
import { Article } from '@/types';
import { LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto px-4"
    >
      <article className="space-y-8">
        {/* Hero Image with Overlay */}
        <div className="relative h-96 rounded-lg overflow-hidden group">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Title Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Article Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium text-foreground">{article.author.name}</span>
          </div>
          <span>•</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{article.readTime} min read</span>
          <span>•</span>
          <span className="text-cyan-400">{article.views.toLocaleString()} views</span>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-foreground/80 leading-relaxed">
            {article.content}
          </p>
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-sm hover:bg-cyan-500/20 transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Sources */}
        {article.sources && article.sources.length > 0 && (
          <div className="border-t border-border pt-8">
            <h3 className="font-bold text-lg mb-4 text-foreground flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-cyan-400" />
              Sources
            </h3>
            <ul className="space-y-3">
              {article.sources.map((source, idx) => (
                <li key={idx}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition group"
                  >
                    <LinkIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </motion.div>
  );
}
