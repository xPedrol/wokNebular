import {IExerciseBasic} from './basic/exercise-basic.model';
import {DifficultyLevelBasic, IDifficultyLevelBasic} from './basic/difficultyLevel-basic.model';
import {ISolutionFile} from './solution-file.model';

export interface ISolution {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  exercise?: IExerciseBasic;
  difficultyLevel?: IDifficultyLevelBasic;
  files?: ISolutionFile[];
}

export class Solution implements ISolution {
  description: string;
  difficultyLevel: IDifficultyLevelBasic;
  exercise: IExerciseBasic;
  files: ISolutionFile[];
  id: number;
  name: string;
  slug: string;

  constructor(solution: ISolution) {
    this.description = solution.description;
    this.difficultyLevel = new DifficultyLevelBasic(solution.difficultyLevel);
    this.exercise = solution.exercise;
    this.files = solution.files;
    this.id = solution.id;
    this.name = solution.name;
    this.slug = solution.slug;
  }

}
