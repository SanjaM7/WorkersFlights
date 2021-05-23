import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FlightInfo } from './models/flight-info';
import { IWorker } from './models/worker';
import { IWorkerFlight } from './models/worker-flight';

@Injectable()
export class WorkersService {
  private _workersUrl = environment.backendUrl + '/api/workers';
  private _selectedFlightInfoSubject = new BehaviorSubject<FlightInfo | null>(null);
  selectedFlightInfo$ = this._selectedFlightInfoSubject.asObservable();

  constructor(
    private httpClient: HttpClient) { }

  getWorkers(): Observable<IWorker[]> {
    return this.httpClient.get<IWorker[]>(this._workersUrl);
  }

  getWorkerFlights(workerId: number): Observable<IWorkerFlight[]> {
    const url = this._workersUrl + `/${workerId}`;
    return this.httpClient.get<IWorkerFlight[]>(url);
  }

  setSelectedFlightInfo(flightInfo: FlightInfo): void {
    this._selectedFlightInfoSubject.next(flightInfo);
  }
}
