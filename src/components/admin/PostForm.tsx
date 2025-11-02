// components/PostForm.tsx
"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  author: z.string().min(2, "Author name must be at least 2 characters"),
  article: z.string().min(100, "Article must be at least 100 characters"),
  image: z.any().optional(),
}).refine(
  (data) => !data.image || data.image instanceof FileList,
  { message: "Please upload a valid image", path: ["image"] }
);

type FormData = z.infer<typeof formSchema>;

type PostFormProps = {
  closeModal: () => void;
  onSubmit: SubmitHandler<FormData>;
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
};

export default function PostForm({
  closeModal,
  onSubmit,
  imagePreview,
  setImagePreview,
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const watchedImage = watch("image");

  useEffect(() => {
    if (watchedImage?.[0]) {
      const file = watchedImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [watchedImage, setImagePreview]);

  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    onSubmit({ ...data, imagePreview }); // Pass preview URL if needed
    reset();
    setImagePreview(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Create New Post</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter article title"
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author Name
            </label>
            <input
              {...register("author")}
              type="text"
              id="author"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter author name"
            />
            {errors.author && <p className="text-red-600 text-sm mt-1">{errors.author.message}</p>}
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            <input
              {...register("image")}
              type="file"
              id="image"
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
            {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>}

            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                <Image
                  src={imagePreview}
                  alt="Image preview"
                  width={800}
                  height={400}
                  className="max-h-64 w-full object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* Article */}
          <div>
            <label htmlFor="article" className="block text-sm font-medium text-gray-700 mb-2">
              Article Content
            </label>
            <textarea
              {...register("article")}
              id="article"
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-vertical"
              placeholder="Write your article here..."
            />
            {errors.article && <p className="text-red-600 text-sm mt-1">{errors.article.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}