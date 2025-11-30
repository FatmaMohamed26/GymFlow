import { Link, useLocation } from "wouter";
import { Dumbbell, Menu, X, User, Activity, Calculator, Calendar, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Dumbbell },
    { href: "/workouts", label: "Programs", icon: Calendar },
    { href: "/exercises", label: "Exercises", icon: Activity },
    { href: "/calculator", label: "Nutrition", icon: Calculator },
    { href: "/progress", label: "Progress", icon: Activity },
  ];

  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 group">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                <Dumbbell className="h-6 w-6" />
              </div>
              <span className="text-2xl font-heading font-bold tracking-tighter uppercase">FitPulse</span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className={`text-sm font-medium transition-colors hover:text-primary uppercase tracking-wide ${
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                }`}>
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth">
              <Button variant="ghost" size="sm" className="gap-2">
                <LogIn className="h-4 w-4" /> Login
              </Button>
            </Link>
            <Link href="/auth?mode=signup">
              <Button size="sm">Join Now</Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <a 
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 text-lg font-medium py-2 border-b border-border/50 ${
                          isActive(item.href) ? "text-primary" : "text-foreground"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </a>
                    </Link>
                  ))}
                  <div className="flex flex-col gap-2 mt-4">
                    <Link href="/auth">
                      <Button className="w-full" variant="outline" onClick={() => setIsMobileOpen(false)}>Login</Button>
                    </Link>
                    <Link href="/auth?mode=signup">
                      <Button className="w-full" onClick={() => setIsMobileOpen(false)}>Join Now</Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground p-1 rounded">
                  <Dumbbell className="h-5 w-5" />
                </div>
                <span className="text-xl font-heading font-bold uppercase">FitPulse</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Premium fitness tracking and workout programs designed to help you reach your peak potential.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-bold mb-4 uppercase">Programs</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Strength Training</a></li>
                <li><a href="#" className="hover:text-primary">HIIT Cardio</a></li>
                <li><a href="#" className="hover:text-primary">Yoga & Mobility</a></li>
                <li><a href="#" className="hover:text-primary">Powerlifting</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold mb-4 uppercase">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Trainers</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold mb-4 uppercase">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FitPulse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
