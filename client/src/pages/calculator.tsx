import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const calculatorSchema = z.object({
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Valid age required"),
  gender: z.enum(["male", "female"]),
  weight: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Valid weight required"),
  height: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Valid height required"),
  activity: z.string(),
  goal: z.string()
});

export default function Calculator() {
  const [result, setResult] = useState<{bmr: number, tdee: number, calories: number} | null>(null);

  const form = useForm<z.infer<typeof calculatorSchema>>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      gender: "male",
      activity: "1.2",
      goal: "maintain"
    }
  });

  function onSubmit(values: z.infer<typeof calculatorSchema>) {
    const weight = Number(values.weight); // assuming kg
    const height = Number(values.height); // assuming cm
    const age = Number(values.age);
    
    // Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (values.gender === "male") {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = bmr * Number(values.activity);
    
    let calories = tdee;
    if (values.goal === "cut") calories -= 500;
    if (values.goal === "bulk") calories += 500;

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories: Math.round(calories)
    });
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-heading font-bold uppercase mb-2">Nutrition Calculator</h1>
        <p className="text-muted-foreground text-lg">Calculate your BMR, TDEE, and optimal calorie intake for your goals.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="uppercase">Your Details</CardTitle>
            <CardDescription>Enter your metrics to get a personalized plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="male" />
                            </FormControl>
                            <FormLabel className="font-normal">Male</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="female" />
                            </FormControl>
                            <FormLabel className="font-normal">Female</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input placeholder="25" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input placeholder="75" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input placeholder="180" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="activity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1.2">Sedentary (Office job)</SelectItem>
                          <SelectItem value="1.375">Light Exercise (1-2 days/week)</SelectItem>
                          <SelectItem value="1.55">Moderate Exercise (3-5 days/week)</SelectItem>
                          <SelectItem value="1.725">Heavy Exercise (6-7 days/week)</SelectItem>
                          <SelectItem value="1.9">Athlete (2x per day)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cut">Lose Fat (-500 cal)</SelectItem>
                          <SelectItem value="maintain">Maintain Weight</SelectItem>
                          <SelectItem value="bulk">Build Muscle (+500 cal)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full font-bold uppercase">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {result ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <Card className="bg-primary text-primary-foreground border-none">
                <CardHeader>
                  <CardTitle className="opacity-90 uppercase text-sm font-bold tracking-wide">Daily Target</CardTitle>
                  <div className="text-5xl font-heading font-bold">{result.calories} <span className="text-lg font-sans font-normal opacity-80">kcal</span></div>
                  <CardDescription className="text-primary-foreground/80">Recommended daily intake to reach your goal.</CardDescription>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm uppercase text-muted-foreground">BMR</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{result.bmr}</div>
                    <p className="text-xs text-muted-foreground">Basal Metabolic Rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm uppercase text-muted-foreground">TDEE</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{result.tdee}</div>
                    <p className="text-xs text-muted-foreground">Total Daily Energy Expenditure</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="uppercase text-lg">Macronutrients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Protein (30%)</span>
                        <span className="font-bold">{Math.round(result.calories * 0.3 / 4)}g</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[30%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fats (25%)</span>
                        <span className="font-bold">{Math.round(result.calories * 0.25 / 9)}g</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 w-[25%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Carbs (45%)</span>
                        <span className="font-bold">{Math.round(result.calories * 0.45 / 4)}g</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[45%]"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-8 border-2 border-dashed rounded-xl text-muted-foreground">
              <div>
                <CalculatorIcon className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p>Fill out the form to see your personalized nutrition breakdown.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CalculatorIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  )
}
