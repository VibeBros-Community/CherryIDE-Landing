import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-400">Last updated: February 1, 2026</p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-cherry-500 prose-strong:text-white">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-cherry-400">1. Acceptance of Terms</h2>
              <p>
                By downloading, installing, or using Cherry IDE, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the software.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-cherry-400">2. License</h2>
              <p>
                Cherry IDE is open-source software. Most components are licensed under the MIT License. However, certain proprietary modules or assets may be subject to different licensing terms. Please check the specific license files in the repository or installation package.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-cherry-400">3. User Responsibilities</h2>
              <p>
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Ensuring your hardware meets the minimum requirements for running local AI models.</li>
                <li>Backing up your code and data. We are not responsible for data loss.</li>
                <li>Using the software in compliance with all applicable laws and regulations.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-cherry-400">4. Disclaimer of Warranties</h2>
              <p>
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-cherry-400">5. Limitation of Liability</h2>
              <p>
                In no event shall Cherry IDE be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the software.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-cherry-400">6. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any significant changes via our website or software update notifications.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
