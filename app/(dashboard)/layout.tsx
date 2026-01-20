'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
