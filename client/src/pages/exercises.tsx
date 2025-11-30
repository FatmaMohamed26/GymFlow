import { useState } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import benchThumb from "@assets/generated_images/bench_press_exercise_demonstration.png";
import squatThumb from "@assets/generated_images/squat_exercise_demonstration.png";
import deadliftThumb from "@assets/generated_images/deadlift_exercise_demonstration.png";

// Mock data
const exercises = [
  { id: 1, name: "Barbell Bench Press", muscle: "Chest", equipment: "Barbell", difficulty: "Intermediate", image: benchThumb },
  { id: 2, name: "Barbell Squat", muscle: "Legs", equipment: "Barbell", difficulty: "Advanced", image: squatThumb },
  { id: 3, name: "Deadlift", muscle: "Back", equipment: "Barbell", difficulty: "Advanced", image: deadliftThumb },
  { id: 4, name: "Dumbbell Flyes", muscle: "Chest", equipment: "Dumbbells", difficulty: "Beginner", image: benchThumb },
  { id: 5, name: "Leg Press", muscle: "Legs", equipment: "Machine", difficulty: "Beginner", image: squatThumb },
  { id: 6, name: "Pull Ups", muscle: "Back", equipment: "Bodyweight", difficulty: "Intermediate", image: deadliftThumb },
  { id: 7, name: "Push Ups", muscle: "Chest", equipment: "Bodyweight", difficulty: "Beginner", image: benchThumb },
  { id: 8, name: "Lunges", muscle: "Legs", equipment: "Dumbbells", difficulty: "Beginner", image: squatThumb },
];

export default function Exercises() {
  const [search, setSearch] = useState("");
  const [muscleFilter, setMuscleFilter] = useState("all");

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesMuscle = muscleFilter === "all" || ex.muscle.toLowerCase() === muscleFilter.toLowerCase();
    return matchesSearch && matchesMuscle;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold uppercase mb-2">Exercise Library</h1>
        <p className="text-muted-foreground text-lg">Browse our comprehensive database of exercises with detailed instructions.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-card border rounded-lg">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search exercises..." 
            className="pl-9" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={muscleFilter} onValueChange={setMuscleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Muscle Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Muscles</SelectItem>
              <SelectItem value="chest">Chest</SelectItem>
              <SelectItem value="back">Back</SelectItem>
              <SelectItem value="legs">Legs</SelectItem>
              <SelectItem value="shoulders">Shoulders</SelectItem>
              <SelectItem value="arms">Arms</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredExercises.map((exercise) => (
          <Link key={exercise.id} href={`/exercises/${exercise.id}`}>
            <Card className="overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer h-full">
              <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                <img 
                  src={exercise.image} 
                  alt={exercise.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs font-bold uppercase">{exercise.muscle}</Badge>
                  <span className="text-xs text-muted-foreground uppercase font-medium">{exercise.difficulty}</span>
                </div>
                <h3 className="font-heading font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">{exercise.name}</h3>
                <p className="text-sm text-muted-foreground">{exercise.equipment}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No exercises found matching your criteria.</p>
          <Button variant="link" onClick={() => {setSearch(""); setMuscleFilter("all")}}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
}
