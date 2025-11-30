import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Target, Dumbbell, AlertCircle } from "lucide-react";
import { Link, useRoute } from "wouter";
import benchThumb from "@assets/generated_images/bench_press_exercise_demonstration.png";
import squatThumb from "@assets/generated_images/squat_exercise_demonstration.png";
import deadliftThumb from "@assets/generated_images/deadlift_exercise_demonstration.png";

// Mock data matching exercises.tsx
const exercises = {
  "1": { name: "Barbell Bench Press", muscle: "Chest", equipment: "Barbell", difficulty: "Intermediate", image: benchThumb, description: "The bench press is a compound exercise that targets the muscles of the chest, shoulders, and triceps.", instructions: ["Lie on a flat bench with your eyes under the bar.", "Grip the bar slightly wider than shoulder-width.", "Unrack the bar and lower it to your mid-chest.", "Press the bar back up to the starting position."] },
  "2": { name: "Barbell Squat", muscle: "Legs", equipment: "Barbell", difficulty: "Advanced", image: squatThumb, description: "The squat is the king of all leg exercises, targeting the quads, hamstrings, and glutes.", instructions: ["Place the barbell on your upper back.", "Stand with feet shoulder-width apart.", "Lower your hips back and down as if sitting in a chair.", "Drive back up through your heels."] },
  "3": { name: "Deadlift", muscle: "Back", equipment: "Barbell", difficulty: "Advanced", image: deadliftThumb, description: "A total body movement that primarily targets the posterior chain.", instructions: ["Stand with feet hip-width apart, mid-foot under the bar.", "Hinge at hips to grip the bar.", "Keep chest up and back flat.", "Drive through legs to lift the bar."] },
  "4": { name: "Dumbbell Flyes", muscle: "Chest", equipment: "Dumbbells", difficulty: "Beginner", image: benchThumb, description: "An isolation exercise for the chest muscles.", instructions: ["Lie on a bench with dumbbells in hand.", "Lower weights out to sides with slight bend in elbows.", "Bring weights back together at the top."] },
  "5": { name: "Leg Press", muscle: "Legs", equipment: "Machine", difficulty: "Beginner", image: squatThumb, description: "A machine-based compound leg exercise.", instructions: ["Sit in machine with feet on platform.", "Lower platform until knees are at 90 degrees.", "Press platform back up."] },
  "6": { name: "Pull Ups", muscle: "Back", equipment: "Bodyweight", difficulty: "Intermediate", image: deadliftThumb, description: "The ultimate bodyweight back builder.", instructions: ["Grip bar with palms facing away.", "Pull yourself up until chin is over bar.", "Lower yourself with control."] },
  "7": { name: "Push Ups", muscle: "Chest", equipment: "Bodyweight", difficulty: "Beginner", image: benchThumb, description: "A classic bodyweight chest exercise.", instructions: ["Start in plank position.", "Lower chest to floor.", "Push back up to starting position."] },
  "8": { name: "Lunges", muscle: "Legs", equipment: "Dumbbells", difficulty: "Beginner", image: squatThumb, description: "Unilateral leg exercise for balance and strength.", instructions: ["Step forward with one leg.", "Lower back knee toward ground.", "Push back to standing."] },
};

export default function ExerciseDetail() {
  const [match, params] = useRoute("/exercises/:id");
  const id = params?.id;
  const exercise = exercises[id as keyof typeof exercises];

  if (!exercise) {
    return <div className="container py-20 text-center">Exercise not found <Link href="/exercises"><a className="text-primary underline">Go back</a></Link></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/exercises">
        <Button variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exercises
        </Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden border shadow-lg">
            <img src={exercise.image} alt={exercise.name} className="w-full h-auto object-cover" />
          </div>
          <div className="flex gap-4">
            <Card className="flex-1">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Target className="h-6 w-6 text-primary mb-2" />
                <div className="text-xs text-muted-foreground uppercase">Target Muscle</div>
                <div className="font-bold">{exercise.muscle}</div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Dumbbell className="h-6 w-6 text-primary mb-2" />
                <div className="text-xs text-muted-foreground uppercase">Equipment</div>
                <div className="font-bold">{exercise.equipment}</div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <AlertCircle className="h-6 w-6 text-primary mb-2" />
                <div className="text-xs text-muted-foreground uppercase">Difficulty</div>
                <div className="font-bold">{exercise.difficulty}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-heading font-bold uppercase mb-4">{exercise.name}</h1>
            <p className="text-xl text-muted-foreground">{exercise.description}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-bold uppercase border-b pb-2">Instructions</h2>
            <div className="space-y-4">
              {exercise.instructions.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <p className="pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/30 p-6 rounded-xl border">
            <h3 className="font-heading font-bold uppercase mb-2">Pro Tip</h3>
            <p className="text-sm text-muted-foreground">Focus on controlled movement throughout the entire range of motion. Don't rush the reps.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
