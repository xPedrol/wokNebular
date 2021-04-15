export interface ISummaryStudent {
  totalCourses: number;
  totalExercises: number;
  totalModules: number;
  totalModulesTopics: number;
}

export class SummaryStudent implements ISummaryStudent {
  constructor(summaryStudent: ISummaryStudent) {
    this._totalCourses = summaryStudent.totalCourses;
    this._totalExercises = summaryStudent.totalExercises;
    this._totalModules = summaryStudent.totalModules;
    this._totalModulesTopics = summaryStudent.totalModulesTopics;
  }

  private _totalCourses: number;
  private _totalExercises: number;
  private _totalModules: number;
  private _totalModulesTopics: number;

  get totalCourses(): number {
    return this._totalCourses;
  }

  set totalCourses(value: number) {
    this._totalCourses = value;
  }

  get totalExercises(): number {
    return this._totalExercises;
  }

  set totalExercises(value: number) {
    this._totalExercises = value;
  }

  get totalModules(): number {
    return this._totalModules;
  }

  set totalModules(value: number) {
    this._totalModules = value;
  }

  get totalModulesTopics(): number {
    return this._totalModulesTopics;
  }

  set totalModulesTopics(value: number) {
    this._totalModulesTopics = value;
  }
}
