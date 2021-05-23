import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { ErrorMessageService } from 'src/app/shared/services/error-message.service';
import { FlightInfo } from '../models/flight-info';
import { IWorkerFlight } from '../models/worker-flight';
import { WorkersService } from '../workers.service';

const refreshTimeMs = 60 * 1000;

@Component({
  selector: 'app-worker-flight-list',
  templateUrl: './worker-flight-list.component.html',
  styleUrls: ['./worker-flight-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkerFlightListComponent implements OnInit, OnDestroy {

  workerFlights!: IWorkerFlight[] | null;
  _subscription!: Subscription;
  columns = ['num', 'from', 'from_date', 'to', 'to_date'];
  columnsFriendlyNames = ['Flight Number', 'Origin', 'Origin Date', 'Destination', 'Destination Date'];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _workersService: WorkersService,
    private _errorMessageService: ErrorMessageService,
    private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._subscribeToWorkerIdChange();
  }

  private _subscribeToWorkerIdChange(): void {
    this._route.paramMap.subscribe(params => {
      this._unsubscribe();

      if (params.has('workerId')) {
        const workerId = +params.get('workerId')!;
        this._getWorkerFlights(workerId);
        this._reloadWorkerFlights(workerId);
      }
    });
  }

  private _reloadWorkerFlights(workerId: number): void {
    this._subscription = interval(refreshTimeMs).subscribe(() => {
      this._getWorkerFlights(workerId);
    });
  }

  private _getWorkerFlights(workerId: number): void {
    this._workersService.getWorkerFlights(workerId)
      .subscribe(
        workerFlights => {
          this.workerFlights = workerFlights;
          if (this.workerFlights && this.workerFlights.length) {
            this._selectFlightFromUrl();
          }
        },
        err => {
          this.workerFlights = null;
          this._changeDetectorRef.detectChanges();
          this._errorMessageService.displayErrorMessage('Failed to load worker flights.');
          }
        );
  }

  private _selectFlightFromUrl(): void {
    const flightNumber = this._route?.snapshot.firstChild?.params.flightNumber;

    if (!flightNumber) {
      this._selectDefaultFlight();
      return;
    }

    this.onFlightSelected(flightNumber);
  }

  onFlightSelected(flightNumber: string): void {
    const workerFlight = this.workerFlights!.find(flight =>  flight.num === flightNumber);
    if (!workerFlight) {
      this._errorMessageService.displayErrorMessage(`Flight ${flightNumber} does not exist.`);
      this._selectDefaultFlight();
      return;
    }

    const flightInfo = new FlightInfo(workerFlight.num, workerFlight.duration, workerFlight.from_gate, workerFlight.to_gate);
    this._workersService.setSelectedFlightInfo(flightInfo);
  }

  private _selectDefaultFlight(): void {
    const workerFlight = this.workerFlights![0];
    this.onFlightSelected(workerFlight.num);
    this._router.navigate([workerFlight.num], {relativeTo: this._route});
  }

  private _unsubscribe(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }
}
