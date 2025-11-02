// app/admin/dashboard/page.tsx
"use client";

import { useState } from "react";
import PostForm from "@/components/admin/PostForm";

type Post = {
  title: string;
  author: string;
  article: string;
  imagePreview?: string;
};

export default function BlogAdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const handleSubmit = (data: any) => {
    setPosts([
      {
        title: data.title,
        author: data.author,
        article: data.article,
        imagePreview: imagePreview || undefined,
      },
      ...posts,
    ]);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Blog Admin</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition"
          >
            + New Post
          </button>
        </header>

        {isModalOpen && (
          <PostForm
            closeModal={closeModal}
            onSubmit={handleSubmit}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview} // ← THIS IS CRITICAL
          />
        )}

        <div className="grid gap-6 mt-8">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No posts yet. Create your first one!</p>
          ) : (
            posts.map((post, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                {post.imagePreview && (
                  <img src={post.imagePreview} alt="Post" className="w-full h-64 object-cover rounded-md mb-4" />
                )}
                <h3 className="text-2xl font-bold text-gray-800">{post.title}</h3>
                <p className="text-sm text-gray-600">By {post.author}</p>
                <p className="mt-3 text-gray-700 line-clamp-3">{post.article}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}