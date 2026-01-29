'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'Is Cherry IDE really free?',
    answer: 'Yes! Cherry IDE is 100% free and open-source under the MIT license. There are no hidden costs, premium tiers, or subscription plans. You get full access to all features forever.',
  },
  {
    question: 'Which AI models are supported?',
    answer: 'Cherry IDE supports 15+ open-source AI models including Llama, Mistral, CodeLlama, DeepSeek Coder, Phi, and more. You can switch between models on-the-fly based on your needs—whether it\'s speed, accuracy, or specialized coding tasks.',
  },
  {
    question: 'Does my code leave my machine?',
    answer: 'No. All AI processing happens 100% locally on your machine. Your code, conversations, and data never leave your computer. We don\'t collect any telemetry or analytics.',
  },
  {
    question: 'What are the system requirements?',
    answer: 'Cherry IDE runs on Windows, macOS, and Linux. For optimal performance, we recommend at least 8GB RAM and a modern CPU. GPU acceleration is optional but recommended for faster AI inference.',
  },
  {
    question: 'Can I use Cherry IDE offline?',
    answer: 'Yes! Since all AI models run locally, you can use Cherry IDE completely offline. No internet connection required after initial setup and model downloads.',
  },
  {
    question: 'How does it compare to GitHub Copilot or Cursor?',
    answer: 'Unlike cloud-based solutions, Cherry IDE gives you complete privacy, no rate limits, and no recurring costs. You own and control your AI tools. Plus, it\'s open-source, so you can customize it to fit your workflow.',
  },
  {
    question: 'Can I contribute to Cherry IDE?',
    answer: 'Absolutely! Cherry IDE is open-source and we welcome contributions. Whether it\'s code, documentation, bug reports, or feature suggestions—check out our GitHub repository to get started.',
  },
  {
    question: 'How do I get support?',
    answer: 'Join our community on GitHub Discussions for help, questions, and feature requests. You can also check our documentation for guides and troubleshooting tips.',
  },
];

function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-white/5">
      <button
        onClick={onClick}
        className="w-full text-left py-6 flex items-start justify-between gap-4 group"
      >
        <span className="text-lg font-semibold text-white group-hover:text-cherry-500 transition-colors pr-8">
          {question}
        </span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-cherry-500 flex-shrink-0 transition-transform duration-300 mt-1',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        )}
      >
        <p className="text-gray-400 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-cherry-500 to-rose-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-lg text-gray-400">
              Everything you need to know about Cherry IDE
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-16 text-center p-8 rounded-xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-xl font-bold text-white mb-3">Still have questions?</h3>
            <p className="text-gray-400 mb-6">
              Can't find the answer you're looking for? Join our community.
            </p>
            <a
              href="https://github.com/yourusername/cherry-ide/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cherry-600 hover:bg-cherry-700 text-white rounded-lg transition-colors font-semibold"
            >
              Join GitHub Discussions
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
