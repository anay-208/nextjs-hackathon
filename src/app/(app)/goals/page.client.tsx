"use client";

import {
  createGoal,
  toggleGoalCompletion as toggleGoalCompletionAction,
} from "@/actions/goals/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { CalendarIcon, Plus } from "lucide-react";
import Form from "next/form";
import { startTransition, useOptimistic, useState } from "react";
import type { Goal } from "./types";
import { toast } from "sonner";

export default function GoalsPage(props: {
  goalsList: Goal[];
  author: string;
}) {
  const [goalList, optimisticUpdate] = useOptimistic(
    props.goalsList,
    (curr, newVal: Goal) => {
      return [newVal, ...curr];
    },
  );

  const [newDialogOpen, setNewDialogOpen] = useState(false);

  return (
    <div className="animate-in fade-in-0 container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <Dialog open={newDialogOpen} onOpenChange={setNewDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Goal</DialogTitle>
            </DialogHeader>
            <AddGoalDialogContent
              onCreate={(goal) => {
                optimisticUpdate(goal);
                setNewDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goalList
          .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
          .map((goal) => (
            <GoalItem key={goal.id} data={goal} />
          ))}
      </div>
    </div>
  );
}

function GoalItem(props: { data: Goal }) {
  const [goal, optimisticUpdate] = useOptimistic(
    props.data,
    (curr, newVal: Partial<Goal>) => ({ ...curr, ...newVal }),
  );

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysRemaining = (deadline: Date): number => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDeadlineStatus = (
    deadline: Date,
  ): { label: string; variant: "destructive" | "secondary" | "outline" } => {
    const daysRemaining = getDaysRemaining(deadline);
    if (daysRemaining < 0) {
      return { label: "Overdue", variant: "destructive" };
    } else if (daysRemaining <= 7) {
      return { label: "Urgent", variant: "destructive" };
    } else if (daysRemaining <= 30) {
      return { label: "Upcoming", variant: "secondary" };
    } else {
      return { label: "On Track", variant: "outline" };
    }
  };

  console.log(goal.id)

  return (
    <Card
      key={goal.id}
      className={cn("relative", goal.completed ? "opacity-70" : "")}
    >
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <Checkbox
              checked={goal.completed}
              onCheckedChange={() => {
                startTransition(async () => {
                  optimisticUpdate({ completed: !goal.completed });
                  const res = await toggleGoalCompletionAction(
                    goal.id,
                    !goal.completed,
                  );
                  if (!res || !res.data) {
                    console.log(res);
                    return alert("an unknown error occured");
                  }
                });
              }}
              className="mt-1 size-7"
            />
            <div>
              <CardTitle className={goal.completed ? "line-through" : ""}>
                {goal.title ?? (
                  <span className="text-muted">Untitled Goal</span>
                )}
              </CardTitle>
              <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                <CalendarIcon className="h-4 w-4" />
                <span>Deadline: {formatDate(goal.deadline)}</span>
                <Badge variant={getDeadlineStatus(goal.deadline).variant}>
                  {getDeadlineStatus(goal.deadline).label}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground text-sm">
          {getDaysRemaining(goal.deadline) > 0
            ? `${getDaysRemaining(goal.deadline)} days remaining`
            : "Deadline passed"}
        </div>
      </CardContent>
    </Card>
  );
}

function AddGoalDialogContent(props: { onCreate: (goal: Goal) => void }) {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <Form
        action={async (form) => {
          const goalTitle = form.get("goal-title") as string;
          const goalDeadline = date;
          startTransition(async () => {
            toast.promise(async () => {
              const newGoal = await createGoal(goalTitle, goalDeadline);
              if (newGoal.error || !newGoal.data) {
                console.log(newGoal);
                throw new Error("failed to create goal")
              }
              props.onCreate(newGoal.data[0]);
            }, {
              loading: "Creating goal...",
              success: "Goal created successfully!",
              error: "Failed to create goal. Please try again or contact me@anayparaswani.dev or discord @anay_208.",
            })
          })
        }}
        className="flex flex-col gap-2"
      >
        <div className="space-y-2">
          <Label htmlFor="goal-title" className="text-sm font-medium">
            Goal Title
          </Label>
          <Input
            required
            id="goal-title"
            name="goal-title"
            placeholder="Enter goal title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="goal-deadline" className="text-sm font-medium">
            Deadline
          </Label>
          <DatePicker date={date} setDate={(date) => setDate(date!)} />
        </div>
        <DialogClose asChild>
          <Button type="submit" className="mt-4 w-full">
            Add Goal
          </Button>
        </DialogClose>
      </Form>
    </div>
  );
}
