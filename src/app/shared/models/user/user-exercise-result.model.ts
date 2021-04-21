import {Moment} from 'moment';

export interface IUserExerciseResult {
  submitTime: Moment;
  difficultyLevelId: string;
  runPercentA: number;
  runPercentB: number;
  runPercentC: number;
  runPercentD: number;
  starts: number;
  cacheResultScoreExercise: number;
  cacheResultScoreTopic: number;
  cacheResultLevelExercise: string;
  cacheResultLevelTopic: string;
  color: string;
  icon: string;
  answer: string;
  idSubmission: number;
  nameExercise: string;
  idExercise: number;
  slugExercise: string;
  idRunResult: string;
  nameRunResult: string;
  descriptionExercise: string;
  descriptionRunResult: string;

  // getColor(): string;

  getIcon(): string;

  getStarts(): number;

  getAnswer(): string;
}

export class UserExerciseResult implements IUserExerciseResult {
  answer: string;
  cacheResultLevelExercise: string;
  cacheResultLevelTopic: string;
  cacheResultScoreExercise: number;
  cacheResultScoreTopic: number;
  color: string;
  descriptionExercise: string;
  descriptionRunResult: string;
  difficultyLevelId: string;
  icon: string;
  idExercise: number;
  idRunResult: string;
  idSubmission: number;
  nameExercise: string;
  runPercentA: number;
  runPercentB: number;
  runPercentC: number;
  runPercentD: number;
  slugExercise: string;
  starts: number;
  submitTime: moment.Moment;
  nameRunResult: string;

  getStarts(): number {
    if (this.runPercentD) {
      if (
        this.runPercentD < 50 ||
        (this.runPercentD > 50 && this.runPercentD < 100)
      ) {
        return 0.5;
      }
      if (this.runPercentD === 100) {
        return 1;
      }
    }

    if (this.runPercentC) {
      if (
        this.runPercentC < 50 ||
        (this.runPercentC > 50 && this.runPercentC < 100)
      ) {
        return 1.5;
      }
      if (this.runPercentC === 100) {
        return 2;
      }
    }

    if (this.runPercentB) {
      if (
        this.runPercentB < 50 ||
        (this.runPercentB > 50 && this.runPercentB < 100)
      ) {
        return 2.5;
      }
      if (this.runPercentB === 100) {
        return 3;
      }
    }

    if (this.runPercentA) {
      if (
        this.runPercentA < 50 ||
        (this.runPercentA > 50 && this.runPercentA < 100)
      ) {
        return 3.5;
      }
      if (this.runPercentA === 100) {
        return 4;
      }
    }
    return 0;
  }

  // getColor(): string {
  //   if (this.idRunResult === 'unjudged') {
  //     return 'secondary';
  //   }
  //   if (this.idRunResult === 'correct') {
  //     return 'success';
  //   }
  //   if (this.cacheResultTopic === 'B') {
  //     return 'info';
  //   }
  //   if (this.cacheResultTopic === 'C') {
  //     return 'warning';
  //   }
  //   if (this.cacheResultTopic === 'D' || this.cacheResultTopic === 'O') {
  //     return 'danger';
  //   }
  //   return 'danger';
  //   // if (this.result === 'correct') {
  //   //   return 'green';
  //   // } else if (this.result === 'no-output') {
  //   //   return 'secondary';
  //   // } else if (this.result === 'run-error') {
  //   //   return 'danger';
  //   // } else if (this.result === 'timelimit') {
  //   //   return 'secondary';
  //   // } else if (this.result === 'unjudged') {
  //   //   return 'info';
  //   // } else if (this.result === 'wrong-answer') {
  //   //   return 'danger';
  //   // }
  //   // return 'secondary';
  // }

  getIcon(): string {
    if (this.idRunResult === 'unjudged') {
      return 'hourglass_empty';
    }
    if (this.idRunResult === 'correct') {
      return 'check';
    } else if (this.idRunResult === 'no-output') {
      return 'bug_report';
    } else if (this.idRunResult === 'run-error') {
      return 'priority_high';
    } else if (this.idRunResult === 'timelimit') {
      return 'alarm';
    } else if (this.idRunResult === 'unjudged') {
      return 'gavel';
    } else if (this.idRunResult === 'wrong-answer') {
      return 'clear';
    }
    return 'close';
  }

  getAnswer(): string {
    if (this.idRunResult === 'unjudged') {
      return 'Unjudged or judging';
    }
    // console.warn(this)
    // console.warn(this.runResult)
    if (this.idRunResult === 'correct') {
      return 'Correct';
    } else if (this.idRunResult === 'no-output') {
      return 'No output';
    } else if (this.idRunResult === 'run-error') {
      return 'Error';
    } else if (this.idRunResult === 'timelimit') {
      return 'Time limit';
    } else if (this.idRunResult === 'unjudged') {
      return 'No judging';
    } else if (this.idRunResult === 'wrong-answer') {
      return 'Wrong answer';
    } else if (this.idRunResult === 'compiler-error') {
      return 'Compiler error';
    }
    return 'Error';
  }

  constructor(exerciseResult: IUserExerciseResult) {
    this.answer = exerciseResult.answer;
    this.cacheResultLevelExercise = exerciseResult.cacheResultLevelExercise;
    this.cacheResultLevelTopic = exerciseResult.cacheResultLevelTopic;
    this.cacheResultScoreExercise = exerciseResult.cacheResultScoreExercise;
    this.cacheResultScoreTopic = exerciseResult.cacheResultScoreTopic;
    this.color = exerciseResult.color;
    this.descriptionExercise = exerciseResult.descriptionExercise;
    this.descriptionRunResult = exerciseResult.descriptionRunResult;
    this.difficultyLevelId = exerciseResult.difficultyLevelId;
    this.icon = exerciseResult.icon;
    this.idExercise = exerciseResult.idExercise;
    this.idRunResult = exerciseResult.idRunResult;
    this.idSubmission = exerciseResult.idSubmission;
    this.nameExercise = exerciseResult.nameExercise;
    this.runPercentA = exerciseResult.runPercentA;
    this.runPercentB = exerciseResult.runPercentB;
    this.runPercentC = exerciseResult.runPercentC;
    this.runPercentD = exerciseResult.runPercentD;
    this.slugExercise = exerciseResult.slugExercise;
    this.starts = exerciseResult.starts;
    this.submitTime = exerciseResult.submitTime;
    this.nameRunResult = exerciseResult.nameRunResult;
  }

}
