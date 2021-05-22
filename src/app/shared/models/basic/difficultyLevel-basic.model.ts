export interface IDifficultyLevelBasic {
  id: string;
  name?: string;
  topicCoefficient?: number;
  exerciseCoefficient?: number;
}

export class DifficultyLevelBasic implements IDifficultyLevelBasic {
  constructor() {}

  exerciseCoefficient: number;
  id: string;
  name: string;
  topicCoefficient: number;
}
