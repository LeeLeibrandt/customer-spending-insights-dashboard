import type { GoalStatus } from './enums';

export interface SpendingGoal {
  id: string;
  category: string;
  monthlyBudget: number;
  currentSpent: number;
  percentageUsed: number;
  daysRemaining: number;
  status: GoalStatus;
}

export interface SpendingGoalsResponse {
  goals: SpendingGoal[];
}
