"use client"

import React, { useState } from 'react';
import {
  Menu, X, LogOut, Settings, Bell, Search, ChevronDown,
  BarChart3, FileText, Users, Eye, MessageSquare, TrendingUp,
  Edit2, Trash2, Plus, Filter, Download, ArrowUp, ArrowDown
} from 'lucide-react';
import AdminNav from '@/components/admin/AdminNav';
import ChartHolder from '@/components/admin/ChartHolder';
import RecentCard from '@/components/admin/RecentCard';
import PostForm from '@/components/admin/PostForm';


interface Post {
  id: number;
  title: string;
  author: string;
  status: 'published' | 'draft' | 'pending';
  views: number;
  comments: number;
  date: string;
}

interface Stat {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setImagePreview(null);
  };
  const handleSubmit = (data: any) => {
    
    setIsModalOpen(false);
  };


  const stats: Stat[] = [
    {
      label: 'Total Views',
      value: '24,580',
      change: 12.5,
      icon: <Eye className="w-6 h-6" />,
    },
    {
      label: 'Published Posts',
      value: '45',
      change: 8.2,
      icon: <FileText className="w-6 h-6" />,
    },
    {
      label: 'Total Users',
      value: '1,234',
      change: -2.1,
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: 'Comments',
      value: '892',
      change: 18.7,
      icon: <MessageSquare className="w-6 h-6" />,
    },
  ];

  const posts: Post[] = [
    {
      id: 1,
      title: 'The Future of Web Development',
      author: 'Sarah Chen',
      status: 'published',
      views: 3420,
      comments: 24,
      date: 'Nov 1, 2025',
    },
    {
      id: 2,
      title: 'Mastering TypeScript for Large Projects',
      author: 'Alex Rodriguez',
      status: 'published',
      views: 2890,
      comments: 18,
      date: 'Oct 30, 2025',
    },
    {
      id: 3,
      title: 'Building Scalable React Applications',
      author: 'Jordan Lee',
      status: 'draft',
      views: 0,
      comments: 0,
      date: 'Oct 28, 2025',
    },
    {
      id: 4,
      title: 'Advanced CSS Techniques',
      author: 'Emma Wilson',
      status: 'pending',
      views: 1240,
      comments: 12,
      date: 'Oct 25, 2025',
    },
    {
      id: 5,
      title: 'Node.js Performance Optimization',
      author: 'Michael Park',
      status: 'published',
      views: 2156,
      comments: 15,
      date: 'Oct 22, 2025',
    },
  ];

  const togglePostSelection = (postId: number) => {
    setSelectedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleAllPosts = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(posts.map(p => p.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'draft':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
       
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center w-full'}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-sm">
              A
            </div>
            {sidebarOpen && <span className="font-bold text-lg">Admin</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: <BarChart3 className="w-5 h-5" />, label: 'Dashboard', id: 'dashboard' },
            { icon: <FileText className="w-5 h-5" />, label: 'Posts', id: 'posts' },
            { icon: <Users className="w-5 h-5" />, label: 'Users', id: 'users' },
            { icon: <MessageSquare className="w-5 h-5" />, label: 'Comments', id: 'comments' },
            { icon: <Settings className="w-5 h-5" />, label: 'Settings', id: 'settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/50 text-purple-300'
                  : 'hover:bg-gray-800 text-gray-400'
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-400 transition">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex-1 max-w-md ml-6">
            <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2 border border-gray-700 hover:border-purple-500 transition">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search posts, users..."
                className="bg-transparent ml-2 outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-6">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-800">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold">
                SC
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-medium">Sarah Chen</p>
                <p className="text-gray-500 text-xs">Administrator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">

            {/* .........................when active tab is dashboard...................... */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition font-medium text-sm">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                        {stat.icon}
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm font-medium ${
                          stat.change >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {stat.change >= 0 ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        )}
                        {Math.abs(stat.change)}%
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartHolder/>


                {/* Recent activity card */}
                <RecentCard/>
                
              </div>
            </div>
          )}

          {/* ......................................when active tab is posts.............................. */}

          {activeTab === 'posts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h1 className="text-3xl font-bold">Manage Posts</h1>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-purple-500 transition text-sm">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <button   onClick={() => setIsModalOpen(true)}   className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition font-medium text-sm">
                    <Plus className="w-4 h-4" />
                    New Post
                  </button>
                </div>
                
                {isModalOpen && (
                <PostForm
                    closeModal={closeModal}
                    onSubmit={handleSubmit}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview} // ← THIS IS CRITICAL
                />
                )}
{/*                         
                {isModalOpen && (
                <PostForm
                    closeModal={closeModal}
                    onSubmit={handleSubmit}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview} // ← THIS IS CRITICAL
                />
                )} */}
              </div>

              {/* Posts Table */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-800/50 border-b border-gray-800">
                        <th className="px-6 py-4 text-left">
                          <input
                            type="checkbox"
                            checked={selectedPosts.length === posts.length}
                            onChange={toggleAllPosts}
                            className="w-4 h-4 rounded cursor-pointer"
                          />
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Author</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Views</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Comments</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <tr
                          key={post.id}
                          className="border-b border-gray-800 hover:bg-gray-800/30 transition"
                        >
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedPosts.includes(post.id)}
                              onChange={() => togglePostSelection(post.id)}
                              className="w-4 h-4 rounded cursor-pointer"
                            />
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">{post.title}</td>
                          <td className="px-6 py-4 text-sm text-gray-400">{post.author}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusColor(post.status)}`}>
                              {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">{post.views.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-400">{post.comments}</td>
                          <td className="px-6 py-4 text-sm text-gray-400">{post.date}</td>
                          <td className="px-6 py-4 flex gap-2">
                            <button className="p-2 hover:bg-gray-700 rounded transition">
                              <Edit2 className="w-4 h-4 text-blue-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-700 rounded transition">
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between text-sm">
                  <span className="text-gray-400">Showing 1-5 of 45 posts</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 transition">Previous</button>
                    <button className="px-3 py-1 bg-purple-500 rounded">1</button>
                    <button className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 transition">2</button>
                    <button className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 transition">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* ..........................others when active tab is not dashboard nor post use coming soon................. */}

          {activeTab !== 'dashboard' && activeTab !== 'posts' && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <p className="text-2xl font-bold mb-2">Coming Soon</p>
                <p className="text-gray-400">This section is under development.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;