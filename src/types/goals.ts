import type { GoalStatus } from './enums';

export interface SpendingGoalBudget {
  id: string;
  category: string;
  monthlyBudget: number;
}

export interface SpendingGoal extends SpendingGoalBudget {
  currentSpent: number;
  percentageUsed: number;
  daysRemaining: number;
  status: GoalStatus;
}

export interface SpendingGoalsResponse {
  goals: SpendingGoal[];
}
