import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navigation } from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'NetCyberAI Consumer Learning App — Daily Syllabus Companion',
  description:
    "Your child's school syllabus, explained every day in your language, with the best videos, quizzes and every government scheme you qualify for.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50/80 text-slate-900 pb-20 lg:pb-8 font-sans">
        <AppProvider>
          <Navigation />
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-5">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
