import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";

// Pages
import Home from "@/pages/home";
import Workouts from "@/pages/workouts";
import WorkoutDetail from "@/pages/workout-detail";
import Exercises from "@/pages/exercises";
import ExerciseDetail from "@/pages/exercise-detail";
import Calculator from "@/pages/calculator";
import Progress from "@/pages/progress";
import Auth from "@/pages/auth";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/workouts" component={Workouts}/>
        <Route path="/workouts/:id" component={WorkoutDetail}/>
        <Route path="/exercises" component={Exercises}/>
        <Route path="/exercises/:id" component={ExerciseDetail}/>
        <Route path="/calculator" component={Calculator}/>
        <Route path="/progress" component={Progress}/>
        <Route path="/auth" component={Auth}/>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
