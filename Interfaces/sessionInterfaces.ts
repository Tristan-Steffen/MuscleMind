export interface Set {
  id?: number;
  reps: number | null;
  weight: number | null;
  rest: number | null;
  exerciseInstanceId: number | null;
}

export interface Exercise {
  id?: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExerciseInstance {
  id?: number;
  exercise: Exercise;
  exerciseId?: number;
  sessionId?: number;
  sets: Set[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id?: number;
  name: string;
  description: string;
  date: Date;
  isPreset: boolean;
  isExample: boolean;
  exercise_instances: ExerciseInstance[];
  createdAt: Date;
  updatedAt: Date;
}
