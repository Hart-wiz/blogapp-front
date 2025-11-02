"use client"
import React, { useState } from 'react';
import { Search, Menu, X, ArrowRight, Heart, MessageCircle, Share2, Calendar, User } from 'lucide-react';

const BlogSite: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (postId: number) => {
    setLikedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const posts = [
    {
      id: 1,
      title: 'The Future of Web Development',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      author: 'Sarah Chen',
      date: 'Nov 1, 2025',
      readTime: '5 min read',
      category: 'Development',
      likes: 234,
    },
    {
      id: 2,
      title: 'Mastering TypeScript for Large Projects',
      excerpt: 'A comprehensive guide to using TypeScript effectively in enterprise applications.',
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      author: 'Alex Rodriguez',
      date: 'Oct 30, 2025',
      readTime: '8 min read',
      category: 'Tutorial',
      likes: 189,
    },
    {
      id: 3,
      title: 'Building Scalable React Applications',
      excerpt: 'Best practices and patterns for creating maintainable React applications at scale.',
      image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      author: 'Jordan Lee',
      date: 'Oct 28, 2025',
      readTime: '6 min read',
      category: 'React',
      likes: 312,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold">
                B
              </div>
              <span className="font-bold text-xl hidden sm:inline">BlogHub</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="hover:text-purple-400 transition">Home</a>
              <a href="#" className="hover:text-purple-400 transition">Articles</a>
              <a href="#" className="hover:text-purple-400 transition">Categories</a>
              <a href="#" className="hover:text-purple-400 transition">About</a>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center bg-gray-900 rounded-lg px-3 py-2 border border-gray-800 hover:border-purple-500 transition">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent ml-2 outline-none text-sm w-32"
                />
              </div>

              <button className="hidden sm:block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition font-medium text-sm">
                Subscribe
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-900 rounded-lg"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-3 border-t border-gray-800 pt-4">
              <a href="#" className="block hover:text-purple-400 transition">Home</a>
              <a href="#" className="block hover:text-purple-400 transition">Articles</a>
              <a href="#" className="block hover:text-purple-400 transition">Categories</a>
              <a href="#" className="block hover:text-purple-400 transition">About</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to BlogHub
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Discover cutting-edge articles about web development, design, and technology trends from industry experts.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition font-medium flex items-center gap-2">
              Explore Articles <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg hover:border-purple-500 transition font-medium">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-12">Featured Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 hover:bg-gray-900 transition"
            >
              {/* Post Image */}
              <div
                className="h-48 bg-cover bg-center group-hover:scale-105 transition duration-300"
                style={{ background: post.image }}
              />

              {/* Post Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full font-medium">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-800">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1 text-sm transition ${
                      likedPosts.includes(post.id)
                        ? 'text-pink-500'
                        : 'text-gray-500 hover:text-pink-500'
                    }`}
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={likedPosts.includes(post.id) ? 'currentColor' : 'none'}
                    />
                    {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-400 transition">
                    <MessageCircle className="w-4 h-4" /> Comment
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-400 transition ml-auto">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 my-12">
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Subscribe to get the latest articles delivered to your inbox every week.
          </p>
          <div className="flex gap-2 max-w-md mx-auto flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg outline-none focus:border-purple-500 transition"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">BlogHub</h4>
              <p className="text-sm text-gray-500">
                Your source for modern web development insights and tutorials.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-purple-400 transition">Home</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Articles</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-purple-400 transition">Development</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Design</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Tutorial</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-purple-400 transition">Twitter</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">GitHub</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2025 BlogHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogSite;