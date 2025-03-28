import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Clock, Calendar, User } from 'lucide-react';
import Navigation from '../components/Navigation';
import { ScrollProgress } from '../components/ScrollProgress';
import Footer from '../components/Footer';
import { blogPosts } from '../types/blog';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Grid Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 grid-background opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <Navigation />
        <ScrollProgress />

        <article className="container mx-auto px-4 py-24 max-w-4xl">
          {/* Article Header */}
          <header className="mb-16">
            <h1 className="text-4xl font-bold mb-8 glitch">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-invert prose-purple max-w-none">
            {post.content.map((section, index) => {
              if (index % 2 === 0) {
                return (
                  <h2 key={index} className="text-2xl font-bold mb-6 text-purple-400">
                    {section}
                  </h2>
                );
              } else {
                return (
                  <div 
                    key={index} 
                    className="mb-12 text-gray-300 whitespace-pre-wrap"
                    style={{ lineHeight: '1.8' }}
                  >
                    {section}
                  </div>
                );
              }
            })}
          </div>
        </article>
        <Footer />
      </div>
    </div>
  );
}