import { Calendar, Clock } from "lucide-react";
import { initialBlogs } from "@/constants/data";
import Container from "@/components/common/container/page";
import { use } from "react";
import Image from "next/image";

type Params = { id: string };
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  console.log("id => ", id);
  const blog = initialBlogs.find((b) => b.id.toString() === id);

  if (!blog) {
    return (
      <div className="flex-1 justify-center items-center flex min-h-96">
        <p className="text-white p-10">Blog not found</p>
      </div>
    );
  }

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-10 px-6">
        {/* Main Cover Image */}
        <div className="relative w-full h-80 rounded-lg mb-6 overflow-hidden">
          <Image
            src={blog.imageUrl}
            title={blog.title}
            alt={blog.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {blog.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {blog.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-6">{blog.title}</h1>

        {/* Content & Interleaved Images */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          {blog.content.map((para: string, idx: number) => (
            <div key={idx} className="space-y-4">
              <p>{para}</p>
              {blog.extraImages && blog.extraImages[idx] && (
                <div className="relative w-full h-80 rounded-lg mb-6 overflow-hidden">
                  <Image
                    src={blog.extraImages[idx]}
                    title={`extra-${idx}`}
                    alt={`extra-${idx}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-bold text-white my-6">Summary</h1>
        <p className="text-gray-300 mb-4 line-clamp-3 font-light">
          {blog.summary}
        </p>

        {/* Tags */}
        <div className="mt-12 border-t border-gray-800 pt-6 flex flex-wrap gap-2 text-sm">
          {blog.tags.map((tag: string, idx: number) => (
            <span
              key={idx}
              className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Container>
  );
}
