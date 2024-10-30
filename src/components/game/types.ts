export interface GameConfig {
  ranks: Array<{
    name: string;
    minScore: number;
    icon: string;
  }>;
  powerups: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    cost: number;
  }>;
  difficulties: Array<{
    id: string;
    name: string;
    icon: string;
    description: string;
    color: string;
    rewards: string;
  }>;
}

export interface GameState {
  currentQuestion: number;
  score: number;
  streak: number;
  bestStreak: number;
  powerups: { [key: string]: number };
  achievements: string[];
  gameMode: string | null;
  timer: number | null;
}