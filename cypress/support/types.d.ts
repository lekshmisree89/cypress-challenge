import { Schema } from 'mongoose';
interface Game {
  id: any;
  _id: Schema.Types.ObjectId;
  maskedWord: string;
  guesses: string[];
  isCorrect: boolean;
  isComplete: boolean;
  isWinner: boolean;
  solution: string;
  guessesRemaining: number;
}

interface Responses {
  [key: string]: Game;
}

export type { Game, Responses };
