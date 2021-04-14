import {LanguageKey} from './enumerations/language-key.model';
import {IExerciseBasic} from './basic/exercise-basic.model';
import {IDifficultyLevelBasic} from './basic/difficultyLevel-basic.model';


export interface IStatement {
  id?: number;
  slug?: string;
  html?: any;
  language?: LanguageKey;
  exercise?: IExerciseBasic;
  difficultyLevel?: IDifficultyLevelBasic;
  testScenarioDifficultyLevel?: IDifficultyLevelBasic;
}

export class Statement implements IStatement {
  constructor(
    public id?: number,
    public slug?: string,
    public html?: any,
    public language?: LanguageKey,
    public exercise?: IExerciseBasic,
    public difficultyLevel?: IDifficultyLevelBasic,
    public testScenarioDifficultyLevel?: IDifficultyLevelBasic
  ) {}
}
