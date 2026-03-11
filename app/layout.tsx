import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import { finalExamMetadata } from '@/lib/finalExamContent';

export const metadata: Metadata = {
  title: finalExamMetadata.title,
  description: finalExamMetadata.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-transparent text-slate-900 antialiased">
        <div className="min-h-screen pastel-grid">
          <Navigation />
          <main className="max-w-5xl mx-auto px-4 py-10">
            <div className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_35px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
