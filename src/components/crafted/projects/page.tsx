import { ArrowRight, Calendar, Clock, Code, FileText } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import Container from "@/components/common/container/page";
import Image from "next/image";
import { initialBlogs } from "@/constants/data";

const BlogCard = ({ blog }: any) => {
  return (
    <div className="relative group w-full bg-black/80 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-blue-500 transition-all duration-300 cursor-pointer">
      <div className="flex flex-col h-full">
        <div className="relative overflow-hidden h-48">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900 z-10 transition-opacity duration-300 group-hover:opacity-80 opacity-60" />

          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            title={blog.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-2 bg-blue-600 bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg text-xs font-medium text-white">
              <Code className="w-4 h-4" />
              <span>{blog.category}</span>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-5 flex flex-col flex-grow relative z-20">
          {/* Title with gradient */}
          <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 line-clamp-2">
            {blog.title}
          </h3>

          {/* Summary with special styling */}
          <p className="text-gray-300 mb-4 line-clamp-3 font-light">
            {blog.summary}
          </p>

          {/* Metadata section */}
          <div className="mt-auto pt-3 border-t border-gray-800 flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-600/80 text-white p-3 flex items-center justify-center gap-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="font-medium">Read Article</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BlogsSection() {
  return (
    <Container>
      <div className="relative w-full py-16" id="blogs">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                Tech Insights
              </h2>
              <p className="text-gray-400 text-lg">
                Daily updates on the latest tech trends and innovations
              </p>
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <FileText className="text-blue-500 w-6 h-6" />
              <span className="text-gray-300 font-medium">
                {initialBlogs.length} Articles
              </span>
            </div>
          </div>

          <BlurFade>
            <>
              {initialBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {initialBlogs.map((blog: any) => (
                    <a
                      href={`/blogs/${blog.id}`}
                      title={`/blogs/${blog.id}`}
                      key={blog.id}
                    >
                      <BlogCard blog={blog} />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    No Blogs found
                  </h3>
                  <p className="text-gray-400 max-w-md">
                    We couldn't find any articles right now. Try some time later
                    when the owner of this website post one. post.
                  </p>
                </div>
              )}
            </>
          </BlurFade>
        </div>
      </div>
    </Container>
  );
}
