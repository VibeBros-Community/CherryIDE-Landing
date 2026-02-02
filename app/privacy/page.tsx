import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400">Last updated: February 1, 2026</p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-cherry-500 prose-strong:text-white">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-cherry-400">1. Introduction</h2>
              <p>
                Cherry IDE (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Cherry IDE.
              </p>
              <p>
                Our core philosophy is <strong>local-first</strong>. Cherry IDE is designed to run entirely on your machine, meaning your code and data stay with you.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-cherry-400">2. Data We Collect</h2>
              <p>
                Since Cherry IDE runs locally, we collect minimal data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>
                  <strong>Usage Telemetry (Optional):</strong> If you opt-in, we collect anonymous usage statistics (e.g., features used, crash reports) to help us improve the software. This data never includes your code or personal files.
                </li>
                <li>
                  <strong>Account Information:</strong> If you sign up for our cloud synchronization services (coming soon), we will collect your email address and authentication credentials.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-cherry-400">3. How We Use Your Data</h2>
              <p>
                We use the limited data we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Identify bugs and crash patterns.</li>
                <li>Prioritize new features based on usage.</li>
                <li>Send critical updates (if you subscribe to our newsletter).</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-cherry-400">4. Your Code</h2>
              <p>
                <strong>Your code never leaves your machine.</strong> Unlike cloud-based AI tools, Cherry IDE runs LLMs (Large Language Models) locally on your hardware. We do not have access to your codebase, file contents, or intellectual property.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-cherry-400">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@cherryide.com">privacy@cherryide.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
