import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Eye, Heart, Share2 } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold text-white">VirtualFit</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild className="text-white hover:bg-white/10">
              <Link href="/catalog">Shop</Link>
            </Button>
            {user ? (
              <>
                <Button variant="ghost" asChild className="text-white hover:bg-white/10">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/logout">Sign Out</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-white hover:bg-white/10">
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-balance">
            Try Before You Buy
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto text-balance">
            Experience clothes, glasses, hats, jewelry, and watches in augmented reality. See how
            they look on you before making a purchase.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" asChild className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/catalog">Start Shopping</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white/20">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why VirtualFit?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Eye,
              title: 'Real-Time AR',
              description: 'See products on you instantly using your webcam',
            },
            {
              icon: Heart,
              title: 'Save Favorites',
              description: 'Keep track of products you love for later',
            },
            {
              icon: Share2,
              title: 'Share Results',
              description: 'Capture and share your try-ons with friends',
            },
            {
              icon: Sparkles,
              title: '5+ Categories',
              description: 'Glasses, clothing, hats, jewelry, and watches',
            },
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
                <Icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Shop Smarter?</h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Browse our collection and try on items in AR. Get the perfect fit, every time.
          </p>
          <Button size="lg" asChild className="bg-white text-purple-600 hover:bg-slate-100">
            <Link href="/catalog">Explore Collection</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-900/50 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; 2024 VirtualFit. Try before you buy.</p>
        </div>
      </footer>
    </main>
  );
}
