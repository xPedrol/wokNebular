export interface IScenarioBasic {
  id?: number;
  name?: string;
  slug?: string;
  difficultyLevelId?: string;
  helpMsg?: string;

  getColor(): string;
}

export class ScenarioBasic implements IScenarioBasic {


  difficultyLevelId: string;
  helpMsg: string;
  id: number;
  name: string;
  slug: string;

  constructor(scenario: IScenarioBasic) {
    this.difficultyLevelId = scenario.difficultyLevelId;
    this.helpMsg = scenario.helpMsg;
    this.id = scenario.id;
    this.name = scenario.name;
    this.slug = scenario.slug;
  }

  getColor(): string {
    if (this.difficultyLevelId === 'A') {
      return 'success';
    }
    if (this.difficultyLevelId === 'B') {
      return 'info';
    }
    if (this.difficultyLevelId === 'C') {
      return 'warning';
    }
    if (this.difficultyLevelId === 'D') {
      return 'danger';
    }
    if (this.difficultyLevelId === 'O') {
      return 'secondary';
    }
  }
}
