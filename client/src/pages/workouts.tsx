import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, BarChart, Users, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import strengthThumb from "@assets/generated_images/strength_training_workout_thumbnail.png";
import cardioThumb from "@assets/generated_images/cardio_workout_thumbnail.png";
import hiitThumb from "@assets/generated_images/hiit_workout_thumbnail.png";

const programs = [
  {
    id: 1,
    title: "Hypertrophy Master",
    description: "A 12-week program focused on maximum muscle growth using a PPL split.",
    level: "Advanced",
    duration: "12 Weeks",
    frequency: "6 days/week",
    category: "strength",
    image: strengthThumb
  },
  {
    id: 2,
    title: "Beginner Strength",
    description: "Build a solid foundation with compound movements and linear progression.",
    level: "Beginner",
    duration: "8 Weeks",
    frequency: "3 days/week",
    category: "strength",
    image: strengthThumb
  },
  {
    id: 3,
    title: "HIIT Burner",
    description: "High intensity intervals to torch fat and improve cardiovascular health.",
    level: "Intermediate",
    duration: "4 Weeks",
    frequency: "4 days/week",
    category: "cardio",
    image: hiitThumb
  },
  {
    id: 4,
    title: "Marathon Prep",
    description: "Endurance focused running plan to get you race ready.",
    level: "Intermediate",
    duration: "16 Weeks",
    frequency: "5 days/week",
    category: "cardio",
    image: cardioThumb
  },
  {
    id: 5,
    title: "Functional Fitness",
    description: "Improve daily movement patterns and overall mobility.",
    level: "All Levels",
    duration: "6 Weeks",
    frequency: "3 days/week",
    category: "mobility",
    image: hiitThumb
  }
];

export default function Workouts() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold uppercase mb-2">Workout Programs</h1>
        <p className="text-muted-foreground text-lg">Choose a program designed to help you reach your specific fitness goals.</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Programs</TabsTrigger>
          <TabsTrigger value="strength">Strength</TabsTrigger>
          <TabsTrigger value="cardio">Cardio</TabsTrigger>
          <TabsTrigger value="mobility">Mobility</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </TabsContent>
        
        {["strength", "cardio", "mobility"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.filter(p => p.category === category).map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ProgramCard({ program }: { program: any }) {
  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors group flex flex-col h-full">
      <Link href={`/workouts/${program.id}`}>
        <div className="aspect-video relative overflow-hidden cursor-pointer">
          <img 
            src={program.image} 
            alt={program.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded uppercase">
            {program.level}
          </div>
        </div>
      </Link>
      <CardHeader>
        <CardTitle className="font-heading uppercase text-xl">{program.title}</CardTitle>
        <CardDescription>{program.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {program.duration}
          </div>
          <div className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            {program.frequency}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/workouts/${program.id}`}>
          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
            View Program <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
