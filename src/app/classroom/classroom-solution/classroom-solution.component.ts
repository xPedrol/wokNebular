import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SharedFunctions} from '../../shared/shared.functions';
import {Authority} from '../../shared/constants/authority.constants';
import {Subject} from 'rxjs';
import {SolutionService} from '../../shared/services/solution.service';
import {ISolution} from '../../shared/models/solution.model';

@Component({
  selector: 'app-classroom-solution',
  templateUrl: './classroom-solution.component.html',
  styleUrls: ['./classroom-solution.component.scss']
})
export class ClassroomSolutionComponent implements OnInit, AfterViewInit {
  courseSlug: string;
  topicSlug: string;
  disciplineSlug: string;
  exerciseSlug: string;
  routePrefix = '/';
  destroy$ = new Subject();
  authorities: Authority[];
  isTeacher = false;
  solutionSlug: string;
  solution: ISolution;
  loadingSolution = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sF: SharedFunctions,
    private solutionService: SolutionService
  ) {
    this.sF.setPageData('Solução');
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    this.authorities = this.activatedRoute.snapshot.data.authorities;
    if (this.authorities.includes(Authority.TEACHER)) {
      this.isTeacher = true;
    }
    this.routePrefix += this.sF.routeAuthSwitch(this.authorities, true);
    this.exerciseSlug = this.activatedRoute.snapshot.params.exerciseSlug;
    this.disciplineSlug = this.activatedRoute.snapshot.params.disciplineSlug;
    this.topicSlug = this.activatedRoute.snapshot.params.topicSlug;
    this.courseSlug = this.activatedRoute.snapshot.params.courseSlug;
    this.solutionSlug = this.activatedRoute.snapshot.params.solutionSlug;
    this.getSolution();
  }

  getSolution() {
    this.loadingSolution = true;
    this.solutionService.getSolution(this.solutionSlug).subscribe((solution) => {
      this.solution = solution || undefined;
      this.loadingSolution = false;
    }, () => this.loadingSolution = false);
  }
}
