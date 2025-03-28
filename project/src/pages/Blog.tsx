import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, User } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { BlogPost, blogPosts } from '../types/blog';

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link to={`/blog/${post.id}`} className="block">
      <article className="card group hover:cursor-pointer">
        <h2 className="text-2xl font-bold mb-4 text-purple-400 group-hover:text-purple-300 transition-colors">
          {post.title}
        </h2>
        
        <div className="flex items-center gap-6 mb-4 text-sm text-gray-400">
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
        
        <p className="text-gray-300">
          {post.teaser}
        </p>
        
        <div className="mt-6 flex items-center text-purple-500 group-hover:text-purple-400 transition-colors">
          <span className="mr-2">Read More</span>
          <span className="transform group-hover:translate-x-2 transition-transform">&rarr;</span>
        </div>
      </article>
    </Link>
  );
}

export default function Blog() {
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

        {/* Hero Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-4xl font-bold text-center mb-8 glitch">
              Latest Insights & Strategies
            </h1>
            <p className="text-xl text-center text-purple-400 mb-16 max-w-3xl mx-auto">
              Discover how AI automation is transforming businesses and learn actionable strategies to scale your operations.
            </p>

            {/* Blog Posts Grid */}
            <div className="grid gap-8">
              {blogPosts.map((post, index) => (
                <BlogPostCard key={index} post={post} />
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}