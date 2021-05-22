export interface IDifficultyLevelBasic {
  id: string;
  name?: string;
  topicCoefficient?: number;
  exerciseCoefficient?: number;

  getColor(): string;
}

export class DifficultyLevelBasic implements IDifficultyLevelBasic {


  exerciseCoefficient: number;
  id: string;
  name: string;
  topicCoefficient: number;

  constructor(difficultyLevel: IDifficultyLevelBasic) {
    this.exerciseCoefficient = difficultyLevel?.exerciseCoefficient;
    this.id = difficultyLevel?.id;
    this.name = difficultyLevel?.name;
    this.topicCoefficient = difficultyLevel?.topicCoefficient;
  }

  getColor(): string {
    if (this.id === 'A') {
      return 'success';
    }
    if (this.id === 'B') {
      return 'info';
    }
    if (this.id === 'C') {
      return 'warning';
    }
    if (this.id === 'D') {
      return 'danger';
    }
    if (this.id === 'O') {
      return 'secondary';
    }
  }
}
