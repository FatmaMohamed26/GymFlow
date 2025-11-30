import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, BarChart, Calendar, PlayCircle, CheckCircle2 } from "lucide-react";
import { Link, useRoute } from "wouter";
import strengthThumb from "@assets/generated_images/strength_training_workout_thumbnail.png";
import cardioThumb from "@assets/generated_images/cardio_workout_thumbnail.png";
import hiitThumb from "@assets/generated_images/hiit_workout_thumbnail.png";

// Mock data matching workouts.tsx
const programs = {
  "1": {
    title: "Hypertrophy Master",
    description: "A 12-week program focused on maximum muscle growth using a PPL split.",
    longDescription: "This program is designed for intermediate to advanced lifters looking to maximize hypertrophy. It utilizes a Push/Pull/Legs split performed 6 days a week. Each session focuses on compound movements followed by isolation exercises to target all muscle groups effectively.",
    level: "Advanced",
    duration: "12 Weeks",
    frequency: "6 days/week",
    category: "strength",
    image: strengthThumb,
    weeks: [
      { title: "Week 1-4", focus: "Volume Accumulation" },
      { title: "Week 5-8", focus: "Intensity & Strength" },
      { title: "Week 9-12", focus: "Peak Performance" }
    ]
  },
  "2": {
    title: "Beginner Strength",
    description: "Build a solid foundation with compound movements and linear progression.",
    longDescription: "Perfect for those new to lifting. This program focuses on mastering the big 3 lifts (Squat, Bench, Deadlift) and building a base level of strength.",
    level: "Beginner",
    duration: "8 Weeks",
    frequency: "3 days/week",
    category: "strength",
    image: strengthThumb,
    weeks: [
      { title: "Week 1-4", focus: "Technique Mastery" },
      { title: "Week 5-8", focus: "Linear Progression" }
    ]
  },
  "3": {
    title: "HIIT Burner",
    description: "High intensity intervals to torch fat and improve cardiovascular health.",
    longDescription: "Short on time but want big results? This HIIT program combines bodyweight exercises and sprints to maximize calorie burn during and after your workout.",
    level: "Intermediate",
    duration: "4 Weeks",
    frequency: "4 days/week",
    category: "cardio",
    image: hiitThumb,
    weeks: [
      { title: "Week 1-2", focus: "Conditioning Base" },
      { title: "Week 3-4", focus: "Max Intensity Intervals" }
    ]
  },
  "4": {
    title: "Marathon Prep",
    description: "Endurance focused running plan to get you race ready.",
    longDescription: "A structured running plan to take you from 10k to marathon distance. Includes long runs, tempo runs, and recovery sessions.",
    level: "Intermediate",
    duration: "16 Weeks",
    frequency: "5 days/week",
    category: "cardio",
    image: cardioThumb,
    weeks: [
      { title: "Week 1-4", focus: "Base Building" },
      { title: "Week 5-12", focus: "Distance Increase" },
      { title: "Week 13-16", focus: "Taper & Race" }
    ]
  },
  "5": {
    title: "Functional Fitness",
    description: "Improve daily movement patterns and overall mobility.",
    longDescription: "Move better, feel better. This program targets mobility, core strength, and functional movement patterns used in daily life.",
    level: "All Levels",
    duration: "6 Weeks",
    frequency: "3 days/week",
    category: "mobility",
    image: hiitThumb,
    weeks: [
      { title: "Week 1-2", focus: "Mobility Basics" },
      { title: "Week 3-4", focus: "Stability & Control" },
      { title: "Week 5-6", focus: "Dynamic Movement" }
    ]
  }
};

export default function WorkoutDetail() {
  const [match, params] = useRoute("/workouts/:id");
  const id = params?.id;
  const program = programs[id as keyof typeof programs];

  if (!program) {
    return <div className="container py-20 text-center">Program not found <Link href="/workouts"><a className="text-primary underline">Go back</a></Link></div>;
  }

  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full container px-4 pb-12">
          <Link href="/workouts">
            <Button variant="outline" size="sm" className="mb-6 text-white border-white/20 hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
            </Button>
          </Link>
          <div className="flex gap-2 mb-4">
            <Badge variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90">{program.category}</Badge>
            <Badge variant="outline" className="text-white border-white/30">{program.level}</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase mb-4">{program.title}</h1>
          <div className="flex flex-wrap gap-6 text-gray-200">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>{program.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              <span>{program.frequency}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 mt-12 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-heading font-bold uppercase mb-4">About this Program</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {program.longDescription}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold uppercase mb-6">Program Schedule</h2>
            <div className="space-y-4">
              {program.weeks.map((week, i) => (
                <Card key={i}>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg">{week.title}</h3>
                      <p className="text-muted-foreground">{week.focus}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-heading font-bold text-xl uppercase mb-2">Start this Plan</h3>
                <p className="text-sm text-muted-foreground">Join now to track your progress and get detailed daily workouts.</p>
              </div>
              <Button size="lg" className="w-full font-bold uppercase">Join Program</Button>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Full workout tracking
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Video demonstrations
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Progress analytics
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-bold text-lg uppercase mb-4">Instructor</h3>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-muted rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop" alt="Trainer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold">Alex Sarah</div>
                  <div className="text-xs text-muted-foreground">Elite Trainer</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
