import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { useState } from "react";
import { Plus } from "lucide-react";

const weightData = [
  { date: "Jan 1", weight: 185 },
  { date: "Jan 8", weight: 184 },
  { date: "Jan 15", weight: 183 },
  { date: "Jan 22", weight: 182.5 },
  { date: "Jan 29", weight: 181 },
  { date: "Feb 5", weight: 180.5 },
  { date: "Feb 12", weight: 180 },
  { date: "Feb 19", weight: 179 },
];

const strengthData = [
  { date: "Jan", bench: 135, squat: 185, deadlift: 225 },
  { date: "Feb", bench: 145, squat: 205, deadlift: 245 },
  { date: "Mar", bench: 155, squat: 225, deadlift: 275 },
];

export default function Progress() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-heading font-bold uppercase mb-2">Your Progress</h1>
          <p className="text-muted-foreground text-lg">Track your weight stats and lifting milestones.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Log Workout
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Body Weight Trend</CardTitle>
              <CardDescription>Last 8 weeks</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}} domain={['dataMin - 5', 'dataMax + 5']} />
                  <Tooltip 
                    contentStyle={{backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))'}}
                    itemStyle={{color: 'hsl(var(--primary))'}}
                  />
                  <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={3} dot={{r: 4, fill: 'hsl(var(--background))', strokeWidth: 2}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Strength Progress (1RM)</CardTitle>
              <CardDescription>Big 3 Lifts (lbs)</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={strengthData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}} />
                  <Tooltip 
                    contentStyle={{backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))'}}
                  />
                  <Line type="monotone" dataKey="bench" name="Bench Press" stroke="hsl(var(--chart-1))" strokeWidth={3} />
                  <Line type="monotone" dataKey="squat" name="Squat" stroke="hsl(var(--chart-2))" strokeWidth={3} />
                  <Line type="monotone" dataKey="deadlift" name="Deadlift" stroke="hsl(var(--chart-3))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Personal Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <div className="font-bold">Deadlift</div>
                    <div className="text-xs text-muted-foreground">Mar 15, 2024</div>
                  </div>
                  <div className="text-xl font-heading font-bold text-primary">275 lbs</div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <div className="font-bold">5k Run</div>
                    <div className="text-xs text-muted-foreground">Feb 28, 2024</div>
                  </div>
                  <div className="text-xl font-heading font-bold text-primary">24:30</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold">Bench Press</div>
                    <div className="text-xs text-muted-foreground">Feb 10, 2024</div>
                  </div>
                  <div className="text-xl font-heading font-bold text-primary">155 lbs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
