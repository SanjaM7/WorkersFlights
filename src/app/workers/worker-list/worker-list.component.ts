import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorMessageService } from 'src/app/shared/services/error-message.service';
import { IWorker } from '../models/worker';
import { WorkersService } from '../workers.service';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkerListComponent implements OnInit {

  workers$: Observable<IWorker[]> = of();

  constructor(
    private _workersService: WorkersService,
    private _errorMessageService: ErrorMessageService,
    ) { }

  ngOnInit(): void {
    this._getWorkers();
  }

  private _getWorkers(): void {
    this.workers$ = this._workersService.getWorkers()
      .pipe(catchError(err => this._errorMessageService.displayErrorMessage('Failed to load workers')));
  }
}
