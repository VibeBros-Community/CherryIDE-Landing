import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Introducing Cherry IDE: The Future of Local AI Coding",
      excerpt: "Today we're launching Cherry IDE public beta. Discover how you can code with powerful AI assistance completely offline, keeping your code private and secure.",
      date: "February 1, 2026",
      readTime: "5 min read",
      category: "Announcement",
      slug: "#"
    },
    {
      id: 2,
      title: "How to Optimize Llama 3 for Coding Tasks",
      excerpt: "Learn the best prompt engineering techniques and configuration settings to get the most out of Llama 3 running locally on your machine within Cherry IDE.",
      date: "January 28, 2026",
      readTime: "8 min read",
      category: "Tutorial",
      slug: "#"
    },
    {
      id: 3,
      title: "Benchmarking Local LLMs: Speed vs Accuracy",
      excerpt: "We tested Mistral, Llama, and CodeQwen on consumer hardware. Here are the results and our recommendations for different hardware configurations.",
      date: "January 15, 2026",
      readTime: "12 min read",
      category: "Engineering",
      slug: "#"
    },
    {
      id: 4,
      title: "The Importance of Privacy in AI-Assisted Development",
      excerpt: "Why sending your proprietary code to the cloud might be a risk, and how local AI models solve this problem without compromising on productivity.",
      date: "January 5, 2026",
      readTime: "6 min read",
      category: "Opinion",
      slug: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The <span className="text-cherry-500">Cherry</span> Blog
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              News, tutorials, and insights about AI, software development, and the future of Cherry IDE.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="bg-dark-surface border-dark-border hover:border-cherry-500/50 transition-all duration-300 group flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-semibold text-cherry-400 bg-cherry-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-cherry-400 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-6 border-t border-dark-border/50">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <Link 
                    href={post.slug} 
                    className="flex items-center gap-2 text-cherry-500 font-medium hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500">
              Want to contribute? <a href="#" className="text-cherry-500 hover:underline">Submit a guest post</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
