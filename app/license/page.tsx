import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">License</h1>
            <p className="text-gray-400">Cherry IDE is proudly open-source.</p>
          </div>

          <div className="bg-dark-surface p-8 rounded-xl border border-dark-border font-mono text-sm md:text-base text-gray-300 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
{`MIT License

Copyright (c) 2026 Cherry IDE

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
            </pre>
          </div>

          <div className="mt-12 prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300">
            <h2 className="text-2xl font-semibold mb-4 text-cherry-400">Third-Party Licenses</h2>
            <p>
              Cherry IDE incorporates various third-party open-source libraries and assets. A full list of dependencies and their respective licenses can be found in our <a href="https://github.com/cherryide/cherry-ide" className="text-cherry-500 hover:underline">GitHub repository</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
