import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useContent } from '../context/ContentContext';
import ReactMarkdown from 'react-markdown';

export function ReturnsPage() {
  const { pages } = useContent();
  const returnsPage = pages.find(p => p.id === 'returns');

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="prose prose-amber prose-lg dark:prose-invert max-w-none text-neutral-900 dark:text-white">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-neutral-900 dark:text-white" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-neutral-900 dark:text-white" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-neutral-900 dark:text-white" {...props} />,
                p: ({node, ...props}) => <p className="text-neutral-700 dark:text-neutral-200" {...props} />,
                ul: ({node, ...props}) => <ul className="text-neutral-700 dark:text-neutral-200" {...props} />,
                li: ({node, ...props}) => <li className="text-neutral-700 dark:text-neutral-200" {...props} />,
                strong: ({node, ...props}) => <strong className="text-neutral-900 dark:text-white" {...props} />
              }}
            >
              {returnsPage?.content || ''}
            </ReactMarkdown>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}