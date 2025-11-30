import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Trophy, Users, Zap, Dumbbell } from "lucide-react";
import heroBg from "@assets/generated_images/modern_dark_gym_hero_background.png";
import strengthThumb from "@assets/generated_images/strength_training_workout_thumbnail.png";
import cardioThumb from "@assets/generated_images/cardio_workout_thumbnail.png";
import hiitThumb from "@assets/generated_images/hiit_workout_thumbnail.png";

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Gym Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        </div>

        <div className="container relative z-10 px-4">
          <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-block bg-primary/20 text-primary border border-primary/30 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-2 backdrop-blur-sm">
              Redefine Your Limits
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight uppercase tracking-tight">
              Sculpt Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Dream Physique</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
              Professional workout plans, comprehensive nutrition tracking, and a community that pushes you further.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/workouts">
                <Button size="lg" className="text-lg px-8 h-14 uppercase font-bold tracking-wide">
                  Start Training <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth">
                <Button variant="outline" size="lg" className="text-lg px-8 h-14 uppercase font-bold tracking-wide border-white/20 text-white hover:bg-white/10 hover:text-white">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase mb-4">Why Choose FitPulse?</h2>
          <p className="text-muted-foreground text-lg">We provide the tools you need to succeed, combining science-based training with cutting-edge technology.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Trophy,
              title: "Expert Programs",
              desc: "Designed by world-class trainers to maximize hypertrophy and strength gains."
            },
            {
              icon: Zap,
              title: "Smart Tracking",
              desc: "Log your workouts, track your nutrition, and visualize your progress over time."
            },
            {
              icon: Users,
              title: "Community Driven",
              desc: "Join thousands of like-minded individuals on the same journey to greatness."
            }
          ].map((feature, i) => (
            <div key={i} className="bg-card border p-8 rounded-xl hover:border-primary/50 transition-all hover:shadow-lg group">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-xl font-heading font-bold uppercase mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Programs */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase mb-2">Featured Programs</h2>
              <p className="text-muted-foreground">Find the perfect workout for your goals.</p>
            </div>
            <Link href="/workouts">
              <Button variant="ghost" className="hidden md:flex">View All Programs <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: 1, title: "Hypertrophy Master", level: "Advanced", image: strengthThumb, type: "Strength" },
              { id: 3, title: "Shred & Burn", level: "Intermediate", image: hiitThumb, type: "HIIT" },
              { id: 4, title: "Endurance Pro", level: "All Levels", image: cardioThumb, type: "Cardio" },
            ].map((program, i) => (
              <Link key={i} href={`/workouts/${program.id}`}>
                <div className="group cursor-pointer relative overflow-hidden rounded-xl aspect-[4/5] md:aspect-[3/4]">
                  <img 
                    src={program.image} 
                    alt={program.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className="flex gap-2 mb-2">
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded uppercase">{program.type}</span>
                      <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded uppercase">{program.level}</span>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white uppercase mb-1">{program.title}</h3>
                    <p className="text-gray-300 text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      Start Program <ArrowRight className="h-3 w-3" />
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/workouts">
              <Button variant="outline" className="w-full">View All Programs</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="bg-primary rounded-3xl p-8 md:p-16 relative overflow-hidden text-primary-foreground">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase mb-6">Ready to start your transformation?</h2>
            <p className="text-lg md:text-xl opacity-90 mb-8">Join FitPulse today and get access to premium workout plans, nutrition tracking, and a supportive community.</p>
            <Link href="/auth?mode=signup">
              <Button size="lg" variant="secondary" className="text-primary font-bold uppercase h-14 px-8 text-lg">
                Get Started Free
              </Button>
            </Link>
          </div>
          {/* Abstract shapes/decoration */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <Dumbbell className="absolute -right-20 -bottom-20 w-96 h-96 transform -rotate-12" />
          </div>
        </div>
      </section>
    </div>
  );
}
