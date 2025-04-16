"use client";

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
import { Calendar, Plus } from "lucide-react";
import { useState } from "react";
import type { Goal } from "./types";
import { createGoal, toggleGoalCompletion as toggleGoalCompletionAction  } from "@/actions/goals/actions";

export default function GoalsPage({ goalsList }: { goalsList: Goal[]; author: string }) {
  const [goals, setGoals] = useState<Goal[]>(goalsList);
  const [newGoal, setNewGoal] = useState<{
    title: string;
    deadline: Date | null;
  }>({ title: "", deadline: null });
  const [isAddingGoal, setIsAddingGoal] = useState<boolean>(false);

  const handleAddGoal = async ()  => {
    if (!newGoal.title || !newGoal.deadline) return;

    const goal = await createGoal(newGoal.title, newGoal.deadline)
    if(!goal || !goal.data) {
      console.log(goal)
      return alert("an unknown error occured")
    }

    setGoals([...goals, goal.data[0]]);
    setNewGoal({ title: "", deadline: null });
    setIsAddingGoal(false);
  };

  const toggleGoalCompletion = (goalId: string): void => {
    toggleGoalCompletionAction(goalId).then(console.log)
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        return {
          ...goal,
          completed: !goal.completed,
        };
      }
      return goal;
    });

    setGoals(updatedGoals);
  };

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

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Goals</h1>
        <Button onClick={() => setIsAddingGoal(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Goal
        </Button>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <Card key={goal.id} className={goal.completed ? "opacity-70" : ""}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <Checkbox
                    checked={goal.completed}
                    onCheckedChange={() => toggleGoalCompletion(goal.id)}
                    className="mt-1"
                  />
                  <div>
                    <CardTitle className={goal.completed ? "line-through" : ""}>
                      {goal.title}
                    </CardTitle>
                    <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
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
        ))}
      </div>

      {/* Add Goal Dialog */}
      <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Goal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="goal-title" className="text-sm font-medium">
                Goal Title
              </label>
              <Input
                id="goal-title"
                placeholder="Enter goal title"
                value={newGoal.title}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="goal-deadline" className="text-sm font-medium">
                Deadline
              </label>
              <DatePicker
                date={newGoal.deadline || new Date()}
                setDate={(date: Date) =>
                  setNewGoal({ ...newGoal, deadline: date })
                }
              />
            </div>
            <Button
              onClick={handleAddGoal}
              className="w-full"
              disabled={!newGoal.title || !newGoal.deadline}
            >
              Add Goal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
